# Tattoo Pigment Kočevje — odstranitev samonaročanja, socialna omrežja (20. 11. 2026, pozno)

Naročilo Jureta Hočevarja (prek lastnika, 20. 11. 2026): "Termine odstranimo. Hoče, da so linki
povezani – vsa njegova socialna omrežja namesto terminov." Odstranjeno iz `index.html`: razdelek
samonaročanja (`#termin`, obrazec `.bk`), vsi gumbi "Naroči termin/posvet" (glava, meni, hero,
lepljiva vrstica, CTA), JS logika naročanja (drugi `<script>` IIFE, klici na
`ak-booking-tattoo-pigment.alejkump.workers.dev`) in GDPR/"Predogled: rezervacije …" vrstici. CSS
razreda `.bk/.days/.slots/.sum/.done/.fine/.btn-dark/.btn-ol/.kindrow/.fld/.st` odstranjen (bil
uporabljen samo v odstranjenem razdelku). Besedilo "Kako poteka" (05) in CTA prilagojeno (brez
besede "termin"/"rezerv").

**Cloudflare Worker/D1 NISTA izbrisana** (`booking-worker/`, worker `ak-booking-tattoo-pigment`,
D1 `ak-booking-tattoo-pigment`) — po navodilu ostajata v repozitoriju kot infrastruktura, a sta od
20. 11. 2026 (pozno) **neuporabljena** s te strani; noben del `index.html` jih več ne kliče.

Namesto naročanja nov razdelek `#sledite` ("Sledite nam") + spremenjena lepljiva vrstica
("Pokliči" + "Instagram"). Povezave, preverjene 20. 11. 2026 (pozno), vse vrnejo 200:
| Kanal | Povezava | Vir/preverjeno |
|---|---|---|
| Telefon | tel:+38641560623 | že na strani |
| Instagram | https://www.instagram.com/tattoopigment/ | Juretov; zaseben račun, bio "Jure Hočevar ( Tattoo pigment Kočevje )", 910 sledilcev, 375 objav; preverjeno v Chromu |
| Facebook | https://www.facebook.com/groups/134261293256135/ | javna skupina "TATTOO PIGMENT Kočevje", 134 članov, vizitka "Tetoviranje in lasersko odstranjevanje tetovaž", naslovnica "KONTAKT: 041 560 623 – Jure"; ustanovil Jure Hočevar (objava 21. 4. 2021); preverjeno v Chromu |
| E-pošta | mailto:tattoopigment@gmail.com | že na strani |
| Zemljevid | https://www.google.com/maps?cid=16634749326793929743 | že na strani (Google Business profil) |

**Odprto vprašanje (NI povezano na strani):** `https://www.facebook.com/jure.hocevar` — Juretov
**osebni** FB profil. Tako stara stran (links.php: "Facebook profil Jure Tattooist Hocevar") kot
njegov Instagram bio ga navajata kot kontakt, a gre za osebni profil, ne stran studia — po navodilu
briefa ni povezan. Če lastnik/Jure potrdi, da naj se vseeno doda, ga dodamo.
Iskano in NI najdeno: ločena Facebook stran (Page, ne skupina) za studio, TikTok, YouTube.

---

# Tattoo Pigment Kočevje — polna stran (20. 11. 2026)

Lastnik 20. 11.: "Jure Hočevar se je strinjal, da mu pošljem spletno stran … uporabi Pindrop … da se mu stranke same naročijo."
`index.html` = ena polna stran (Pindrop/Razgled slog: celozaslonska fotografija, zamegljeno temno dno, Instrument Serif z ležečim poudarkom, tanek meni, pill gumbi, celozaslonski vrtiljak + lightbox). Stari izbirnik je zdaj `predlogi/index.html`; predlogi `1/ 2/ 3/` ostajajo na istih naslovih, njihova povezava nazaj kaže na `../predlogi/`. noindex ostane.

## Nova dejstva z virom (20. 11. 2026)
| Dejstvo | Vir |
|---|---|
| Google: 4,8, 18 mnenj; kategorija "Tattoo studio"; delovni čas pon–pet 9–21, sob in ned zaprto; cid 16634749326793929743 (0xe6da8060c738740f), 45.6415557, 14.8569457 | Google Zemljevidi, profil "Tattoo pigment Kočevje", pogledano v Chromu 20. 11. 2026 |
| Mnenja, citirana dobesedno: Maja Fink (5★) "Strokoven pristop, natančno delo in sproščeno vzdušje :) top"; Anita Lipovac (5★) "Odlično. Prijaznost in profesionalnost"; nadin koleto (5★) "Jure tako naprej lepo delaš..sm zlo zadovoljna.."; Klavdija Poglajen (5★) "Top izdelava!!!" (Google prikaže "…" za emojiji, ti so izpuščeni) | isti Googlov profil |
| E-pošta tattoopigment@gmail.com | companywall + indexx.php/contact.php; lastnik jo je 20. 11. potrdil kot Juretov kontakt |
| Navodila nege (Bepanthen Plus, Ribodermin, ognjičevo mazilo; 10–15 dni; po 3 urah folija dol …) | http://www.tattoo-pigment.com/nega.php |
| Slogi = besede iz naslovov fotografij v galeriji (cover up, trash polka, mandala, sketch, watercolor, portrait, lettering, tribal, polynesian, bio mechanical) | http://www.tattoo-pigment.com/tattoos.php |
| 261 fotografij v galeriji (prešteto ob prenosu 20. 11.) | tattoos.php |
Izpuščeno: mnenje Iztoka Mikliča (4★, šala), Tanja Vesel (podpis "Andreas", nejasno), mnenja samo z emojiji. Cene, leta izkušenj, certifikati, nagrade: niso objavljeni → jih ni. "v nadstropju" je izpeljano iz "nad trgovino SANOLABOR".

