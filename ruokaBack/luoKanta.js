const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("ruoka.db");

db.serialize(() => {
  let sql = "CREATE TABLE IF NOT EXISTS laatija (" +
    "idl integer PRIMARY KEY NOT NULL, " +
    "etunimi text NOT NULL, " +
    "paiva date, " +
    "kuva text)";
    
  db.run(sql, (err) => {
    if (err) {
      return console.log('laatija-luonti' + err.message);
    }
    console.log("Laatija-taulu luotu");
  })

  sql = "INSERT INTO `laatija` (`idl`,`etunimi`, `paiva`, `kuva`) " +
    " VALUES "
          + "(1, 'Minna', '15-2-2023', 'kuva1.jpg'),"
          + "(2, 'Iina', '18-2-2023', 'kuva2.jpg'),"
          + "(3, 'Matti', '15-1-2023', 'kuva3.png')";
  
  db.run(sql, (err) => {
    if (err) {
      return console.log('Laatija-tauluun lisäys '+ err.message);
    }
    console.log("Laatijarivit lisättiin");
  })

  sql = "CREATE TABLE IF NOT EXISTS resepti (" +
        "id integer PRIMARY KEY NOT NULL, " +
        "nimi text NOT NULL, " +
        "kuva text, " +
        "kuvaus text NOT NULL, " +
        "kesto integer NOT NULL, " +
        "ainekset text NOT NULL, " +
        "ohje text NOT NULL, " +
        "idl integer," +
        "FOREIGN KEY (idl) REFERENCES laatija (idl) )";
      
  db.run(sql, (err) => {
  if (err) {
    return console.log('resepti-luonti' + err.message);
  }    console.log("Resepti-taulu luotu");
  }) 
      
  sql = "INSERT INTO `resepti` (`id`, `nimi`, `kuva`, `kuvaus`, `kesto`, `ainekset`, `ohje`, `idl`) " +
      " VALUES "
      + "(1, 'Tomaattinen linssi-palvikinkkupata', 'linssipata.jpg', 'Maukas arkiruoka valmistuu kuivaruokakaapin tarvikkeista, säilykkeistä ja jääkaapissa hyvin säilyvistä tuotteista. Muhevuudestaan huolimatta, tämä ruokaisa pata ei vaadi pitkää haudutusaikaa. Pata maistuu maalaisleivän kanssa nautittuna tai lisukeriisin kanssa.', 15, '250g savukylkeä, 150 g sipulia hienonnettua, 2rkl vehnäjauhoja, 400g säilyketomaatteja, 380g esikeitettyjä punaisia linssejä, 2,5dl ruokakermaa, 1 kasvisliemikuutio, 35g suolakurkkua kuutioituna, ½tl sokeria, kuivattua ruohosipulia tai persiljaa.', 'Paloittele savukylki. Ruskista palat isossa valurautapadassa tai kattilassa kannen alla, lisää loppuvaiheessa hienonnettu sipuli. HUOM! Noudata erityistä varovaisuutta lihan ruskistamisessa ja käytä kantta. Liha ja rasva räiskyy voimakkaasti. Ennen sipulin lisäämistä, nosta astia sivuun sekoita ja sulje taas kansi. Ripottele joukkoon vehnäjauho. Kääntele hetki. Lisää joukkoon säilyketomaatit, huuhtele tölkit tilkkasella vettä. Lisää myös linssit, ruokakerma ja liemikuutio. Anna kiehua hiljalleen kannen alla 5 min. Jos käytät kuivattuja linssejä, huuhtele ne siivilässä ennen lisäämistä ja tarkista pakkauksesta kypsymisaika. Kuivatut linssit eivät sisällä suolaa, joten käytä silloin kokonainen liemikuutio ruokaan. Lisää suolakurkut ja mausta sokerilla. Viimeistele ruohosipulilla tai persiljalla. Tarjoa pata keitetyn riisin tai maalaisleivän kanssa.', 1),"//
      + "(2, 'Pestopasta', 'pestopasta.jpg', 'Joskus yksinkertaisuus on valttia. Tämän herkullisen pestopastan salaisuus on itse tehdyssä pestossa.', 30, '500g tuorepastaa, PESTO: 2 ruukkua tuoretta basilikaa, 2 valkosipulin kynttä, 75g cashewpähkinöitä, 1½dl oliiviöljyä, ½tl suolaa, 1½dl	Mustaleima raastetta. PÄÄLLE: ½dl Mustaleima raastetta, tuoretta basilikaa', 'Valmista pesto: Mittaa ainekset blenderiin tai mittakannuun. Soseuta blenderillä tai sauvasekoittimella, kunnes peston koostumus on sopivaa. Mausta suolalla ja pippurilla. Keitä pasta runsaassa suolalla maustetussa vedessä pakkauksen ohjeen mukaan. Sekoita pesto valutetun, kuuman pastan joukkoon. Viimeistele annokset juustoraasteella ja basilikalla. Tarjoa heti.', 1),"//
      + "(3, 'Unelmarahkatorttu', 'rahkatorttu.jpg', 'Unelmatorttu raikkaalla ja sitruunaisella rahka-kreemitäytteellä. Kääretorttu on vaivaton valmistaa ja siitä riittää isommallekkin porukalle herkutella.', 45, 'POHJA: 4 kananmunaa, 1½dl sokeria, 1dl perunajauhoja, ½dl kaakaojauhetta, 1tl leivinjauhetta. TÄYTE: 200g vaniljakreemiä, 200g sitruunarahkaa.', 'Vatkaa huoneenlämpöiset munat ja sokeri paksuksi, vaaleaksi vaahdoksi. Yhdistä kuivat aineet. Lisää ne siivilän läpi vaahtoon varovasti sekoittaen. Levitä taikina leivinpaperilla vuoratulle uunipellille. Paista 200 asteessa n. 8 min tai kunnes kypsä. Kumoa pohja sokerilla sirotetulle leivinpaperille. Irrota pohjapaperi. Sekoita kreemi ja rahka. Levitä seos jäähtyneelle kääretorttupohjalle. Kääri rullaksi. Anna tekeytyä hetki kylmässä ja leikkaa paloiksi.', 2),"//
    + "(4, 'Täytetyt avokadot', 'avocado.jpg', 'Katkaravuilla ja homejuustolla täytetyt avokadot.', 20, '1 avokado, 20 katkaravunpyrstöä, 2 rkl kermaviiliä, 2 rkl majoneesia, 2rkl sinihomejuustoa.', 'Leikkaa avokadot pitkittäin kahtia ja poista kivi. Täytä kolo katkaravuilla. Murusta homejuusto ja sekoita joukkoon kermaviili sekä majoneesi. Valuta kastike katkaravuille ja avokadonpuolikkaille.', 3)";
  
  db.run(sql, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Reseptit lisättiin");
  });
  
  db.each("SELECT idl, etunimi, paiva FROM laatija", function (err, row) {
      if (err) {
          return console.log(err.message);
        }
        console.log(row.idl + ", " + row.etunimi + ", " + row.paiva);
      });

  db.close();
})

 //tuli ilmoitus että ambiguous(epäselvä) idl
 // sql = "SELECT nimi, etunimi FROM resepti LEFT JOIN laatija ON laatija.idl=resepti.idl";

