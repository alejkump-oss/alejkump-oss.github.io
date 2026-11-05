# Predogled: Gostilnica in picerija Briški -- multi-page build, 5. 11. 2026

Not deployed (no `.assetsignore` entry needed -- this file simply is not linked from any page, and
the orchestrator/owner review this build before anything is committed or pushed).

## Pages
- `index.html` -- hero, open/closed badge, quick links, Google rating band, hours, call band.
- `malice.html` -- weekly lunch menu loaded client-side from the owner's Google Sheet (CSV), with a
  Sunday-friendly fallback card. See the in-page HTML comment for how the owner edits it.
- `jedilnik.html` -- full menu transcribed from 5 photographed pages of the printed menu.
- `galerija.html` -- 24 of the restaurant's own photographs, lightbox.
- `kontakt.html` -- address, map link, hours, closed-party section, phone/e-mail.

## Image sources

### Hero + party photo (assets/img/hero.webp, assets/img/zaprta-druzba.webp)
Both cropped from the restaurant's own printed-menu cover photo (uploaded by the owner,
`64ce8a6e-image.jpg`): the building exterior (hero) and the decorated party room (zaprta-druzba).
The gallery on their own site (below) has no dedicated exterior/terasa shot, so the cover photo is
the only real photo of the building available; it is a phone photo of a laminated menu page, so it
carries visible paper texture and a slight glare -- denoised and sharpened with ffmpeg
(`hqdn3d`, `unsharp`, `eq`) but not upscaled past its native crop resolution (1269x741 for the hero).

### Gallery (assets/img/galerija/*.webp)
All 24 fetched 5. 11. 2026 from the restaurant's own website,
https://www.kocevje.com/portalx/index.php/galerija (robots.txt allows this path; fetched one at a
time with curl, ~1.3 s apart, 24/24 returned 200 -- no 403/429 was hit, so the "stop at first
403/429" limit was never exercised). Converted from the original JPEGs to WebP (max 1600 px wide)
with ffmpeg; originals untouched. Source URL for each:

| File | Source URL |
|---|---|
| 01-pica-s-prelivom.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/IMG_20220426_164836.jpg |
| 02-pica-jajca-slanina-klobasa.webp | https://www.kocevje.com/portalx/images/nicepage-images/IMG_20230131_173727.jpg |
| 03-ocvrta-ribja-plosca.webp | https://www.kocevje.com/portalx/images/nicepage-images/IMG_20230130_202907.jpg |
| 04-tortilja-krusna-pec.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/317231608_527565009385024_3619718953533549013_n.jpg |
| 05-ocvrti-lignji.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/317120635_695275235253683_8167856916848234955_n.jpg |
| 06-palacinke.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/317116764_1336010040559289_4751638738464938386_n.jpg (listed on the gallery page without the JEDI/ prefix; fetched at the JEDI/ path, which resolved) |
| 07-pica-gobova.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/316895615_1192413221629432_8099700805596167490_n.jpg |
| 08-tortilje-krozniki.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/IMG_20220426_164852.jpg |
| 09-miza-jedi-pijaca.webp | https://www.kocevje.com/portalx/images/nicepage-images/JEDI/IMG_20210818_192513.jpg |
| 10-svinjska-rolada.webp | https://www.kocevje.com/portalx/images/nicepage-images/received_7305603306137304.jpeg |
| 11-zrezek-struklji.webp | https://www.kocevje.com/portalx/images/nicepage-images/405450345_240764958827177_4145703600281797237_n.jpg |
| 12-pica-rukola.webp | https://www.kocevje.com/portalx/images/nicepage-images/416686659_335797619409401_6669723251025772633_n.jpg |
| 13-dvorana-rumeni-prti.webp | https://www.kocevje.com/portalx/images/nicepage-images/REZERVACIJE/IMG_20230121_105355.jpg |
| 14-dvorana-rdece-bela.webp | https://www.kocevje.com/portalx/images/nicepage-images/REZERVACIJE/IMG_20200613_150443.jpg |
| 15-dvorana-zelena-stena.webp | https://www.kocevje.com/portalx/images/nicepage-images/REZERVACIJE/IMG_20200613_150457.jpg |
| 16-pogostitev-mrzle-mize.webp | https://www.kocevje.com/portalx/images/nicepage-images/1473155907654.jpg |
| 17-dvorana-podkev-dan.webp | https://www.kocevje.com/portalx/images/nicepage-images/REZERVACIJE/IMG_20200613_150427.jpg |
| 18-dvorana-podkev-vecer.webp | https://www.kocevje.com/portalx/images/nicepage-images/1473155982120.jpg |
| 19-pogostitev-kruh-solate.webp | https://www.kocevje.com/portalx/images/nicepage-images/406004116_371408281994768_4911591926923489984_n.jpg |
| 20-pogostitev-bogata-miza.webp | https://www.kocevje.com/portalx/images/nicepage-images/403692287_635926641841961_2094218949266980723_n.jpg |
| 21-pogostitev-piscanec.webp | https://www.kocevje.com/portalx/images/nicepage-images/393110027_261159453379840_828434949145478267_n.jpg |
| 22-dvorana-dolga-miza.webp | https://www.kocevje.com/portalx/images/nicepage-images/387637167_864693445383466_5187433587506202808_n.jpg |
| 23-dvorana-rumena-soba.webp | https://www.kocevje.com/portalx/images/nicepage-images/387544002_1406906120247309_8135256850536806068_n.jpg |
| 24-pogostitev-prigrizki.webp | https://www.kocevje.com/portalx/images/nicepage-images/396502338_344012611696773_5771700688267392476_n.jpg |

