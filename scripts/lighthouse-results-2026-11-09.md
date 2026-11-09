# Lighthouse – predogledi `p/<slug>/`, 2026-11-09

Meritev: Lighthouse (npx, najnovejši), **mobile**, simulirano omejevanje (privzeto),
Microsoft Edge headless, **živi URL-ji** `https://alejkump.si/p/<slug>/`, ena stran
naenkrat, 120 s časovna omejitev, en ponovni poskus. Vseh 37 strani je bilo izmerjenih
(nobena ni ostala "ni izmerjeno").

**Vrata:** ≥ 90 za performance, accessibility in best-practices; SEO se šteje **brez**
revizije `is-crawlable`, ker so predogledi namenoma `noindex`. Surovi SEO (66) je
prikazan, a se ga ne popravlja.

Stolpec "po popravkih" je mediana več zaporednih tekov po zadnji objavi (posamezni teki v
oklepaju). Ostali stolpci so osnovna meritev pred kakršno koli spremembo.

| Predogled | Perf. | Dostop. | Dobre prakse | SEO (surovo) | SEO brez is-crawlable | Vrata ≥90 | Perf. po popravkih (mediana; teki) |
|---|---:|---:|---:|---:|---:|---|---|
| veitteam | 70 | 100 | 100 | 66 | 100 | NE | 99 (99/99/99) |
| car-spa | 80 | 100 | 96 | 66 | 100 | NE | 99 (99/99/89) |
| barles | 81 | 100 | 96 | 66 | 100 | NE | 99 (98/99/99) |
| avtolep | 85 | 100 | 100 | 66 | 100 | NE | 100 (97/100/100), po odobritvi lastnika |
| jana | 86 | 90 | 100 | 66 | 100 | NE | 99 (100/99/98), po odobritvi lastnika |
| fikabeautybar | 87 | 100 | 100 | 66 | 100 | NE | 91 (89/91/61/91/91) |
| studeno | 90 | 96 | 96 | 66 | 100 | DA | – |
| ac-andrejek | 91 | 96 | 100 | 66 | 100 | DA | – |
| avtoservis-vodnik | 99 | 91 | 100 | 66 | 100 | DA | – |
| as-nartnik | 92 | 100 | 100 | 66 | 100 | DA | – |
| mizarstvo-javornik | 93 | 96 | 96 | 66 | 100 | DA | – |
| mizarstvohribernik | 93 | 100 | 100 | 66 | 100 | DA | – |
| sobar | 93 | 100 | 96 | 66 | 100 | DA | – |
| salon-dotik | 94 | 100 | 100 | 66 | 100 | DA | – |
| cvetlicarna-spela | 99 | 95 | 100 | 66 | 100 | DA | – |
| papi-les | 99 | 95 | 100 | 66 | 100 | DA | – |
| pleskarstvo-moin | 99 | 95 | 100 | 66 | 100 | DA | – |
| pohistvo-jereb | 99 | 95 | 96 | 66 | 100 | DA | – |
| berisha | 99 | 100 | 96 | 66 | 100 | DA | – |
| briski | 99 | 100 | 96 | 66 | 100 | DA | – |
| elektro-novak | 99 | 96 | 96 | 66 | 100 | DA | – |
| jana-gradnje | 98 | 100 | 96 | 66 | 100 | DA | – |
| jelnikar | 100 | 96 | 96 | 66 | 100 | DA | – |
| koncilja | 99 | 100 | 96 | 66 | 100 | DA | – |
| lana-avto | 100 | 100 | 96 | 66 | 100 | DA | – |
| mpe | 99 | 100 | 96 | 66 | 100 | DA | – |
| ostir | 99 | 100 | 96 | 66 | 100 | DA | – |
| petretic | 99 | 96 | 96 | 66 | 100 | DA | – |
| prelesnik | 100 | 100 | 96 | 66 | 100 | DA | – |
| umek | 99 | 96 | 96 | 66 | 100 | DA | – |
| dhs-bambic | 98 | 100 | 100 | 66 | 100 | DA | – |
| slascicarna-medo | 98 | 100 | 100 | 66 | 100 | DA | – |
| avtotek | 99 | 100 | 100 | 66 | 100 | DA | – |
| ostirka | 99 | 100 | 100 | 66 | 100 | DA | – |
| spohtl | 99 | 100 | 100 | 66 | 100 | DA | – |
| domkolor | 100 | 100 | 100 | 66 | 100 | DA | – |
| servis-caserman | 100 | 100 | 100 | 66 | 100 | DA | – |

## Kaj je bilo popravljeno (ostalo v produkciji)

