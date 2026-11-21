# Animirana ozadja (assets/bg)

Knjižnica animiranih ozadij za predoglede in strani strank. Brez odvisnosti in brez
gradnje. Vsako ozadje je ena datoteka JS, skupno jedro je `bg.js`, osnovni slogi so
v `bg.css`. Galerija v živo je `ozadja.html` ob vsakem predogledu, ki jo vključi.

## Uporaba

```html
<link rel="stylesheet" href="/assets/bg/bg.css">

<section class="bg" data-bg="aurora" data-colors="#d9694f,#ec9466,#9db7d6" data-base="#0b1016">
  ... vsebina sekcije ...
</section>

<script src="/assets/bg/bg.js" defer></script>
```

`bg.js` poišče vse elemente z `data-bg` in naloži samo datoteke ozadij, ki jih stran
uporablja. Lahko pa vključite neposredno datoteko ozadja
(`<script src="/assets/bg/aurora.js" defer>`), ta sama naloži `bg.js`.

| Atribut | Pomen |
|---|---|
| `data-bg` | ime ozadja (glejte spodaj) |
| `data-colors` | do tri barve, ločene z vejico |
| `data-base` | barva podlage (temno ozadje) |
| `data-speed` | hitrost, npr. `0.5` (privzeto `1`) |
| `data-motion="static"` | izklop animacije: nariše eno sliko in se ustavi |
| `data-grain` | doda fino zrnatost filma (statična, brez stroška na sličico) |

## Vedenje

- **Zmanjšaj gibanje** (`prefers-reduced-motion: reduce`): animacija se ne ustavi,
  ampak teče s 25 % hitrosti (pravilo lastnika). Popolno ustavitev doseže le
  `data-motion="static"`.
- Ko je ozadje izven zaslona (IntersectionObserver) ali je zavihek skrit, se ustavi.
- devicePixelRatio je omejen na 1,5. Mehka ozadja WebGL rišejo pri 40–50 % ločljivosti
  in jih brskalnik raztegne, zato ostanejo poceni.
- Brez WebGL ali brez JS ostane statičen gradient CSS iz istih barv, zato je stran
  vedno berljiva.
- Element dobi razred `bg--on`, ko ozadje teče, in `bg--fallback`, ko ne more.

## Ozadja

| Ime | Opis | Privzete barve | Za koga |
|---|---|---|---|
| `aurora` (WebGL) | Severni sij: mehke zavese svetlobe, ki valovijo pod nočnim nebom. | `#3fd1a6,#4f7cff,#b46cff` na `#070b14` | nastanitve, wellness, fotografi, dogodki |
| `silk` (WebGL) | Svila: počasne gube satena z mehkim odsevom. | `#7a5cff,#c7b8ff,#ffffff` na `#120d24` | saloni, kozmetika, poroke, moda |
| `mesh` (WebGL) | Barvna mreža: barvni madeži, ki se počasi prelivajo, z zrnatostjo filma. | `#ff9a76,#ffd36e,#8ec5ff` na `#2b2d6e` | agencije, svetovalci, IT, ustvarjalci |
| `flame` (WebGL) | Plamen: topel sij, ki se dviga od spodaj, kot iz odprte peči. | `#7a1d10,#e8572a,#ffc46b` na `#140b08` | picerije, gostilne, peki, kamini, savne |
| `particles` (canvas) | Delci: mehke svetleče pike, ki se dvigajo kot žerjavica ali bokeh. | `#ffb36b,#ff7a45,#ffe3a3` na `#1a100b` | gostinstvo, dogodki, praznovanja, glasbeniki |
| `beams` (canvas) | Žarki: fina mreža, po kateri potujejo svetlobni žarki. | `#ec9466,#8fb4ff,#ffffff` na `#0b1016` | obrtniki, elektro, gradbinci, tehnična podjetja |
| `waves` (canvas) | Valovi: plasti prosojnih valov, ki se počasi kotalijo. | `#2fb6c9,#3c7bd9,#a7f0e6` na `#06202b` | bazeni, vodovodarji, turizem ob vodi, čistilni servisi |
| `dots` (canvas) | Pike: mreža pik, čez katero se širijo tihi valovi svetlobe. | `#9aa4b2,#ec9466,#ffffff` na `#0e131a` | računovodje, pravniki, zdravstvo, poslovne storitve |

Pri `beams` je tretja barva barva mreže, pri `dots` je prva barva mirnih pik, druga
pa barva valov.

## Nasveti

- Na stran dajte največ dve veliki ozadji. Več jih stane baterijo in jemlje pozornost.
- Ko je besedilo čez svetel del (npr. pas aurore), dodajte senčilo, npr. linearni
  gradient v `::after` z `z-index:-1`. Platno je na `z-index:-2`.
- Preverite na iPhonu z vklopljeno možnostjo Zmanjšaj gibanje.

Licence: `LICENSES.md`.
