# Annu center, Kočevje — opombe k predogledu

Pripravljeno 16. 11. 2026. Poslovni podatki iz Google Places (prek Pindropa):
"Annu center", studio za jogo, Reška cesta 15, 1330 Kočevje, tel. 040 832 121.
Spletne strani ni. Lastnik iz registrov ni razviden (bizi.si in companywall.si
ne najdeta subjekta z "annu" v Kočevju — verjetno posluje pod drugim imenom).

## Preverjena dejstva (vir ob vsakem)

1. **Kategorija "Studio za jogo"; uvodni stavek centra:** „Joga gradi
   samozavest in samospoštovanje. Otroška joga je redka priložnost, da otrok
   lahko počne nekaj, brez da bi se bal, da bo naredil narobe.“
   Vir: https://www.facebook.com/center.annu/ (predstavitev strani, 448
   sledilcev, 3 mnenja). Na isti strani javno: naslov Reška cesta 15, telefon
   +386 40 832 121, e-pošta center.annu@gmail.com.
2. **Javno priporočilo na FB strani** (pred ~7 leti, Natasa Petavs Pot Joge):
   „Aleksandra, ustanoviteljica Annu centra, je izjemna. Topla, srčna,
   sončna.“ Vir: https://www.facebook.com/center.annu/about — navedeno
   dobesedno in samo v obsegu, ki je viden brez klika "Prikaži več".
3. **V centru gostujejo predavanja in delavnice zunanjih organizatorjev:**
   - „Terapevtska joga IN Meditacija popolnega razcveta v Avalonu“, 7. 9. 2019,
     „Kje: Annu center (v primeru lepega vremena bo dogodek potekal v naravi),
     Reška cesta 15, Kočevje“, organizator Tempelj Harmonije.
     Vir: https://www.svetloba.si/dogodki/terapevtska-joga-zvocna-kopel-in-meditacija-v-kocevju-9
   - „Vzgoja motiviranih, odgovornih in zdravih otrok, Andrej Pešec“, 28. 9.
     2020, Annu Center, Reška cesta 15. Vir:
     https://www.svetloba.si/dogodki/vzgoja-motiviranih-odgovornih-in-zdravih-otrok-andrej-pesec
   - „Ženske so z lune, moški so z marsa“, 30. 1. 2020, Annu center Kočevje,
     Reška cesta 15. Vir:
     https://www.mojaobcina.si/kocevje/dogodki/zenske-so-z-lune-moski-so-z-marsa-6.html
4. Badgie imenik: „Annu center“, kategorija „Yoga & Pilates“, Kočevje (brez
   drugih podatkov). Vir: https://www.badgie.com/directory/si/kocevje

