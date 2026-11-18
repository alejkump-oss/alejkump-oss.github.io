# QD, Nives Pevec Horvat s.p. ("QDivji transport"), Kočevje — opombe k predogledu (interno, ni za objavo)

Pripravljeno 17. 11. 2026 (prejšnji agent, raziskava in strani 1–3), dokončano 18. 11. 2026
(izbirnik, odstranjen domači naslov, popravki postavitve, NOTES, preverjanje). Klic: čet 19. 11. 2026.
Vhod: `AI-AGENCY-shift/agency/sales/leads/pindrop-kocevje-2026-11-16-klici.csv` (tel. 070 788 676).

## POPRAVEK BRIEFA: podjetje IMA spletno stran

CSV pravi "no website found" — ni res. **https://qdivji-transport.eu/** deluje (200, 18. 11. 2026),
Google profil jo navaja kot spletno mesto. Predogled je zato **predlog prenove**, ne prva stran.
Prodajni argumenti, ki jih vidi vsak obiskovalec njihove strani (preverjeno 18. 11. 2026):

- v glavi ostanek predloge teme: **"Open-Hours:10 am to 7pm"** in **info@themeansar.com** (e-pošta
  avtorja WordPress teme, ne njihova) — hkrati pa "Vedno odprto · 24/7 EXPRESS";
- gumb **"POKLIČI +386(0)70 788 677"** — številka se razlikuje od glavne 070 788 676 (zadnja števka);
- nobena telefonska številka ni klikljiva (`tel:` povezav na strani ni);
- obvestilo "QDivji v novi preobleki / Ponovno dosegljivi na spletu" — stran je bila nekaj časa nedosegljiva.

## Arhetipi (brez skupnega skeleta)

1. **Od vrat do vrat po EU** — nočna cesta (asfalt, signalno rumena), Anton + Space Grotesk; shema
   krajev s FB strani okoli baze Kočevje, tri trditve z virom, risba vozila, kontrolni seznam polj obrazca.
2. **Tovorni list** — kraft papir, rdeč žig »Cena: po dogovoru«, Oswald + Nunito Sans; štiri postavke
   storitev, vzorec obrazca (ne pošilja), tehnična risba, žig strank.
3. **Devet vprašanj prevozniku** — borovo zelena/jantarna, Instrument Serif + Inter; pogovor, kjer je
   vsak odgovor iz javnega vira ali »po telefonu«.

## Izvorna dejstva

| Trditev na strani | Vir |
|---|---|
| »Smo hitri in zanesljivi pri dostavi vašega blaga od vrat do vrat po celotni Evropski uniji.«; »Z zanesljivim in korektnim delom smo svoje storitve iz območja Slovenije razširili tudi na območje tujine.«; »S tovornimi vozili znamke Renault … Naš vozni park redno servisiramo.«; »Vedno odprto · 24/7 EXPRESS«; »EXPRESS transport po EU«; tel. 070 788 676 in 070 854 345; qudivji@gmail.com | https://qdivji-transport.eu/ (O nas; ponovno prebrano 18. 11. 2026) |
| Polja obrazca: naslov/datum prevzema, naslov/datum dostave, dimenzije v cm, teža v kg | https://qdivji-transport.eu/povprasevanje/ (200, 18. 11. 2026) |
| Google: »QDivji transport, Nives Pevec Horvat s.p.«, Prevozne storitve, **5,0 (4 mnenja)**, »Mnenja niso preverjena«, »Odprto 24 ur«, spletno mesto qdivji-transport.eu; mnenje T G pred 4 leti »Odlični, hitri in prilagodljivi. Zelo priporočam.« + odgovor »Hvala. Se trudimo…«; oznake »Točnost, Kakovost, Strokovnost, Vrednost« (pred 5 leti), »Pozitivno · Strokovnost« (pred 6 leti); zavihek fotografij »Tovornjak« | https://www.google.com/maps?cid=12748281592292237182 (Chrome, 18. 11. 2026) |
| FB: seznam krajev (Helsinki, Malmö, Bruselj, Budimpešta, Pariz, München, Gradec, Dublin, Ljubljana, London), »Kombi prevozi: 24/7 Express delivery in EU.«, »Vedno odprto«, 100 % priporoča pri 9 ocenah, 1,2 tisoč sledilcev | https://www.facebook.com/QDivjitransport/ — pregledal prejšnji agent 17. 11. 2026; 18. 11. ponovno **ni bilo mogoče** (Chrome razširitev nima dovoljenja za facebook.com, curl 400) |
| Matična 8041199000, DŠ SI21015554, vpis **1. 9. 2017**, TSmedia "Prevozništvo in transport" | https://www.bizi.si/QD-NIVES-PEVEC-HORVAT-S-P/ (18. 11. 2026) |
| SKD 49.410 Cestni tovorni prevoz | https://www.companywall.si/podjetje/qd-nives-pevec-horvat-sp/MM7IAsLY (200, 18. 11.) |

## Kaj NI na strani in zakaj

- **Brestova pot 2** (sedež s.p. in naslov na Googlu) je stanovanjska ulica → odstranjen iz vseh
  strani, JSON-LD (streetAddress, geo) in risbe; na strani je samo "Kočevje" in povezava na Google profil
  (zaradi mnenj). Zemljevidne povezave ob naslovu odstranjene.
- Cene (niso javne), število vozil, nosilnost, mere kesona, redne linije (seznam krajev ni vozni red).
- Fotografije: njihove (stran, Google) **niso prenesene**; vse slike so SVG risbe z oznako "Ilustracija/Risba".
- Prejšnja verzija je pisala "Malm" (pisava Anton nima glifa ö); 18. 11. popravljeno v "Malmö" (ö se izriše z nadomestno pisavo).

## Negotovosti

- CSV: bizi navaja 070854345, Google/FB 070 788 676 — obe sta na njihovi strani, obe na predogledu.
- Facebook podatki niso bili ponovno preverjeni 18. 11. (glej zgoraj).

## Preverjanje (18. 11. 2026)

`check.py` v scratchpadu (Python Playwright WebKit; 390×844 DPR2 touch iPhone UA in 1280×900; lokalni
http strežnik): izbirnik + 1/2/3 brez vodoravnega prelivanja, brez elementov čez rob, vse pisave `loaded`,
nič konzolnih napak, nič neuspelih zahtev, lokalne povezave in sidra obstajajo, JSON-LD se razčleni,
noindex, brez "predlogov", brez "Brestova". Popravljeno po pregledu posnetkov: v 1/ so se opisi v
"Kaj pripraviti za ponudbo" lomili po besedah (span v 44px stolpcu → `grid-column:2`); v risbi vozila
se je oznaka "ILUSTRACIJA" prekrivala z "ZADNJA VRATA".
`assets/og.jpg` = posnetek vrha 1/ (1200×630, Playwright WebKit), ni fotografija.
