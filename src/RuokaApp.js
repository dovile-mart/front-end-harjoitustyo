import React from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import TabMUI from './navi/TabMUI';
import ReseptilistaMUI from './components/ReseptilistaMUI';
import ReseptilomakeMUI from './components/ReseptilomakeMUI';
import ReseptiMuokkaaMUI from './components/ReseptiMuokkaaMUI';
import LaatijalistaMUI from "./components/LaatijalistaMUI";
import LaatijalomakeMUI from './components/LaatijalomakeMUI';
import LaatijaMuokkaaMUI from './components/LaatijaMuokkaaMUI';
import Reseptit from './components/Reseptit';
import Karuselli from './components/Karuselli';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';

/*const resepti = {
  id: 1,
  nimi: "Täytetyt avokadot",
  kuva: "./avocado.jpg",
  kuvaus: "Katkaravuilla ja homejuustolla täytetyt avokadot.",
  ainekset:
    "1 avokado, 20 katkaravunpyrstöä, 2 rkl kermaviiliä, 2 rkl majoneesia, 2rkl sinihomejuustoa",
  ohje: "Leikkaa avokadot pitkittäin kahtia ja poista kivi. Täytä kolo katkaravuilla. Murusta homejuusto ja sekoita joukkoon kermaviili sekä majoneesi. Valuta kastike katkaravuille ja avokadonpuolikkaille.",
  kesto: 20,
};*/
/*
const reseptitTaulukko = [
  {
    id: 1,
    nimi: "Tomaattinen linssi-palvikinkkupata",
    kuva: "./linssipata.jpg",
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
    kuva: "./pestopasta.jpg",
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
    kuva: "./rahkatorttu.jpg",
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
    kuva: "./avocado.jpg",
    kuvaus: "Katkaravuilla ja homejuustolla täytetyt avokadot.",
    kesto: 20,
    ainekset:
      "1 avokado, 20 katkaravunpyrstöä, 2 rkl kermaviiliä, 2 rkl majoneesia, 2rkl sinihomejuustoa",
    ohje: "Leikkaa avokadot pitkittäin kahtia ja poista kivi. Täytä kolo katkaravuilla. Murusta homejuusto ja sekoita joukkoon kermaviili sekä majoneesi. Valuta kastike katkaravuille ja avokadonpuolikkaille.",
  },
];

const laatijatTaulukko = [
  { id: 1, etunimi: 'Minna', paiva: '15.2.2023', kuva: "./kuva1.jpg", kuvaNimi:'./kuva1.jpg' },
  { id: 2, etunimi: 'Iina', paiva: '18.5.2022', kuva: './kuva2.jpg', kuvaNimi:'Toinen kuva' },
  {id: 3, etunimi: 'Matti', paiva: '15.1.2023', kuva: './kuva3.png', kuvaNimi:'kolmas kuva'}
]
*/
const theme = createTheme({
  palette: {
    primary: { main: '#ffc77d', contrastText: '#880061' },
    secondary: { main: '#da707b', light: '#fff2df'},
    text: {
      text: { primary: '#880061', secondary: '##f5b6da', contrastText: '#FFFFFF', disabled: 'rgba(0,0,0,0.29)' },
      background: { default: '#fff2df' },
      typography: { fontFamily: ['Lato', 'Sans Serif'] }, 
    }
  }
});

function RuokaApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TabMUI />}>
            <Route index element={<ReseptilistaMUI /> } /> 
            <Route path='kuvat' element={<Karuselli/>} />
            <Route path='rlomake' element={<ReseptilomakeMUI />} />
            <Route path='muokkaaresepti/:id/:nimi/:kuvaus/:ainekset/:ohje/:kesto/:kuva' element={<ReseptiMuokkaaMUI/>}/>
            <Route path='laatijat' element={<LaatijalistaMUI />} />
            <Route path='llomake' element={<LaatijalomakeMUI />} />
            <Route path='muokkaahlo/:idl/:etunimi' element={<LaatijaMuokkaaMUI/>}/>
            <Route path='hae' element={<Reseptit />} />
            <Route path='*' element={<Typography variant="h6" sx={{marginTop: 5, fontWeight:'bold'}}>Sivua ei löydy</Typography>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default RuokaApp;