| Stran | Popravek | Dokaz |
|---|---|---|
| car-spa | Animacija sijaja v heroju je animirala `left` (lastnost postavitve) in ustvarjala neprekinjen niz premikov postavitve. Enako gibanje zdaj prek `transform: translateX(475%) rotate(14deg)` (190 % starša / 40 % širine). | CLS 0,193 → 0 v vseh treh tekih |
| veitteam | Hero JPG (102 KB) → WebP (40 KB), preload s `fetchpriority="high"`. | perf. 99/99/99 |
| fikabeautybar | Hero: 800w mobilna različica (49 KB namesto 218 KB) s `srcset`/`sizes`, preload s `fetchpriority`, `width`/`height` popravljena na dejanskih 1200×1500. Logo 800×498 (prikazan 231×144) → 600×374. Šest ikon storitev 640×640 (prikazane 126×126) → 384×384. `izbira-barve-nohtov` dobi 800w različico (49 KB namesto 193 KB). | perf. mediana 91 iz 5 tekov |

Besedila, dejstva, postavitev in dizajn niso spremenjeni. Vsaka spremenjena stran je bila
pred objavo preverjena na iPhone 13 (Playwright WebKit): brez vodoravnega drsenja, vse
slike naložene, obe pisavi naloženi.

## Kaj je bilo poskušeno in umaknjeno

**Neblokirajoče nalaganje Google Fonts** (`preload` + `onload`, `noscript` rezerva) na
šestih straneh. FCP se je izboljšal za ~0,6 s, a v vseh tekih s tem vzorcem se je pojavil
TBT 80–510 ms (z blokirajočimi pisavami 0–70 ms), ker se težko delo slogov/postavitve premakne za FCP.
LCP je bil dvomodalen ne glede na to. Neto učinek nevtralen do negativen, zato je bilo
umaknjeno na vseh šestih straneh (avtolep, barles, jana obnovljeni bajt za bajt, sha256
preverjen).

## Še pod 90 in zakaj (stanje pred odobritvijo lastnika; glej dopolnitev spodaj)

| Stran | Perf. | Razlog |
|---|---:|---|
| avtolep | 86 | Opazovani LCP v brskalniku je ~0,65 s, simulirani 4,1 s. Simulacija v verigo LCP šteje spremenljivo pisavo Archivo (os `wdth` + `wght`, tri datoteke ~210 KB) in Inter Tight, ki se naložita pred hero sliko. Ožji razpon osi vrne iste datoteke (preverjeno). Nadaljnji korak (lastno gostovanje / podmnožica pisave ali zamenjava pisave) je izven dovoljenih popravkov. Koda strani ni spremenjena. |
| jana | 83 | LCP je animiran kinetični naslov (`h1.kt`, črke vstopijo prek `site.js`), stran ima 8 videov in ~2,7 MB. Popravek bi pomenil spremembo uvodne animacije ali videov, torej dizajna – odločitev lastnika. Dostopnost je točno 90: kontrastne napake so besedilo na videu (axe ozadja ne vidi) in `tel:` povezave v besedilu brez podčrtaja. Koda strani ni spremenjena. |

## Opombe

- **barles** je v osnovni meritvi dobil 81, v treh kasnejših tekih na nespremenjeni kodi
  pa 98/99/99. Razlika je šum simulacije (LCP naslova z animacijo vstopa je dvomodalen),
  ne sprememba.
- **Best-practices 96** na več straneh: `https://alejkump.si/favicon.ico` vrne 404 (koren
  spletišča, ne datoteka predogleda). Nad vrati, ni popravljeno.
- Raztros iste strani med teki je bil do ±15 točk (en tek fikabeautybar: 61 zaradi
  počasnega odgovora Google Fonts, FCP 4,7 s). Zato so številke "po popravkih" mediane.
- Commiti v `live-site`: `29fdb08`, `85f399b`, `9106c87`, `25f73ba`.

## Dopolnitev, isti dan: avtolep in jana po odobritvi lastnika

Lastnik je odobril spremembe na ravni dizajna, da obe strani dosežeta 90. Mediana treh
živih tekov po objavi `3e800e6`: **avtolep 100** (97/100/100), **jana 99** (100/99/98);
jana dostopnost ostaja 90 (nespremenjeno).

- **avtolep** (`a4fd0ec`): Archivo in Inter Tight lastno gostovana kot WOFF2 podmnožici
  (latinica + č, š, ž, ć, đ; OFL licenci v `assets/avtolep/fonts/`), samo uporabljeni
  razponi (Archivo wght 700–800, wdth 88–110: 44 KB; Inter Tight 400–700: 24 KB), preload,
  `font-display:swap`. Prej ~300 KB Google Fonts in blokirajoč CSS. Videz enak.
- **jana** (`a4fd0ec`, `3e800e6`): naslov na domači strani je statično besedilo (kinetični
  prikaz ostane na naslovih nižje); intro brez dvojnega prenosa webm+mp4, intro mp4
  680 → 198 KB; hero video začne po intru (poster najprej), 685 → 390 KB; videi nad
  600 KB (pergola, stol) zmanjšani na 271–350 KB; Playfair Display in Manrope lastno
  gostovana (70 KB); 16 dekorativnih slik in 6 posterjev se naloži, ko se približajo
  zaslonu. Lighthouse skupna teža 2740 KB → 466 KB.
