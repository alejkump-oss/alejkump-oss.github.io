// AK agencija, "Design World" glass hero.
// A 3D glass cube refracts a headline that is drawn on a 2D canvas and used as a
// WebGL texture (chromatic dispersion, two passes: back faces then front faces).
// Fallbacks: model fails -> RoundedBoxGeometry; no WebGL -> plain HTML headline.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeVertices, mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const MODEL_URL = 'model/cube.glb';

const hero = document.getElementById('hero');
const canvas = document.getElementById('scene');
const loaderEl = document.getElementById('loader');
const counterEl = hero.querySelector('.count');
const dots = [...hero.querySelectorAll('.dot')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let messages;
try { messages = JSON.parse(hero.dataset.lines); } catch (e) { messages = [['AK', 'agencija']]; }
const counterMode = hero.dataset.counter || 'static';

function fail() {
  document.documentElement.classList.add('no-webgl');
  if (loaderEl) loaderEl.classList.add('done');
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
} catch (e) {
  renderer = null;
}

if (!renderer) {
  fail();
} else {
  start();
}

function start() {
  renderer.setClearColor(0x000000, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.autoClear = false;
  const DPR = () => Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(DPR());

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); fail(); }, false);

  // ---------- headline texture ----------
  const textCanvas = document.createElement('canvas');
  const tctx = textCanvas.getContext('2d');
  const textTex = new THREE.CanvasTexture(textCanvas);
  textTex.colorSpace = THREE.SRGBColorSpace;
  textTex.minFilter = THREE.LinearFilter;
  textTex.magFilter = THREE.LinearFilter;
  textTex.generateMipmaps = false;

  let W = 1, H = 1, mobile = false;
  let msgFrom = 0, msgTo = 0, msgT = 1; // crossfade state
  let fs = 100;

  function computeFontSize() {
    fs = Math.min(H * 0.21, W * (mobile ? 0.21 : 0.118));
    const maxW = W * (mobile ? 0.9 : 0.5);
    tctx.font = `800 ${fs}px Poppins`;
    let widest = 0;
    for (const set of messages) for (const line of set) widest = Math.max(widest, tctx.measureText(line).width);
    if (widest > maxW) fs *= maxW / widest;
    // Phones: keep the last line clear of the tagline below it.
    const tag = hero.querySelector('.tagline');
    if (mobile && tag) {
      const limit = tag.getBoundingClientRect().top - hero.getBoundingClientRect().top - 14;
      const cy = H * 0.45;
      const n = Math.max(...messages.map((s) => s.length));
      const maxFs = (limit - cy) / (0.35 + 0.535 * (n - 1));
      if (maxFs > 20 && fs > maxFs) fs = maxFs;
    }
  }

  function drawSet(set, alpha) {
    if (alpha <= 0) return;
    const cx = W * (mobile ? 0.5 : 0.505);
    const cy = H * (mobile ? 0.45 : 0.468);
    const gap = fs * 1.07;
    const cap = fs * 0.7;
    const n = set.length;
    tctx.globalAlpha = alpha;
    for (let i = 0; i < n; i++) {
      const y = cy + cap / 2 + (i - (n - 1) / 2) * gap;
      tctx.fillText(set[i], cx, y);
    }
    tctx.globalAlpha = 1;
  }

  function drawHeadline() {
    const dpr = DPR();
    tctx.setTransform(1, 0, 0, 1, 0, 0);
    tctx.fillStyle = '#000';
    tctx.fillRect(0, 0, textCanvas.width, textCanvas.height);
    tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tctx.font = `800 ${fs}px Poppins`;
    tctx.textAlign = 'center';
    tctx.textBaseline = 'alphabetic';
    tctx.fillStyle = '#e9e9e9';
    if (msgT >= 1) drawSet(messages[msgTo], 1);
    else { drawSet(messages[msgFrom], 1 - msgT); drawSet(messages[msgTo], msgT); }
    textTex.needsUpdate = true;
  }

  // ---------- background (headline) pass ----------
  const bgScene = new THREE.Scene();
  const bgCam = new THREE.Camera();
  const bgMat = new THREE.ShaderMaterial({
    uniforms: { uTexture: { value: textTex } },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: /* glsl */`
      uniform sampler2D uTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = texture2D(uTexture, vUv);
#include <colorspace_fragment>
      }`,
    depthTest: false,
    depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
  quad.frustumCulled = false;
  bgScene.add(quad);

  // ---------- glass ----------
  const glassVert = /* glsl */`
    varying vec3 vNormal;
    varying vec3 vEye;
    void main() {
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vEye = normalize(mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }`;
  const glassFrag = /* glsl */`
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform float uIorR; uniform float uIorY; uniform float uIorG;
    uniform float uIorC; uniform float uIorB; uniform float uIorP;
    uniform float uRefractPower; uniform float uChromatic; uniform float uSaturation;
    uniform float uShininess; uniform float uDiffuseness; uniform float uFresnelPower;
    uniform vec3 uLight; uniform float uBackside;
    varying vec3 vNormal;
    varying vec3 vEye;
    #define LOOP 16

    float specular(vec3 light, float shininess, float diffuseness, vec3 n, vec3 eye) {
      vec3 lightVector = normalize(-light);
      vec3 viewVector = -eye;
      vec3 halfVector = normalize(viewVector + lightVector);
      float NdotL = dot(n, lightVector);
      float NdotH = dot(n, halfVector);
      return pow(max(NdotH, 0.0), shininess) + max(0.0, NdotL) * diffuseness;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      vec3 n = normalize(vNormal);
      if (uBackside > 0.5) n = -n;
      vec3 eye = normalize(vEye);
      vec3 color = vec3(0.0);
      vec3 rR = refract(eye, n, 1.0 / uIorR);
      vec3 rY = refract(eye, n, 1.0 / uIorY);
      vec3 rG = refract(eye, n, 1.0 / uIorG);
      vec3 rC = refract(eye, n, 1.0 / uIorC);
      vec3 rB = refract(eye, n, 1.0 / uIorB);
      vec3 rP = refract(eye, n, 1.0 / uIorP);
      for (int i = 0; i < LOOP; i++) {
        float slide = float(i) / float(LOOP) * 0.045;
        float r = texture2D(uTexture, uv + rR.xy * (uRefractPower + slide * 1.0) * uChromatic).x * 0.5;
        vec3 tY = texture2D(uTexture, uv + rY.xy * (uRefractPower + slide * 1.0) * uChromatic).rgb;
        float y = (tY.x * 2.0 + tY.y * 2.0 - tY.z) / 6.0;
        float g = texture2D(uTexture, uv + rG.xy * (uRefractPower + slide * 2.0) * uChromatic).y * 0.5;
        vec3 tC = texture2D(uTexture, uv + rC.xy * (uRefractPower + slide * 2.5) * uChromatic).rgb;
        float c = (tC.y * 2.0 + tC.z * 2.0 - tC.x) / 6.0;
        float b = texture2D(uTexture, uv + rB.xy * (uRefractPower + slide * 3.0) * uChromatic).z * 0.5;
        vec3 tP = texture2D(uTexture, uv + rP.xy * (uRefractPower + slide * 1.0) * uChromatic).rgb;
        float p = (tP.z * 2.0 + tP.x * 2.0 - tP.y) / 6.0;
        float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
        float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
        float B = b + (2.0 * c + 2.0 * p - y) / 3.0;
        color += vec3(R, G, B);
      }
      color /= float(LOOP);
      float luma = dot(color, vec3(0.2125, 0.7154, 0.0721));
      color = mix(vec3(luma), color, uSaturation);

      bool back = uBackside > 0.5;
      float spec = specular(uLight, uShininess, uDiffuseness, n, eye)
                 + 0.6 * specular(vec3(1.0, 1.0, -1.0), uShininess * 0.6, uDiffuseness * 0.5, n, eye);
      color += spec * (back ? 0.35 : 1.0);

      float f = pow(1.0 + dot(eye, n), uFresnelPower);
      color = mix(color, vec3(1.0), f * (back ? 0.25 : 0.55));
      color += vec3(0.004, 0.005, 0.007);
      gl_FragColor = vec4(color, 1.0);
#include <colorspace_fragment>
    }`;

  function glassMaterial(back) {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uIorR: { value: 1.15 }, uIorY: { value: 1.16 }, uIorG: { value: 1.18 },
        uIorC: { value: 1.22 }, uIorB: { value: 1.22 }, uIorP: { value: 1.22 },
        uRefractPower: { value: back ? 0.22 : 0.30 },
        uChromatic: { value: 0.5 },
        uSaturation: { value: 1.08 },
        uShininess: { value: 90 },
        uDiffuseness: { value: 0.02 },
        uFresnelPower: { value: 5 },
        uLight: { value: new THREE.Vector3(-1, 1, 1) },
        uBackside: { value: back ? 1 : 0 },
      },
      vertexShader: glassVert,
      fragmentShader: glassFrag,
      side: back ? THREE.BackSide : THREE.FrontSide,
    });
  }
  const backMat = glassMaterial(true);
  const frontMat = glassMaterial(false);

  const rtOpts = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: true };
  const rtBack = new THREE.WebGLRenderTarget(1, 1, rtOpts);
  const rtFront = new THREE.WebGLRenderTarget(1, 1, rtOpts);
  backMat.uniforms.uTexture.value = rtBack.texture;
  frontMat.uniforms.uTexture.value = rtFront.texture;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  const pivot = new THREE.Group();
  const spinner = new THREE.Group();
  scene.add(pivot);
  pivot.add(spinner);
  spinner.quaternion.setFromEuler(new THREE.Euler(-0.42, 0.62, 0.18));
  let mesh = null;

  function setGeometry(geo) {
    mesh = new THREE.Mesh(geo, frontMat);
    spinner.add(mesh);
    if (loaderEl) loaderEl.classList.add('done');
    hero.classList.add('ready');
    wake();
  }

  function fallbackGeometry() {
    if (mesh) return;
    setGeometry(new RoundedBoxGeometry(1, 1, 1, 8, 0.12));
  }

  function loadModel() {
    const timer = setTimeout(fallbackGeometry, 9000);
    new GLTFLoader().load(MODEL_URL, (gltf) => {
      clearTimeout(timer);
      if (mesh) return;
      try {
        const root = gltf.scene;
        root.updateMatrixWorld(true);
        const parts = [];
        root.traverse((o) => {
          if (!o.isMesh) return;
          let g = o.geometry.clone();
          for (const a of ['uv', 'uv1', 'uv2', 'color', 'tangent']) if (g.attributes[a]) g.deleteAttribute(a);
          g = mergeVertices(g, 1e-4);
          g.computeVertexNormals();
          g.applyMatrix4(o.matrixWorld);
          parts.push(g);
        });
        if (!parts.length) throw new Error('no meshes');
        const merged = parts.length === 1 ? parts[0] : mergeGeometries(parts, false);
        if (!merged) throw new Error('merge failed');
        merged.computeBoundingBox();
        const box = merged.boundingBox;
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        merged.translate(-center.x, -center.y, -center.z);
        const s = 1 / Math.max(size.x, size.y, size.z);
        merged.scale(s, s, s);
        setGeometry(merged);
      } catch (e) {
        fallbackGeometry();
      }
    }, undefined, () => { clearTimeout(timer); fallbackGeometry(); });
  }

  // ---------- layout ----------
  const bufSize = new THREE.Vector2();
  function layout() {
    const rect = hero.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    mobile = W < 768 || W / H < 1;
    const dpr = DPR();
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H, false);
    renderer.getDrawingBufferSize(bufSize);
    rtBack.setSize(bufSize.x, bufSize.y);
    rtFront.setSize(bufSize.x, bufSize.y);
    backMat.uniforms.uResolution.value.copy(bufSize);
    frontMat.uniforms.uResolution.value.copy(bufSize);

    textCanvas.width = Math.round(W * dpr);
    textCanvas.height = Math.round(H * dpr);
    computeFontSize();
    drawHeadline();

    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 10;
    const visW = visH * camera.aspect;
    const sx = mobile ? 0.5 : 0.517;
    const sy = mobile ? 0.45 : 0.488;
    pivot.position.set((sx - 0.5) * visW, (0.5 - sy) * visH, 0);
    const px = Math.min(H * 0.44, W * (mobile ? 0.45 : 0.29));
    pivot.scale.setScalar((px / H) * visH);
    needsFrame = true;
  }

  // ---------- interaction ----------
  const AX_Y = new THREE.Vector3(0, 1, 0);
  const AX_X = new THREE.Vector3(1, 0, 0);
  const qTmp = new THREE.Quaternion();
  function rotate(dx, dy) {
    if (dx) spinner.quaternion.premultiply(qTmp.setFromAxisAngle(AX_Y, dx));
    if (dy) spinner.quaternion.premultiply(qTmp.setFromAxisAngle(AX_X, dy));
  }

  let dragging = false, lastX = 0, lastY = 0, lastMoveT = 0, pointerId = null;
  let velX = 0, velY = 0;
  let releaseT = performance.now();
  let spinRemaining = 0;

  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true; pointerId = e.pointerId;
    lastX = e.clientX; lastY = e.clientY; lastMoveT = performance.now();
    velX = velY = 0; spinRemaining = 0;
    canvas.classList.add('dragging');
    if (e.pointerType === 'mouse') { try { canvas.setPointerCapture(e.pointerId); } catch (_) {} }
    wake();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    const now = performance.now();
    const dx = (e.clientX - lastX) * 0.008;
    // On touch, vertical movement belongs to page scroll (touch-action: pan-y).
    const dy = e.pointerType === 'mouse' ? (e.clientY - lastY) * 0.008 : 0;
    rotate(dx, dy);
    const dtm = Math.max(1, now - lastMoveT) / 16.67;
    velX = dx / dtm; velY = dy / dtm;
    lastX = e.clientX; lastY = e.clientY; lastMoveT = now;
    needsFrame = true;
  });
  function endDrag(e) {
    if (!dragging || (e && e.pointerId !== pointerId)) return;
    dragging = false; pointerId = null;
    canvas.classList.remove('dragging');
    if (performance.now() - lastMoveT > 80) { velX = velY = 0; }
    releaseT = performance.now();
  }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('lostpointercapture', endDrag);

  function spin(dir) {
    velX = velY = 0;
    if (reduceMotion) { rotate(dir * Math.PI / 2, 0); spinRemaining = 0; }
    else spinRemaining += dir * Math.PI / 2;
    releaseT = performance.now();
    needsFrame = true;
    wake();
  }
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  if (prev) prev.addEventListener('click', () => spin(-1));
  if (next) next.addEventListener('click', () => spin(1));

  function setMessage(i) {
    if (i === msgTo || !messages[i]) return;
    dots.forEach((d, k) => { d.classList.toggle('active', k === i); d.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    if (counterEl && counterMode === 'index') counterEl.textContent = String(i + 1).padStart(2, '0');
    const live = document.getElementById('hero-live');
    if (live) live.textContent = messages[i].join(' ');
    msgFrom = msgTo; msgTo = i;
    msgT = reduceMotion ? 1 : 0;
    drawHeadline();
    wake();
  }
  dots.forEach((d, i) => d.addEventListener('click', () => setMessage(i)));

  // ---------- loop ----------
  let running = false, rafId = 0, lastT = 0, needsFrame = true;
  let heroVisible = true;

  function frame(t) {
    rafId = 0;
    if (!running) return;
    const dt = Math.min(0.05, lastT ? (t - lastT) / 1000 : 0.016);
    lastT = t;
    const k = dt * 60;

    if (msgT < 1) {
      msgT = Math.min(1, msgT + dt / 0.35);
      drawHeadline();
    }

    if (!dragging) {
      if (Math.abs(spinRemaining) > 0.0005) {
        const step = spinRemaining * Math.min(1, 0.09 * k);
        rotate(step, 0);
        spinRemaining -= step;
      } else if (spinRemaining !== 0) {
        rotate(spinRemaining, 0);
        spinRemaining = 0;
      }
      if (velX || velY) {
        rotate(velX * k, velY * k);
        const damp = Math.pow(0.94, k);
        velX *= damp; velY *= damp;
        if (Math.abs(velX) < 1e-5 && Math.abs(velY) < 1e-5) velX = velY = 0;
      }
      if (!reduceMotion) {
        const ramp = Math.min(1, Math.max(0, (t - releaseT - 600) / 1000));
        if (ramp > 0) rotate(0.0035 * ramp * k, 0.0012 * ramp * k);
      }
    }

    render();

    const idle = reduceMotion && !dragging && !velX && !velY && spinRemaining === 0 && msgT >= 1;
    if (!idle) rafId = requestAnimationFrame(frame);
    else { running = false; }
  }

  function render() {
    renderer.setRenderTarget(rtBack);
    renderer.clear();
    renderer.render(bgScene, bgCam);

    renderer.setRenderTarget(rtFront);
    renderer.clear();
    renderer.render(bgScene, bgCam);
    if (mesh) {
      renderer.clearDepth();
      mesh.material = backMat;
      renderer.render(scene, camera);
    }

    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(bgScene, bgCam);
    if (mesh) {
      renderer.clearDepth();
      mesh.material = frontMat;
      renderer.render(scene, camera);
    }
    needsFrame = false;
  }

  function wake() {
    if (!heroVisible || document.hidden) return;
    if (!running) { running = true; lastT = 0; }
    if (!rafId) rafId = requestAnimationFrame(frame);
  }
  function sleep() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  document.addEventListener('visibilitychange', () => { if (document.hidden) sleep(); else wake(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible) wake(); else sleep();
    }, { threshold: 0 }).observe(hero);
  }

  let lastW = 0, lastH = 0;
  const onResize = () => {
    const r = hero.getBoundingClientRect();
    if (Math.round(r.width) === lastW && Math.round(r.height) === lastH) return;
    lastW = Math.round(r.width); lastH = Math.round(r.height);
    layout();
    wake();
  };
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(hero);
  window.addEventListener('resize', onResize);
  if (document.fonts && document.fonts.addEventListener) {
    document.fonts.addEventListener('loadingdone', () => { computeFontSize(); drawHeadline(); wake(); });
  }

  const fontsReady = document.fonts && document.fonts.load
    ? Promise.all([document.fonts.load('800 100px Poppins', 'Aa ' + messages.flat().join(' ')), document.fonts.ready])
    : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(() => {
    onResize();
    releaseT = performance.now();
    loadModel();
    wake();
  }).catch(() => { onResize(); loadModel(); wake(); });

  // test hook (read-only): lets the QA script know the scene is up
  window.__dwReady = () => !!mesh;
}
