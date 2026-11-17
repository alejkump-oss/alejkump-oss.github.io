# Tekor d.o.o., Kočevje — opombe k predogledu (interno, ni za objavo)

Pripravljeno 17. 11. 2026. Vhodni podatki (orkestrator, Pindrop/Google Places + register,
16. 11. 2026): "TEKOR, družba za proizvodnjo oblazinjenega pohištva, d.o.o.", proizvodnja
oblazinjenega pohištva, Tomšičeva cesta 13, 1330 Kočevje, tel. 01 8955269, direktorja Dejan
Jerman in Mojca Jerman, spletne strani Pindrop ni našel.

Mapa: `p/tekor/` · izbirnik `index.html` · predlog 1 `1/` · pisave in og.jpg `1/assets/`.
Predlog 2 in 3 še nista zgrajena; izbirnik ju kaže kot "V pripravi" (HTML komentar pove,
kaj zamenjati, ko sta narejena).

## POPRAVEK/POJASNILO BRIEFA: domena tekor.si obstaja, javne strani NI

- `tekor.si` in `www.tekor.si` odgovarjata s **HTTP 403 Forbidden** (Apache, tudi ErrorDocument
  vrne 403) — preverjeno 17. 11. 2026 s prenosom in v Chromu (http in https). Wayback Machine
  nima posnetka (`web.archive.org/web/*/tekor.si` → "has not archived that URL").
- Domeno pa podjetje uporablja za e-pošto: **info@tekor.si** je na njihovi Facebook strani in v
  Googlovem izpisu FB zaposlitvene objave. Registrska e-pošta je tekordoo@siol.net (bizi, TIS).
- Google profil ima v polju "spletno mesto" povezavo na **moja-dejavnost.si** (plačljiv imenik),
  ne na lastno stran.
- Sklep: podjetje **nima delujoče spletne strani**; ima domeno, FB stran in imeniški profil.
  Nagovor: "domeno tekor.si že imate in jo uporabljate za e-pošto — stran na njej pa vrne napako
  403; predlagamo, da se tam končno prikaže katalog". To ni prenova, je prva stran na obstoječi domeni.

## Predlog 1 — arhetip: **katalog**

Izbran katalog, ker viri naštevajo konkretne vrste izdelkov (stoli po naročilu, lesene klopi,
oblazinjeno pohištvo, popravila/tapetniške storitve). Zgradba: folio + besedni znak "Tekor" z
italic podnaslovom (registrsko ime) + dvojna črta + kazalo 01–04 / Delavnica / Povpraševanje →
"Uvod v katalog" (H1 "Stol po vaši meri, iz delavnice v Kočevju.", risan stol z blagom, iglo in
sukancem, njihov dobesedni opis z moja-dejavnost.si z opombo, da je to njihova predstavitev) →
štirje vnosi 01–04 (vsak: risana sličica z oznako, polja Kaj / Po meri ali Kje jih uvrščajo ali
Obseg / Navedba stranke / "Cena in rok: po povpraševanju", vrstica Vir) → pas "Delavnica"
(besedilo iz registra, štiri številke: 1990, 10–19, 5,0, 6–14) → temen blok "Povprašajte"
(telefon, mobilna, e-pošta, naslov, Zemljevidi, FB, seznam a–d "kaj povedati", mailto s
predizpolnjenim predmetom/telesom — nič se ne pošlje samo) → noga z registrskim imenom,
razkritjem in povezavo na izbirnik.

Brez skupnega skeleta: ni eyebrow + H1 "X v Kraju.", ni pill gumba "Pokličite", ni lepljive
klicne vrstice, ni "Kako poteka" (seznam a–d je kontrolni seznam, ne koraki), ni FAQ. Ni
velika-tipografija. Naših cen paketov nikjer ni ("po povpraševanju" na strani je NJIHOVA cena).

