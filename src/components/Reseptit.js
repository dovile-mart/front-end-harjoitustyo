import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';

function Reseptit() {

  const [randomResepti, setRandomResepti] = useState({
    otsikko: '',
    laji: '',
    alue: '',
    ohjeet: '',
    kuva: '',
    video: ''
  });

  const [viesti, setViesti] = useState('Haetaan...');

  const haeResepti = async () =>  {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const json = await response.json();
      const random = json.meals[0];
    //  console.log(json.meals[0]);

      setRandomResepti({
        otsikko: random.strMeal,
        laji: random.strCategory,
        alue: random.strArea,
        ohjeet: random.strInstructions,
        kuva: random.strMealThumb,
        video: random.strYoutube
      })
      setViesti('');
    } catch (error) {
      setViesti('Tietoja ei ole saatavilla');
    }
  }

  useEffect(() => {
    haeResepti();
  }, []);

  if (viesti.length > 0) {
    return (<Typography>{viesti}</Typography>)
  }

  
  return (
    <Paper   sx={{
      p: 2,
      marginTop:10,
      margin: 'auto',
      maxWidth: 900,
      flexGrow: 1,
      backgroundColor: 'secondary.light'
    }}
    >
      <Typography> {viesti}</Typography> 
      
      <Box sx={{ p: 2 }}>
        <Box
          component="img"
          sx={ {height: 400, margin: 3, alignItems:'center'} }
          alt="Random kuva"
          src={randomResepti.kuva}
          border={2}
          borderColor='secondary.main'
          borderRadius={2}
          fontStyle='italic'
        />
        <Grid item key={randomResepti.idMeal}>
          <Typography variant="h5"><b>{randomResepti.otsikko}</b></Typography>
          <Grid item xs container spacing={1} direction="row">
            <Grid item xs={6}>
              <Typography variant="subtitle1" color='secondary.main'>Maa: {randomResepti.alue}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color='secondary.main'>Ruokalaji: {randomResepti.laji}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h6"><b>Ohjeet:</b> {randomResepti.ohjeet}</Typography>
          <Typography variant="button"><Link to={randomResepti.video} target="_blank" rel="noreferrer">Ohjevideo</Link></Typography>
        </Grid>
      </Box>
    </Paper>
  );

}


export default Reseptit;
