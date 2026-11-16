# Tattoo Pigment Kočevje — predogledi (16. 11. 2026)

Mapa: `p/tattoo-pigment/` · izbirnik: `index.html` · predlog 1: `1/` · skupne datoteke: `assets/`.
Predlog 2 in 3 gradi drug agent; izbirnik ju že povezuje.

## POPRAVEK BRIEFA: društvo IMA spletno stran
Brief (Google Places prek Pindropa) je rekel "brez spletne strani". Companywall navaja
`www.tattoo-pigment.com/indexx.php` in stran DELUJE — samo prek **http** (https zavrne
povezavo, zato je Google/WebFetch ne vidita). Stran je iz ~2010: Windows-1250, tabelarna
postavitev 800 px, pisava Impact, onemogočen desni klik, Flash-vdelava YouTuba, prototype.js
+ lightbox, brez viewport-a. Prodajni nagovor je torej **prenova**, ne "prva spletna stran".
Vse fotografije in navedki na predogledu so z njihove strani (glej spodaj).

## Predlog 1 — arhetip: **galerija**
Papir (#f3eee4) + črnilo (#121110) + en pigment (vermilion #b6321e). Pisavi: Instrument Serif
(ležeča, naslovi) + Space Grotesk (besedilo); obe SIL OFL 1.1, samogostovani woff2 iz
fontsource (jsdelivr), licenci v `assets/OFL-*.txt`. Brez skupnega skeleta: ni pill-gumba,
ni lepljive klicne vrstice, ni "Kako poteka", ni FAQ. Vstop = naslov z lokacijsko posebnostjo
("nad Sanolaborjem"), potem takoj galerija (CSS columns, ohranjena razmerja), razdelek
"Z njihove strani" (dobesedni navedki o sterilizaciji, negi in dejavnosti), "Kje in kako do
termina", noga z razkritjem. Lightbox prek `<dialog>` (brez knjižnic).
Test zamenjave imena: "nad Sanolaborjem", KUD od 2010, Jure, lastne fotografije — ne gre
na drug studio.

## Dejstva z virom (vse pregledano 16. 11. 2026)
| Dejstvo | Vir |
|---|---|
| Pravno ime: KULTURNO UMETNIŠKO DRUŠTVO TATTOO PIGMENT KOČEVJE; Ljubljanska cesta 19, 1330 Kočevje; aktivno; SKD 94.999 | https://www.bizi.si/KULTURNO-UMETNISKO-DRUSTVO-TATTOO-PIGMENT-KOCEVJE/ |
| Datum registracije 07.06.2010; pravna oblika društvo; zastopnik Hočevar Jure; tel. 041560623; e-pošta tattoopigment@gmail.com; spletna stran www.tattoo-pigment.com/indexx.php | https://www.companywall.si/podjetje/kulturno-umetnisko-drustvo-tattoo-pigment-kocevje/MMxNUcoR |
| "se ukvarja z izdelavo tetovaž ter širjenjem kulture umetnosti tetoviranja. Ponujamo vam tudi izdelavo zidnih poslikav" ; "041 560 623 (Jure)" ; "nad trgovino SANOLABOR" | http://www.tattoo-pigment.com/indexx.php (samo http) |
| Kontakt: "Jure : 041 560 623 (tattoo)", naslov, e-pošta | http://www.tattoo-pigment.com/contact.php |
| Sterilizacija (navedek na strani, njihova trditev, ne naša): 316 kirurško jeklo, igle za enkratno uporabo, ultrazvočni čistilec + avtoklav 126 °C / 3 bar | http://www.tattoo-pigment.com/sterilizacija.php |
| Nega po tetoviranju (navedek) | http://www.tattoo-pigment.com/nega.php |
| Galerija ~260 fotografij tetovaž z napisi (cover up, trash polka, mandala, portrait, lettering, watercolor, polynesian, tribal, sketch, bio mechanical …) | http://www.tattoo-pigment.com/tattoos.php |
| Fotografije studia (11) | http://www.tattoo-pigment.com/studio.php |
| Instagram @tattoopigment: prikazno ime "Jure Hočevar ( Tattoo pigment Kočevje )", bio "Tattoo pigment Kočevje, Ljubljanska cesta 19. https://www.facebook.com/jure.hocevar ali email: tattoopigment@gmail.com"; zasebni račun | https://www.instagram.com/tattoopigment/ |
| FB skupina "FB KUD TATTOO PIGMENT KOCEVJE" | http://www.tattoo-pigment.com/links.php → https://www.facebook.com/groups/134261293256135/ (ni preverjeno, ali je še aktivna) |
| Kategorija "tattoo in piercing studio" | Google Places prek Pindropa (brief, 16. 11. 2026) — **piercinga na njihovi strani ni nikjer**, zato ga predogled ne omenja |

Navedki na strani so dobesedni, le iz velikih črk prepisani v male (na strani je to zapisano).

## Kaj NI na strani in zakaj
- Delovni čas, cene, leta izkušenj, ocene, "edini v Kočevju": niso objavljeni → ni jih.
- Piercing: samo kategorija v Google Places, na lastni strani ga ni → izpuščen.
- Firbcologi (RTV otroška oddaja): links.php trdi snemanje oddaje, a povezava
  http://otroski.rtvslo.si/firbcologi/prispevek/1004 zdaj preusmeri na splošno stran oddaje —
  neprevrljivo → ni na strani.
- "Zanesljiva" CompanyWall certifikat s studio.php: plačljiva značka → ni na strani.
- Stare YouTube vdelave (th1Va8pE6KQ, 9lPSaaayWTI) z izdelava.php: nista preverjena → nista vdelana.
- Zasebni FB profil jure.hocevar: ni povezan (osebni profil).

## Fotografije (vse z tattoo-pigment.com, delo društva; izvirniki so največ 600 px visoki)
Prenos: `http://www.tattoo-pigment.com/upload_slike/<ime>`; pretvorba ffmpeg libwebp q 82.
| Datoteka | Izvirnik (upload_slike/) | Opomba |
|---|---|---|
| assets/delo-01.webp | 1186763461.28958306_10155584869204755_1485259030224961536_n.jpg | metulj z obrazom |
| assets/delo-02.webp | 1539811819.67636969_10156741743434755_5470493630097522688_n.jpg | tiger, rama |
| assets/delo-03.webp | 1014643881.25158327_10155349386284755_5517940068628020671_n.jpg | nočni metulj, mandala |
| assets/delo-04.webp | 970039317.26731201_10155427430609755_3212340494868568714_n.jpg | sova, lovilec sanj |
| assets/delo-05.webp | 172579850.25398995_10155370103859755_7727583547756668192_n.jpg | sveča in pero |
| assets/delo-06.webp | 1682852730.25158153_10155355731944755_3981794627291933386_n.jpg | Ti + vezje |
| assets/delo-07.webp | 1203163680.417732648_10160214204289755_6999301587328366457_n.jpg | orel |
| assets/delo-08.webp | 205827269.406382759_10160168620854755_1702164157775368473_n.jpg | lev, golen |
| assets/delo-09.webp | 651781253.1 (44).jpg | jabolko v barvi |
| assets/jure-pri-delu.webp | 1513642469.29425086_2070645093208481_4299603889289691136_o.jpg (studio.php) | Jure med delom |
| assets/studio.webp | 626924546.902079561.IMG_20190426_195003.jpg (studio.php) | prazen studio |
Napisi motivov na predogledu so **opisni** (kar je na sliki), ne napisi z njihove strani.
Namerno izpuščeno: fotografija z golim oprsjem, "before/after" z vpisanim rdečim besedilom,
fotografije strank z vidnim obrazom (razen Jureta, ki je zastopnik in je na lastni strani).
Pexels: trije kandidati so bili preneseni za primer brez lastnih fotografij in **izbrisani**,
ko se je pokazala lastna galerija — na strani ni nobene simbolične/stock/AI slike.
Stari logotip (slike/logo.jpg, pištola v č/b) in banner (slike/banner.gif, tribal) nista
uporabljena; besedni znak je nov.

## Preverjanje (16. 11. 2026)
Glej poročilo agenta; ukazi: Python Playwright WebKit (iPhone 13), 390 px, `scrollWidth`
vs `clientWidth`, preverjanje lokalnih povezav in slik, HTML parse.

## Predlog 2 — arhetip: **katalog** (dodano 16. 11. 2026)
Temno: ozadje #121314, list #1b1c1f, črtkane "rezalne" črte #54565c, besedilo #efe9dc, en
naglas flash-rumena #e8b931. Pisavi: Anton (naslovi, številke) + IBM Plex Mono 400 (besedilo,
podatki); obe SIL OFL 1.1, kopirani iz že objavljenih `p/avtolep-portal/assets/` in
`p/ak-refero/fonts/` v `2/assets/` skupaj z licencama (`OFL-Anton.txt`, `OFL-ibm-plex-mono.txt`).
Anton podnabor nima znaka ° (uporabljen samo v Plex Mono). Zgradba: naslovnica kataloga +
kazalo s pikčastimi vodili → list 01–09 (fiksne celice 4:5, slika `contain` na podlagi) →
samostojni vnosi 10 Zidne poslikave, 11 Studio (sterilizacija), 12 Naročilo.
Številke 01–12 so naše oštevilčenje (na strani piše).
Novi viri (pregledano 16. 11. 2026, samo http):
- Naslovi fotografij v galeriji (title= na tattoos.php): delo-01 »woman butterfly«, delo-02
  »tiger«, delo-07 »eagle«, delo-08 »lion family«, delo-04 »dreamcatcher owl«, delo-09
  **»prekrivanje 6 (cover up)«** (jabolko je prekrivanje), delo-03/05/06 brez smiselnega napisa.