Paleta (lastna): laneno platno `#efe8dc` / `#e4dbcb`, žametno bordo `#4a1a24` / `#5f2531` /
`#8a3a48`, oreh `#5c3c24`, medenina `#b9893c` / `#e2c07a`, sukanec `#c3b69f`, črnilo `#1c1917`.
Pisave v `1/assets/` (kopirano iz že objavljenih predogledov, brez prenosov): Playfair Display
variable 500–600 + italic 500, podnabor "sl" (iz `p/frizerstvo-eos/2/assets`, `OFL-PlayfairDisplay.txt`)
in Manrope variable 400–800, podnabor "sl" (iz `p/jana/assets/fonts`, `OFL-Manrope.txt`).
Pokritost č/š/ž/»/«/–/€ preverjena s fontTools (vse tri datoteke).

Test zamenjave imena: "od 16. 3. 1990", "Tomšičeva cesta 13", navedek "ugodne stole po
naročilu", mnenje o klopi za teraso po dimenzijah, FB "tapetnistvotekordoo", nemška ponudba
za Avstrijo/Nemčijo — ne gre na drugo tapetništvo.

## Izvorna dejstva (vsako z virom; vse pregledano 17. 11. 2026)

| Dejstvo | Vir |
|---|---|
| Polno ime **TEKOR družba za proizvodnjo oblazinjenega pohištva, d.o.o.**; Tomšičeva cesta 13, 1330 Kočevje; datum vpisa **16. 3. 1990**; MŠ 5326800000; DŠ SI74711008 (zavezanec); tel. 01 8955269; e-pošta tekordoo@siol.net; dejavnost TSmedia "Pohištvo in oprema"; 10 do 19 zaposlenih (iskalnik) | https://www.bizi.si/TEKOR-D-O-O/ in https://www.bizi.si/iskanje?q=TEKOR+Ko%C4%8Devje |
| SKD **31.000 Proizvodnja pohištva**; ustanovitev 16.03.1990; direktorja **JERMAN DEJAN in Jerman Mojca**; lastniki Rakovc Branko 41,03 %, Rakovc Silva 38,97 %, Jerman Dejan 20 %; zaposlenih 13,26 (2025); "Majhne enote"; aktivna, ni v blokadi; dodatne številke 041 812 880, 041 747 732, 01 8931071 | https://www.companywall.si/podjetje/tekor-doo/MMEXcwsY |
| PIRS: "TEKOR, d.o.o. – PROIZVODNJA POHIŠTVA", "Oblazinjenje pohištva", 10 do 19 zaposlenih, tel. 041 812 880, **pon–pet 06:00–14:00**, parkirišče, direktorja Dejan in Mojca Jerman, prokurist Branko Rakovc, posodobljeno 13. 11. 2025 | https://pirs.si/podjetje/tekor-kocevje |
| TIS: 01 895 52 69 in 041 747 732, "Pohištvo in oprema", odpiralni čas ni na voljo, **brez oznake prepovedi komercialnih klicev** v izpisu (preverjeno s prenosom, ne v Chromu — pred klicem še enkrat poglej v TIS) | https://itis.siol.net/tekor |
| Google Zemljevidi: "Tekor družba za proizvodnjo oblazinjenega pohištva, d.o.o.", kategorija **"Prodajalna prevlek in oblazinjenja"**, ocena **5,0 (3 mnenja, brez besedila; pred 4, 5 in 7 leti)**, "Mnenja niso preverjena", profil ni potrjen ("Potrdi lastništvo"), ni delovnega časa, ni fotografij, polje spletno mesto = moja-dejavnost.si, plus code JVR6+RC, 45.6420308, 14.8610756 | https://www.google.com/maps?cid=9341638919151344261 (dolgi URL: https://www.google.com/maps/place/Tekor+dru%C5%BEba+za+proizvodnjo+oblazinjenega+pohi%C5%A1tva,+d.o.o./@45.6420308,14.8610756,17z/data=!3m1!4b1!4m6!3m5!1s0x4764ee16c86c2a39:0x81a42b1a53fada85!8m2!3d45.6420308!4d14.8610756!16s%2Fg%2F1tj29t31) |
| **moja-dejavnost.si**: naslov "Ugodni stoli po naročilu Slovenija - Tekor d.o.o."; opis dobesedno: »Tekor d.o.o. smo podjetje, ki združuje dolgo tradicijo, bogato strokovno znanje in odlične reference za ugodne stole po naročilu. V Sloveniji zdelujemo najlepše pohištvo po meri, ki bo v vsak vaš prostor vneslo poseben čar.« (na strani popravljeno "zdelujemo" → "izdelujemo"); ključne besede "stoli po naročilu, Lesene klopi, oblazinjeno pohištvo, Lesene klopi po naročilu, izdelava stolov"; ponudba: Ugodni/Kvalitetni stoli po naročilu Slovenija, Kvalitetno oblazinjeno pohištvo Slovenija/Dolenjska, Lesene klopi po naročilu Dolenjska/Slovenija, **"Günstige Stühle zum Bestellen Slowenien, Österreich, Deutschland"**; urnik pon–pet 06:00–14:00, sob/ned/prazniki zaprto; 5/5 iz 2 mnenj: B. I. »Iz Tekorja so mi naredili lepo leseno klop za teraso, ker nikjer nisem našel take, ki bi jo želel, zato sem jo dal delat po mojih dimenzijah in so jo naredili točno po meri po vseh mojih željah.« in S. K. »Stoli so izdelani točno po naših željah in se odlično prilegajo prostoru. Zelo zadovoljni z razmerjem med ceno in kakovostjo 😊🪑« (emojija na strani izpuščena); 23 fotografij izdelkov; povezava na FB | https://www.moja-dejavnost.si/ugodni-stoli-po-narocilu-slovenija/tekor-doo/MM15RKYh |
| **Facebook** "Tekor doo" (naslov strani tapetnistvotekordoo): 226 sledilcev; opis dobesedno »Po želji naročnika ustvarimo in izdelamo oblazinjeno pohištvo sodobnega trenda.« in »Popravila pohištva in tapetniške storitve«; +386 41 812 880; info@tekor.si; "Tomsiceva cesta 13, Kocevje"; ocen 0; zadnja vidna objava 24. 12. 2025 (deljena); Googlov izpis kaže FB zaposlitveno objavo ("polni delovni čas ... info@tekor.si / mobi: 041 812 880") | https://www.facebook.com/tapetnistvotekordoo/ |
| MojaObčina.si imenik: samo registrski podatki | https://www.mojaobcina.si/kocevje/imenik/tekor-druzba-za-proizvodnjo-oblazinjenega-pohistva-doo.html |

