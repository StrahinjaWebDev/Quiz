Postovani FatCat Coders-i, 

Predstavljam Vam nacin resavanja task-a koji mi je dodeljen. 

Predstavljanje Task-a:

Zapazio sam da koristite Typescript, pa sam I ja odlucio da koristim Typescript za ovaj task. Razvio sam aplikaciju koja generise matricu dimenzija n * n, pri cemu se vrednost n moze konfigurisati preko .env fajlu.

Cilj zadatka je da se imaginarni objekat (MO) pomeri od pocetne koordinate do krajnje koordinate praveci pri tome odredjeni broj blokirajucih objekata (BO) sa svakim potezom MO.

BO se nasumicno postavljaju na matricu, sa namerom da ne zatvaraju sve dostupne putanje za MO. 

Koristio sam React ikone za prikaz matrice, pocetnih I krajnjih stanja  i ikone blokirajucih objekata radi vizualizacije. 

Pocetne i krajnje koordinate se takodje mogu konfigurisati preko .env datoteke, što omogućava fleksibilnost u testiranju razlicitih scenarija.

Aplikacija primenjuje pravila lintern-a da bi obezbedila čist kod. 

Implementirao sam funkciju koja generise BO na osnovu broja blokirajućih objekata navedenih u .env datoteci. 


Funkcija koristi While petlju za generisanje nasumicnih kordinata za BO pri cemu obezbedjuje da generisane koordinate nisu iste kao pocetne i krajnje koordinate kao i da nisu već zauzete drugim BO.

Testirao sam aplikaciju sa velicinama matrice od 5 * 5, 10 * 10 i 20 * 20, kao i  sa razlicitim brojem blokirajucih objekata od 1 do 5. 

Molim Vas da me obavestite ako imate bilo kakvih pitanja ili su vam potrebne dodatne informacije. 

Dodatne informacije:

Imam iskustva sa Scrum metodologijom I primenjujem je prilikom saradnje sa drugim developerom (koristim Linear).

Takodje bih dodao da sam poceo sa testiranjem funkcija u Jest-u ali da nisam uspeo da zavrsim testiranje.

Srdacan pozdrav, Strahinja. =^._.^= ∫