//  db.each("SELECT id, nimi FROM resepti", function (err, row) {
/*  db.each("SELECT idl, idl FROM resepti INNER JOIN laatija ON laatija.idl=resepti.idl", function (err, row) {
  if (err) {
      return console.log(err.message);
    }
    console.log(row.resepti.id + ", " + row.resepti.nimi + ", " + row.laatija.idl+", "+row.laatija.etunimi);
  });*/

/**, " +
        "idl integer NOT NULL, " +
        "FOREIGN KEY(idl) REFERENCES laatija(idl)) */


   //parallelize
//  db.run("CREATE TABLE laatija");
//  db.run("CREATE TABLE resepti");

/*	sql = "INSERT INTO `resepti` (`id`, `nimi`, `kuva`, `kuvaus`, `kesto`, `ainekset`, `ohje`) "+
    " VALUES (1, '', '', '', , '', '')";
    db.run(sql, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Resepti lisättiin");
    })
  */

      /*  sql = "INSERT INTO `resepti` (`nimi`, `kuva`, `kuvaus`, `kesto`, `ainekset`, `ohje`) "+
      " VALUES ('Pestopasta', 'pestopasta.jpg', 'Joskus yksinkertaisuus on valttia. Tämän herkullisen pestopastan salaisuus on itse tehdyssä pestossa.', 30, '500g tuorepastaa, PESTO: 2 ruukkua tuoretta basilikaa, 2 valkosipulin kynttä, 75g cashewpähkinöitä, 1½dl oliiviöljyä, ½tl suolaa, 1½dl	Mustaleima raastetta. PÄÄLLE: ½dl Mustaleima raastetta, tuoretta basilikaa', 'Valmista pesto: Mittaa ainekset blenderiin tai mittakannuun. Soseuta blenderillä tai sauvasekoittimella, kunnes peston koostumus on sopivaa. Mausta suolalla ja pippurilla. Keitä pasta runsaassa suolalla maustetussa vedessä pakkauksen ohjeen mukaan. Sekoita pesto valutetun, kuuman pastan joukkoon. Viimeistele annokset juustoraasteella ja basilikalla. Tarjoa heti.')";
      db.run(sql, (err) => {
          if (err) {
            return console.log(err.message);
          }
          console.log("Resepti 2 lisättiin");
      })
    
      sql = "INSERT INTO `resepti` (`nimi`, `kuva`, `kuvaus`, `kesto`, `ainekset`, `ohje`) "+
      " VALUES ('Unelmarahkatorttu', 'rahkatorttu.jpg', 'Unelmatorttu raikkaalla ja sitruunaisella rahka-kreemitäytteellä. Kääretorttu on vaivaton valmistaa ja siitä riittää isommallekkin porukalle herkutella.', 45, 'POHJA: 4 kananmunaa, 1½dl sokeria, 1dl perunajauhoja, ½dl kaakaojauhetta, 1tl leivinjauhetta. TÄYTE: 200g vaniljakreemiä, 200g sitruunarahkaa.', 'Vatkaa huoneenlämpöiset munat ja sokeri paksuksi, vaaleaksi vaahdoksi. Yhdistä kuivat aineet. Lisää ne siivilän läpi vaahtoon varovasti sekoittaen. Levitä taikina leivinpaperilla vuoratulle uunipellille. Paista 200 asteessa n. 8 min tai kunnes kypsä. Kumoa pohja sokerilla sirotetulle leivinpaperille. Irrota pohjapaperi. Sekoita kreemi ja rahka. Levitä seos jäähtyneelle kääretorttupohjalle. Kääri rullaksi. Anna tekeytyä hetki kylmässä ja leikkaa paloiksi.')";
      db.run(sql, (err) => {
          if (err) {
            return console.log(err.message);
          }
          console.log("Resepti 3 lisättiin");
      })
        
      sql = "INSERT INTO `resepti` (`nimi`, `kuva`, `kuvaus`, `kesto`, `ainekset`, `ohje`) "+
      " VALUES ('Täytetyt avokadot', 'avocado.jpg', 'Katkaravuilla ja homejuustolla täytetyt avokadot.', 20, '1 avokado, 20 katkaravunpyrstöä, 2 rkl kermaviiliä, 2 rkl majoneesia, 2rkl sinihomejuustoa.', 'Leikkaa avokadot pitkittäin kahtia ja poista kivi. Täytä kolo katkaravuilla. Murusta homejuusto ja sekoita joukkoon kermaviili sekä majoneesi. Valuta kastike katkaravuille ja avokadonpuolikkaille.')";
      db.run(sql, (err) => {
          if (err) {
            return console.log(err.message);
          }
          console.log("Resepti 4 lisättiin");
      })
    */