Sorodno, NI uporabljeno na strani: FB stran „Joga Kočevsko“
(https://www.facebook.com/jogakocevsko/) navaja 4 certificirane učiteljice joge
na Kočevskem, med njimi „Aleksandra Marentič“. Povezava z Annu centrom je
sklep iz dveh virov, ne izjava centra — zato priimka na strani ni.

## Česa NISMO navedli (ni preverjeno)

- Urnik, cene, vrste joge razen „joga“ in „otroška joga“ (Googlov AI pregled
  omenja pilates, radja jogo in terapevtsko jogo — ni primarni vir, zato ne).
- Leto ustanovitve, število učiteljev, imena učiteljev.
- Zadnja vidna objava na FB strani centra je z 2. 1. 2021; Google Places jo
  16. 11. 2026 še vodi kot aktivno. Ali center redno deluje, naj preveri
  klicatelj pred pošiljanjem predogleda.

## Predlog 1 (`1/index.html`)

- **Arhetip: velika-tipografija** — ena misel na en zaslon, besede centra o
  jogi kot glavno gradivo. Brez skupnega skeleta (ni H1 "X v Kraju.", ni
  pill gumba, ni lepljive klicne vrstice, ni "Kako poteka", ni FAQ).
- Paleta: mahovno zelena `#1d3327`, topel papir `#f2ebdc`, glina `#c2714a`.
- Pisave, gostovane lokalno v `assets/`: Instrument Serif 400 (normal +
  italic, latin + latin-ext; OFL, `assets/OFL-instrument-serif.txt`) in
  Figtree 400/600 (latin + latin-ext; OFL 1.1, enak izvor kot v
  `p/slascicarna-medo/`). Kopirano iz že objavljenih predogledov v tem repu.
- **Slike: nobene.** Fotografij centra, ki bi bile nedvoumno njihove, nismo
  našli; namesto simboličnih fotografij je stran tipografska, z okrasnim SVG
  "dihanjem" (ustavi se pri `prefers-reduced-motion`). Favicon je SVG.
- JSON-LD `SportsActivityLocation` samo s preverjenimi polji (ime, naslov,
  telefon, e-pošta, FB). Brez urnika.
- Vse povezave na zunanje vire so javne (FB stran, Google Maps navodila).

## Izbirnik (`index.html`)

Vzorec kot `p/poravnava/index.html`. Predloga 2 in 3 sta povezana, a še ne
obstajata ("V pripravi") — besedilo kartic 2 in 3 naj posodobi tisti, ki ju
zgradi. Telefon na izbirniku je AK agencije (070 479 188), ne centra.

## Validacija

Skript: `scratchpad/check-annu.mjs` (Playwright 1.65 iz npx predpomnilnika,
WebKit 2370, iPhone 12, 390 px, strežba prek lokalnega http). Rezultat je v
končnem poročilu; ponovljivo z `node check-annu.mjs ./shots`.

## Predlog 2 (`2/index.html`)

- **Arhetip: revija** — mirna revijska stran: glava kot naslovnica revije
  („Annu.“, dvojna črta, „V tej številki“), glavni članek „Otrok, ki se ne
  boji narediti narobe“ zgrajen okoli obeh dobesednih navedkov centra
  (vir 1), ozek stolpec „Iz arhiva · V centru so gostili“ s tremi preteklimi
  dogodki z datumi in povezavami na vire (vir 3), „Glas obiskovalke“ (vir 2)
  in temen kolofon s stikom. Na namizju (≥1100 px) besedilo v dveh stolpcih.
- Paleta: sliva `#3a2436`, žafran `#c8891f` / `#e9b44c`, kremni papir
  `#fbf8f3`, rožnata podlaga `#f1ded8`.
- Pisave v `2/assets/`: Lora 500 (normal + italic, latin + latin-ext;
  kopirano iz `p/salon-dotik/assets/`) in Source Sans 3 400/700 (latin +
  latin-ext; kopirano iz `p/servis-caserman/assets/`). Obe OFL 1.1.
- Slike: ena inline SVG risba (otrok v drži drevesa pod soncem), označena
  „Ilustracija · Narisano za predogled; ni fotografija centra“.

## Predlog 3 (`3/index.html`)

- **Arhetip: zemljevid-pot** — naslov kot ulična tabla (H1 „Reška cesta
  15“), shematski zemljevid (inline SVG, označen „Ilustracija“, „ni v merilu
  in ne kaže prave okolice“), nato pot v štirih korakih (pokličite ker urnik
  ni objavljen → naslov za navigacijo z gumbom „Kopiraj naslov“ → Google
  Zemljevidi: navodila `maps/dir/?api=1&destination=…` in iskanje naslova
  `maps/search/?api=1&query=…` → na cilju), „Kaj je na tem naslovu“ (oba
  navedka + pretekli dogodki), temna sekcija Stik (telefon, e-pošta, naslov,
  FB). JSON-LD ima dodatno samo `hasMap` (iskalna povezava naslova).
- Paleta: mornarsko modra `#13233a`, signalno rdeča poti `#e0482e`, rumena
  `#f2c14e`, zemljevidno siva `#e8edf1`.
- Pisave v `3/assets/`: Red Hat Display 700 + Red Hat Text 400/600 (latin +
  latin-ext; kopirano iz `p/mizarstvohribernik/assets/`) in IBM Plex Mono 400
  (latin + latin-ext; iz `p/ak-refero/fonts/`, z `OFL-ibm-plex-mono.txt`).
  Vse OFL 1.1.
- Nobenih navodil o okolici, parkiranju ali vhodu (niso preverjena); korak 4
  pove, da bi jih dodali, ko jih center pošlje.

## Validacija predlogov 2 in 3

Skript `scratchpad/check-annu23.mjs` (WebKit 2370; iPhone 12 390×844 in
namizje 1280×900; lokalni http): brez vodoravnega prelivanja, brez napak v
konzoli ali neuspelih zahtev, vse pisave naložene; ravnovesje oznak in lokalne
povezave preverjeni s Pythonovim html.parser. Ponovljivo z
`node check-annu23.mjs ./annu23`.
