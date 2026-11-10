# AVTOLEP — portal (v1, 10. 11. 2026)

Arhetip: video-zanka

Lastnik 10. 11. 2026: nova stran za AVTOLEP v slogu "Planet Jumping" (preloader, portal-okno na platnu,
potovanje skozi stanja). Obstoječa stran ostane na /p/avtolep/; ta je na /p/avtolep-portal/ (noindex).

- Live: https://alejkump.si/p/avtolep-portal/
- Zrcalo: AI-AGENCY-shift/agency/sales/previews/avtolep-portal/
- AVTOLEP ureja lastnik sam; agenti AVTOLEP ne kontaktirajo.

## Kako deluje
Preloader (nočna cesta, števec 0–100 %, logotip v sredini, ki odplava v glavo) → stanje 01 PNEVMATIKE.
Tap/klik na okno na sredini = potovanje (prehodni posnetek ×1,3, okno se razširi čez zaslon, zadnja sličica
zamrzne, novo stanje, okno se znova odpre). 01 PNEVMATIKE → 02 SERVIS → 03 POT DO NAS. 03 je končno:
v oknu je mirujoča slika in gumb "Pokliči 031 607 346" (tel:+38631607346). Gumb "Pokliči" je ves čas v glavi.
Pod hero je kratek razdelek z vsemi podatki in nogo.

## Dejstva (samo iz p/avtolep/index.html in avtolep-stran/NOTES.md, nič novega)
Vulkanizerstvo; menjava, montaža in hramba pnevmatik; pregled koles, zavor in podvozja na dvigalu; servis in
popravila vozil; od leta 2008; Mozelj 22B, 1330 Kočevje; 031 607 346; avtolep@gmail.com; pon–pet 8.00–16.00
(vir: topponudba, kot na obstoječi strani); termin po dogovoru. Ocene in citatov NI (bi zastarale).
Odprto kot prej: topponudba vodi AVTOLEP pod avtokleparstvo/avtoličarstvo — potrdi pri stranki.

## Mediji — vse ilustrativno, NIČ ni posnetek AVTOLEP
Lastnih fotografij AVTOLEP ni (glej avtolep-stran/NOTES.md); logotipa ni, zato besedni znak "AVTOLEP" (Anton).
Vsi video posnetki so s Pexels (licenca Pexels, komercialna raba dovoljena, pripis ni obvezen), lokalno
prekodirani v H.264 brez zvoka, faststart. Na strani oznaka "ilustrativni posnetek" + razkritje v nogi.

| Datoteka | Vir | Obdelava |
|---|---|---|
| assets/intro.mp4, intro.webp | https://www.pexels.com/video/863860/ (nočna avtocesta z žarometi) | 11–14,2 s, 960 px, crf 30 |
| assets/pnevmatike.mp4, .webp | https://www.pexels.com/video/mechanic-fixing-car-tire-14514795/ | izrez levih 900 px (desno je logotip tuje delavnice na jakni — namerno odrezan), crf 29 |
| assets/klic.webp | isti posnetek 14514795, sličica pri 5,2 s | izrez 720×720 samo kolo |
| assets/servis.mp4, .webp | https://www.pexels.com/video/man-under-the-car-14514802/ | 1152 px, naprej+nazaj (7,1 s, zanka brez skoka), crf 29 |
| assets/pot.mp4, .webp | https://www.pexels.com/video/car-driving-on-road-in-forest-in-winter-9871284/ | 9 s, 1152 px, 25 fps, crf 29 |
| assets/prehod-1.mp4 | https://www.pexels.com/video/person-checking-under-chassis-8470304/ | 12–14,4 s, ffmpeg zoom-in + tmix |
| assets/prehod-2.mp4 | https://www.pexels.com/video/aerial-view-of-a-car-driving-on-a-road-in-the-forest-16449356/ | 4–6,4 s, ffmpeg zoom-in + tmix |
| assets/anton-sl.woff2 | Anton (Google Fonts, SIL OFL 1.1, assets/OFL-Anton.txt) | pyftsubset, Latin + č š ž ć đ |

Na kolesu v 14514795 se vidi napis proizvajalca pnevmatike (WinterContact) — del stock posnetka.

## Nalaganje
Takoj: intro.webp (LCP), intro.mp4, font. Med preloaderjem: pnevmatike + servis (prvo ozadje in okno).
Po prikazu hero (+600 ms): prehodi, pot.mp4, klic.webp. Dekodirata samo vidno ozadje in video v oknu.
Reduced motion: brez videa (samo posterji), brez nagiba, takojšnji prehodi.

## Pred objavo na pravi domeni
Prave fotografije/video delavnice od stranke, logotip, potrditev storitev in delovnega časa.

## Preverjanje 10. 11. 2026 (rezultat dneva, ponovi z ukazom)
- `node scripts/lighthouse-check.mjs https://alejkump.si/p/avtolep-portal/` (live-site), 3 zagoni, mobilno:
  performance 99 / 100 / 86, accessibility 100 / 96 / 96, best-practices 100 ×3, SEO 63 ×3
  (SEO samo zaradi noindex, namerno). Mediana: 99 / 96 / 100 / 63.
- Python Playwright: WebKit iPhone 13 in Edge iPhone 13 emulacija: preloader, tap na okno → 02 → 03,
  tel: v končnem oknu, brez napak v konzoli, brez vodoravnega drsenja; Edge 1440×900. Edge: video sličice
  v oknu in ozadju se premikajo (currentTime raste).

## Popravek za iPhone (10. 11. 2026, po lastnikovem posnetku s pravega iPhona, Chrome iOS)
Vzrok: na telefonu je vklopljeno "Zmanjšaj gibanje" (prefers-reduced-motion) — lastnikove sličice se ujemajo
z WebKit + reduced_motion do piksla. Stran je v tem načinu skrajšala preloader na 0,2 s, ustavila vse videe
(samo posterji) in okno je bilo statična slika. Poleg tega je bila stran dolga in se je drsala.
Popravljeno: videi se predvajajo tudi pri zmanjšanem gibanju (gibanje je le krajše, brez nagiba, brez prehodnih
posnetkov); preloader šteje čas vidnih sličic; video se riše šele, ko res teče, sicer poster; en zaslon
(hero fixed, stran se ne drsa), podatki v listu iz Menu; visualViewport resize.
Preverjeno: WebKit iPhone 13 (normalno, reduced motion, blokirani videi = posterji v oknu) in Edge iPhone 13,
vse PASS. Lighthouse live 3 zagoni: performance 100/100/100, accessibility 100/100/96, BP 100, SEO 63 (noindex).