Na strani: naslov, oba telefona (01 895 52 69 iz registra; 041 812 880 s FB), info@tekor.si (FB),
štiri vrste dela z njihovimi besedami, dve mnenji (inicialki, ne polni imeni), datum vpisa, SKD,
velikostni razred zaposlenih, direktorja (javni register), Google 5,0/3 + moja-dejavnost 5/5/2,
delovni čas iz dveh imenikov z opombo "preverite po telefonu", nemška ponudba kot dejstvo o
njihovem imeniškem vnosu.

## Posebnost (izvorna)

1. Vse po naročilu: obe stranki navajata izdelavo "točno po meri / po dimenzijah" — klop za
   teraso po merah naročnika (moja-dejavnost).
2. Od 1990, 10–19 zaposlenih, d.o.o. — to ni enoosebna delavnica; register in PIRS.
3. Ponudbo stolov v imeniku navajajo tudi v nemščini za Avstrijo in Nemčijo (njihov vnos).

## Kaj NI na strani in zakaj

- Lastniška struktura (Rakovc 41,03 % / 38,97 %), prihodki (companywall ~954 tisoč €),
  bonitete, bančni račun (TIS): finančni/zasebni podatki → ne.
- Prokurist Branko Rakovc (PIRS): ni na strani; na strani sta samo direktorja iz briefa/registra.
- Tretja in četrta telefonska številka (041 747 732, 01 8931071): nista na strani — ni jasno,
  čigavi sta; prva je v TIS, druga samo v companywall.
- Fotografije (23 na moja-dejavnost, FB): last podjetja, **nismo jih prenesli**. Vse grafike so
  lastne SVG ilustracije z oznako. `1/assets/og.jpg` je posnetek vrha strani (Playwright WebKit,
  lokalno), ni fotografija.
