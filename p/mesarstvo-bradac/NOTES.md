# Mesarstvo Bradač, Ljubljanska cesta 45, Kočevje: opombe k strani (interno, ni za objavo)

Pripravljeno 20. 11. 2026 (lastnik: "Marjan Bradač — za njih isto naredi pravo spletno stran"). Ena stran,
noindex: `p/mesarstvo-bradac/index.html`, sredstva v `assets/`, strežnik za naročila v `order-worker/`.
Nadomešča Pindrop predogled https://mesarstvo-brada-marjan-brada-s-p.pindrop.host/ (poteče 23. 11.). Od tam
NI uporabljeno nič: ne besedilo, ne fotografije (4 so bile simbolične, ena je spodnja Googlova).

## Izvorna dejstva (trditev → vir)

| Trditev na strani | Vir (ogledano 20. 11. 2026) |
|---|---|
| Ime "Mesarstvo Bradač Marjan Bradač s.p.", kategorija "Mesnica in delikatesa", Ljubljanska cesta 45, 1330 Kočevje, 041 441 356, plus code JVV3+HC, koordinate 45.6439067, 14.8535392 | Google Maps, place_id ChIJ101NV0HuZEcRfeusN8kJPOo (Chrome) |
| Delovni čas pon–pet 8–19, sob 7–13, ned zaprto | isti Google profil |
| 4,8 iz 42 mnenj; "Mnenja niso preverjena" | isti Google profil |
| Plačilo: debetne, kreditne kartice, mobilno NFC; parkirišče in vhod dostopna z invalidskim vozičkom | isti Google profil, zavihek Vizitka |
| Mnenja (dobesedno, z izvirnim zapisom): Ljuba Južnič »Vedno dobim dobro in kvalitetno meso. ...pa tudi prijazen nasmeh«; Tatjana »Odlična izbira, profesionalen odnos.«; Matej Marolt »Odlicno, okusno, kvalitetno meso!«; Gregor Pugelj »Najboljše meso!!«; Alex TzL »Odlično meso!«; Dušan Čihal »Kvaliteta,prijaznost.«; Anton Brunec »Odlične krvavice,pečenice,kožarce skratka vse je ukusno.« (vsa 5★) | isti Google profil, zavihek Mnenja |
| MARJAN BRADAČ S.P., MŠ 5548592000, ID za DDV SI56824211 (zavezanec), vpis 1. 6. 1994, dejavnost TSmedia "Meso in mesni izdelki" | https://www.bizi.si/MARJAN-BRADAC-S-P/ (vir AJPES, TSmedia) |
| "Sveže meso", "Mesni izdelki" | TSmedia dejavnost "Meso in mesni izdelki" (bizi.si) |
| "Delikatesa" | Googlova kategorija "Mesnica in delikatesa" |
| krvavice, pečenice (kartica Mesni izdelki) | samo kot "kupci omenjajo", iz mnenja Antona Brunca |
| E-pošta mesarstvobradac.kocevje@gmail.com | **lastnik agencije (od stranke), potrjeno 20. 11. 2026**. NI javno: Google, FB in iskanje Google je ne kažejo |

## Kaj NI na strani in zakaj

- **Cene, seznam izdelkov, dnevna ponudba**: nikjer objavljeni → "povemo po telefonu". Študija drobnice (drobnica.si, 2021) navaja "Mesarstvo Bradač Kočevje 11 €/kg" → zastarelo, ni uporabljeno.
- **Dostava**: edina omemba je šaljivo mnenje (ervirus, "kombi za dostavo") → ni dejstvo, ni uporabljeno.
- **FB stran** https://www.facebook.com/profile.php?id=100054596762583 : 13 sledilcev, 0 objav, 0 fotografij, telefon **+386 51 411 350** (drugačen od Googlovega). Na strani je samo 041 441 356; ob klicu vprašati, ali je 051 411 350 tudi njihov.
- **Odpoklic gov.si** (začinjeni piščanec, lot 327, rok 22. 7. 2024, proizvajalec Mesarstvo Bradač): javen, negativen, ni na strani. Pove le, da tudi sami izdelujejo izdelke.
- Proračunska sredstva (bizi.si/ERAR, 67.927 € v 2026, verjetno dobave javnim zavodom), prihodki 1,0 mio €: ni na strani; uporabno za klic (resno podjetje).
- Eno mnenje z 1★ (boštjan lukšič, pred 6 leti) ni citirano; ocena 4,8/42 je navedena v celoti.
- József Takács (Google kaže prevod) in mnenja z emojiji (Janez Novak, slavko špehar) niso citirana.

