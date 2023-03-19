//import Resepti from "./components/Resepti";
import Laatijalista from "./components/Laatijalista";
import Reseptilista from "./components/Reseptilista";
import Reseptilomake from "./components/ReseptiLomake";

const resepti = {
  id: 1,
  nimi: "Täytetyt avokadot",
  kuvaus: "Katkaravuilla ja homejuustolla täytetyt avokadot.",
  ainekset:
    "1 avokado, 20 katkaravunpyrstöä, 2 rkl kermaviiliä, 2 rkl majoneesia, 2rkl sinihomejuustoa" /*{
    aines1: "1 avokado",
    aines2: "20 katkaravunpyrstöä",
    aines3: "2 rkl kermaviiliä",
    aines4: "2 rkl majoneesia",
    aines5: "2rkl sinihomejuustoa",
  },*/,
  ohje: "Leikkaa avokadot pitkittäin kahtia ja poista kivi. Täytä kolo katkaravuilla. Murusta homejuusto ja sekoita joukkoon kermaviili sekä majoneesi. Valuta kastike katkaravuille ja avokadonpuolikkaille.",
  kesto: 20,
};

const reseptitTaulukko = [
  {
    id: 1,
    nimi: "Tomaattinen linssi-palvikinkkupata",
    kuvaus:
      "Maukas arkiruoka valmistuu kuivaruokakaapin tarvikkeista, säilykkeistä ja jääkaapissa hyvin säilyvistä tuotteista. Muhevuudestaan huolimatta, tämä ruokaisa pata ei vaadi pitkää haudutusaikaa. Pata maistuu maalaisleivän kanssa nautittuna tai lisukeriisin kanssa.",
    kesto: 15,
    ainekset:
      "250g savukylkeä, 150 g sipulia hienonnettua, 2rkl vehnäjauhoja, 400g säilyketomaatteja, 380g esikeitettyjä punaisia linssejä, 2,5dl ruokakermaa, 1 kasvisliemikuutio, 35g suolakurkkua kuutioituna, ½tl sokeria, kuivattua ruohosipulia tai persiljaa.",
    ohje: "Paloittele savukylki. Ruskista palat isossa valurautapadassa tai kattilassa kannen alla, lisää loppuvaiheessa hienonnettu sipuli. HUOM! Noudata erityistä varovaisuutta lihan ruskistamisessa ja käytä kantta. Liha ja rasva räiskyy voimakkaasti. Ennen sipulin lisäämistä, nosta astia sivuun sekoita ja sulje taas kansi. Ripottele joukkoon vehnäjauho. Kääntele hetki. Lisää joukkoon säilyketomaatit, huuhtele tölkit tilkkasella vettä. Lisää myös linssit, ruokakerma ja liemikuutio. Anna kiehua hiljalleen kannen alla 5 min. Jos käytät kuivattuja linssejä, huuhtele ne siivilässä ennen lisäämistä ja tarkista pakkauksesta kypsymisaika. Kuivatut linssit eivät sisällä suolaa, joten käytä silloin kokonainen liemikuutio ruokaan. Lisää suolakurkut ja mausta sokerilla. Viimeistele ruohosipulilla tai persiljalla. Tarjoa pata keitetyn riisin tai maalaisleivän kanssa.",
  },
  {
    id: 2,
    nimi: "Pestopasta",
    kuvaus:
      "Joskus yksinkertaisuus on valttia. Tämän herkullisen pestopastan salaisuus on itse tehdyssä pestossa.",
    kesto: 30,
    ainekset:
      "500g tuorepastaa, PESTO: 2 ruukkua tuoretta basilikaa, 2 valkosipulin kynttä, 75g cashewpähkinöitä, 1½dl oliiviöljyä, ½tl suolaa, 1½dl	Mustaleima raastetta. PÄÄLLE: ½dl Mustaleima raastetta, tuoretta basilikaa",
    ohje: "Valmista pesto: Mittaa ainekset blenderiin tai mittakannuun. Soseuta blenderillä tai sauvasekoittimella, kunnes peston koostumus on sopivaa. Mausta suolalla ja pippurilla. Keitä pasta runsaassa suolalla maustetussa vedessä pakkauksen ohjeen mukaan. Sekoita pesto valutetun, kuuman pastan joukkoon. Viimeistele annokset juustoraasteella ja basilikalla. Tarjoa heti.",
  },
  {
    id: 3,
    nimi: "Unelmarahkatorttu",
    kuvaus:
      "Unelmatorttu raikkaalla ja sitruunaisella rahka-kreemitäytteellä. Kääretorttu on vaivaton valmistaa ja siitä riittää isommallekkin porukalle herkutella.",
    kesto: 45,
    ainekset:
      "POHJA: 4 kananmunaa, 1½dl sokeria, 1dl perunajauhoja, ½dl kaakaojauhetta, 1tl leivinjauhetta. TÄYTE: 200g vaniljakreemiä, 200g sitruunarahkaa",
    ohje: "Vatkaa huoneenlämpöiset munat ja sokeri paksuksi, vaaleaksi vaahdoksi. Yhdistä kuivat aineet. Lisää ne siivilän läpi vaahtoon varovasti sekoittaen. Levitä taikina leivinpaperilla vuoratulle uunipellille. Paista 200 asteessa n. 8 min tai kunnes kypsä. Kumoa pohja sokerilla sirotetulle leivinpaperille. Irrota pohjapaperi. Sekoita kreemi ja rahka. Levitä seos jäähtyneelle kääretorttupohjalle. Kääri rullaksi. Anna tekeytyä hetki kylmässä ja leikkaa paloiksi.",
  },
  {
    id: 4,
    nimi: "Täytetyt avokadot",
    kuvaus: "Katkaravuilla ja homejuustolla täytetyt avokadot.",
    kesto: 20,
    ainekset:
      "1 avokado, 20 katkaravunpyrstöä, 2 rkl kermaviiliä, 2 rkl majoneesia, 2rkl sinihomejuustoa",
    ohje: "Leikkaa avokadot pitkittäin kahtia ja poista kivi. Täytä kolo katkaravuilla. Murusta homejuusto ja sekoita joukkoon kermaviili sekä majoneesi. Valuta kastike katkaravuille ja avokadonpuolikkaille.",
  },
];

const laatijatTaulukko = [
  { id: 1, etunimi: 'Minna', liitymisPvm: '15.2.2023', kuva: 'hyvä kuva' },
  { id: 2, etunimi: 'Iina', liitymisPvm: '18.5.2022', kuva: 'hyvä kuva' },
  {id: 3, etunimi: 'Markus', liitymisPvm: '15.1.2023', kuva: 'hyvä kuva'}
]


function RuokaApp() {
  return (
    <div className="content">
      <h1>Reseptikirja</h1>
      {/*<Resepti resProps={resepti} />*/}
      <h2>Kaikki reseptikirjan reseptit:</h2>
      <div className="">
        <Reseptilista reseptitpropsi={reseptitTaulukko} />
      </div>
      <div className="column">
        <h2>Lisää uusi resepti:</h2>
        <Reseptilomake />
      </div>
      <div>
        <h2>Reseptien laatijat:</h2>
        <Laatijalista laatijatpropsi={laatijatTaulukko}/>
      </div>
    </div>
  );
}

export default RuokaApp;
