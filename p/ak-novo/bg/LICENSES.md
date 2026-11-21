# Licences: assets/bg

## Own work

Every file in this folder was written for AK agencija on 13. 11. 2026. None of it
was copied from React Bits, Magic UI, Aceternity UI, Vanta.js, ShaderGradient or
21st.dev. Their free showcases were used only as visual references: a look
(aurora, silk, gradient mesh, beams, and so on) is not protected, and no source
code, shader, or asset from those projects, or from any paid or "pro" tier, is
in this folder.

## Third-party code

There is one third-party piece: the 2D hash function `h21()` inside the shared
shader preamble in `bg.js`. Every WebGL background (aurora, silk, mesh, flame)
uses it for its noise.

- **Project:** "Hash without Sine" (hash12) by David Hoskins
- **URL:** https://www.shadertoy.com/view/4djSRW
- **Licence:** MIT

```
MIT License

Copyright (c) 2014 David Hoskins.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Rule for later additions

If you copy code from an MIT (or similar) project, keep its licence header in
the file and add an entry here with the project, URL and licence. Never copy
from a paid or "pro" tier.
