# Kava bar Peron, Kolodvorska cesta 16, Kočevje — opombe k predogledu (interno, ni za objavo)

Strani 1–3 pripravil prejšnji agent 17. 11. 2026; 18. 11. 2026 dokončano: izbirnik `index.html`,
odstranjen sedež s.p. in omemba stavbe "Trgovina Jana", popravki postavitve, `*/assets/og.jpg`,
NOTES, preverjanje. Klic: čet 19. 11. 2026, 041 618 281 (CSV: lastnik "vprašaj po lastniku";
register: Nina Janežič s.p. — ob klicu vprašati po njej, ne predpostavljati).

## Posebnost (izvorna)

1. **»Naročite si kavo, medtem ko sedite v pravem vagonu«** — njihova FB predstavitev
   (»Lokal z zgodbo, ki jo je pisala železniška proga. …«).
2. Odprto **od 6.00** med tednom (vikend 7.00), do 22.30 / 23.30 (Google).
3. **4,6 iz 174 mnenj** na Googlu; profil ni potrjen, spletno mesto na Googlu = facebook.com.

## Arhetipi

1. **Kava ob progi** — dan kot proga s postajami, vozni red ur; nočno modra/krem, Oswald + Source Sans 3.
2. **Tabla na peronu** — postajna prikazovalna tabla (ponudba, ure, obisk); črna/jantarna, Anton + IBM Plex Mono.
3. **Pogovor ob kavi** — vprašanja gostov, odgovori z virom; espresso/latte, Lora + Nunito Sans.

## Izvorna dejstva

| Trditev | Vir |
|---|---|
| "Kava bar peron", Bar, **4,6 (174)**, »Mnenja niso preverjena«, 1–10 € na osebo (sporočilo 16 oseb), Kolodvorska cesta 16, 1330 Kočevje, 041 618 281, spletno mesto facebook.com, nepotrjen profil; mnenja Milovan B. »Vrhunska usluga, prijaznost, lepo postreženo« (pred 2 mesecema), Erik H. »Odlična kava, postrežena z nasmehom in prijazno besedo.« (pred 5 meseci), Lokvanj »Po kavico za sabo in na sprehod do jezera. … Moznost rastlinskega mleka« (pred 3 leti) | https://www.google.com/maps?cid=3309788609062499036 (Chrome, 18. 11. 2026 potrjeno) |
| Delovni čas pon–čet 6.00–22.30, pet 6.00–23.30, sob 7.00–23.30, ned 7.00–22.00; Vizitka (za s seboj, ni dostave, mize na prostem, brezplačno parkirišče, primerno za otroke, dostop z vozičkom, rezervacije, debetne kartice, pivo/vino/koktajli/žgane pijače, poudarki "odlična ponudba piva", "odlični koktajli", "šport"); mnenje Ales P. | isti Google profil — pregledal prejšnji agent 17. 11. 2026 (18. 11. potrjen le "Zapre se ob 22:30" v sredo) |
| FB predstavitev (citat), 1,3 tisoč sledilcev | https://www.facebook.com/kavabarperon — prejšnji agent 17. 11.; 18. 11. ponovno **ni bilo mogoče** (ni dovoljenja za facebook.com) |
| NINA JANEŽIČ S.P., matična 8934975000, DŠ 19822421, vpis **24. 8. 2021** | https://www.bizi.si/NINA-JANEZIC-S-P_KOCEVJE/ (18. 11. 2026) in iskanje https://www.bizi.si/iskanje?q=Peron+Ko%C4%8Devje |
| TIS: "KAVA BAR PERON NINA JANEŽIČ S.P.", Kolodvorska cesta 16 (poslovna enota); **brez oznake prepovedi klicev** (v HTML je "Prepoved klicev" le povezava v nogi spletišča) | https://itis.siol.net/kava-bar-peron-nina-janezic_kocevje_kolodvorska-cesta_bar?7742388 (18. 11. 2026) |

"Pri železniški postaji": naslov je Kolodvorska cesta in lokal se sam opisuje z železniško progo/vagonom.

## Kaj NI na strani in zakaj

- **Sedež s.p. Trg zbora odposlancev 73** — verjetno stanovanjski naslov nosilke → odstranjen iz nog vseh treh strani.
- **"Nahaja se v: Trgovina Jana – Kočevje"** (Google) → odstranjeno: za lokal nepomembno, Jana je ločen odnos agencije.
- Cene posameznih pijač (ni vira), meni, dogodki, prenosi tekem s termini.
- Fotografije lokala/vagona: **niso prenesene**; vse grafike so SVG ilustracije z oznako.

## Preverjanje (18. 11. 2026)

`check.py` (scratchpad; Playwright WebKit 390×844 iPhone + 1280×900): izbirnik + 1/2/3 brez prelivanja,
pisave `loaded`, nič konzolnih napak/neuspelih zahtev, povezave in sidra obstajajo, JSON-LD veljaven,
noindex, brez "predlogov", brez "Trgovina Jana"/"odposlancev". Popravljeno po posnetkih: v 3/ je bil
`<ul>` urnika znotraj `<p>` (neveljaven HTML → seznam je padel iz mehurčka z oznakami); v 2/ so se
vrstice velikega citata dotikale (line-height 1.02 → 1.14). `N/assets/og.jpg` = posnetek vrha strani
(1200×630), ni fotografija.