## Fotografije (20. 11. 2026)
Vir: samo stara stran društva (tattoo-pigment.com, http). Instagram @tattoopigment je zaseben, FB jure.hocevar je osebni profil → nista uporabljena. Izvirniki na strani so največji javno dostopni (največ 600 px, studio 800 px). Galerija: izvirna ločljivost, WebP q82 (brez povečevanja). Samo naslovna fotografija je povečana z Real-ESRGAN (računalniško povečanje lastne fotografije, ne generirana slika) — to piše tudi v nogi strani. Izbranih 32 del brez obrazov strank in brez golote; motivi opisani z našimi besedami. Na hero fotografiji ima stranka obraz obrnjen stran; tatuator na njej ni imenovan (ni potrjeno, da je Jure).

| Datoteka | Velikost | Naslov na stari strani | Izvirnik |
|---|---|---|---|
| img/tiger.webp | 600×600 | tiger | http://www.tattoo-pigment.com/upload_slike/1539811819.67636969_10156741743434755_5470493630097522688_n.jpg |
| img/metulj-z-obrazom.webp | 446×600 | woman butterfly | http://www.tattoo-pigment.com/upload_slike/1186763461.28958306_10155584869204755_1485259030224961536_n.jpg |
| img/vesca-mandala.webp | 600×600 | ..,,,,. | http://www.tattoo-pigment.com/upload_slike/1014643881.25158327_10155349386284755_5517940068628020671_n.jpg |
| img/sveca-pero.webp | 600×600 | ..,.,.., | http://www.tattoo-pigment.com/upload_slike/172579850.25398995_10155370103859755_7727583547756668192_n.jpg |
| img/sova-lovilec-sanj.webp | 600×600 | dreamcatcher owl | http://www.tattoo-pigment.com/upload_slike/970039317.26731201_10155427430609755_3212340494868568714_n.jpg |
| img/modro-oko.webp | 600×600 | blue eye | http://www.tattoo-pigment.com/upload_slike/966075882.26167933_10155415731744755_984502765967683524_n.jpg |
| img/lobanja-vrtnice.webp | 600×600 | Skull and roses | http://www.tattoo-pigment.com/upload_slike/1160451470.IMG_20180619_213111_097.jpg |
| img/pescena-ura.webp | 541×600 | Sandwatch/skull/angel | http://www.tattoo-pigment.com/upload_slike/1121241765.IMG_20190119_220035_552.jpg |
| img/vrtnica-metulj.webp | 600×600 | Rose & butterfly | http://www.tattoo-pigment.com/upload_slike/933940778.55939955_10156431232989755_1920706063351414784_n.jpg |
| img/lisica-gozd.webp | 600×600 | fox and nature sketch tattoo | http://www.tattoo-pigment.com/upload_slike/1451073503.31288936_10155697126829755_752464857076334592_n.jpg |
| img/skorpijon.webp | 450×600 | scorpion black and white | http://www.tattoo-pigment.com/upload_slike/28867.06032010414.jpg |
| img/feniks.webp | 600×600 | phoenix | http://www.tattoo-pigment.com/upload_slike/1217079696.64311275_10156607206474755_1029833445620056064_n.jpg |
| img/biomehanika.webp | 450×600 | bio mechanical | http://www.tattoo-pigment.com/upload_slike/132993266.20160427_202851.jpg |
| img/soncnice.webp | 506×600 | sunflowers | http://www.tattoo-pigment.com/upload_slike/1525927273.87045173_10157265201444755_6567170321760124928_o.jpg |
| img/muerte.webp | 600×600 | Muerte | http://www.tattoo-pigment.com/upload_slike/190167383.71694173_10156862158449755_8048572230835109888_n.jpg |
| img/kitajski-tiger.webp | 600×600 | traditional chinese tiger | http://www.tattoo-pigment.com/upload_slike/1635338821.71887200_10156864803319755_3704098551916134400_n.jpg |
| img/volk-skica.webp | 600×600 | wolf sketch tattoo | http://www.tattoo-pigment.com/upload_slike/716815202.72760301_10156917431474755_2058021772736856064_n.jpg |
| img/volk-gozd.webp | 446×600 | wolf and forrest tattoo | http://www.tattoo-pigment.com/upload_slike/660675990.73058432_10156938571684755_3816508733794549760_n.jpg |
| img/tiger-gore.webp | 600×600 | tiger tattoo | http://www.tattoo-pigment.com/upload_slike/469249048.79441508_10157081468174755_8566652708159750144_o.jpg |
| img/ris.webp | 600×600 | Lynx tattoo | http://www.tattoo-pigment.com/upload_slike/1278064498.80049934_10157099961854755_6504931920609017856_o.jpg |
| img/trash-polka.webp | 600×600 | trash polka | http://www.tattoo-pigment.com/upload_slike/773767187.83273616_10157159377439755_2118318599562067968_o.jpg |
| img/volk.webp | 446×600 | wolf tattoo | http://www.tattoo-pigment.com/upload_slike/1969462969.105596663_10157663557859755_2356577797771711661_o.jpg |
| img/lev.webp | 446×600 | lion tattoo | http://www.tattoo-pigment.com/upload_slike/1511374604.105980735_10157672337374755_3563749875599041216_o.jpg |
| img/mandala.webp | 600×600 | madala tattoo | http://www.tattoo-pigment.com/upload_slike/1102789752.106003039_10157657662009755_7548887794013197395_o.jpg |
| img/ura-vrtnice.webp | 600×600 | memorial | http://www.tattoo-pigment.com/upload_slike/833495074.117295666_10157777568154755_6889255346206733316_o.jpg |
| img/jelen.webp | 600×600 | nature tattoo | http://www.tattoo-pigment.com/upload_slike/201724031.118765552_10157844774724755_913625106956360768_o.jpg |
| img/akvarel-oko.webp | 270×600 | watercolor eye | http://www.tattoo-pigment.com/upload_slike/2122751941.605734620_10162761893524755_6678211108807830503_n.jpg |
| img/tutankamon.webp | 270×600 | tutankamon tattoo | http://www.tattoo-pigment.com/upload_slike/1288250182.610935276_10162761895169755_1910599546034942996_n.jpg |
| img/feniks-cvetje.webp | 270×600 | phoenix tattoo | http://www.tattoo-pigment.com/upload_slike/515497323.611562546_10162761893849755_6728413449747940332_n.jpg |
| img/napis.webp | 600×600 | lettering | http://www.tattoo-pigment.com/upload_slike/931285227.67710643_10156745571309755_4080655360006815744_n.jpg |
| img/prekrivanje-lev.webp | 270×600 | cover up | http://www.tattoo-pigment.com/upload_slike/509900284.417871560_10160217536299755_8425289575052453458_n.jpg |
| img/portret-psa.webp | 600×600 | dog portrait | http://www.tattoo-pigment.com/upload_slike/936632419.73415997_10156920124934755_5758196451121299456_n.jpg |
| img/jure-pri-delu.webp | 337×600 | (studio.php) | http://www.tattoo-pigment.com/upload_slike/1513642469.29425086_2070645093208481_4299603889289691136_o.jpg |
| img/studio.webp | 450×600 | (studio.php) | http://www.tattoo-pigment.com/upload_slike/626924546.902079561.IMG_20190426_195003.jpg |
| img/v-studiu.webp | 800×600 | (studio.php) | http://www.tattoo-pigment.com/upload_slike/1072699969.3%20(1).JPG |
| img/hero-1400.webp, hero-2000.webp, hero-tall-720/1080.webp, og.jpg | izpeljano | (studio.php) | http://www.tattoo-pigment.com/upload_slike/1072699969.3%20(1).JPG — 800×600, povečano 4× z Real-ESRGAN (realesrgan-x4plus, lokalno), pomanjšano, dodan rahel šum; izrez za telefon |

## Samonaročanje (pravo, 20. 11. 2026)
- Worker `ak-booking-tattoo-pigment` (https://ak-booking-tattoo-pigment.alejkump.workers.dev), D1 `ak-booking-tattoo-pigment` (d3118275-…), Workers Free + D1 free, cron 03:23 UTC čiščenje. Koda: `booking-worker/` (klon fitnes-no-1).
- Vrsta: "Posvet / dogovor za tattoo"; polja ime, telefon, "Kaj želite" (obvezno, 3–500 znakov; slike se ne nalagajo).
- Termini: pon–pet 9.00–20.00 začetki (po Googlovem delovnem času), danes + 20 dni, kapaciteta 1, CORS samo https://alejkump.si, omejitev 10 poskusov/IP/uro, idempotenca z request id, brisanje ~2 dni po terminu. Besedilo: "Termin je potrjen, ko vas pokličemo."
- Admin: `/admin?key=…`, ključ je SAMO Worker secret ADMIN_KEY; povezava je zunaj repozitorija (scratchpad tattoo-admin-key.txt), ni v gitu.
- Lokalni test logike: scratchpad `tp/slot-test.mjs` (invarianta iz konstant, mutacijski test: brez preverjanja dneva v tednu → rdeče).

---

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
