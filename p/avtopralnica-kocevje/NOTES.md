# Avtopralnica Kočevje (samopostrežna), Ljubljanska cesta 63 — opombe k predogledu (interno, ni za objavo)

Strani 1–3 pripravil prejšnji agent 17. 11. 2026; 18. 11. 2026 dokončano: izbirnik `index.html`,
povezava "vsi trije predlogi" v nogah, dva popravka postavitve, `assets/og.jpg`, NOTES, preverjanje.
Klic: čet 19. 11. 2026, 040 223 995 (CSV: lastnik neznan — "vprašaj po lastniku").

## Posebnost (izvorna)

1. **Odprto 24 ur**, plačilo z žetoni, samopostrežni boksi (Google + FB).
2. **Aktivna pena v boksih 1 in 2, 1 žeton = 70 s**, pištola z rdečo cevjo — njihova FB objava 20. 3. 2025.
3. Obvestila o okvarah objavljajo samo na FB (Ready2Wash ne deluje, 14. 8. 2025) → prodajni argument:
   na spletni strani bi bilo obvestilo vidno vsem.

Spletne strani nimajo (CSV; Google profil ima "Dodaj spletno mesto"). Google profil **ni potrjen**
("Potrdi lastništvo za to podjetje") in je kategoriziran kot "Bencinska črpalka" — oboje ob klicu.

## Arhetipi

1. **Komandna plošča** — črna/signalno rumena/beton, Rubik + Source Sans 3; programi po vrsti s plošče.
2. **Odprto 24 ur** — nočno modra, Figtree + IBM Plex Mono; shema Ljubljanske ceste, številčnica 24 h.
3. **Vprašanja in odgovori** — nebesno modra/limeta, Instrument Serif + Nunito Sans; pogovor z viri.

## Izvorna dejstva

| Trditev | Vir |
|---|---|
| "Samopostrežna avtopralnica", Ljubljanska cesta 63, 1330 Kočevje, **4,2 (20 mnenj)**, »Mnenja niso preverjena«, **Odprto 24 ur**, 040 223 995, plus koda JVW3+PP; mnenji »Vse dela kot je treba.« (pred 4 meseci), »Hitro in dobro opran avto!« (pred 3 leti); mnenje iz 2018 o vonju notranjosti in črnilu za gume (zato tega NE navajamo kot ponudbo) | https://www.google.com/maps?cid=15361741995976762158 (Chrome, 18. 11. 2026 potrjeno: ime, ocena 4,2/20, naslov, 24 ur, telefon, plus koda, nepotrjen profil, mnenje "Vse dela…") |
| FB "Avtopralnica Kočevje": »Vedno odprto«; objava 20. 3. 2025 (aktivna pena, citat dobesedno, 1 žeton = 70 s, boksa 1 in 2, gumb na dnu plošče, rdeča cev); fotografija komandne plošče (programi Pranje, Voskanje, Aktivna pena, Pranje s krtačo, Izpiranje, Stop); objava 14. 8. 2025 o Ready2Wash (dobesedno); naslovna nočna fotografija 14. 12. 2022 in komentar »Najboljša avtopralnica…« | https://www.facebook.com/p/Avtopralnica-Ko%C4%8Devje-100057200629388/ — pregledal prejšnji agent 17. 11. 2026; 18. 11. ponovno **ni bilo mogoče** (razširitev nima dovoljenja za facebook.com) |

Kratki opisi programov v 1/ ("Visokotlačno pranje s pištolo" ipd.) so na strani izrecno označeni kot
splošni opisi, ne njihove navedbe.

## Kaj NI na strani in zakaj

- Cena žetona (ni javna) → "po telefonu / na avtomatu"; plačilo s kartico (ni potrjeno).
- Ime lastnika/upravljavca (ni javnega vira) — ob klicu vprašati.
- Fotografije pralnice (FB): **niso prenesene**; vse grafike so SVG ilustracije z oznako.
- Negativna mnenja (žetoni, pritisk) niso citirana; ocena 4,2 je navedena v celoti.

## Preverjanje (18. 11. 2026)

`check.py` (scratchpad; Playwright WebKit 390×844 iPhone + 1280×900, lokalni strežnik): izbirnik + 1/2/3
brez prelivanja, pisave `loaded`, nič konzolnih napak ali neuspelih zahtev, povezave in sidra obstajajo,
JSON-LD veljaven, noindex, brez "predlogov". Popravljeno po posnetkih: v 1/ je `footer` pravilo strani
dalo citatu v "Kako so to opisali sami" sivo ozadje in 44 px spodnjega odmika; v 3/ je bil gumb
"Odpri v Google Zemljevidih" v modrem mehurčku bel na belem (specifičnost `.msg.a .b a`).
`assets/og.jpg` = posnetek vrha 1/ (1200×630), ni fotografija.