## Fotografije (`assets/img/`), samo njihove, brez stocka in AI

Na Googlu sta le 2 predmeta: Googlov Street View (ni njihov, ni uporabljen) in **ena fotografija**:
"Messrstvo Bradav", objavila **Andrijana Bradač**, januar 2016, 2988×5312, noč, sneg, praznične lučke
(URL lh3.googleusercontent.com/gps-cs-s/ANWiy9QCUfkf7i8qD8ZbV5Ac…). Priimek Bradač → zelo verjetno družina, a ni
lastniški račun. **Ob klicu vprašati, ali smemo uporabiti, in prositi za 6–10 svežih fotografij vitrine/izdelkov.**
Na strani je podpisana ("Foto: Andrijana Bradač, Googlov profil mesnice").

| Datoteka | Izvor / obdelava |
|---|---|
| mesnica-zima-600.webp, mesnica-zima-1400.webp | cela fotografija (uokvirjena v vrhu strani + povečava) |
| og.jpg | izrez 1200×630 za deljenje |

## Oblika

Lastnik 20. 11.: "ne da bodo spletne strani vse iste oblike". Zato NE vzorec Razgled (alejkump.si, Fitnes No 1,
Tattoo Pigment), ampak **plakat / tržnica**: kraft papir (CSS pike), rdeč trak z "odprto zdaj", žig-logotip,
deljen vrh s fotografijo v okvirju z lepilnim trakom, črn trak z dejstvi, tabla s kredo za ponudbo, naročilnica
z luknjičastim robom in žigom PREJETO, mnenja kot pripeti listki, oglata gumba s senco.
Pisave: Barlow Condensed 600/800 + Barlow 400/600 + Zilla Slab 500 italic (OFL, @fontsource prek jsDelivr,
licence v `assets/fonts/`).

## Naročilo za prevzem (pravo, ne SMS-maketa)

- **Strežnik**: Cloudflare Worker `ak-booking-mesarstvo-bradac` (https://ak-booking-mesarstvo-bradac.alejkump.workers.dev)
  + D1 `ak-booking-mesarstvo-bradac` (63e32eac-…), oboje brezplačni paket (0 €; ob preseženi kvoti zavrne, ne zaračuna).
  Koda: `order-worker/` (worker.js, schema.sql, wrangler.toml), vzorec iz p/fitnes-no-1/booking-worker.
  Objava: `cd p/mesarstvo-bradac/order-worker && npx wrangler deploy`.
- **Okna prevzema** (po objavljenem delovnem času): pon–pet 8–12, 12–15, 15–19; sob 7–10, 10–13; ned zaprto;
  14 dni naprej; današnje okno le, če se začne vsaj 2 uri od zdaj; **10 naročil na okno** (`CAPACITY`).
  Prazniki NISO upoštevani (nimamo vira) → ob zagonu dodati seznam zaprtih dni.
- **API**: `GET /windows` (vsi dnevi/okna z open/full, brez osebnih podatkov), `POST /order` (Origin mora biti
  https://alejkump.si; `req` = ključ idempotence; kapaciteta in vstavljanje v enem SQL-stavku), omejitev
  10 naročil/uro na IP (v bazi le HMAC). CORS samo https://alejkump.si.
- **Seznam za mesnico**: `/admin?key=…`, ključ je samo Worker secret `ADMIN_KEY`; lokalna kopija le v scratchpadu
  seje (`bradac-admin-key.txt`), ni v Gitu. Nov ključ: `npx wrangler secret put ADMIN_KEY`.
- **Hramba**: vrstica se izbriše 2 dni po koncu okna (cron 03.23 UTC + ob vsakem naročilu/odprtju seznama).
- **Besedilo stranki**: "Naročilo je potrjeno, ko vas pokličemo." Brez API-ja stran preklopi na SMS (sms:+38641441356).
- **Česar ni**: obvestilo mesnici ob novem naročilu (ni push kanala: gledajo seznam), SMS/e-pošta stranki. Delo ob zagonu.

## Preverjanje

Glej poročilo builderja 20. 11. 2026 (WebKit iPhone 13 390 px + 1280, test kapacitete, mutacijski test, E2E na živi strani).