The homepage (www.kocevje.com) itself is a nicepage template with placeholder stock photos and fake
chef names ("Brian S. Martin" etc.) -- none of it was used; only the gallery page's real photos and
the owner-supplied menu photos went into this build.

Old illustrative Unsplash assets from the previous single-page preview (hero.webp, hero-m.webp,
lignji.webp, pec.webp) were deleted from `assets/` -- this build uses only the restaurant's own photos.

## Facts carried over from the previous preview (agency/sales/previews/pizzerija-briski/NOTES.md)
Legal name, address, activity (bizi.si); Google Maps hours, rating 4,4/576 reviews, 10-15 EUR/person,
dine-in (21. 10. 2026); phone and e-mail as given by the owner.

## Menu transcription -- items to confirm with the owner
The printed menu (5 photos) does not always print a price on the same line as the dish name; several
groups print one price column to the right of several stacked dish names instead. Read top-to-bottom,
sequential pairing was used (price row 1 -> dish row 1, etc.) for the groups below. All are internally
consistent with the restaurant's own pricing pattern, but none is a direct per-row read, so please have
the owner confirm:

1. **Prvi blok pic (orkestrator 5. 11.)** -- cene v fotografiji stojijo eno vrstico nad imenom pice (enako kot v drugem bloku). Branje: Margerita 9/10/19, Hišna 9,50/10,50/20, Klasika 9,50/10,50/20, Koruzna 9,50/10,50/20, Štirje letni časi 10,50/11,50/22, S puranjo šunko 10/11/21, Poletna 10/11/21. Prej je bila Poletna sklepana (11/12/23); popravljeno. Potrdi z Boštjanom.
   because it sits in the same bracket as the next group's items (Domača, Lovska, etc.), but this is
   inferred, not read.
2. **"V ponudbi tudi"** (Piščančji medaljoni 13,00; Ocvrti lignji 16,00; Ocvrt sir 12,00; Vegetarijanski
   krožnik 11,50; Domači skutni štruklji 11,00; Pražena goveja jetrca 11,50) -- sequential pairing against
   two photo blocks, not individually labelled rows.
3. **"Jedi z žara"** (Čevapčiči 11,00; Zrezek z žara s prebrancem 16,00; Plošča z žara za eno osebo
   17,50) -- same sequential-pairing caveat.
4. **Sestavljeni meniji** (Dunajski zrezek 14/15; Ljubljanski zrezek 17/18; Zrezek z žara v gobovi omaki
   15/16; Mesna plošča za dve osebi 38/40) -- same caveat; this is the one place where two readings
   seemed equally plausible (see git history of this file / the build report for the reasoning), so it
   is the single highest-value one to double check with Boštjan.
5. **Pica Tunina** -- mala is printed 10,50 EUR; velika/maxi carry a handwritten correction. Used the
   reading given in the build brief: velika 11,50 EUR, maxi 22,00 EUR.
6. **Mehiške tortilje** -- five filling options are each shown as 11,00 EUR; the photo shows what may be
   only four distinct "11,00 EUR" labels for five rows (uniform pricing assumed).

Everything else (pizza sizes/prices, dodatki, testenine, juhe, priloge, solate, sladice, allergen
legend and both allergen notes) was read directly off a clearly printed row and is not flagged here.
