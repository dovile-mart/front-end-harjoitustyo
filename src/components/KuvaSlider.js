import React, { useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import ReseptiKortti from "./ReseptiKortti";
import { getReseptit } from "./ruokakommunikointi";
import Slider from "react-slick";
import './slickKaruselli/slick.css'; //tiedostot node-modulissa: "slick-carousel/slick/slick.css"; 
import './slickKaruselli/slick-theme.css';//"slick-carousel/slick/slick-theme.css";
//css-tiedostojen kopioinnin jälkeen poistin dependency package.jsonista: "slick-carousel": "^1.8.1",
//lähde: https://react-slick.neostack.com/docs/api


export function KuvaSlider() {
    const [taulukko, setTaulukko] = useState([]);
    const [viesti, setViesti] = useState('Haetaan');
    
  const haeKaikkiReseptit = async () => {
    try {
      const response = await getReseptit();
      setTaulukko(response);
      setViesti('');
    } catch (error) {
      setViesti('Haku ei onnistunut');
      //console.log(error);
    }
  }
  useEffect(() => {
    haeKaikkiReseptit();
  }, []);

  if (viesti.length > 0) {
    return (<Typography>{viesti}</Typography>);
  }

  if (taulukko.length === 0) {
    return (<Typography>Ei ole listattavaa tietoa</Typography>)
  }
  
  const settings = {
    dots: true,
    infinite: true,//true-kuvat pyörii loputtomasti
    className: "center",
    centerMode: true,
    speed: 600, //mitä isompi numero, sitä hitaammin vaihtuu
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0, //kun sovellus renderöi ensimmäisenä tulee näkyviin
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          //infinite: true,
           dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
    <Box>
      <Slider {...settings}>
        {taulukko.map((resepti) =>
          <Box key={resepti.id}>
            <ReseptiKortti kuva={resepti.kuva} alt={resepti.nimi} />
            </Box>
        )}
      </Slider>
    </Box>
  );
}