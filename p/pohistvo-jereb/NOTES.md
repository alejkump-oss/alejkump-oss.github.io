# Pohištvo Jereb: spletna stran (stranka, plačan projekt)

- **Stranka:** Pohištvo Jereb, Matej Jereb s.p., izdelava pohištva, Trata 12, 4220 Škofja Loka. Tel. 040 415 792, info@pohistvojereb.si.
  Sedanja stran: https://pohistvojereb.si/ (WordPress/Divi, noga »Avtorske pravice © 2021«).
- **Naročilo lastnika, 18. 11. 2026:** »Prejšnja spletna stran mu je bila všeč, sedaj jo izboljšaj, da bodo vse njegove slike gor in samo njegove. Pa jo dokončaj, da bo prava spletna stran.«
  Dodatno istega dne: fotografija `LiparDesignPhotography-03764` (hrastov predalnik z ukrivljenim vogalom) mora biti na vidnem mestu, skupaj z vsemi 12 fotografijami iz iste galerije.
  Lastnikova odločitev: **brez navedbe fotografa na strani** (ne v nogi ne v opisih; imen datotek ne prikazujemo).
- **Izhodišče:** enostranski predogled »revija« (9. 11.) na tem mestu. Ohranjen je isti videz: papir, črnilo, en rdeč poudarek (#a3241b), pisava Newsreader, glava »Pohištvo Jereb«, naslovnica »Masivni les.«.

## Zgradba

| Stran | Pot | Vsebina |
|---|---|---|
| Domov | `index.html` | naslovnica, Zakaj izbrati nas, izpostavljeni detajl (03764 + njegova galerija), program, kako delamo, številke, kuhinje, izbor fotografij |
| Kuhinje | `kuhinje/` | besedilo s `kuhinje-po-meri` in domače strani, galerija `kuhinje-galerija`, blok »Kuhinja Bella« s strani `project/kuhinja-bella` |
| Kopalnice | `kopalnice/` | `kopalnice-po-meri` (vključno s »Štirje koraki«), galerija `kopalnice-galerija` |
| Otroške sobe | `otroske-sobe/` | `otroske-sobe-po-meri` (vključno z »Mladinske sobe«), galerija `otroske-sobe-galerija` |
| Notranja vrata | `vrata/` | `notranja-vrata-po-meri` (vključno s »Tehnologija skritih tečajev«), galerija `notranja-vrata-galerija` |
| Predsobe | `predsobe/` | `predsobe-po-meri`, galerija `predsobe-galerija` |
| Dnevne sobe | `dnevne-sobe/` | `dnevne-sobe-po-meri`, galerija `dnevne-sobe-galerija` |
| Spalnice | `spalnice/` | `spalnice`, galerija `spalnice-galerija` |
| Detajli | `detajli/` | `detajli-galerija` (na njegovi strani obstaja kot galerija, v meniju je ni) |
| Kako delamo | `kako-delamo/` | štirje koraki iz domače strani |
| O nas | `o-nas/` | samo dejstva z njegove strani, njegove številke kot njegove |
| Kontakt | `kontakt/` | naslov, `tel:`, `mailto:` s pripravljeno zadevo in vzorcem besedila, povezava na Google Zemljevid; brez obrazca |

Skupno: `assets/site.css`, `assets/site.js` (meni, galerija, »pokaži še«), `assets/fonts/` (Newsreader, lastno gostovanje), `assets/img/`.
Vse povezave so relativne (`../kuhinje/`), zato se stran brez sprememb preseli na lastno domeno.

Števila fotografij na straneh (»176 fotografij« ipd.) izračuna gradnik iz seznama fotografij; v besedilo niso prepisana na roko.

## Ob prehodu na pohistvojereb.si (obvezno)

1. **Odstrani `<meta name="robots" content="noindex,nofollow">` in `googlebot` z vseh 12 strani.** Trenutno sta na vseh straneh, ker stran še teče na alejkump.si.
2. `og:url` in `og:image` kažeta na `https://alejkump.si/p/pohistvo-jereb/…`: zamenjaj z `https://pohistvojereb.si/…`.
3. Dodaj `<link rel="canonical">` na vsako stran in v JSON-LD `image`/`logo` z absolutnim naslovom na njegovi domeni.
4. Dodaj `sitemap.xml` in `robots.txt` v koren njegove domene; postavi preusmeritve 301 s starih WordPress poti (`/kuhinje-po-meri/` → `/kuhinje/`, `/kopalnice-po-meri/` → `/kopalnice/`, `/otroske-sobe-po-meri/` → `/otroske-sobe/`, `/notranja-vrata-po-meri/` → `/vrata/`, `/predsobe-po-meri/` → `/predsobe/`, `/dnevne-sobe-po-meri/` → `/dnevne-sobe/`, `/spalnice/` ostane, `/kontakt/` ostane, `/*-galerija/` → ustrezna stran).
5. Ponovno zaženi preverjanje (WebKit iPhone + namizje) na novi domeni.

## Viri trditev (vse s pohistvojereb.si, prenos 18. 11. 2026)

| Trditev na strani | Vir | Izvirno besedilo |
|---|---|---|
| »Izdelava pohištva po meri za najbolj zahtevne.« | domov | enako |
| »Oblikujemo prostor, ki vam je pisan na kožo.« | domov | »Oblikujemo prostor vam pisan na kožo.« (popravljena slovnica) |
| Zakaj izbrati nas: vsak dom je edinstven, vodimo vas skozi postopek, več površin za odlaganje, shranjevanje in udobje | domov | isti odstavek, zgoščen |
| Posvet s strokovnjakom: ekipa z znanjem in izkušnjami v mizarski industriji, izbira oblik, materialov, barv | domov | »Naša strokovna ekipa, s širokim naborom znanja in izkušenj v mizarski industriji …« |
| Masivni les, »organski, naravni materiali, prijetni na dotik« | domov, »Vrhunski materiali« | »… zato pohištvo izdelujemo iz masivnega lesa« |
| Kakovost »ne glede na velikost ali obseg projekta« | domov | enako |
| 3D izris po začetnem posvetu | domov | »Po opravljenem začetnem posvetu se ekipa loti natačnega oblikovanja … pripravimo 3D izris.« |
| Po meri prostora; značaj in globina; »brezhibno vključi v vaš prostor in izboljša vaše vsakdanje življenje« | domov, »Po meri prostora« in »Izdelava pohištva« | enako, zgoščeno |
| **+10 strokovnjakov, +300 projektov, +1000 unikatnih kosov, +1300 3D izrisov** | domov, števci | »+ 10 strokovnjakov / + 300 projektov / + 1000 unikatnih kosov / + 1300 3d izrisov«. To so številke stranke, prikazane z opombo »Številke, kot jih navaja Pohištvo Jereb«; mi jih nismo preverili. |
| Sanjska kuhinja: vizija, znanje, izdelava; trend ali tradicija; slog in shranjevanje | domov | enako; »V najkrajšem času« je omiljeno v »Kmalu« |
| Kuhinje: Vizija / Kakovost / Izbira, »omarica enako elegantna kot funkcionalna« | kuhinje-po-meri | enako |
| »Posvečamo posebno pozornost majhnim detajlom … mojstrovino, ki ni le lepa, ampak tudi funkcionalna.« | kopalnice-po-meri (blok »Kuhinje po meri«) | »V podjetju Pohištvo Jereb posvečamo posebno pozornost majhnim detajlom …« |
| Kopalnice: »ravno prav velika za shranjevanje in ravno prav majhna«; Slog življenja / Shranjevanje / Vsestranskost; Štirje koraki | kopalnice-po-meri | enako, slovnično popravljeno |
| Otroške sobe: »V naši delavnici ustvarjamo …«, igra in razvoj, funkcionalnost, kakovost, ki traja; Mladinske sobe | otroske-sobe-po-meri | enako, slovnično popravljeno |
| Vrata: masivni les, moderna arhitektura, vgradna montaža; nevidni podboji, skriti tečaji, drsna vodila; sistem Tectus (3D nastavitev, 180°, do 300 kg); magnetne ključavnice | notranja-vrata-po-meri | enako. Tehnični podatki o sistemu Tectus so njegovi, mi jih nismo preverili. |
| Predsobe: uporabne in estetske, prvi vtis, uporabnost; »Lesene predsobe in hodniki po meri pisane prostoru na kožo« | predsobe-po-meri, notranja-vrata-po-meri | enako |
| Dnevne sobe, spalnice: Vizija / Kakovost / Izbira | dnevne-sobe-po-meri, spalnice | enako |
| »Kuhinja Bella – Bela v kombinaciji z lesom« | project/kuhinja-bella | enako |
| »Galerija detajlov«, »Navdih« | detajli-galerija | enako |
| »Začnimo projekt danes«, »Le en korak do pohištva po meri«, »Stopimo v stik«, »Kako vam lahko pomagamo?«, »Rezervirajte termin za posvet«, »Posvetujte se z nami« | noga, kontakt, gumbi | enako |
| Naslov, telefon, e-pošta, »Matej Jereb s.p., izdelava pohištva« | noga, kontakt | enako |

Novo besedilo, ki ni trditev: oznake razdelkov (Program, Izpostavljeno, Galerija, V številkah, Korak 1–4), naslov izpostavljenega razdelka »Les, ukrivljen v vogal.« (opis fotografije), opis »Poiščite navdih v galeriji detajlov.«, navodilo pod gumbom za e-pošto, opisi fotografij (alt).
Na strani **ni cen, ni delovnega časa** (njegova stran ga ne objavlja), ni referenc strank in ni nobene nove trditve o storitvah. Koraka »montaža« ne navajamo, ker ga njegova stran ne navaja kot korak.

## Česa z njegove strani nismo uporabili in zakaj

- **Kontaktni obrazec** (ime, e-pošta, telefon, povpraševanje, GDPR): statična stran nima zaledja. Namesto njega gumb `mailto:` s pripravljeno zadevo in istimi polji v besedilu sporočila.
- **Pravilnik o zasebnosti**: nanaša se na obrazec in piškotke WordPressa; nova stran ne zbira podatkov, nima piškotkov in analitike. Če stranka doda obrazec ali analitiko, ga je treba napisati na novo.
- **Druge različice logotipa** (vodoravni in beli navpični): uporabljen je samo znak »P« (`pohistvo-jereb-logo-notranja-oprema-ikona-02.png`), prebarvan v barvo besedila, za glavo, nogo in ikono strani.
- **»Avtorske pravice © 2021«**: zamenjano z © 2026.
- Prazne strani arhiva (`category/*`, `project_category/*`, `author/*`, `project/`): nimajo lastne vsebine.

## Fotografije

- Vse fotografije so njegove, prenesene z `https://pohistvojereb.si/wp-content/uploads/…` 18. 11. 2026, v največji velikosti (izvirnik; kjer ga strežnik ni vrnil, različica `-scaled`). **Ni AI, ni stock, ni fotografij z drugih strani.** Fotografije s prejšnjega predogleda so vse zajete tudi tukaj; nobena ni bila odstranjena.
- Zbrane iz vseh strani v `sitemap.xml` (Yoast: post, page, project, category, project_category, author), iz vseh Divi galerij in iz vseh sklicev na `/wp-content/uploads/` v HTML (tudi ozadja v CSS). Logotipi niso šteti med fotografije.
- Dvojniki odstranjeni po SHA-1 izvirne datoteke in po zaznavnem razpršilu (dHash, razdalja ≤ 6): 4 datoteke so bile enake drugi datoteki pod drugim imenom. Ostalo je 553 fotografij.
- Fotografija `2021/04/DSC0182.jpg` je na njegovi strani le ozadje noge na vseh straneh; tukaj je v galeriji Detajli.
- Nekatere fotografije so v njegovih galerijah pod več prostori; tukaj so prav tako prikazane pod vsemi prostori, kamor jih je dal on. Datoteka je ena.
- Pretvorba: WebP, `img/f/` (najdaljša stranica ≤ 1600 px, q72), `img/t/` (≤ 600 px, q62); `img/hi/2210-lp03764.webp` v 2560 px (q86) za izpostavljeno fotografijo; `img/hero-m.webp` je pokončni izrez iz DSC0693; `img/og.jpg` 1200 × 630 iz bele kuhinje.
- Vsako fotografijo smo pogledali na kontaktnih listih in ji napisali slovenski opis (alt), ki opisuje kos pohištva. Opisi so opažanja s fotografije, ne trditve stranke.
- **Fotograf:** 94 od 553 datotek se imenuje `LiparDesignPhotography-*` (fotograf Lipar Design Photography, 2022–2023), druge `PJ_Trebnje-*`, `PohistvoJereb2.0-*`, `DSC*`. Njegova stran fotografa ne navaja nikjer v besedilu; ime je le v imenih datotek (in v napisu njegovega pregledovalnika slik, ki kaže ime datoteke). Po odločitvi lastnika (18. 11.) na strani ni navedbe fotografa in imen datotek ne prikazujemo. **Odprto vprašanje za lastnika / stranko:** ali licenca fotografa dovoljuje objavo na novi strani in ali zahteva navedbo avtorja.
- Fotografije iz projekta »Kuhinja Bella« (2021/07) so na njegovi strani le v 640 px; večjih ni.

## Pisava

Newsreader (Production Type, SIL Open Font License 1.1), woff2 iz Google Fonts, gostovano na strani (`assets/fonts/`), podnabora latin in latin-ext, pokončna in ležeča.

## Preverjanje

Gradnik in preverjevalnik sta v delovni mapi agenta (zunaj repozitorija). Preverjeno 18. 11. 2026:
- vseh 12 strani: uravnoteženost oznak, vse povezave in slike obstajajo, vsak `img` ima `alt`, `width` in `height`, vsaka stran ima `noindex`, naslov in opis, ni nizov `wp-content`, `Lipar`, `fonts.googleapis`; vsaka od fotografij je na vsaj eni strani;
- Playwright WebKit, profil iPhone 13 (390 × 844) in namizje 1280 × 800: brez vodoravnega prelivanja na nobenem položaju drsenja, brez napak v konzoli in brez odgovorov 4xx, pisava naložena, meni se odpre, zapre z Esc in vodi na podstran, galerija se odpre, štetje »1 / N«, poteg levo/desno, puščici, tipki ←/→, zapiranje z ×, Esc in klikom na ozadje.

## Seznam fotografij

Stolpci: št. · datoteka na strani · izvirnik na pohistvojereb.si (pod `/wp-content/uploads/`) · strani njegove spletne strani, kjer se pojavi · strani te spletne strani · opis (alt).

| # | Datoteka | Izvirnik | Njegove strani | Naše strani | Opis |
|---|---|---|---|---|---|
| 0 | `2305-lp06882.webp` | 2023/05/LiparDesignPhotography-06882.jpg | detajli-galerija | detajli/ | Mansarda s hrastovim parketom, vgrajeno omaro in policami pod poševnino |
| 1 | `2305-lp06885.webp` | 2023/05/LiparDesignPhotography-06885.jpg | detajli-galerija | detajli/ | Hrastov regal s kockami kot pregrada v mansardi |
| 2 | `2305-lp06888.webp` | 2023/05/LiparDesignPhotography-06888.jpg | detajli-galerija | detajli/ | Stopničast hrastov regal z omaricami pod poševnino |
| 3 | `2305-lp06890.webp` | 2023/05/LiparDesignPhotography-06890.jpg | detajli-galerija | detajli/ | Hrastova obloga in nizke sive omarice pod poševnino |
| 4 | `2305-lp06893.webp` | 2023/05/LiparDesignPhotography-06893.jpg | detajli-galerija | detajli/ | Vgradna omara v hrastu ob prehodu v mansardo |
| 5 | `2305-lp06907.webp` | 2023/05/LiparDesignPhotography-06907.jpg | detajli-galerija | detajli/ | Hrastove stopnice s stekleno ograjo in lučkami v steni |
| 6 | `2305-lp06926.webp` | 2023/05/LiparDesignPhotography-06926.jpg | detajli-galerija | detajli/ | Hrastova niša v beli omari, detajl |
| 7 | `2305-lp06940.webp` | 2023/05/LiparDesignPhotography-06940.jpg | detajli-galerija | detajli/ | Bela pralnica s pultom ob pralnem stroju |
| 8 | `2210-lp03728.webp` | 2022/10/LiparDesignPhotography-03728.jpg | detajli-galerija | detajli/ | Hrastov element z zaobljenim vogalom ob balkonskih vratih |
| 9 | `2210-lp03729.webp` | 2022/10/LiparDesignPhotography-03729.jpg | detajli-galerija | detajli/ | Hrastove letvice na steni, detajl |
| 10 | `2210-lp03759.webp` | 2022/10/LiparDesignPhotography-03759.jpg | detajli-galerija | detajli/ | Hrastov predalnik z upognjenim zaobljenim vogalom |
| 11 | `2210-lp03764.webp` | 2022/10/LiparDesignPhotography-03764.jpg | detajli-galerija | detajli/ | Hrastov predalnik z zaobljenim vogalom iz upognjenega lesa in izvlečenim predalom |
| 12 | `2210-lp03766.webp` | 2022/10/LiparDesignPhotography-03766.jpg | detajli-galerija | detajli/ | Stenski obešalnik iz hrastovih letvic z lesenimi kljukicami |
| 13 | `2210-lp03768.webp` | 2022/10/LiparDesignPhotography-03768.jpg | detajli-galerija | detajli/ | Odprta hrastova niša v beli steni |
| 14 | `2210-lp03776.webp` | 2022/10/LiparDesignPhotography-03776.jpg | detajli-galerija | detajli/ | Odpiranje fronte brez ročaja s pritiskom, detajl |
| 15 | `2210-lp03786.webp` | 2022/10/LiparDesignPhotography-03786.jpg | detajli-galerija | detajli/ | Hrastova miza z ozkim robom, detajl |
| 16 | `2210-lp03789.webp` | 2022/10/LiparDesignPhotography-03789.jpg | detajli-galerija | detajli/ | Hrastove fronte in svetel kamniti pult z vgradnim koritom |
| 17 | `2210-lp03795.webp` | 2022/10/LiparDesignPhotography-03795.jpg | detajli-galerija | detajli/ | Bele visoke omare in hrastovi spodnji elementi s kamnitim pultom |
| 18 | `2210-lp03803.webp` | 2022/10/LiparDesignPhotography-03803.jpg | detajli-galerija | detajli/ | Hrastov predalnik z ročaji, vrezanimi v fronto |
| 19 | `2210-lp03805.webp` | 2022/10/LiparDesignPhotography-03805.jpg | detajli-galerija | detajli/ | Hrastov pult ob okroglem ogledalu |
| 20 | `2210-pohistvojereb2-0-2-e9d1e.webp` | 2022/10/PohistvoJereb2.0-2.jpg | detajli-galerija | detajli/ | Viseča polica v barvi peska z orehovim predalom |
| 21 | `2210-pohistvojereb2-0-4-6d68d.webp` | 2022/10/PohistvoJereb2.0-4.jpg | detajli-galerija | detajli/ | Viseča polica z izvlečenim orehovim predalom |
| 22 | `2210-pohistvojereb2-0-13-e5e0a.webp` | 2022/10/PohistvoJereb2.0-13.jpg | detajli-galerija | detajli/ | Orehova fronta predala, detajl roba |
| 23 | `2210-pohistvojereb2-0-15-b3dad.webp` | 2022/10/PohistvoJereb2.0-15.jpg | detajli-galerija | detajli/ | Orehov predal v viseči polici, detajl |
| 24 | `2210-pohistvojereb2-0-18-65673.webp` | 2022/10/PohistvoJereb2.0-18.jpg | detajli-galerija | detajli/ | Stenski obešalnik iz hrastovih letvic |
| 25 | `2210-pohistvojereb2-0-19-cde0c.webp` | 2022/10/PohistvoJereb2.0-19.jpg | detajli-galerija | detajli/ | Hrastove letvice s kljukicami, detajl |
| 26 | `2210-pohistvojereb2-0-12-7cdc1.webp` | 2022/10/PohistvoJereb2.0-12.jpg | detajli-galerija | detajli/ | Rob okvirja v barvi peska, detajl |
| 27 | `2210-pohistvojereb2-0-23-98de5.webp` | 2022/10/PohistvoJereb2.0-23.jpg | detajli-galerija | detajli/ | Črn okvir ogledala na steni, detajl |
| 28 | `2211-lp08512.webp` | 2022/11/LiparDesignPhotography-08512.jpg | kuhinje-galerija | kuhinje/ | Kuhinja s temno sivimi spodnjimi elementi, hrastovimi zgornjimi in jedilno mizo |
| 29 | `2211-lp08522.webp` | 2022/11/LiparDesignPhotography-08522.jpg | kuhinje-galerija | kuhinje/ | Antracitna kuhinja s hrastovimi zgornjimi omaricami |
| 30 | `2211-lp08528.webp` | 2022/11/LiparDesignPhotography-08528.jpg | kuhinje-galerija | kuhinje/ | Kuhinja z otokom in kuhalno ploščo, hrastove zgornje omarice |
| 31 | `2211-lp08521.webp` | 2022/11/LiparDesignPhotography-08521.jpg | kuhinje-galerija | kuhinje/ | Antracitna kuhinja v obliki črke L s hrastovimi zgornjimi elementi |
| 32 | `2211-lp08517.webp` | 2022/11/LiparDesignPhotography-08517.jpg | kuhinje-galerija | kuhinje/ | Odprt prostor s kuhinjo in hrastovo jedilno mizo |
| 33 | `2211-lp08536.webp` | 2022/11/LiparDesignPhotography-08536.jpg | kuhinje-galerija | kuhinje/ | Hrastove zgornje omarice brez ročajev, pogled od spodaj |
| 34 | `2211-lp08515.webp` | 2022/11/LiparDesignPhotography-08515.jpg | kuhinje-galerija | kuhinje/ | Hrastova jedilna miza ob antracitni kuhinji |
| 35 | `2211-lp08550.webp` | 2022/11/LiparDesignPhotography-08550.jpg | kuhinje-galerija | kuhinje/ | Hrastova jedilna miza, detajl |
| 36 | `2210-lp03690.webp` | 2022/10/LiparDesignPhotography-03690.jpg | kuhinje-galerija | kuhinje/ | Jedilni kot s hrastovo mizo in sivimi stoli |
| 37 | `2210-lp03693.webp` | 2022/10/LiparDesignPhotography-03693.jpg | kuhinje-galerija | kuhinje/ | Hrastova jedilna miza ob oknu |
| 38 | `2210-lp03695.webp` | 2022/10/LiparDesignPhotography-03695.jpg | kuhinje-galerija | kuhinje/ | Jedilna miza ob beli kuhinji s hrastovimi elementi |
| 39 | `2210-lp03697.webp` | 2022/10/LiparDesignPhotography-03697.jpg | kuhinje-galerija | kuhinje/ | Rob hrastove jedilne mize, detajl |
| 40 | `2210-lp03698.webp` | 2022/10/LiparDesignPhotography-03698.jpg | kuhinje-galerija | kuhinje/ | Hrastovi spodnji elementi pod oknom, pogled čez mizo |
| 41 | `2210-lp03699.webp` | 2022/10/LiparDesignPhotography-03699.jpg | kuhinje-galerija | kuhinje/ | Hrastovi spodnji kuhinjski elementi s pultom |
| 42 | `2210-lp03708.webp` | 2022/10/LiparDesignPhotography-03708.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z visokimi omarami in hrastovimi predali |
| 43 | `2210-lp03710.webp` | 2022/10/LiparDesignPhotography-03710.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare z vgradnima pečicama in hrastovi predali |
| 44 | `2210-lp03711.webp` | 2022/10/LiparDesignPhotography-03711.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare in hrastovi predali brez ročajev |
| 45 | `2210-lp03712.webp` | 2022/10/LiparDesignPhotography-03712.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovimi spodnjimi elementi pod oknom |
| 46 | `2210-lp03713.webp` | 2022/10/LiparDesignPhotography-03713.jpg | kuhinje-galerija | kuhinje/ | Bela rebrasta fronta in hrastov element, detajl |
| 47 | `2210-lp03714.webp` | 2022/10/LiparDesignPhotography-03714.jpg | kuhinje-galerija | kuhinje/ | Hrastovi predali z vrezanimi ročaji in kamnit pult |
| 48 | `2103-jereb-skofja-loka-22866.webp` | 2021/03/Jereb_Skofja_Loka-32.jpg | kuhinje-galerija | kuhinje/ | Kuhinja z otokom in hrastovo jedilno mizo |
| 49 | `2103-jereb-skofja-loka-25e53.webp` | 2021/03/Jereb_Skofja_Loka-21.jpg | kuhinje-galerija | kuhinje/ | Temen kuhinjski otok z vinsko vitrino |
| 50 | `2103-jereb-skofja-loka-d909d.webp` | 2021/03/Jereb_Skofja_Loka-28.jpg | kuhinje-galerija | kuhinje/ | Svetlo siva kuhinja s temnim otokom in jedilno mizo |
| 51 | `2103-jereb-skofja-loka-1342b.webp` | 2021/03/Jereb_Skofja_Loka-35.jpg | kuhinje-galerija | kuhinje/ | Hrastova raztegljiva jedilna miza v dnevnem prostoru |
| 52 | `2103-jereb-skofja-loka-919fe.webp` | 2021/03/Jereb_Skofja_Loka-48.jpg | kuhinje-galerija | kuhinje/ | Raztegljiva hrastova miza z izvlečenim mehanizmom |
| 53 | `2103-jereb-skofja-loka-3d1ec.webp` | 2021/03/Jereb_Skofja_Loka-43.jpg | kuhinje-galerija | kuhinje/ | Hrastova miza med raztegovanjem, dodatna plošča |
| 54 | `2103-jereb-skofja-loka-ce38e.webp` | 2021/03/Jereb_Skofja_Loka-51.jpg | kuhinje-galerija | kuhinje/ | Jedilna miza pred kuhinjo s temnim otokom |
| 55 | `2103-jereb-skofja-loka-9a73a.webp` | 2021/03/Jereb_Skofja_Loka-12.jpg | kuhinje-galerija | kuhinje/ | Svetlo siva kuhinja z otokom in vgradno napo v stropu |
| 56 | `2103-jereb-skofja-loka-62bb4.webp` | 2021/03/Jereb_Skofja_Loka-41.jpg | kuhinje-galerija | kuhinje/ | Temen kuhinjski otok in jedilni prostor |
| 57 | `2103-jereb-skofja-loka-4d8c7.webp` | 2021/03/Jereb_Skofja_Loka-30.jpg | kuhinje-galerija | kuhinje/ | Visoke svetlo sive omare in osvetljen delovni pult |
| 58 | `2103-jereb-skofja-loka-e9d88.webp` | 2021/03/Jereb_Skofja_Loka-15.jpg | kuhinje-galerija | kuhinje/ | Osvetljena niša nad pultom v sivi kuhinji |
| 59 | `2103-jereb-skofja-loka-f36c0.webp` | 2021/03/Jereb_Skofja_Loka-7.jpg | kuhinje-galerija | kuhinje/ | Siva kuhinja s temnim pultom in vgrajenimi aparati |
| 60 | `2210-pohistvojereb-cerknica-18-51066.webp` | 2022/10/PohistvoJereb_Cerknica-18.jpg | kuhinje-galerija | kuhinje/ | Hrastova kuhinja z belim otokom in steklenimi zgornjimi omaricami |
| 61 | `2210-pohistvojereb-cerknica-23-ddca9.webp` | 2022/10/PohistvoJereb_Cerknica-23.jpg | kuhinje-galerija | kuhinje/ | Hrastova kuhinja z belim pultom in poslikano zadnjo steno |
| 62 | `2210-pohistvojereb-cerknica-28-48d65.webp` | 2022/10/PohistvoJereb_Cerknica-28.jpg | kuhinje-galerija | kuhinje/ | Pult z vgradnim koritom in osvetljenimi zgornjimi omaricami |
| 63 | `2210-pohistvojereb-cerknica-31-1a5db.webp` | 2022/10/PohistvoJereb_Cerknica-31.jpg | kuhinje-galerija | kuhinje/ | Hrastova kuhinja z vgrajenim hladilnikom in pečico |
| 64 | `2210-pohistvojereb-cerknica-34-d07f5.webp` | 2022/10/PohistvoJereb_Cerknica-34.jpg | kuhinje-galerija | kuhinje/ | Izvlečeni hrastovi predali v kuhinji |
| 65 | `2210-pohistvojereb-cerknica-39-c1dfa.webp` | 2022/10/PohistvoJereb_Cerknica-39.jpg | kuhinje-galerija | kuhinje/ | Hrastova kuhinja z odprtimi predali in visečo svetilko |
| 66 | `2210-pohistvojereb-cerknica-44-ce776.webp` | 2022/10/PohistvoJereb_Cerknica-44.jpg | kuhinje-galerija | kuhinje/ | Kuhinja z belim otokom na dveh nivojih |
| 67 | `2210-pohistvojereb-cerknica-22-69c9d.webp` | 2022/10/PohistvoJereb_Cerknica-22.jpg | kuhinje-galerija | kuhinje/ | Beli kuhinjski otok in hrastova vgradna omara |
| 68 | `2202-kuhinja-trebnje-3-917f0.webp` | 2022/02/kuhinja_Trebnje-3.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovim pultom pod okni |
| 69 | `2202-kuhinja-trebnje-19-cc1ab.webp` | 2022/02/kuhinja_Trebnje-19.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z jedilno mizo pod poševnino |
| 70 | `2202-kuhinja-trebnje-21-582d4.webp` | 2022/02/kuhinja_Trebnje-21.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja v mansardi in jedilna miza |
| 71 | `2202-kuhinja-trebnje-18-62600.webp` | 2022/02/kuhinja_Trebnje-18.jpg | kuhinje-galerija | kuhinje/ | Hrastov pult s črnim koritom in osvetlitvijo |
| 72 | `2202-kuhinja-trebnje-27-302d8.webp` | 2022/02/kuhinja_Trebnje-27.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z visokimi omarami v mansardi |
| 73 | `2202-kuhinja-trebnje-62-c3cf8.webp` | 2022/02/kuhinja_Trebnje-62.jpg | kuhinje-galerija | kuhinje/ | Stik hrastovega pulta in bele fronte, detajl |
| 74 | `2202-kuhinja-trebnje-32-edd02.webp` | 2022/02/kuhinja_Trebnje-32.jpg | kuhinje-galerija | kuhinje/ | Bela fronta z ročajem pod hrastovim pultom, detajl |
| 75 | `2202-kuhinja-trebnje-30-38dae.webp` | 2022/02/kuhinja_Trebnje-30.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare do stropa, detajl |
| 76 | `2111-kuhinje-po-meri-ebfb4.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-2.jpg | kuhinje-galerija | kuhinje/ | Kuhinja s temno zelenimi spodnjimi in hrastovimi zgornjimi omaricami |
| 77 | `2111-kuhinje-po-meri-362fb.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-20.jpg | kuhinje-galerija | kuhinje/ | Pogled skozi leseno hišo do kuhinje |
| 78 | `2111-kuhinje-po-meri-49f3c.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-1.jpg | kuhinje-galerija | kuhinje/ | Svetel hodnik z lesenim stropom in kuhinjo v ozadju |
| 79 | `2111-kuhinje-po-meri-1c41e.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-12.jpg | kuhinje-galerija | kuhinje/ | Hrastove zgornje omarice in viseče svetilke nad pultom |
| 80 | `2111-kuhinje-po-meri-f03fd.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-5.jpg | kuhinje-galerija | kuhinje/ | Hrastove zgornje omarice ob oknu |
| 81 | `2111-kuhinje-po-meri-ba299.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-10.jpg | kuhinje-galerija | kuhinje/ | Temno zelen šank s policami za knjige |
| 82 | `2111-kuhinje-po-meri-31ec1.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-11.jpg | kuhinje-galerija | kuhinje/ | Hrastove zgornje omarice in zelen spodnji del kuhinje |
| 83 | `2111-kuhinje-po-meri-cd58d.webp` | 2021/11/kuhinje-po-meri-pohistvo-jereb-notranja-oprema-kuhinja-kokra-13.jpg | kuhinje-galerija | kuhinje/ | Delovni pult s hrastovimi zgornjimi omaricami |
| 84 | `2110-dsc0921.webp` | 2021/10/DSC0921.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z orehovimi elementi in šankom |
| 85 | `2110-dsc0013.webp` | 2021/10/DSC0013.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z orehovimi spodnjimi elementi pod oknom |
| 86 | `2110-dsc0015.webp` | 2021/10/DSC0015.jpg | kuhinje-galerija | kuhinje/ | Orehove fronte in bel pult, detajl |
| 87 | `2110-dsc0923.webp` | 2021/10/DSC0923.jpg | kuhinje-galerija | kuhinje/ | Bel pult in orehovi elementi v kuhinji |
| 88 | `2110-dsc0927.webp` | 2021/10/DSC0927.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare, vgradna pečica in orehova stranica |
| 89 | `2110-dsc0959.webp` | 2021/10/DSC0959.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z orehovo visoko omaro |
| 90 | `2107-dsc0506.webp` | 2021/07/DSC0506.jpg | kuhinje-galerija, project, project_category_kuhinje, project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Hrastove visoke omare in bel otok |
| 91 | `2107-dsc0568.webp` | 2021/07/DSC0568.jpg | kuhinje-galerija | kuhinje/ | Hrastova kuhinja s plinsko kuhalno ploščo na otoku |
| 92 | `2107-dsc0585.webp` | 2021/07/DSC0585.jpg | kuhinje-galerija, project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Hrastova fronta z dvižnim mehanizmom nad pečico |
| 93 | `2107-dsc0510.webp` | 2021/07/DSC0510.jpg | kuhinje-galerija, project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Hrastova kuhinja in dolga jedilna miza |
| 94 | `2107-dsc0528.webp` | 2021/07/DSC0528.jpg | kuhinje-galerija | kuhinje/ | Hrastove visoke omare z vgradno pečico in izvlečnim predalom |
| 95 | `2107-dsc0517.webp` | 2021/07/DSC0517.jpg | kuhinje-galerija, project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Hrastova stena omar in bel kuhinjski otok |
| 96 | `2104-kuhinja-po-meri-53ee5.webp` | 2021/04/kuhinja-po-meri-moderna-brezcasna-kuhinja-po-narocilu-izdelava-montaza-vgradnja-kuhinjski-elementi-pohistvo-jereb-izdelava-pohistva.jpg | home, kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovo zadnjo steno in policami |
| 97 | `2104-kuhinje-po-narocilu-48d23.webp` | 2021/04/kuhinje-po-narocilu-po-meri-izdalava-kuhinj-kuhinjski-elementi-lesena-kuhinja-visoki-sijaj-moderna-pohistvo-jereb-izdelava-pohistva.jpg | home, kuhinje-galerija | kuhinje/ | Bela kuhinja v obliki črke U s hrastovimi poudarki |
| 98 | `2104-dsc0686.webp` | 2021/04/DSC0686.jpg | kuhinje-galerija | kuhinje/ | Izvlečni predal v beli kuhinji, detajl |
| 99 | `2104-dsc0682.webp` | 2021/04/DSC0682.jpg | kuhinje-galerija, otroske-sobe-po-meri | kuhinje/, otroske-sobe/ | Bela visoka omara s hrastovo odprto nišo |
| 100 | `2104-masivna-lesena-jedilna-2c474.webp` | 2021/04/masivna-lesena-jedilna-natur-naravni-materiali-miza-kuhinjska-velika-masiva-les-kuhinjski-elementi-pohistvo-jereb-izdelava-pohistva-po-narocilu.jpg | kuhinje-galerija | kuhinje/ | Hrastova jedilna miza z modrimi stoli |
| 101 | `2104-masivna-lesena-jedilna-6a568.webp` | 2021/04/masivna-lesena-jedilna-druzinska-miza-kuhinjska-velika-masiva-les-kuhinjski-elementi-pohistvo-jereb-izdelava-pohistva-po-narocilu.jpg | kuhinje-galerija | kuhinje/ | Hrastova jedilna miza v svetlem prostoru |
| 102 | `2104-kuhinje-po-narocilu-9f97d.webp` | 2021/04/kuhinje-po-narocilu-meri-izdalava-kuhinj-kuhinjski-elementi-lesena-kuhinja-visoki-sijaj-moderna-pohistvo-jereb-izdelava-pohistva-.jpg | kuhinje-galerija, kuhinje-po-meri | kuhinje/ | Bela kuhinja s hrastovo steno, pogled čez pult |
| 103 | `2104-kuhinja-po-meri-bf392.webp` | 2021/04/kuhinja-po-meri-vgradna-pecica-pult-lesena-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | kuhinje-galerija | kuhinje/ | Kuhinja s hrastovimi zgornjimi omaricami in temnim pultom |
| 104 | `2104-dsc0272.webp` | 2021/04/DSC0272.jpg | kuhinje-galerija | kuhinje/ | Kuhinjski otok s temnim pultom in pogled v dnevni prostor |
| 105 | `2104-dsc0290.webp` | 2021/04/DSC0290.jpg | kuhinje-galerija | kuhinje/ | Bel kuhinjski otok s temnim kamnitim pultom |
| 106 | `2104-dsc0265.webp` | 2021/04/DSC0265.jpg | kuhinje-galerija | kuhinje/ | Temen kamnit pult in hrastova stranica, detajl |
| 107 | `2104-dsc0260.webp` | 2021/04/DSC0260.jpg | kuhinje-galerija | kuhinje/ | Hrastova klop pod oknom in kuhinjski otok |
| 108 | `2104-kuhinja-po-meri-a9207.webp` | 2021/04/kuhinja-po-meri-vgradna-napa-pult-lesena-natur-moderna-jedilna-miza-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | kuhinje-galerija | kuhinje/ | Kuhinjski otok s temnim pultom ob dnevnem prostoru |
| 109 | `2104-kuhinja-po-meri-f1ccd.webp` | 2021/04/kuhinja-po-meri-pult-lesena-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | kuhinje-galerija | kuhinje/ | Rob hrastovega pulta nad belo fronto, detajl |
| 110 | `2104-kuhinja-po-meri-073e5.webp` | 2021/04/kuhinja-po-meri-bralni-koticek-klop-pult-lesena-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | kuhinje-galerija | kuhinje/ | Hrastove visoke omare in bel otok z lesenim pultom |
| 111 | `2104-dsc0241.webp` | 2021/04/DSC0241.jpg | kuhinje-galerija | kuhinje/ | Hrastova polica pod oknom nad belim otokom |
| 112 | `2104-dsc0250.webp` | 2021/04/DSC0250.jpg | kuhinje-galerija | kuhinje/ | Hrastove odprte police ob kamnitem pultu, detajl |
| 113 | `2104-dsc0207.webp` | 2021/04/DSC0207.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare ob hodniku |
| 114 | `2104-kuhinja-po-meri-f8bb2.webp` | 2021/04/kuhinja-po-meri-vgradna-napa-pult-lesena-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | home, kuhinje-galerija | kuhinje/ | Kuhinja z lesenim stropom, hrastovimi omarami in temnim pultom |
| 115 | `2104-kuhinja-po-meri-f2386.webp` | 2021/04/kuhinja-po-meri-vgrajeni-rocaji-vgradni-hladilnik-obloga-pult-lesena-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | kuhinje-galerija | kuhinje/ | Bela visoka omara in hrastova stranica, detajl |
| 116 | `2104-kuhinja-po-meri-9366b.webp` | 2021/04/kuhinja-po-meri-vgradna-obloga-cokl-lesena-bela-lesena-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | kuhinje-galerija | kuhinje/ | Bele visoke fronte in hrastova obloga, detajl |
| 117 | `2104-dsc0693.webp` | 2021/04/DSC0693.jpg | kuhinje-galerija, kuhinje-po-meri | kuhinje/ | Bela kuhinja s hrastovo nišo in sivim pultom |
| 118 | `2104-dsc0694.webp` | 2021/04/DSC0694.jpg | kuhinje-galerija, kuhinje-po-meri | kuhinje/ | Bel otok s hrastovo odprto polico |
| 119 | `2104-dsc0696.webp` | 2021/04/DSC0696.jpg | kuhinje-galerija | kuhinje/ | Bele fronte s črnimi ročaji in hrastov podstavek, detajl |
| 120 | `2104-dsc0701.webp` | 2021/04/DSC0701.jpg | kuhinje-galerija | kuhinje/ | Beli predali s črnimi ročaji ob balkonskih vratih |
| 121 | `2104-dsc0704.webp` | 2021/04/DSC0704.jpg | kuhinje-galerija | kuhinje/ | Bela stranica otoka in pogled na jedilno mizo |
| 122 | `2104-dsc0709.webp` | 2021/04/DSC0709.jpg | home, kuhinje-galerija | kuhinje/ | Bela visoka omara s hrastovo nišo |
| 123 | `2104-dsc0712.webp` | 2021/04/DSC0712.jpg | kuhinje-galerija, otroske-sobe-po-meri | kuhinje/, otroske-sobe/ | Beli predali in vgradna pečica v visoki omari |
| 124 | `2104-notranja-vrata-po-8cebb.webp` | 2021/04/notranja-vrata-po-meri-kuhinja-izdelava-vrat-pohistvo-brez-podbojev-shramba-pohistvo-jereb-izdelava-pohistva-po-narocilu.jpg | kuhinje-galerija, notranja-vrata-galerija | kuhinje/, vrata/ | Hrastova obloga in vgradna omara ob stopnicah |
| 125 | `2105-dsc9669.webp` | 2021/05/DSC_9669.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovo zadnjo steno |
| 126 | `2105-dsc9662.webp` | 2021/05/DSC_9662.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovo steno in kuhalno ploščo na otoku |
| 127 | `2105-dsc9692.webp` | 2021/05/DSC_9692.jpg | kuhinje-galerija | kuhinje/ | Bel kuhinjski otok z izvlečnim predalom |
| 128 | `2105-dsc9697.webp` | 2021/05/DSC_9697.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovimi robovi in odprto polico |
| 129 | `2105-dsc9703.webp` | 2021/05/DSC_9703.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s hrastovo zadnjo steno in otokom |
| 130 | `2105-dsc9685.webp` | 2021/05/DSC_9685.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja v obliki črke L s hrastovo steno |
| 131 | `2105-dsc9668.webp` | 2021/05/DSC_9668.jpg | kuhinje-galerija | kuhinje/ | Hrastove odprte police ob visoki omari s pečico |
| 132 | `2105-dsc0746.webp` | 2021/05/DSC0746.jpg | kuhinje-galerija | kuhinje/ | Hrastov regal ob vgradni pečici, detajl |
| 133 | `2105-dsc0754.webp` | 2021/05/DSC0754.jpg | kuhinje-galerija | kuhinje/ | Beli predali s hrastovimi robovi |
| 134 | `2105-dsc0757.webp` | 2021/05/DSC0757.jpg | kuhinje-galerija | kuhinje/ | Bela visoka omara in hrastova zadnja stena |
| 135 | `2105-dsc9704.webp` | 2021/05/DSC_9704.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z otokom in pogledom na jedilnico |
| 136 | `2105-dsc9705.webp` | 2021/05/DSC_9705.jpg | kuhinje-galerija | kuhinje/ | Bel kuhinjski otok in jedilni prostor ob oknu |
| 137 | `2105-dsc9713.webp` | 2021/05/DSC_9713.jpg | kuhinje-galerija | kuhinje/ | Siva kuhinja ob jedilnici in dnevnem prostoru |
| 138 | `2105-dsc9674.webp` | 2021/05/DSC_9674.jpg | kuhinje-galerija | kuhinje/ | Hrastova niša v beli omari ob oknu |
| 139 | `2105-dsc0863.webp` | 2021/05/DSC0863.jpg | kuhinje-galerija | kuhinje/ | Siva kuhinja s hrastovim pultom in visokimi omarami |
| 140 | `2105-dsc0825.webp` | 2021/05/DSC0825.jpg | kuhinje-galerija | kuhinje/ | Sive visoke omare s pečico in hrastov pult |
| 141 | `2105-dsc0836.webp` | 2021/05/DSC0836.jpg | kuhinje-galerija | kuhinje/ | Siva kuhinja s hrastovim pultom pod oknom |
| 142 | `2105-dsc0816.webp` | 2021/05/DSC0816.jpg | kuhinje-galerija | kuhinje/ | Sivi predali in hrastov pult v obliki črke U |
| 143 | `2105-dsc0815.webp` | 2021/05/DSC0815.jpg | kuhinje-galerija | kuhinje/ | Sivi izvlečni predali pod hrastovim pultom |
| 144 | `2105-dsc0805.webp` | 2021/05/DSC0805.jpg | kuhinje-galerija | kuhinje/ | Hrastov pult s kuhalno ploščo in odprtimi policami |
| 145 | `2105-dsc0791.webp` | 2021/05/DSC0791.jpg | kuhinje-galerija | kuhinje/ | Sivi predali, hrastov pult in odprte police |
| 146 | `2105-kos-za-smeti-190be.webp` | 2021/05/kos-za-smeti-nagradna-igra-pohistvo-jereb-1-of-1-3.jpg | kuhinje-galerija | kuhinje/ | Izvlečni koš za ločevanje odpadkov pod pultom |
| 147 | `2105-dsc0850.webp` | 2021/05/DSC0850.jpg | kuhinje-galerija | kuhinje/ | Sive fronte brez ročajev ob hrastovem pultu, detajl |
| 148 | `2105-dsc0835.webp` | 2021/05/DSC0835.jpg | kuhinje-galerija | kuhinje/ | Sive visoke omare do stropa |
| 149 | `2105-dsc0837.webp` | 2021/05/DSC0837.jpg | kuhinje-galerija | kuhinje/ | Sive zgornje omarice nad oknom |
| 150 | `2105-dsc0846.webp` | 2021/05/DSC0846.jpg | kuhinje-galerija | kuhinje/ | Vgradna vtičnica v hrastovem pultu, detajl |
| 151 | `2105-dsc0849.webp` | 2021/05/DSC0849.jpg | kuhinje-galerija | kuhinje/ | Izvlečna visoka omara v sivi kuhinji |
| 152 | `2105-dsc0851.webp` | 2021/05/DSC0851.jpg | kuhinje-galerija | kuhinje/ | Siva kuhinja s hrastovim pultom in otokom |
| 153 | `2105-dsc0853.webp` | 2021/05/DSC0853.jpg | kuhinje-galerija | kuhinje/ | Siva kuhinja z visokimi omarami in otokom |
| 154 | `2105-dsc0865.webp` | 2021/05/DSC0865.jpg | kuhinje-galerija | kuhinje/ | Izvlečna omara pod pultom v sivi kuhinji |
| 155 | `2104-pohistvo-jereb-oprema-d899c.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-21-of-50.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s stekleno zadnjo steno in pogledom skozi okno |
| 156 | `2104-pohistvo-jereb-oprema-2596b.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-7-of-50.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s šankom v lesnem dekorju |
| 157 | `2104-pohistvo-jereb-oprema-b2c5d.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-42-of-50.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare s pečico in leseno nišo |
| 158 | `2104-pohistvo-jereb-oprema-c479f.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-41-of-50.jpg | kopalnice-po-meri, kuhinje-galerija | kuhinje/, kopalnice/ | Šank v lesnem dekorju z belimi barskimi stoli |
| 159 | `2104-pohistvo-jereb-oprema-0ae91.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-40-of-50.jpg | kuhinje-galerija | kuhinje/ | Jedilna miza z lesenim podnožjem in stoli |
| 160 | `2104-pohistvo-jereb-oprema-e54bb.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-44-of-50.jpg | kuhinje-galerija | kuhinje/ | Bel pult s koritom in šank v lesnem dekorju |
| 161 | `2104-pohistvo-jereb-oprema-ced19.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-19-of-50.jpg | kuhinje-galerija | kuhinje/ | Jedilna miza s stekleno ploščo ob oknu |
| 162 | `2104-pohistvo-jereb-oprema-0ca65.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-11-of-50.jpg | kuhinje-galerija | kuhinje/ | Vgradna pečica pod lesenim pultom, detajl |
| 163 | `2104-pohistvo-jereb-oprema-194e5.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-43-of-50.jpg | kuhinje-galerija | kuhinje/ | Šank v lesnem dekorju z belimi frontami |
| 164 | `2104-pohistvo-jereb-oprema-1671d.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-20-of-50.jpg | kuhinje-galerija | kuhinje/ | Lesen šank z barskimi stoli in policami na steni |
| 165 | `2104-pohistvo-jereb-oprema-d1a8e.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-4-of-50.jpg | kuhinje-galerija | kuhinje/ | Lesen šank ob jedilnem prostoru |
| 166 | `2104-pohistvo-jereb-oprema-aaa49.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-5-of-50.jpg | kuhinje-galerija | kuhinje/ | Rob šanka v lesnem dekorju, detajl |
| 167 | `2110-dsc0263.webp` | 2021/10/DSC0263.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja s temnimi zgornjimi omaricami in otokom |
| 168 | `2110-dsc0293.webp` | 2021/10/DSC0293.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z odprtimi policami in otokom |
| 169 | `2110-dsc0277.webp` | 2021/10/DSC0277.jpg | kuhinje-galerija | kuhinje/ | Vgradni pečici v visoki beli omari |
| 170 | `2110-dsc0279.webp` | 2021/10/DSC0279.jpg | kuhinje-galerija | kuhinje/ | Temna zgornja omarica, detajl |
| 171 | `2110-dsc0271.webp` | 2021/10/DSC0271.jpg | kuhinje-galerija | kuhinje/ | Odprta omarica z začimbami in posodami |
| 172 | `2110-dsc0273.webp` | 2021/10/DSC0273.jpg | kuhinje-galerija | kuhinje/ | Zgornja omarica s skodelicami in krožniki |
| 173 | `2110-dsc0296.webp` | 2021/10/DSC0296.jpg | kuhinje-galerija | kuhinje/ | Bela visoka omara z vgradnima aparatoma |
| 174 | `2104-dsc0937.webp` | 2021/04/DSC0937.jpg | kopalnice-po-meri, kuhinje-galerija | kuhinje/, kopalnice/ | Hodnik s pogledom v kuhinjo z lesenimi elementi |
| 175 | `2104-dsc0938.webp` | 2021/04/DSC0938.jpg | kuhinje-galerija | kuhinje/ | Kuhinja z lesenim šankom in pultom pod oknom |
| 176 | `2104-dsc0950.webp` | 2021/04/DSC0950.jpg | kuhinje-galerija | kuhinje/ | Bel pult s koritom in lesenimi predali |
| 177 | `2104-dsc0964.webp` | 2021/04/DSC0964.jpg | kuhinje-galerija | kuhinje/ | Kovinsko korito v belem pultu ob oknu |
| 178 | `2104-dsc0971.webp` | 2021/04/DSC0971.jpg | kuhinje-galerija | kuhinje/ | Bel pult in leseni predal, detajl |
| 179 | `2104-dsc0948.webp` | 2021/04/DSC0948.jpg | kuhinje-galerija | kuhinje/ | Leseni predali z izrazito teksturo, detajl |
| 180 | `2104-dsc0955.webp` | 2021/04/DSC0955.jpg | kuhinje-galerija | kuhinje/ | Bel pult s koritom in lesen šank |
| 181 | `2104-dsc0991.webp` | 2021/04/DSC0991.jpg | kuhinje-galerija | kuhinje/ | Leseni predali in bele visoke omare z vgradnimi aparati |
| 182 | `2104-dsc0960.webp` | 2021/04/DSC0960.jpg | kuhinje-galerija | kuhinje/ | Izvlečna ozka omarica med lesenimi fronti |
| 183 | `2104-dsc0985.webp` | 2021/04/DSC0985.jpg | kuhinje-galerija | kuhinje/ | Leseni spodnji elementi in bele visoke omare v visokem sijaju |
| 184 | `2104-dsc0989.webp` | 2021/04/DSC0989.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja v visokem sijaju z dolgim pultom |
| 185 | `2104-dsc0966.webp` | 2021/04/DSC0966.jpg | kuhinje-galerija | kuhinje/ | Lesena spodnja omara pod pultom ob oknu |
| 186 | `2104-dsc0436.webp` | 2021/04/DSC0436.jpg | kuhinje-galerija | kuhinje/ | Bela visoka omara z vgradno pečico |
| 187 | `2104-dsc0437.webp` | 2021/04/DSC0437.jpg | kuhinje-galerija | kuhinje/ | Bele visoke omare brez ročajev z vgradno pečico |
| 188 | `2104-dsc0446.webp` | 2021/04/DSC0446.jpg | kuhinje-galerija | kuhinje/ | Temno modri spodnji elementi pod oknom |
| 189 | `2104-dsc0536.webp` | 2021/04/DSC0536.jpg | kuhinje-galerija | kuhinje/ | Temna kuhinja in jedilna miza s stoli |
| 190 | `2104-dsc0452.webp` | 2021/04/DSC0452.jpg | kuhinje-galerija | kuhinje/ | Ozka izvlečna omarica za steklenice v temni kuhinji |
| 191 | `2104-dsc0106.webp` | 2021/04/DSC0106.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja pod lesenim stropom |
| 192 | `2104-dsc0112.webp` | 2021/04/DSC0112.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z otokom in lesenim pultom |
| 193 | `2104-dsc0093.webp` | 2021/04/DSC0093.jpg | kuhinje-galerija | kuhinje/ | Bel otok z lesenim pultom pod lesenim stropom |
| 194 | `2104-dsc0094.webp` | 2021/04/DSC0094.jpg | kuhinje-galerija | kuhinje/ | Bele zgornje omarice in vgradna pečica |
| 195 | `2104-dsc0079.webp` | 2021/04/DSC0079.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja pod poševnim lesenim stropom |
| 196 | `2104-dsc0076.webp` | 2021/04/DSC0076.jpg | kuhinje-galerija | kuhinje/ | Bela kuhinja z vgradno pečico in otokom |
| 197 | `2107-dsc0558.webp` | 2021/07/DSC0558.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Plinska kuhalna plošča na otoku in svetle lesene omare |
| 198 | `2107-dsc0509.webp` | 2021/07/DSC0509.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Jedilnica s črnimi stoli in svetlo kuhinjo |
| 199 | `2107-dsc0537.webp` | 2021/07/DSC0537.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Izvlečni predali v hrastovi visoki omari |
| 200 | `2107-dsc0569.webp` | 2021/07/DSC0569.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Svetla kuhinja z otokom in jedilnim kotom |
| 201 | `2107-dsc0570.webp` | 2021/07/DSC0570.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Bel kuhinjski otok s temnim pultom |
| 202 | `2107-dsc0549.webp` | 2021/07/DSC0549.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Bel izvlečni predal pod temnim pultom |
| 203 | `2107-dsc0543.webp` | 2021/07/DSC0543.jpg | project_kuhinja-bella | kuhinje/ (Kuhinja Bella) | Bela kuhinja s predali brez ročajev |
| 204 | `2104-dsc0182.webp` | 2021/04/DSC0182.jpg | author_avgustin, category_dnevne-sobe, category_kopalnice, category_kuhinje, category_notranja-vrata, category_otroske-sobe, category_predsobe, detajli-galerija, dnevne-sobe-galerija, dnevne-sobe-po-meri, home, kontakt, kopalnice-galerija, kopalnice-po-meri, kuhinje-galerija, kuhinje-po-meri, notranja-vrata-galerija, notranja-vrata-po-meri, otroske-sobe-galerija, otroske-sobe-po-meri, predsobe-galerija, predsobe-po-meri, privacy-policy, project, project_category_kuhinje, project_kuhinja-bella, spalnice, spalnice-galerija | detajli/ | Rob lesenega pulta nad belo fronto, detajl |
| 205 | `2305-lp06858.webp` | 2023/05/LiparDesignPhotography-06858.jpg | kopalnice-galerija | kopalnice/ | Viseča hrastova omarica z dvema umivalnikoma |
| 206 | `2305-lp06876.webp` | 2023/05/LiparDesignPhotography-06876.jpg | kopalnice-galerija | kopalnice/ | Viseča hrastova omarica z umivalnikom in okroglim ogledalom |
| 207 | `2305-lp06874.webp` | 2023/05/LiparDesignPhotography-06874.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica s predali pod umivalnikom |
| 208 | `2305-lp06877.webp` | 2023/05/LiparDesignPhotography-06877.jpg | kopalnice-galerija | kopalnice/ | Hrastova kopalniška omarica s predali, pogled od spredaj |
| 209 | `2210-pohistvojereb-cerknica-2-e9914.webp` | 2022/10/PohistvoJereb_Cerknica-2.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica z ogledalom nad umivalnikom |
| 210 | `2210-pohistvojereb-cerknica-3-36ec9.webp` | 2022/10/PohistvoJereb_Cerknica-3.jpg | kopalnice-galerija | kopalnice/ | Kopalnica s hrastovo omarico z ogledalom in umivalnikom |
| 211 | `2210-pohistvojereb-cerknica-11-afddb.webp` | 2022/10/PohistvoJereb_Cerknica-11.jpg | kopalnice-galerija | kopalnice/ | Kopalnica s hrastovimi omarami in umivalnikom |
| 212 | `2210-pohistvojereb-cerknica-5-7c5fc.webp` | 2022/10/PohistvoJereb_Cerknica-5.jpg | kopalnice-galerija | kopalnice/ | Visoka hrastova omara ob kadi |
| 213 | `2210-pohistvojereb-cerknica-7-1837f.webp` | 2022/10/PohistvoJereb_Cerknica-7.jpg | kopalnice-galerija | kopalnice/ | Hrastova viseča omara nad straniščem |
| 214 | `2210-pohistvojereb-cerknica-8-74b0d.webp` | 2022/10/PohistvoJereb_Cerknica-8.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica z ogledalom in osvetlitvijo |
| 215 | `2210-pohistvojereb-cerknica-9-d3429.webp` | 2022/10/PohistvoJereb_Cerknica-9.jpg | kopalnice-galerija | kopalnice/ | Hrastova kopalniška omarica in ogledalo |
| 216 | `2210-pohistvojereb-cerknica-12-5bf25.webp` | 2022/10/PohistvoJereb_Cerknica-12.jpg | kopalnice-galerija | kopalnice/ | Kopalnica s hrastovo omarico pod umivalnikom in kadjo |
| 217 | `2210-jereb-skofja-loka-48d44.webp` | 2022/10/Jereb_Skofja_Loka-78.jpg | kopalnice-galerija | kopalnice/ | Viseča hrastova omarica z belim umivalnikom |
| 218 | `2210-jereb-skofja-loka-4cc79.webp` | 2022/10/Jereb_Skofja_Loka-77.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica z odprtima predaloma pod umivalnikom |
| 219 | `2210-jereb-skofja-loka-374cf.webp` | 2022/10/Jereb_Skofja_Loka-81.jpg | kopalnice-galerija | kopalnice/ | Kopalnica z umivalnikom in hrastovo omarico, pogled od zgoraj |
| 220 | `2210-jereb-skofja-loka-1178f.webp` | 2022/10/Jereb_Skofja_Loka-83.jpg | kopalnice-galerija | kopalnice/ | Kopalnica s hrastovo omarico in pralnim strojem v stolpcu |
| 221 | `2210-jereb-skofja-loka-f7bc9.webp` | 2022/10/Jereb_Skofja_Loka-85.jpg | kopalnice-galerija | kopalnice/ | Kopalnica z izvlečnimi predali ob pralnem stroju |
| 222 | `2210-jereb-skofja-loka-31d91.webp` | 2022/10/Jereb_Skofja_Loka-86.jpg | kopalnice-galerija | kopalnice/ | Izvlečni predal za čistila pod pultom |
| 223 | `2210-jereb-skofja-loka-17335.webp` | 2022/10/Jereb_Skofja_Loka-114.jpg | kopalnice-galerija | kopalnice/ | Izvlečni predal nad pralnim strojem in hrastova omarica |
| 224 | `2210-jereb-skofja-loka-cd476.webp` | 2022/10/Jereb_Skofja_Loka-115.jpg | kopalnice-galerija | kopalnice/ | Izvlečen pult nad pralnim strojem |
| 225 | `2111-kopalnica-po-meri-720db.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-10.jpg | kopalnice-galerija | kopalnice/ | Kopalnica z belo omarico in lesenim pultom |
| 226 | `2111-kopalnica-po-meri-38042.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-5.jpg | kopalnice-galerija | kopalnice/ | Bela omarica z lesenim pultom in umivalnikom |
| 227 | `2111-kopalnica-po-meri-fe50b.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-7.jpg | kopalnice-galerija | kopalnice/ | Bela fronta in lesen pult, detajl |
| 228 | `2111-kopalnica-po-meri-6dcff.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-1.jpg | kopalnice-galerija | kopalnice/ | Bela viseča omarica z lesenim pultom in okroglim ogledalom |
| 229 | `2103-kopalnica-po-meri-d9fa9.webp` | 2021/03/kopalnica-po-meri-steklo-les-notranja-oprema-pohistvo-jereb-oprema-po-vasi-meri-2.jpg | kopalnice-galerija | kopalnice/ | Pogled skozi steklena vrata v kopalnico |
| 230 | `2103-kopalnica-po-meri-ec623.webp` | 2021/03/kopalnica-po-meri-steklo-les-notranja-oprema-pohistvo-jereb-oprema-po-vasi-meri-1.jpg | kopalnice-galerija | kopalnice/ | Kopalnica z lesenim stropom in belo omarico |
| 231 | `2111-kopalnica-po-meri-38b14.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-3.jpg | kopalnice-galerija | kopalnice/ | Dolga bela viseča omarica z lesenim pultom |
| 232 | `2111-kopalnica-po-meri-3afe4.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-8.jpg | kopalnice-galerija | kopalnice/ | Bela fronta brez ročaja, detajl |
| 233 | `2111-kopalnica-po-meri-88d22.webp` | 2021/11/kopalnica-po-meri-lesene-kopalnice-notranja-oprema-pohistvo-jereb-kokra-4.jpg | kopalnice-galerija | kopalnice/ | Umivalnik na lesenem pultu nad belimi predali |
| 234 | `2110-dsc0408.webp` | 2021/10/DSC0408.jpg | kopalnice-galerija | kopalnice/ | Dolga hrastova viseča omarica z osvetljenim ogledalom |
| 235 | `2110-dsc0419.webp` | 2021/10/DSC0419.jpg | kopalnice-galerija | kopalnice/ | Hrastova kopalniška omarica s predali in brisačo |
| 236 | `2110-dsc0467.webp` | 2021/10/DSC0467.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica ob tušu |
| 237 | `2110-dsc0476.webp` | 2021/10/DSC0476.jpg | kopalnice-galerija | kopalnice/ | Hrastova viseča omarica ob tušu |
| 238 | `2110-dsc0396.webp` | 2021/10/DSC0396.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica s svetlim pultom in umivalnikom |
| 239 | `2110-dsc0416.webp` | 2021/10/DSC0416.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica z odprtim predalom |
| 240 | `2111-kopalnica-wc-po-55b8b.webp` | 2021/11/kopalnica-wc-po-meri-les-notranja-oprema-pohistvo-jereb-interier-2.jpg | kopalnice-galerija | kopalnice/ | Kopalnica s temno omarico, lesenim pultom in okroglim ogledalom |
| 241 | `2111-kopalnica-wc-po-b8a4f.webp` | 2021/11/kopalnica-wc-po-meri-les-notranja-oprema-pohistvo-jereb-interier-1.jpg | kopalnice-galerija | kopalnice/ | Lesen pult z umivalnikom in okroglo ogledalo |
| 242 | `2111-kopalnica-wc-po-ef923.webp` | 2021/11/kopalnica-wc-po-meri-les-notranja-oprema-pohistvo-jereb-interier-4.jpg | kopalnice-galerija | kopalnice/ | Lesen pult in temna fronta pod umivalnikom |
| 243 | `2111-kopalnica-wc-po-94b5b.webp` | 2021/11/kopalnica-wc-po-meri-les-notranja-oprema-pohistvo-jereb-interier-3.jpg | kopalnice-galerija | kopalnice/ | Umivalnik na lesenem pultu, detajl |
| 244 | `2110-dsc0178.webp` | 2021/10/DSC0178.jpg | kopalnice-galerija | kopalnice/ | Temne lesene omarice z dvojnim umivalnikom |
| 245 | `2110-dsc0214.webp` | 2021/10/DSC0214.jpg | kopalnice-galerija | kopalnice/ | Temne lesene omarice z odprtimi predali |
| 246 | `2110-dsc0219.webp` | 2021/10/DSC0219.jpg | kopalnice-galerija | kopalnice/ | Temna lesena obloga ob straniščem in lesena klop |
| 247 | `2110-dsc0206.webp` | 2021/10/DSC0206.jpg | kopalnice-galerija | kopalnice/ | Temne viseče omarice z odprtimi vrati |
| 248 | `2110-dsc0199.webp` | 2021/10/DSC0199.jpg | kopalnice-galerija | kopalnice/ | Visoka omara s policami za brisače |
| 249 | `2104-pohistvo-jereb-oprema-301b0.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-36-of-50.jpg | kopalnice-galerija | kopalnice/ | Lesene kocke-police ob ogledalu |
| 250 | `2104-pohistvo-jereb-oprema-261e8.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-37-of-50.jpg | kopalnice-galerija | kopalnice/ | Omarica v lesnem dekorju z umivalnikom in policami na steni |
| 251 | `2104-pohistvo-jereb-oprema-ece67.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-38-of-50.jpg | kopalnice-galerija | kopalnice/ | Rob lesene police pod umivalnikom, detajl |
| 252 | `2104-pohistvo-jereb-oprema-ba37c.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-33-of-50.jpg | kopalnice-galerija | kopalnice/ | Viseči leseni kocki na steni kopalnice |
| 253 | `2104-pohistvo-jereb-oprema-db2dc.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-30-of-50.jpg | kopalnice-galerija | kopalnice/ | Viseči leseni omarici z vratci, detajl |
| 254 | `2104-pohistvo-jereb-oprema-feaae.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-29-of-50.jpg | kopalnice-galerija | kopalnice/ | Lesena omarica z odprtim predalom pod umivalnikom |
| 255 | `2110-dsc0967.webp` | 2021/10/DSC0967.jpg | kopalnice-galerija | kopalnice/ | Bela omarica z lesenim robom pod dvojnim umivalnikom |
| 256 | `2110-dsc0972.webp` | 2021/10/DSC0972.jpg | kopalnice-galerija | kopalnice/ | Bele fronte z lesenim okvirjem, detajl |
| 257 | `2110-dsc0975.webp` | 2021/10/DSC0975.jpg | kopalnice-galerija | kopalnice/ | Bele viseče omarice z lesenimi policami |
| 258 | `2110-dsc0977.webp` | 2021/10/DSC0977.jpg | kopalnice-galerija | kopalnice/ | Bele viseče omarice in lesena polica nad straniščem |
| 259 | `2104-kopalnisko-pohistvo-po-6f4ec.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-wc-stranisce-kotlicek-vgradni-mozaik-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija, kopalnice-po-meri | kopalnice/ | Hrastova omarica s predali ob mozaiku |
| 260 | `2104-kopalnisko-pohistvo-po-5e6b1.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-prostor-shranjevanje-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica s predali pod umivalnikom in ogledalom |
| 261 | `2104-kopalnisko-pohistvo-po-738cf.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-prostor-za-shranjevanje-pohistvo-jereb-izdelava-kopalniskega-pohistva-resitev-za-lijak-odtok-pametne-resitve.jpg | kopalnice-galerija | kopalnice/ | Odprt hrastov predal z izrezom za sifon |
| 262 | `2104-kopalnisko-pohistvo-po-c9e43.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-resitev-odtok-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Odprt hrastov predal z notranjim predalom |
| 263 | `2104-predal-vgrajeni-rocaji-11ab6.webp` | 2021/04/predal-vgrajeni-rocaji-kopalniska-oprema-po-meri-narocilu-izdelava-kopalniska-omarica-umivalnik-leseno-pohistvo-lesena-kopalnica-pohistvo-jereb-izdelava-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastov predal ob oknu, detajl |
| 264 | `2104-masivna-natur-les-f6cf3.webp` | 2021/04/masivna-natur-les-kopalniska-oprema-po-meri-narocilu-izdelava-kopalniska-omarica-umivalnik-leseno-pohistvo-lesena-kopalnica-pohistvo-jereb-izdelava-pohistva.jpg | kopalnice-galerija | kopalnice/ | Masivna hrastova kopalniška omarica s predali |
| 265 | `2104-kopalniska-oprema-po-46322.webp` | 2021/04/kopalniska-oprema-po-meri-narocilu-izdelava-kopalniska-omarica-umivalnik-leseno-pohistvo-lesena-kopalnica-pohistvo-jereb-izdelava-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastova omarica z dvema umivalnikoma ob oknu |
| 266 | `2104-kopalniske-luci-kopalnica-8e1ae.webp` | 2021/04/kopalniske-luci-kopalnica-po-meri-pohistvo-jereb-izdelava-pohistva.jpg | kopalnice-galerija | kopalnice/ | Odsev v ogledalu nad hrastovim pultom |
| 267 | `2104-kopalnisko-pohistvo-po-cd75f.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-kad-obloga-masivna-les-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Kad z obrobo iz masivnega hrasta |
| 268 | `2104-kopalniska-osvetlitev-notranje-10494.webp` | 2021/04/kopalniska-osvetlitev-notranje-luci-zvezdno-nebo-led-luci-kopalnica-dodatek-pohistvo-jereb-izdelava-pohistva-po-meri.jpg | kopalnice-galerija | kopalnice/ | Strop z vgrajeno prho nad kadjo |
| 269 | `2104-kopalniska-osvetlitev-notranje-b9e51.webp` | 2021/04/kopalniska-osvetlitev-notranje-luci-zvezdno-nebo-led-luci-kopalnica-dodatek-pohistvo-jereb-izdelava-pohistva-po-meri-narocilu.jpg | kopalnice-galerija | kopalnice/ | Kopalnica z balkonskimi vrati in kadjo |
| 270 | `2104-dsc0198.webp` | 2021/04/DSC0198.jpg | kopalnice-galerija | kopalnice/ | Lesena obloga ob umivalniku, detajl |
| 271 | `2104-dsc0187.webp` | 2021/04/DSC0187.jpg | kopalnice-galerija | kopalnice/ | Lesena fronta s tipko za izplakovanje, detajl |
| 272 | `2104-kopalnisko-pohistvo-po-1c3d2.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-stenska-obloga-detalj-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastov pult s temno omarico in umivalnikom |
| 273 | `2104-kopalnisko-pohistvo-po-f0770.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-crna-bela-les-detalj-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastov pult in temna fronta, pogled od zgoraj |
| 274 | `2104-kopalnisko-pohistvo-po-2ba75.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-bela-relief-3d-stenska-obloga-detalj-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Temna viseča omarica s hrastovim pultom |
| 275 | `2104-dsc9794.webp` | 2021/04/DSC_9794.jpg (dvojnik: 2021/05/DSC_9794.jpg) | notranja-vrata-galerija | kopalnice/, vrata/ | Vrata v hrastovem furnirju in pogled v kopalnico |
| 276 | `2105-dsc9781.webp` | 2021/05/DSC_9781.jpg | kopalnice-galerija | kopalnice/ | Bela omarica in hrastova obloga za ogledalom |
| 277 | `2105-dsc9722.webp` | 2021/05/DSC_9722.jpg | kopalnice-galerija | kopalnice/ | Bela omarica s hrastovim pultom in umivalnikom |
| 278 | `2105-dsc0760.webp` | 2021/05/DSC0760.jpg | kopalnice-galerija | kopalnice/ | Umivalnik na hrastovem pultu nad belo omarico |
| 279 | `2105-dsc0762.webp` | 2021/05/DSC0762.jpg | kopalnice-galerija | kopalnice/ | Hrastov pult in bela omarica, detajl |
| 280 | `2105-dsc0776.webp` | 2021/05/DSC0776.jpg | kopalnice-galerija | kopalnice/ | Hrastov regal ob pralnem stroju |
| 281 | `2105-dsc9787.webp` | 2021/05/DSC_9787.jpg | kopalnice-galerija | kopalnice/ | Bele police in hrastov okvir okoli pralnega stroja |
| 282 | `2105-dsc9789.webp` | 2021/05/DSC_9789.jpg | kopalnice-galerija | kopalnice/ | Bela omara z nišo za pralni stroj |
| 283 | `2104-kopalnisko-pohistvo-po-ff1ef.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-z-ogledalom-les-bela-detalj-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Bela omarica s hrastovo odprto polico |
| 284 | `2104-kopalnisko-pohistvo-po-57846.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-dodatna-lesena-stenska-omara-brez-vidnih-rocajev-pohistvo-jereb-izdelava-kopalniskega-pohistva-.jpg | kopalnice-galerija | kopalnice/ | Hrastova viseča omarica in bel pult |
| 285 | `2104-kopalnisko-pohistvo-po-34d60.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-stenska-prostor-za-shranjevanje-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastova odprta polica na steni |
| 286 | `2104-kopalnisko-pohistvo-po-7ea5d.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-bela-les-lesena-omarica-umivalnik-z-ogledalom-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Ozka hrastova viseča omarica ob ogledalu |
| 287 | `2104-kopalnisko-pohistvo-po-84ee0.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-za-na-steno-stenska-prostor-za-shranjevanje-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastova odprta polica nad pultom |
| 288 | `2104-kopalnisko-pohistvo-po-6ae1a.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-dodatna-stenska-prostor-za-shranjevanje-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | kopalnice-galerija | kopalnice/ | Hrastova viseča polica nad nišo s kamenčki |
| 289 | `2104-notranja-vrata-kljuka-d4ed9.webp` | 2021/04/notranja-vrata-kljuka-pogled-v-kopalnica-po-meri-brez-vidnih-podbojev-pohistvo-jereb-izdelava-pohistva.jpg | kopalnice-galerija, notranja-vrata-galerija | kopalnice/, vrata/ | Bela visoka omara z odprtimi vrati, detajl |
| 290 | `2104-kopalnisko-pohistvo-po-5c1dd.webp` | 2021/04/kopalnisko-pohistvo-po-meri-narocilu-kopalnica-lesena-omarica-umivalnik-prostor-za-shranjevanje-pohistvo-jereb-izdelava-kopalniskega-pohistva.jpg | home, kopalnice-galerija | kopalnice/ | Umivalnik na hrastovem okvirju z belim predalom |
| 291 | `2104-kopalnica-po-meri-dda10.webp` | 2021/04/kopalnica-po-meri-kopalniska-oprema-omare-lesena-omarica-umivalnik-visoki-sijaj-les-masiva-prostor-za-shranjevanje-natur-po-narocilu-pohistvo-jereb.jpg | kopalnice-galerija | kopalnice/ | Hrastov okvir z belim predalom in policami za brisače |
| 292 | `2104-kopalnica-po-meri-363c2.webp` | 2021/04/kopalnica-po-meri-kopalniska-oprema-omare-lesena-omarica-umivalnik-visoki-sijaj-les-masiva-natur-vgrajeni-rocaji-po-narocilu-pohistvo-jereb.jpg | kopalnice-galerija | kopalnice/ | Hrastov okvir pod umivalnikom, detajl |
| 293 | `2104-kopalnica-po-meri-a7d46.webp` | 2021/04/kopalnica-po-meri-kopalniska-oprema-omare-lesena-omarica-umivalnik-visoki-sijaj-les-masiva-po-narocilu-pohistvo-jereb.jpg | kopalnice-galerija | kopalnice/ | Ozek hrastov pult z umivalnikom ob vratih |
| 294 | `2104-kopalnice-po-meri-ebfcb.webp` | 2021/04/kopalnice-po-meri-kopalniska-oprema-lesena-masivna-omarica-za-kopalnico-pohistvo-jereb-izdelava-pohistva.jpg | kopalnice-galerija | kopalnice/ | Bele omarice s hrastovim pultom in visoka omara |
| 295 | `2104-kopalniska-omarica-umivalnikom-75d56.webp` | 2021/04/kopalniska-omarica-umivalnikom-po-meri-kopalnica-pohistvo-jereb-izdelava-kopalniske-opreme-pohistva.jpg | kopalnice-galerija | kopalnice/ | Bela omarica pod umivalnikom z ovalnim ogledalom |
| 296 | `2104-kopalniska-oprema-po-d2349.webp` | 2021/04/kopalniska-oprema-po-meri-izdelava-omaric-za-kopalnico-kopalnica-izdelava-pohistvo-jereb.jpg | kopalnice-galerija | kopalnice/ | Bele omare in hrastova obloga v kopalnici |
| 297 | `2104-pohistvo-jereb-oprema-47a4b.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-18-of-50.jpg | kopalnice-galerija, kopalnice-po-meri | kopalnice/ | Viseč pult v lesnem dekorju z okroglim umivalnikom in policami |
| 298 | `2104-pohistvo-jereb-oprema-47ca4.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-17-of-50.jpg | kopalnice-galerija, kopalnice-po-meri, notranja-vrata-galerija | kopalnice/, vrata/ | Lesen pult z umivalnikom in okroglo ogledalo |
| 299 | `2104-pohistvo-jereb-oprema-058b4.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-1-of-50.jpg | kopalnice-galerija | kopalnice/ | Lesen pult z umivalnikom in kockami na steni |
| 300 | `2104-pohistvo-jereb-oprema-1776f.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-2-of-50.jpg | kopalnice-galerija | kopalnice/ | Viseč lesen pult s policama na steni |
| 301 | `2210-lp03740.webp` | 2022/10/LiparDesignPhotography-03740.jpg | otroske-sobe-galerija | otroske-sobe/ | Otroška soba z belo posteljo in hrastovo delovno ploščo |
| 302 | `2210-lp03742.webp` | 2022/10/LiparDesignPhotography-03742.jpg | otroske-sobe-galerija | otroske-sobe/ | Bela postelja z vzglavjem in hrastovo polico |
| 303 | `2210-lp03744.webp` | 2022/10/LiparDesignPhotography-03744.jpg | otroske-sobe-galerija | otroske-sobe/ | Bel ročaj v obliki zareze, detajl |
| 304 | `2210-lp03746.webp` | 2022/10/LiparDesignPhotography-03746.jpg | otroske-sobe-galerija | otroske-sobe/ | Bela postelja pod oknom |
| 305 | `2210-lp03747.webp` | 2022/10/LiparDesignPhotography-03747.jpg | otroske-sobe-galerija | otroske-sobe/ | Bela otroška soba s posteljo in visoko omaro |
| 306 | `2210-lp03749.webp` | 2022/10/LiparDesignPhotography-03749.jpg | otroske-sobe-galerija | otroske-sobe/ | Otroška soba z rožnato steno in hrastovim vzglavjem |
| 307 | `2210-lp03750.webp` | 2022/10/LiparDesignPhotography-03750.jpg | otroske-sobe-galerija | otroske-sobe/ | Delovni kotiček s hrastovo pisalno mizo in belim predalnikom |
| 308 | `2210-lp03751.webp` | 2022/10/LiparDesignPhotography-03751.jpg | otroske-sobe-galerija | otroske-sobe/ | Otroška soba s posteljo, pisalno mizo in hrastovo omaro |
| 309 | `2111-otroske-sobe-po-f6f88.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-14.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastove stopnice z vgrajenimi omaricami |
| 310 | `2111-otroske-sobe-po-0381b.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-15.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova vrata in bele omare pod stopnicami |
| 311 | `2111-otroske-sobe-po-b5893.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-17.jpg | otroske-sobe-galerija | otroske-sobe/ | Stopnice z vgrajenimi predali v mansardi |
| 312 | `2111-otroske-sobe-po-f1882.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-1.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastove stopnice z omaricami in lesenimi letvami |
| 313 | `2111-otroske-sobe-po-245e5.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-10.jpg | otroske-sobe-galerija | otroske-sobe/ | Bele omare in predali pod oknom |
| 314 | `2111-otroske-sobe-po-bfa57.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-9.jpg | otroske-sobe-galerija | otroske-sobe/ | Bele omare z lesenimi nišami ob oknu |
| 315 | `2111-otroske-sobe-po-ec5f4.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-8.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova niša v beli omari z igračami |
| 316 | `2111-otroske-sobe-po-12d17.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-11.jpg | otroske-sobe-galerija | otroske-sobe/ | Odprt predal v hrastovi stopnici |
| 317 | `2111-otroske-sobe-po-c2d61.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-6.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova stopnica z izvlečnim predalom |
| 318 | `2111-otroske-sobe-po-d13c1.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-16.jpg | otroske-sobe-galerija | otroske-sobe/ | Stopnice z vgrajenimi omaricami, pogled od spodaj |
| 319 | `2111-otroske-sobe-po-9cc55.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-2.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastove stopnice z belimi predali |
| 320 | `2111-otroske-sobe-po-c2558.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-3.jpg | otroske-sobe-galerija | otroske-sobe/ | Izvlečni predali v stopnicah |
| 321 | `2111-otroske-sobe-po-1b791.webp` | 2021/11/otroske-sobe-po-meri-stopnice-omara-inovativnost-resitev-notranja-oprema-shranjevanje-otroski-razvoj-igra-pohistvo-jereb-5.jpg | otroske-sobe-galerija | otroske-sobe/ | Stopnice z vgrajenimi policami, pogled od zgoraj |
| 322 | `2105-dsc9769.webp` | 2021/05/DSC_9769.jpg | otroske-sobe-galerija, otroske-sobe-po-meri | otroske-sobe/ | Pisalna miza pod oknom in hrastov pod |
| 323 | `2105-dsc9754.webp` | 2021/05/DSC_9754.jpg | otroske-sobe-galerija, otroske-sobe-po-meri | otroske-sobe/ | Stopnice z belimi omarami in hrastovimi stopnicami |
| 324 | `2105-dsc9780-1.webp` | 2021/05/DSC_9780-1.jpg (dvojnik: 2021/05/DSC_9780.jpg) | otroske-sobe-galerija | otroske-sobe/ | Bela omara s hrastovim okvirjem in majhno nišo |
| 325 | `2105-dsc9752.webp` | 2021/05/DSC_9752.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastove stopnice-police v otroški sobi |
| 326 | `2105-dsc0766.webp` | 2021/05/DSC0766.jpg | otroske-sobe-galerija | otroske-sobe/ | Bele police in hrastova stopnica, detajl |
| 327 | `2105-dsc0769.webp` | 2021/05/DSC0769.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova stopnica nad belo omarico |
| 328 | `2105-dsc0783.webp` | 2021/05/DSC0783.jpg | otroske-sobe-galerija, otroske-sobe-po-meri | otroske-sobe/ | Hrastove stopnice z odprto nišo |
| 329 | `2105-dsc0786.webp` | 2021/05/DSC0786.jpg | otroske-sobe-galerija | otroske-sobe/ | Stopnice iz hrastovih polic nad belimi omarami |
| 330 | `2105-dsc9776.webp` | 2021/05/DSC_9776.jpg | otroske-sobe-galerija | otroske-sobe/ | Otroška soba s pisalno mizo pod oknom |
| 331 | `2105-dsc9763.webp` | 2021/05/DSC_9763.jpg | otroske-sobe-galerija | otroske-sobe/ | Bela omara s hrastovim okvirjem in nizke omarice |
| 332 | `2105-dsc0765.webp` | 2021/05/DSC0765.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastov rob in bela fronta z rožnatim gumbom, detajl |
| 333 | `2105-dsc0775.webp` | 2021/05/DSC0775.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova niša v beli steni omare |
| 334 | `2105-dsc9759.webp` | 2021/05/DSC_9759.jpg | otroske-sobe-galerija | otroske-sobe/ | Bele omare s hrastovimi stopnicami |
| 335 | `2105-dsc9768.webp` | 2021/05/DSC_9768.jpg | otroske-sobe-galerija | otroske-sobe/ | Pisalna miza ob oknu in hrastov pod, pogled od zgoraj |
| 336 | `2105-dsc9770.webp` | 2021/05/DSC_9770.jpg | otroske-sobe-galerija | otroske-sobe/ | Bela omara s hrastovim okvirjem in odprto polico |
| 337 | `2104-dsc0519.webp` | 2021/04/DSC0519.jpg | otroske-sobe-galerija | otroske-sobe/ | Otroška soba pod poševnino s posteljo in pisalno mizo |
| 338 | `2104-dsc0523.webp` | 2021/04/DSC0523.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova postelja in beli predali pod poševnino |
| 339 | `2104-dsc0525.webp` | 2021/04/DSC0525.jpg | otroske-sobe-galerija | otroske-sobe/ | Lesen regal pod poševnino v otroški sobi |
| 340 | `2105-otroske-sobe-po-0be31.webp` | 2021/05/otroske-sobe-po-meri-masivno-pohistvo-masivna-lesena-postelja-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-galerija | otroske-sobe/ | Postelja s hrastovim podnožjem pod poševnino |
| 341 | `2104-dsc0514.webp` | 2021/04/DSC0514.jpg | otroske-sobe-galerija | otroske-sobe/ | Hrastova postelja s predalom, detajl |
| 342 | `2105-dekliska-soba-pisalna-df9d9.webp` | 2021/05/dekliska-soba-pisalna-miza-roza-za-deklice-otroska-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-galerija | otroske-sobe/ | Otroška soba z rožnatimi predali in pisalno mizo |
| 343 | `2105-lesene-otroske-sobe-7b3de.webp` | 2021/05/lesene-otroske-sobe-pohistvo-po-meri-dekliska-roza-barva-soba-za-otroke-lesena-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-galerija | otroske-sobe/ | Pisalna miza z rožnatimi predali |
| 344 | `2105-otroske-sobe-po-896ae.webp` | 2021/05/otroske-sobe-po-meri-soba-za-deklice-roza-barve-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-galerija | otroske-sobe/ | Postelja z rožnatim izvlečnim ležiščem |
| 345 | `2105-otroska-soba-pohistvo-83103.webp` | 2021/05/otroska-soba-pohistvo-po-meri-barve-spalnica-izdelava-pohistva-pohistvo-jereb.jpg | otroske-sobe-galerija | otroske-sobe/ | Pisalna miza z zelenimi predali |
| 346 | `2105-otroske-sobe-omare-ac7dd.webp` | 2021/05/otroske-sobe-omare-montaza-omara-po-meri-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-galerija | otroske-sobe/ | Siva drsna vrata ob oknu |
| 347 | `2105-dsc1087.webp` | 2021/05/DSC1087.jpg | otroske-sobe-po-meri | otroske-sobe/ | Bela delovna miza pod oknom in nizke omarice |
| 348 | `2105-mladinska-otroska-soba-0b2b7.webp` | 2021/05/mladinska-otroska-soba-po-meri-narocilu-miza-postelja-nocna-omarica-okenska-polica-masivna-lesena-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-po-meri | otroske-sobe/ | Mladinska soba s posteljo pod strešnim oknom |
| 349 | `2105-otroske-sobe-mladinske-821b2.webp` | 2021/05/otroske-sobe-mladinske-sobe-po-meri-masivno-pohistvo-lesena-soba-les-masiva-pohistvo-jereb-izdelava-pohistva.jpg | otroske-sobe-po-meri | otroske-sobe/ | Hrastova postelja s predalom in pisalna miza |
| 350 | `2104-crna-presdoba-vgradna-eeaa2.webp` | 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-klet-ogledalo-omara-prostor-za-shranjevanje-vgrajena-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Temno modra vrata brez vidnega podboja v leseni steni |
| 351 | `2104-velika-lesena-crna-71041.webp` | 2021/04/velika-lesena-crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-omara-prostor-za-shranjevanje-vgrajena-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Temno modre vgradne omare in osvetljena niša |
| 352 | `2104-dsc0142.webp` | 2021/04/DSC0142.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Temno modre omare in vrata v hodniku |
| 353 | `2104-crna-presdoba-vgradna-8cd36.webp` | 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-klet-ogledalo-vgrajena-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Hodnik s temno modrimi vrati in leseno oblogo |
| 354 | `2104-dsc0130.webp` | 2021/04/DSC0130.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Temno modre vgradne omare z osvetlitvijo |
| 355 | `2104-dsc0160.webp` | 2021/04/DSC0160.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Skriti tečaj in ključavnica vrat, detajl |
| 356 | `2104-velika-lesena-crna-5701c.webp` | 2021/04/velika-lesena-crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-detajl-panti-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | notranja-vrata-galerija | vrata/ | Skriti tečaj temno modrih vrat, detajl |
| 357 | `2104-crna-presdoba-vgradna-f9864.webp` | 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-omara-prostor-za-shranjevanje-detajl-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Zapiralo vrat ob leseni oblogi, detajl |
| 358 | `2104-crna-presdoba-vgradna-4ff02.webp` | 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-masiva-les-detajl-vodila-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb-1.jpg (dvojnik: 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-masiva-les-detajl-vodila-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg) | predsobe-galerija | vrata/, predsobe/ | Rob temno modrih vrat ob leseni steni, detajl |
| 359 | `2104-pohistvo-jereb-oprema-42a33.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-28-of-50.jpg | notranja-vrata-galerija, notranja-vrata-po-meri | vrata/ | Notranja vrata v lesenem furnirju na hodniku |
| 360 | `2104-pohistvo-jereb-oprema-9b481.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-15-of-50.jpg | notranja-vrata-galerija | vrata/ | Kljuka na vratih v lesenem furnirju, detajl |
| 361 | `2104-pohistvo-jereb-oprema-a75a6.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-35-of-50.jpg | notranja-vrata-galerija | vrata/ | Odprta vrata v lesenem furnirju s pogledom na hodnik |
| 362 | `2104-pohistvo-jereb-oprema-65bc0.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-50-of-50.jpg | notranja-vrata-galerija | vrata/ | Rob vrat v lesenem furnirju s kljuko, detajl |
| 363 | `2104-dsc0267.webp` | 2021/04/DSC0267.jpg | notranja-vrata-galerija | vrata/ | Bela vrata brez vidnega podboja |
| 364 | `2104-notranja-vrata-brez-1319a.webp` | 2021/04/notranja-vrata-brez-vidnih-podbojev-bela-les-masivno-pohistvo-izdelava-po-meri-visoka-pohistvo-jereb.jpg | notranja-vrata-galerija | vrata/ | Bela vrata, poravnana s steno, na koncu hodnika |
| 365 | `2104-dsc0146.webp` | 2021/04/DSC0146.jpg | notranja-vrata-galerija | vrata/ | Skriti tečaj belih vrat, detajl |
| 366 | `2104-mladinska-otroska-soba-ae174.webp` | 2021/04/mladinska-otroska-soba-nocna-omarica-lesena-bela-notranja-vrata-bela-brez-vidnih-podbojev-po-meri-narocilu-miza-masivna-lesena-pohistvo-jereb-izdelava-pohistva.jpg | notranja-vrata-galerija | vrata/ | Odprta bela vrata v spalnico |
| 367 | `2104-notranja-vrata-brez-32bb1.webp` | 2021/04/notranja-vrata-brez-vidnih-podbojev-oprema-pohistvo-po-meri-narocilu-les-masivna-vrata-lesena-pohistvo-jereb-izdelava-pohistva.jpg | notranja-vrata-galerija | vrata/ | Bela vrata brez podboja, odpiranje s kljuko |
| 368 | `2104-kuhinja-po-meri-e1a90.webp` | 2021/04/kuhinja-po-meri-prehod-natur-moderna-kuhinjski-elementi-pohistvo-jereb-izdelava-kuhinj-pohistva.jpg | notranja-vrata-galerija | vrata/ | Bela vrata in omare, poravnane s steno, ob kuhinji |
| 369 | `2104-dsc0202.webp` | 2021/04/DSC0202.jpg | notranja-vrata-galerija, notranja-vrata-po-meri | vrata/ | Rob belih vrat brez podboja, detajl |
| 370 | `2104-dsc0338.webp` | 2021/04/DSC0338.jpg | notranja-vrata-galerija | vrata/ | Hodnik z leseno oblogo in temnimi vrati |
| 371 | `2104-dsc0358.webp` | 2021/04/DSC0358.jpg | notranja-vrata-galerija | vrata/ | Temno modra vrata v leseni steni |
| 372 | `2104-dsc0361.webp` | 2021/04/DSC0361.jpg | notranja-vrata-galerija | vrata/ | Temna vrata ob stopnišču z lesenimi stenami |
| 373 | `2104-dsc0360.webp` | 2021/04/DSC0360.jpg | notranja-vrata-galerija | vrata/ | Temno modra vrata in lesena obloga, detajl kljuke |
| 374 | `2104-pohistvo-jereb-oprema-27a68.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-25-of-50.jpg | notranja-vrata-galerija, notranja-vrata-po-meri | vrata/ | Steklena drsna vrata, detajl vodila |
| 375 | `2104-pohistvo-jereb-oprema-40a96.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-26-of-50.jpg | notranja-vrata-galerija | vrata/ | Vodilo drsnih vrat pod stropom, detajl |
| 376 | `2104-izdelava-kuhinja-po-444cb.webp` | 2021/04/izdelava-kuhinja-po-meri-notranja-vrata-shramba-brez-vidnih-podbojev-kuhinjski-elementi-kuhinjska-oprema-po-meri-pohistvo-jereb-izdelava-pohistva.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Hodnik s pogledom na hrastove stopnice |
| 377 | `2104-vrata-po-meri-b7c0d.webp` | 2021/04/vrata-po-meri-montaza-vgradnja-vrat-izdelava-pohistvo-jereb-izdelava-pohistva.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Bela vrata s hrastovim podbojem |
| 378 | `2104-predsoba-po-meri-46857.webp` | 2021/04/predsoba-po-meri-izdelava-obesalniki-omare-presdoba-shranjevanje-za-cevlje-shranjevanje-izdelava-pohistva-pohistvo-jereb.jpg | notranja-vrata-galerija, predsobe-galerija | vrata/, predsobe/ | Predsoba z belo vgradno omaro in hrastovimi nišami |
| 379 | `2104-dsc9587.webp` | 2021/04/DSC_9587.jpg | notranja-vrata-galerija | vrata/ | Bela vrata s hrastovim podbojem ob omari |
| 380 | `2104-dsc0722.webp` | 2021/04/DSC0722.jpg | notranja-vrata-galerija | vrata/ | Hrastova notranja vrata s podbojem |
| 381 | `2104-dsc0719.webp` | 2021/04/DSC0719.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata s kovinsko kljuko, detajl |
| 382 | `2104-dsc0720.webp` | 2021/04/DSC0720.jpg | notranja-vrata-galerija | vrata/ | Kljuka na hrastovih vratih, detajl |
| 383 | `2104-dsc9764.webp` | 2021/04/DSC_9764.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata in bela omara s hrastovim okvirjem |
| 384 | `2104-dsc9805.webp` | 2021/04/DSC_9805.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata in hrastova stenska obloga |
| 385 | `2104-dsc9829.webp` | 2021/04/DSC_9829.jpg | notranja-vrata-galerija | vrata/ | Odprta hrastova vrata |
| 386 | `2104-dsc9838.webp` | 2021/04/DSC_9838.jpg | notranja-vrata-galerija | vrata/ | Hodnik s hrastovimi vrati na obeh straneh |
| 387 | `2110-dsc0961.webp` | 2021/10/DSC0961.jpg | notranja-vrata-galerija | vrata/ | Notranja vrata v temnem orehovem furnirju |
| 388 | `2110-dsc0007.webp` | 2021/10/DSC0007.jpg | notranja-vrata-galerija | vrata/ | Bela vrata na hodniku ob stopnišču |
| 389 | `2111-notranja-vrata-les-d9674.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-6.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata ob temni steni |
| 390 | `2111-notranja-vrata-les-0a81f.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-7.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata z grčami |
| 391 | `2111-notranja-vrata-les-57591.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-5.jpg | notranja-vrata-galerija | vrata/ | Rob hrastovih vrat in kljuka, detajl |
| 392 | `2111-notranja-vrata-les-f27fa.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-8.jpg | notranja-vrata-galerija | vrata/ | Odprta hrastova vrata s pogledom v sobo |
| 393 | `2111-notranja-vrata-les-1c5f4.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-9.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata z belim podbojem na hodniku |
| 394 | `2111-notranja-vrata-les-6edb1.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-10.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata in temna stena, detajl kljuke |
| 395 | `2111-notranja-vrata-les-a19a4.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-11.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata s horizontalnimi linijami |
| 396 | `2111-notranja-vrata-les-2e421.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-12.jpg | notranja-vrata-galerija | vrata/ | Dvoje hrastovih vrat na hodniku |
| 397 | `2111-notranja-vrata-les-dda81.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-13.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata z belim robom |
| 398 | `2111-notranja-vrata-les-f246d.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-14.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata ob beli vgradni omari |
| 399 | `2111-notranja-vrata-les-d2929.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-1.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata ob oknu in rastlini |
| 400 | `2111-notranja-vrata-les-cfbc9.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-2.jpg | notranja-vrata-galerija | vrata/ | Hrastova vrata pod lesenim stropom |
| 401 | `2111-notranja-vrata-les-e7861.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-3.jpg | notranja-vrata-galerija | vrata/ | Odprta hrastova vrata v shrambo |
| 402 | `2111-notranja-vrata-les-ecd03.webp` | 2021/11/notranja-vrata-les-natur-notranja-oprema-po-meri-po-narocilu-pohistvo-jereb-4.jpg | notranja-vrata-galerija | vrata/ | Hodnik s hrastovimi vrati in lesenim stropom |
| 403 | `2202-notranja-vrata-trebnje-2d418.webp` | 2022/02/notranja-vrata-Trebnje-83.jpg | notranja-vrata-galerija | vrata/ | Bele vgradne omare in vrata pod stopnicami |
| 404 | `2202-notranja-vrata-trebnje-86687.webp` | 2022/02/notranja-vrata-Trebnje-74.jpg | notranja-vrata-galerija | vrata/ | Siva vrata in omare brez vidnih podbojev v steni |
| 405 | `2202-notranja-vrata-trebnje-53bdb.webp` | 2022/02/notranja-vrata-Trebnje-102.jpg | notranja-vrata-galerija | vrata/ | Bele vgradne omare in vrata pod poševnino |
| 406 | `2202-notranja-vrata-trebnje-3c4c6.webp` | 2022/02/notranja-vrata-Trebnje-70.jpg | notranja-vrata-galerija | vrata/ | Skriti tečaj, detajl |
| 407 | `2104-lp03772.webp` | 2021/04/LiparDesignPhotography-03772.jpg | notranja-vrata-galerija | vrata/ | Skriti tečaj na belih vratih, detajl |
| 408 | `2104-lp03779.webp` | 2021/04/LiparDesignPhotography-03779.jpg | notranja-vrata-galerija | vrata/ | Kljukica v obliki volka na beli fronti, detajl |
| 409 | `2104-dsc0428.webp` | 2021/04/DSC0428.jpg | notranja-vrata-po-meri, predsobe-galerija | vrata/, predsobe/ | Bele omare pod hrastovimi stopnicami |
| 410 | `2104-dsc1013.webp` | 2021/04/DSC1013.jpg | category_predsobe, notranja-vrata-po-meri, predsobe-galerija, predsobe-po-meri | vrata/, predsobe/ | Hrastova stenska obloga z obešalnikom |
| 411 | `2305-lp06813.webp` | 2023/05/LiparDesignPhotography-06813.jpg | predsobe-galerija | predsobe/ | Hodnik s hrastovo steno in skritimi vrati |
| 412 | `2305-lp06814.webp` | 2023/05/LiparDesignPhotography-06814.jpg | predsobe-galerija | predsobe/ | Dolg hodnik s hrastovimi oblogami |
| 413 | `2305-lp06817.webp` | 2023/05/LiparDesignPhotography-06817.jpg | predsobe-galerija | predsobe/ | Predsoba s temno stekleno omaro in hrastovo nišo s klopjo |
| 414 | `2305-lp06821.webp` | 2023/05/LiparDesignPhotography-06821.jpg | predsobe-galerija | predsobe/ | Hrastova obloga z velikim ogledalom v predsobi |
| 415 | `2305-lp06868.webp` | 2023/05/LiparDesignPhotography-06868.jpg | predsobe-galerija | predsobe/ | Osvetljeno ogledalo v hrastovi steni |
| 416 | `2305-lp06913.webp` | 2023/05/LiparDesignPhotography-06913.jpg | predsobe-galerija | predsobe/ | Bela predsobna omara s hrastovo nišo in obešalnikom |
| 417 | `2305-lp06914.webp` | 2023/05/LiparDesignPhotography-06914.jpg | predsobe-galerija | predsobe/ | Bele omare pod poševnino s hrastovo nišo |
| 418 | `2305-lp06921.webp` | 2023/05/LiparDesignPhotography-06921.jpg | predsobe-galerija | predsobe/ | Hrastova niša s klopjo in kljukicami v beli omari |
| 419 | `2210-lp03724.webp` | 2022/10/LiparDesignPhotography-03724.jpg | predsobe-galerija | predsobe/ | Bela omara s hrastovimi letvicami in klopjo |
| 420 | `2210-lp03727.webp` | 2022/10/LiparDesignPhotography-03727.jpg | predsobe-galerija | predsobe/ | Predsoba z belo omaro in hrastovimi letvicami |
| 421 | `2210-lp03733.webp` | 2022/10/LiparDesignPhotography-03733.jpg | predsobe-galerija | predsobe/ | Viseča hrastova omarica in okroglo ogledalo |
| 422 | `2210-lp03736.webp` | 2022/10/LiparDesignPhotography-03736.jpg | predsobe-galerija | predsobe/ | Hrastov viseči predalnik v predsobi |
| 423 | `2210-jereb-skofja-loka-9d093.webp` | 2022/10/Jereb_Skofja_Loka-64.jpg | predsobe-galerija | predsobe/ | Predsoba s pregrado iz hrastovih letev in ogledalom |
| 424 | `2210-jereb-skofja-loka-5cf92.webp` | 2022/10/Jereb_Skofja_Loka-65.jpg | predsobe-galerija | predsobe/ | Predsoba s hrastovo klopjo in osvetljenim ogledalom |
| 425 | `2210-jereb-skofja-loka-a791b.webp` | 2022/10/Jereb_Skofja_Loka-67.jpg | predsobe-galerija | predsobe/ | Predsoba z belimi omarami in hrastovim predalom |
| 426 | `2210-jereb-skofja-loka-9402c.webp` | 2022/10/Jereb_Skofja_Loka-68.jpg | predsobe-galerija | predsobe/ | Predsoba z osvetljenim ogledalom in belimi omarami |
| 427 | `2210-jereb-skofja-loka-5df16.webp` | 2022/10/Jereb_Skofja_Loka-70.jpg | predsobe-galerija | predsobe/ | Osvetljeno ogledalo in hrastova polica v predsobi |
| 428 | `2210-jereb-skofja-loka-9c9a1.webp` | 2022/10/Jereb_Skofja_Loka-71.jpg | predsobe-galerija | predsobe/ | Pregrada iz hrastovih letev s kljukicami za jakne |
| 429 | `2210-jereb-skofja-loka-01eb6.webp` | 2022/10/Jereb_Skofja_Loka-72.jpg | predsobe-galerija | predsobe/ | Hrastove letve z obešalniki, detajl |
| 430 | `2210-jereb-skofja-loka-97fbb.webp` | 2022/10/Jereb_Skofja_Loka-74.jpg | predsobe-galerija | predsobe/ | Hrastove kljuke na steni, detajl |
| 431 | `2111-predsoba-po-meri-f2ca4.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-11.jpg | predsobe-galerija | predsobe/ | Bela omara s hrastovo nišo za sedenje |
| 432 | `2111-predsoba-po-meri-32f51.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-3.jpg | predsobe-galerija | predsobe/ | Hrastova niša nad belimi predali |
| 433 | `2111-predsoba-po-meri-55ec9.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-5.jpg | predsobe-galerija | predsobe/ | Hrastova niša s klopjo in prostorom za čevlje |
| 434 | `2111-predsoba-po-meri-f337c.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-6.jpg | predsobe-galerija | predsobe/ | Osvetlitev v hrastovi niši, detajl |
| 435 | `2111-predsoba-po-meri-81dfa.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-7.jpg | predsobe-galerija | predsobe/ | Hrastova niša z osvetlitvijo in okrasnim psom |
| 436 | `2111-predsoba-po-meri-95960.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-9.jpg | predsobe-galerija | predsobe/ | Hodnik s hrastovimi vrati in temnimi tlemi |
| 437 | `2111-predsoba-po-meri-1f3f0.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-8.jpg | predsobe-galerija | predsobe/ | Hrastova vrata na koncu hodnika |
| 438 | `2111-predsoba-po-meri-623c9.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-4.jpg | predsobe-galerija | predsobe/ | Bela omara in prostor za čevlje pod hrastovo nišo |
| 439 | `2111-predsoba-po-meri-b6403.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-12.jpg | predsobe-galerija | predsobe/ | Bela predsobna omara z osvetljeno hrastovo nišo |
| 440 | `2111-predsoba-po-meri-48a1c.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-13.jpg | predsobe-galerija | predsobe/ | Bele vgradne omare in hrastova vrata |
| 441 | `2111-predsoba-po-meri-61194.webp` | 2021/11/predsoba-po-meri-pohistvo-jereb-notranja-oprema-vhod-garderoba-2.jpg | predsobe-galerija | predsobe/ | Mehanizem dvižne fronte, detajl |
| 442 | `2104-dsc0170.webp` | 2021/04/DSC0170.jpg | predsobe-galerija | predsobe/ | Sive vgradne omare v predsobi |
| 443 | `2104-crna-presdoba-vgradna-5c89b.webp` | 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-omara-prostor-za-shranjevanje-led-luci-razsvetljava-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | predsobe-galerija | predsobe/ | Temno modre omare pod lesenim stropom |
| 444 | `2104-crna-presdoba-vgradna-2ccfd.webp` | 2021/04/crna-presdoba-vgradna-omara-brez-vidnih-podbojev-rocajev-notranja-vrata-omara-prostor-za-shranjevanje-vgrajena-les-izdelava-pohistva-po-meri-narocilu-pohistvo-jereb.jpg | predsobe-galerija | predsobe/ | Temno modra vrata in omare z leseno oblogo |
| 445 | `2104-dsc0163.webp` | 2021/04/DSC0163.jpg | predsobe-galerija | predsobe/ | Lesena obloga in visoka omara ob vhodu |
| 446 | `2104-dsc0172.webp` | 2021/04/DSC0172.jpg | predsobe-galerija | predsobe/ | Bele omare z izvlečnim predalom v predsobi |
| 447 | `2104-dsc0186.webp` | 2021/04/DSC0186.jpg | predsobe-galerija | predsobe/ | Izvlečni beli predal, detajl |
| 448 | `2104-dsc9652.webp` | 2021/04/DSC_9652.jpg | predsobe-galerija | predsobe/ | Hrastova obloga s kljukami in oblazinjena klop |
| 449 | `2104-dsc9641.webp` | 2021/04/DSC_9641.jpg | predsobe-galerija | predsobe/ | Hrastova stena z obešalniki in hrastova vrata |
| 450 | `2104-dsc0731.webp` | 2021/04/DSC0731.jpg | predsobe-galerija | predsobe/ | Okrogle kljuke na hrastovi oblogi |
| 451 | `2104-dsc9642.webp` | 2021/04/DSC_9642.jpg | predsobe-galerija | predsobe/ | Oblazinjena klop s predalom v hrastovem okvirju |
| 452 | `2104-dsc9646.webp` | 2021/04/DSC_9646.jpg | predsobe-galerija | predsobe/ | Hrastova klop s predalom in kljukami |
| 453 | `2104-dsc9653.webp` | 2021/04/DSC_9653.jpg | predsobe-galerija, predsobe-po-meri | predsobe/ | Predsoba s hrastovo klopjo in hodnikom |
| 454 | `2104-dsc0717.webp` | 2021/04/DSC0717.jpg | predsobe-galerija | predsobe/ | Bele omare in hrastova vrata v predsobi |
| 455 | `2104-dsc9659.webp` | 2021/04/DSC_9659.jpg | predsobe-galerija | predsobe/ | Predsoba z belimi omarami in hrastovim pultom |
| 456 | `2104-dsc9625.webp` | 2021/04/DSC_9625.jpg | predsobe-galerija | predsobe/ | Hrastov predal za čevlje in hodnik |
| 457 | `2104-dsc9631.webp` | 2021/04/DSC_9631.jpg | predsobe-galerija | predsobe/ | Bela visoka omara ob hrastovih vratih |
| 458 | `2104-dsc9798.webp` | 2021/04/DSC_9798.jpg | predsobe-galerija | predsobe/ | Bele police okoli okna s sedežem |
| 459 | `2104-dsc9801.webp` | 2021/04/DSC_9801.jpg | predsobe-galerija | predsobe/ | Sedežna klop ob oknu in police |
| 460 | `2104-dsc0779.webp` | 2021/04/DSC0779.jpg | predsobe-galerija | predsobe/ | Klop z izvlečnimi predali pod oknom |
| 461 | `2104-dsc9807.webp` | 2021/04/DSC_9807.jpg | predsobe-galerija | predsobe/ | Hrastova vrata in klop ob oknu |
| 462 | `2104-dsc9804.webp` | 2021/04/DSC_9804.jpg | predsobe-galerija | predsobe/ | Oblazinjena klop pod oknom in hrastov rob |
| 463 | `2104-dsc0777.webp` | 2021/04/DSC0777.jpg | predsobe-galerija | predsobe/ | Izvlečni predal pod klopjo |
| 464 | `2104-dsc9812.webp` | 2021/04/DSC_9812.jpg | predsobe-galerija | predsobe/ | Bela omara s hrastovim pultom in policami |
| 465 | `2104-dsc9815.webp` | 2021/04/DSC_9815.jpg | predsobe-galerija | predsobe/ | Bela omara s hrastovim pultom na hodniku |
| 466 | `2104-dsc9818.webp` | 2021/04/DSC_9818.jpg | predsobe-galerija | predsobe/ | Bela omarica s hrastovo ploščo ob oknu |
| 467 | `2104-dsc9809.webp` | 2021/04/DSC_9809.jpg | predsobe-galerija | predsobe/ | Nizka bela omarica s hrastovim pultom |
| 468 | `2104-dsc9714.webp` | 2021/04/DSC_9714.jpg | predsobe-galerija | predsobe/ | Predsoba s hrastovimi vrati in lesenimi stopnicami |
| 469 | `2104-dsc0553.webp` | 2021/04/DSC0553.jpg | predsobe-galerija | predsobe/ | Hrastova polica s kljukami za jakne |
| 470 | `2104-dsc0551.webp` | 2021/04/DSC0551.jpg | predsobe-galerija | predsobe/ | Hrastove kljuke na steni z jakno |
| 471 | `2104-dsc0545.webp` | 2021/04/DSC0545.jpg | predsobe-galerija | predsobe/ | Bela stena z luknjami in premičnimi lesenimi kljukami |
| 472 | `2104-dsc0546.webp` | 2021/04/DSC0546.jpg | predsobe-galerija | predsobe/ | Bela luknjičasta stena z leseno polico |
| 473 | `2104-dsc0549.webp` | 2021/04/DSC0549.jpg | predsobe-galerija | predsobe/ | Lesene kljuke in polica za čelade in kape |
| 474 | `2104-dsc0555.webp` | 2021/04/DSC0555.jpg | predsobe-galerija | predsobe/ | Bele omare z okroglimi luknjami |
| 475 | `2104-dsc0492-2.webp` | 2021/04/DSC0492-2.jpg | predsobe-galerija | predsobe/ | Hodnik z lesenimi stopnicami in rdečimi vrati |
| 476 | `2104-dsc0430.webp` | 2021/04/DSC0430.jpg | predsobe-galerija | predsobe/ | Spodnji rob omare pod stopnicami, detajl |
| 477 | `2104-dsc0504.webp` | 2021/04/DSC0504.jpg | predsobe-galerija | predsobe/ | Bele omare pod stopnicami z lesenimi letvami |
| 478 | `2104-dsc0489.webp` | 2021/04/DSC0489.jpg | predsobe-galerija | predsobe/ | Lesene stopnice med stenama |
| 479 | `2104-dsc0427.webp` | 2021/04/DSC0427.jpg | predsobe-galerija | predsobe/ | Bele omare pod stopnicami in lesene letve ograje |
| 480 | `2104-lesena-predsoba-iz-1b8d3.webp` | 2021/04/lesena-predsoba-iz-lesa-masivno-pohistvo-masiva-lesene-omare-po-meri-pohistvo-jereb-izdelava-pohistva-1.jpg | predsobe-galerija | predsobe/ | Hrastova niša s kljukami in police ob vhodu |
| 481 | `2104-obesalnik-predsoba-po-85e4d.webp` | 2021/04/obesalnik-predsoba-po-meri-pohistvo-jereb-izdelava-pohistva.jpg | predsobe-galerija | predsobe/ | Hodnik s hrastovo steno in klopjo |
| 482 | `2104-predsoba-s-klopjo-e161f.webp` | 2021/04/predsoba-s-klopjo-po-meri-lesena-bela-iz-lesa-izdelava-vgradnja-montaza-pohistva-po-narocilu-obesalniki-klop-lesena-masivna-garderobna-omara-prostor-za-cevlje-predal.jpg | predsobe-galerija | predsobe/ | Hrastova obloga s kljuko, detajl |
| 483 | `2104-dsc1004.webp` | 2021/04/DSC1004.jpg | predsobe-galerija | predsobe/ | Hrastova obloga s kljuko in bele omare |
| 484 | `2104-dsc1008.webp` | 2021/04/DSC1008.jpg | predsobe-galerija | predsobe/ | Kovinska kljuka na hrastovi oblogi, detajl |
| 485 | `2104-dsc1001.webp` | 2021/04/DSC1001.jpg | predsobe-galerija | predsobe/ | Hrastova niša s kljuko in bela omara |
| 486 | `2104-dsc1011.webp` | 2021/04/DSC1011.jpg | predsobe-galerija | predsobe/ | Hrastov rob in bela fronta, detajl |
| 487 | `2104-dsc0071.webp` | 2021/04/DSC0071.jpg | predsobe-po-meri | predsobe/ | Hrastov okvir prehoda in bele omare |
| 488 | `2104-pohistvo-jereb-oprema-a89d5.webp` | 2021/04/pohistvo-jereb-oprema-po-meri-izdelava-pohistva-49-of-50.jpg | predsobe-po-meri | predsobe/ | Bele vgradne omare s hrastovo nišo v predsobi |
| 489 | `2211-lp08477.webp` | 2022/11/LiparDesignPhotography-08477.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba z belim TV elementom in hrastovimi letvami |
| 490 | `2211-lp08479.webp` | 2022/11/LiparDesignPhotography-08479.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Nizek bel TV element s hrastovimi poudarki |
| 491 | `2211-lp08480.webp` | 2022/11/LiparDesignPhotography-08480.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba s TV elementom in sedežno garnituro |
| 492 | `2211-lp08485.webp` | 2022/11/LiparDesignPhotography-08485.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba ob stopnišču s hrastovimi letvami |
| 493 | `2211-lp08490.webp` | 2022/11/LiparDesignPhotography-08490.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Pregrada iz letev ob stopnišču in kamin |
| 494 | `2211-lipardesignphotography-412aa.webp` | 2022/11/LiparDesignPhotography-.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Jedilna miza v dnevnem prostoru |
| 495 | `2211-lp08502.webp` | 2022/11/LiparDesignPhotography-08502.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Hrastova polica in letve, detajl |
| 496 | `2211-lp08507.webp` | 2022/11/LiparDesignPhotography-08507.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Hrastove letve ob stopnicah |
| 497 | `2210-lp03670.webp` | 2022/10/LiparDesignPhotography-03670.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba z belo steno omar in TV elementom |
| 498 | `2210-lp03672.webp` | 2022/10/LiparDesignPhotography-03672.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Bela stena omar s hrastovim TV elementom in pečjo |
| 499 | `2210-lp03675.webp` | 2022/10/LiparDesignPhotography-03675.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Bela vgradna stena s hrastovim nizkim elementom |
| 500 | `2210-lp03679.webp` | 2022/10/LiparDesignPhotography-03679.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Viseč hrastov TV element |
| 501 | `2210-lp03681.webp` | 2022/10/LiparDesignPhotography-03681.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Bela stena s TV in hrastovo polico ob peči |
| 502 | `2210-lp03683.webp` | 2022/10/LiparDesignPhotography-03683.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Hrastov TV element in bela stena z letvami |
| 503 | `2210-lp03685.webp` | 2022/10/LiparDesignPhotography-03685.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba z belo steno omar in sedežno garnituro |
| 504 | `2210-lp03686.webp` | 2022/10/LiparDesignPhotography-03686.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Odprt dnevni prostor z belo steno omar in TV elementom |
| 505 | `2210-jereb-skofja-loka-7dcad.webp` | 2022/10/Jereb_Skofja_Loka-62.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba z okroglo klubsko mizico |
| 506 | `2210-jereb-skofja-loka-d76c0.webp` | 2022/10/Jereb_Skofja_Loka-55.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Pogled čez kuhinjski otok v dnevni prostor |
| 507 | `2210-jereb-skofja-loka-74819.webp` | 2022/10/Jereb_Skofja_Loka-54.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Nizek bel TV element na kovinskih nogah |
| 508 | `2210-jereb-skofja-loka-9d4f6.webp` | 2022/10/Jereb_Skofja_Loka-39.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Bel TV element ob oknu |
| 509 | `2210-jereb-skofja-loka-c53d7.webp` | 2022/10/Jereb_Skofja_Loka-57.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevni prostor s kuhinjo in jedilno mizo |
| 510 | `2210-jereb-skofja-loka-7c529.webp` | 2022/10/Jereb_Skofja_Loka-59.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Dnevna soba ob jedilnem kotu |
| 511 | `2210-jereb-skofja-loka-9c7bf.webp` | 2022/10/Jereb_Skofja_Loka-61.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Okrogla klubska mizica, detajl |
| 512 | `2210-jereb-skofja-loka-345c1.webp` | 2022/10/Jereb_Skofja_Loka-34.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Kuhinja z jedilno mizo in dnevni prostor |
| 513 | `2202-dnevna-soba-trebnje-16e63.webp` | 2022/02/dnevna-soba_Trebnje-38.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Mansardni dnevni prostor z osvetljenimi hrastovimi policami |
| 514 | `2202-dnevna-soba-trebnje-3c6a5.webp` | 2022/02/dnevna-soba_Trebnje-45.jpg | dnevne-sobe-galerija, dnevne-sobe-po-meri | dnevne-sobe/ | Mansarda z jedilno mizo in hrastovim regalom |
| 515 | `2202-dnevna-soba-trebnje-f780b.webp` | 2022/02/dnevna-soba_Trebnje-55.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Hrastov regal z osvetlitvijo pod poševnino |
| 516 | `2202-dnevna-soba-trebnje-f8f77.webp` | 2022/02/dnevna-soba_Trebnje-90.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Osvetljene hrastove police za sedežno garnituro |
| 517 | `2202-dnevna-soba-trebnje-de3d5.webp` | 2022/02/dnevna-soba_Trebnje-49.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Stena iz lesenih letev in TV element pod poševnino |
| 518 | `2202-dnevna-soba-trebnje-5c600.webp` | 2022/02/dnevna-soba_Trebnje-89.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Lesene letve ob sedežni garnituri, detajl |
| 519 | `2202-dnevna-soba-trebnje-bf4c1.webp` | 2022/02/dnevna-soba_Trebnje-47.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Hrastova obloga in osvetljena polica v mansardi |
| 520 | `2202-dnevna-soba-trebnje-609ec.webp` | 2022/02/dnevna-soba_Trebnje-84.jpg | dnevne-sobe-galerija | dnevne-sobe/ | Osvetljena hrastova niša, detajl |
| 521 | `2202-pj-trebnje-41-f04ce.webp` | 2022/02/PJ_Trebnje-41.jpg | dnevne-sobe-po-meri | dnevne-sobe/ | Mansarda s hrastovim regalom in kuhinjo v ozadju |
| 522 | `2202-pj-trebnje-58-4ddf5.webp` | 2022/02/PJ_Trebnje-58.jpg | dnevne-sobe-po-meri | dnevne-sobe/ | Visok hrastov regal z osvetljenimi policami |
| 523 | `2305-lp06843.webp` | 2023/05/LiparDesignPhotography-06843.jpg | spalnice-galerija | spalnice/ | Spalnica s posteljo in temnimi garderobnimi omarami |
| 524 | `2305-lp06846.webp` | 2023/05/LiparDesignPhotography-06846.jpg | spalnice-galerija | spalnice/ | Spalnica z odprto garderobo in temnimi omarami |
| 525 | `2305-lp06848.webp` | 2023/05/LiparDesignPhotography-06848.jpg | spalnice-galerija | spalnice/ | Spalnica z odprto hrastovo garderobo |
| 526 | `2305-lp06849.webp` | 2023/05/LiparDesignPhotography-06849.jpg | spalnice-galerija | spalnice/ | Odprta garderoba s hrastovo zadnjo steno ob postelji |
| 527 | `2305-lp06853.webp` | 2023/05/LiparDesignPhotography-06853.jpg | spalnice-galerija | spalnice/ | Spalnica s predalnikom in pogledom v kopalnico |
| 528 | `2305-lp06855.webp` | 2023/05/LiparDesignPhotography-06855.jpg | spalnice-galerija | spalnice/ | Siv predalnik v spalnici |
| 529 | `2305-lp06862.webp` | 2023/05/LiparDesignPhotography-06862.jpg | spalnice-galerija | spalnice/ | Izvlečni predali v garderobi, detajl |
| 530 | `2305-lp06865.webp` | 2023/05/LiparDesignPhotography-06865.jpg | spalnice-galerija | spalnice/ | Odprta garderoba z obešalniki in predali |
| 531 | `2210-lp03752.webp` | 2022/10/LiparDesignPhotography-03752.jpg | spalnice-galerija | spalnice/ | Spalnica s hrastovo posteljo in belim predalnikom |
| 532 | `2210-lp03753.webp` | 2022/10/LiparDesignPhotography-03753.jpg | spalnice-galerija | spalnice/ | Hrastova postelja in bele garderobne omare |
| 533 | `2210-lp03755.webp` | 2022/10/LiparDesignPhotography-03755.jpg | spalnice-galerija | spalnice/ | Bel predalnik ob hrastovi postelji |
| 534 | `2210-lp03756.webp` | 2022/10/LiparDesignPhotography-03756.jpg | spalnice-galerija | spalnice/ | Lebdeča postelja z osvetlitvijo spodaj |
| 535 | `2210-jereb-skofja-loka-ca502.webp` | 2022/10/Jereb_Skofja_Loka-92.jpg | spalnice-galerija | spalnice/ | Hrastova postelja z oblazinjenim vzglavjem |
| 536 | `2210-jereb-skofja-loka-4e1b2.webp` | 2022/10/Jereb_Skofja_Loka-95.jpg | spalnice-galerija | spalnice/ | Oblazinjeno vzglavje z lučko in nočno omarico |
| 537 | `2210-jereb-skofja-loka-b9190.webp` | 2022/10/Jereb_Skofja_Loka-99.jpg | spalnice-galerija | spalnice/ | Garderobna omara z odprtimi policami |
| 538 | `2210-jereb-skofja-loka-958bd.webp` | 2022/10/Jereb_Skofja_Loka-102.jpg | spalnice-galerija | spalnice/ | Drsna vrata garderobe in delovna miza |
| 539 | `2210-jereb-skofja-loka-83c04.webp` | 2022/10/Jereb_Skofja_Loka-97.jpg | spalnice-galerija | spalnice/ | Postelja z osvetljenim oblazinjenim vzglavjem |
| 540 | `2210-jereb-skofja-loka-c221f.webp` | 2022/10/Jereb_Skofja_Loka-98.jpg | spalnice-galerija | spalnice/ | Lebdeča hrastova postelja pod poševnino |
| 541 | `2210-jereb-skofja-loka-fe4bd.webp` | 2022/10/Jereb_Skofja_Loka-100-1.jpg (dvojnik: 2022/10/Jereb_Skofja_Loka-100.jpg) | spalnice-galerija | spalnice/ | Garderoba z drsnimi vrati in hrastova delovna plošča |
| 542 | `2210-jereb-skofja-loka-efefb.webp` | 2022/10/Jereb_Skofja_Loka-101.jpg | spalnice-galerija | spalnice/ | Garderobna omara z drsnimi vrati in osvetlitvijo |
| 543 | `2210-pohistvojereb-cerknica-47-8b0b1.webp` | 2022/10/PohistvoJereb_Cerknica-47.jpg | spalnice-galerija | spalnice/ | Spalnica z garderobno omaro z drsnimi vrati in posteljo |
| 544 | `2210-pohistvojereb-cerknica-60-7fb90.webp` | 2022/10/PohistvoJereb_Cerknica-60.jpg | spalnice-galerija | spalnice/ | Postelja s predali in vzglavjem v hrastovem dekorju |
| 545 | `2210-pohistvojereb-cerknica-51-8058a.webp` | 2022/10/PohistvoJereb_Cerknica-51.jpg | spalnice-galerija | spalnice/ | Izvlečni predali v garderobni omari ob postelji |
| 546 | `2210-pohistvojereb-cerknica-56-c1318.webp` | 2022/10/PohistvoJereb_Cerknica-56.jpg | spalnice-galerija | spalnice/ | Garderobna omara, zgornje omarice in pisalna miza v hrastovem dekorju |
| 547 | `2210-pohistvojereb-cerknica-49-41cba.webp` | 2022/10/PohistvoJereb_Cerknica-49.jpg | spalnice-galerija | spalnice/ | Odprta garderobna omara in pisalna miza s predali |
| 548 | `2210-pohistvojereb-cerknica-52-6e1db.webp` | 2022/10/PohistvoJereb_Cerknica-52.jpg | spalnice-galerija | spalnice/ | Postelja z izvlečnimi predali v hrastovem dekorju |
| 549 | `2210-pohistvojereb-cerknica-53-685a0.webp` | 2022/10/PohistvoJereb_Cerknica-53.jpg | spalnice-galerija | spalnice/ | Pisalna miza s predalnikom ob postelji |
| 550 | `2210-pohistvojereb-cerknica-61-2896a.webp` | 2022/10/PohistvoJereb_Cerknica-61.jpg | spalnice-galerija | spalnice/ | Pisalna miza s policami in predalnikom v hrastovem dekorju |
| 551 | `2210-jereb-skofja-loka-e5fb1.webp` | 2022/10/Jereb_Skofja_Loka-104.jpg | spalnice | spalnice/ | Garderobna omara z obešalnikom in izvlečnimi predali |
| 552 | `2210-pohistvojereb-cerknica-50-db3bf.webp` | 2022/10/PohistvoJereb_Cerknica-50.jpg | spalnice | spalnice/ | Odprti predali v garderobni omari |