- Izvoz, stranke, certifikati, leta izkušenj kot številka, "tradicija" kot naša trditev: nič
  izvornega → nič (navedek "dolgo tradicijo" je označen kot njihova predstavitev).
- Delovni čas ni v JSON-LD (ni potrjen pri lastniku); na strani je z opombo.
- Cene: njihove niso javne → "po povpraševanju"; naših paketnih cen ni nikjer.

## Negotovosti (za orkestratorja / klicatelja)

- **Spletna stran**: domena tekor.si je njihova (e-pošta), a vrne 403; javne strani ni. Možno,
  da je nekoč bila (ni arhiva) ali je v gradnji. Pred klicem še enkrat odpri https://tekor.si.
- **Samo B2B?** Nič ne kaže na izključno B2B: obe javni mnenji sta zasebni stranki (klop za
  teraso, stoli za prostor), FB opis "po želji naročnika". Nemška ponudba v imeniku nakazuje
  tudi tuje kupce, a ni vira o dejanskem izvozu.
- E-pošta: FB in zaposlitvena objava uporabljata info@tekor.si; register tekordoo@siol.net
  (siol.net blokira našo Gmail pošto — za Harveyja uporabi info@tekor.si).
- TIS oznaka: v prenesenem izpisu ni oznake prepovedi klicev, a stran ni bila odprta v Chromu
  (rdeča oznaka je grafična) → pred klicem preveri v brskalniku.
- Google profil ni potrjen, brez fotografij; 3 ocene brez besedila. moja-dejavnost profil je
  plačljiv imenik, torej podjetje za spletno prisotnost že plačuje — prodajni argument.
- Iskanje: Google (Chrome, lasten zavihek, zaprt), bizi, companywall, PIRS, TIS, moja-dejavnost,
  FB, Wayback, mojaobcina. WebSearch orodje je bilo izčrpano (proračun seje), zato Bing/DDG
  nista bila uporabljena. Prepovedane domene (trgovina-jana.si, jjana.si, masazni-bazen.si,
  jjspa.eu, jjana.hr) niso bile klicane. Instagram profil ni bil iskan posebej (ni v virih).

## Preverjanje (17. 11. 2026)

