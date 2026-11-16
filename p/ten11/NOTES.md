# TEN11 – zapiski k predogledu (interno, ni za objavo)

Podjetje: TEN11, slaščičarna / sladoledarna, Ljubljanska cesta 19, 1330 Kočevje.
Vhodni podatki (orkestrator, Google Places prek Pindrop, 16. 11. 2026): ime, naslov,
telefon 064 128 340, brez spletne strani, lastnik neznan.

## Predlog 1 – arhetip: velika-tipografija

Ena misel na en zaslon, ogromne črke (Anton), brez skupnega skeleta (ni pill gumba
»Pokličite«, ni lepljive klicne vrstice, ni »Kako poteka«, ni FAQ). Lastna paleta:
skoraj črna (#141317), smetana (#f5efe3), pistacija-limeta (#c9f25b), mandarina
(#ff6a2b). Par pisav: Anton (naslovi) + Manrope (besedilo), oba že samogostovana
v tem repozitoriju (kopirano iz p/avtolep-portal in p/jana, podnabor »sl«).
Namerno drugačno od p/slascicarna-medo (mlečno roza, malina, Shrikhand, tenda).

Kaj dela stran lastno TEN11: številka »11« iz imena je narisana kot dva korneta
(SVG ilustracija), dve sladoledni kepici v barvah palete; vsebina sloni na
sporočilih z javnega Google profila (sladoled + burgerji, ocena, način strežbe).
Test zamenjave imena: »burgerji« + »sladoled« + »11 kot korneta« ne pašejo na
drugo sladoledarno.

## Izvorna dejstva (vsako z virom)

Vir A – Google Zemljevidi, javni profil podjetja, pregledano 16. 11. 2026:
https://www.google.com/maps?cid=14676516279431763411
(dolgi URL: https://www.google.com/maps/place/TEN11+sla%C5%A1%C4%8Di%C4%8Darna+in+okrep%C4%8Devalnics.p/@45.641473,14.8570186,17z/data=!3m1!4b1!4m6!3m5!1s0x4764ef96da4625b1:0xcbad75cbefc495d3!8m2!3d45.641473!4d14.8570186!16s%2Fg%2F11sr5ttwk0)

1. Ime profila: »TEN11 slaščičarna in okrepčevalnics.p« (tipkarska napaka v
   profilu; na strani zapisano kot »slaščičarna in okrepčevalnica«). Kategorija:
   Slaščičarna. Plus code: JVR4+HR Kočevje.
2. Ocena 4,9 od 5, 8 mnenj (Google opozarja: »Mnenja niso preverjena«).
3. Možnosti strežbe v profilu: Strežba na lokaciji · Za s seboj · Dostava.
4. Besedila mnenj (javna, brez imen na strani; vsa stara 3–4 leta):
   - »Najboljši burgerji v mestu res odlično!!« (pred 3 leti)
   - »Najboljši sladoled daleč naokoli« (pred 4 leti)
   - »Zelo dober sladoled« (pred 3 leti)
   - »Prijazno osebje.« (pred 4 leti)
   - »Postrezba top« (pred 3 leti)
   Iz tega: ponudba = sladoled IN burgerji (slaščičarna + okrepčevalnica).

Posebnost (izvorna): sladoledarna, ki ima po mnenjih tudi »najboljše burgerje v
mestu« – kombinacija sladoled + burgerji; ocena 4,9.

## Kaj NI uporabljeno in zakaj

- Delovni čas: na profilu 16. 11. (ponedeljek) »Odprto · Zapre se ob 22«. Ni na
  strani – ure se spreminjajo, ena opažena ura ni urnik.
- Imena ocenjevalcev: niso na strani (zasebnost), citati so anonimni in datirani.
- Cene, okusi, meni, leto ustanovitve, ime lastnika: nič izvornega, nič napisano.
- Fotografije s profila: last uporabnikov/lastnika, niso uporabljene. Na strani
  so samo lastne SVG ilustracije (označene »ilustracija«) in og.jpg, narejen
  lokalno (PIL, pisava Impact iz Windows) – ni fotografija.

## Negotovosti (za orkestratorja)

- Telefon 064 128 340 je iz vhodnih podatkov (Pindrop/Places). Na javnem
  Google profilu 16. 11. 2026 telefon NI prikazan (profil poziva »Dodajte
  telefonsko številko«). Pred pošiljanjem preveriti številko.
- Pravna oblika: profil namiguje na s.p., register (bizi.si, companywall.si)
  16. 11. 2026 za »TEN11« ne vrne zadetka → firma je verjetno drugačna; nič
  pravnega ni zapisano na strani (JSON-LD brez legalName).
- Iskanje po spletu (Bing, DuckDuckGo – ta je vrnil CAPTCHA) ni našlo FB/IG
  profila ali drugih omemb; prepovedane domene niso bile klicane.
- Mnenja so stara 3–4 leta; ponudba se je lahko spremenila.

## Datoteke

- p/ten11/index.html – izbirnik (noindex), predlogi 1–3 (2 in 3 gradi drug agent;
  opisa 2 in 3 sta nevtralna, označena s HTML komentarjem za zamenjavo)
- p/ten11/1/index.html – predlog 1
- p/ten11/assets/anton-sl.woff2, manrope-sl-wght400-800.woff2, og.jpg

## Predlog 2 – arhetip: cenik-tabla

Stran kot tabla v lokalu: lesen okvir, zelena šolska tabla, »kreda«. Na tabli
štiri vrstice (Sladoled, Burgerji, Za s seboj, Dostava), vsaka s pikicami in
»cene po telefonu« – nobene številke, ker cen ni iz vira. Pod vrsticama
sladoled/burgerji citata z Googla; druga, manjša tabla »Gostje so zapisali«
(4,9 / 8 mnenj, nepreverjena, trije kratki citati); listek s pripenjačo za naslov.
Paleta: stena #ddd3c2, les #7a4f2c, tabla #1e2a24, kreda #ece8dc, kreda rumena
#f3d36b, kreda roza #f2a7b5. Pisavi: Oswald 600 (napisi na tabli) + Lora 500
pokončna in ležeča (»ročni« zapisi). Kopirano iz p/servis-caserman in
p/salon-dotik v p/ten11/2/assets/ (latin + latin-ext).
Tabla je CSS/SVG ilustracija, označena na strani.

## Predlog 3 – arhetip: zemljevid-pot

Prvi zaslon je risan shematski zemljevid (SVG, označen »ilustracija · ni v
merilu«, brez imen ulic razen ciljne točke, brez reke/parka – nič izmišljene
geografije), rdeča pot do pina »11«. Nato naslov kot H1, »koordinatni« blok
(naslov, gps 45.641473, 14.8570186, plus code JVR4+HR, telefon), gumb na Google
Zemljevide (cid povezava), »Tri poti od nas do vas« = tri možnosti strežbe,
»Zapisano na zemljevidu« = trije citati + 4,9, temen pas s telefonom.
Navodil za pot (»zavijte pri ...«) NI – niso izvorna; pot vodi Google.
Paleta: papir #efe9dc / #e5ddcb, črnilo #18222f, pot rdeča #d9412b, modra
#3f7fbf (ikona), zelena #8fb57a (črta ob oceni), cesta #fbf8f1. Pisavi: Space
Grotesk 400/500 + IBM Plex Mono 400 (koordinate). Kopirano iz p/tattoo-pigment
in p/ak-refero v p/ten11/3/assets/.