- http://www.tattoo-pigment.com/paintings.php ("Stenske slike"): "Trenutn ni slik" — zato
  vnos 10 nima fotografije, le njihov navedek z indexx.php in opombo, da slik še ni.

## Predlog 3 — arhetip: **pogovor** (dodano 16. 11. 2026)
Srednje svetlo: žajbljevo ozadje #dde4da, mehurčki studia steklenično zelena #1e3a32 s
kremnim besedilom #f4efe2, obiskovalec bel, naglas baker #b4621a / #f1dcc4. Pisavi: Figtree
400/600 (vprašanja, vmesnik) + Lora 500 (odgovori studia); obe SIL OFL 1.1, kopirani iz
`p/slascicarna-medo/assets/` in `p/salon-dotik/assets/` v `3/assets/` (licenčni datoteki
tam nista bili, zato ju tudi tu ni). Vprašanja so naša (to piše na strani); vsak odgovor je
dobeseden navedek z indexx/sterilizacija/nega/contact.php ali naslov fotografije s tattoos.php,
pod njim povezava na stran. Popravki navedkov: velike črke → male (indexx/contact nista v
velikih, tam ostane "SANOLABOR"), »316'« → 316, »126'C« → 126 °C, izpusti označeni z […].
Delovni čas/cene: sistemsko sporočilo "ni na njihovi strani". Konec: blok "Odgovorite
Juretu" s tel: povezavo (ni lepljiv). Avatar = jure-pri-delu.webp (zastopnik, na lastni strani).

## Preverjanje 2 in 3 (16. 11. 2026)
Python html.parser (ravnovesje oznak, podvojeni id-ji, lokalne povezave/sidra/CSS url, JSON-LD
parse) + Playwright WebKit 390×844 (mobile) in 1280×900: scrollWidth = clientWidth, vse slike
naložene, pisave naložene (document.fonts), brez napak v konzoli in brez 4xx. Celostranski
posnetki pregledani; popravljeno raztezanje vnosov 10/11 na namizju.