`check-tekor-v1.py` v scratchpadu (Python Playwright, WebKit; 390×844 DPR 2 touch in 1280×900;
lokalni http strežnik, ker file:// blokira preload pisav): izbirnik in 1/ brez vodoravnega
prelivanja (scrollWidth = clientWidth, noben element čez rob razen skritega skip linka),
3/3 @font-face `loaded`, `document.fonts.check` za č/š uspešen, nič konzolnih napak/opozoril,
nič neuspelih zahtev ali odgovorov ≥ 400. html.parser: oznake uravnotežene, brez podvojenih id,
sidra in lokalne povezave/`url()` obstajajo (razen 2/ in 3/, ki sta v pripravi), JSON-LD se
razčleni, noindex na obeh straneh, brez "predlogov". Celostranski posnetki pregledani;
popravljeno: črtkan levi rob kartic "V pripravi" v izbirniku, predolga byline vrstica na
mobilnem, opomba o delovnem času (prej je trdila, da ni objavljen, stran pa ga navaja iz imenikov),
izgubljen bočni odmik `.wrap` v pasovih Delavnica in Povpraševanje (`.in{padding:… 0}` je
prepisal `--g`; ista napaka kot pri Jazbcu — besedilo in kartice so bili na robu zaslona).

## Datoteke

- `index.html` — izbirnik (noindex), predlog 1 povezan, 2 in 3 "V pripravi"
- `1/index.html` — predlog 1 (katalog)
- `1/assets/playfair-display-sl-wght500-600.woff2`, `playfair-display-italic-sl-500.woff2`,
  `OFL-PlayfairDisplay.txt`, `manrope-sl-wght400-800.woff2`, `OFL-Manrope.txt`, `og.jpg`

## Predlog 2 — arhetip: **prej-potem** (dodano 17. 11. 2026)

Vezan na njihov FB opis »Popravila pohištva in tapetniške storitve.«. Zgradba: temna vrstica z
besednim znakom TEKOR → H1 »Star stol, novo oblazinjenje.« + FB navedek → primerjava prej/potem
(dve risani SVG plasti istega stola, drsnik `input[type=range]`, brez JS ostane na 50 %), oznaka
»Primer, ne njihov izdelek« → »Kaj kaže slika« (blago, sedišče, ogrodje; pri ogrodju izrecno
»ali se da popraviti tudi les, povedo ob ogledu kosa«, ker obseg storitev ni javen) → »Po naročilu,
po vaših merah« (tri viseče etikete: stoli, lesene klopi, oblazinjeno pohištvo, vsaka z virom) in
obe mnenji → pas s štirimi številkami iz registra/imenikov → »Delovni nalog« (obrazec, ki samo
sestavi mailto na info@tekor.si; nič se ne pošlje samo) + telefonski številki, naslov, ure.
Paleta: kreda `#eef0ec`, denim `#1d2b45`, oranžen šiv `#e0582a`, zbledela bež `#b7ab95`
(prej), petrolej `#1f6b5e` (potem). Pisave v `2/assets/` (kopirano, brez prenosov): Anton
`anton-sl.woff2` (iz `p/tattoo-pigment/2/assets`, `OFL-Anton.txt`) in Space Grotesk 400/500
latin + latin-ext (iz `p/tattoo-pigment/assets`, `OFL-SpaceGrotesk.txt`).

## Predlog 3 — arhetip: **revija** (dodano 17. 11. 2026)

Naslovnica v borovo zeleni: »Delavnica od leta 1990«, risana tapetniška delavnica (oznaka
»Ilustracija«), štiri naslovne vrstice → članek »Po meri, ne s police« (dvostolpčno na namizju,
inicialka; samo registrska dejstva, njihov FB opis, izvleček njihove predstavitve z
moja-dejavnost.si kot navedek z opombo »njihove besede, ne naša ocena«, nemški vnos kot dejstvo o
imeniku z izrecnim »o dobavah javni viri ne povedo ničesar«) → stranski stolpec »Glas strank« (obe
mnenji + Google 5,0/3 nepreverjeno) in »Na kratko« (registrski podatki z viri) → »Rubrike« (štiri
vrste dela z viri) → »Impresum delavnice« (telefona, e-pošta, naslov, ure z »preverite po
telefonu«). Paleta: papir `#f6f5ef`, borovo zelena `#24453a`, rja `#b4532a`, črnilo `#151515`.
Pisave v `3/assets/`: Instrument Serif 400 + italic latin/latin-ext (iz `p/annu-center/assets`,
`OFL-instrument-serif.txt`) in Inter Tight variable latin/latin-ext (iz `p/dobra-stran/3/assets`,
`OFL-inter.txt`).

Oba: noindex/nofollow, OG (`assets/og.jpg` = posnetek vrha strani 1200×630, Playwright WebKit,
ni fotografija), JSON-LD z istimi izvornimi polji kot predlog 1, noga z registrskim imenom,
razkritjem in »predogled prve strani za domeno tekor.si, ki jo podjetje že uporablja za e-pošto«.
Brez cen (njihove »po povpraševanju«), lastniških deležev, prihodkov, prokurista, strank,
certifikatov, izvoza. Izbirnik: kartici 2 in 3 povezani, značke »V pripravi« in pomožni komentarji
odstranjeni.

Preverjanje: `check-tekor-v23.py` (scratchpad; isti postopek kot za predlog 1): izbirnik, 2/ in 3/
brez vodoravnega prelivanja pri 390×844 in 1280×900, vse @font-face `loaded`, nič konzolnih napak,
nič neuspelih zahtev, oznake uravnotežene, lokalne povezave/`url()` obstajajo, JSON-LD se razčleni.
Popravljeno po pregledu posnetkov: v 2/ je na namizju razdelek »Delovni nalog« postavil kontakte
v novo vrstico (pravilo je ciljalo `h2` namesto ovojnega `div`); v 3/ je drobna vrstica pod
telefonsko številko podedovala serif in se prekrivala s podčrtajem.
