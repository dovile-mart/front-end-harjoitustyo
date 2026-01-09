import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button, InputLabel, Typography, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from '@mui/icons-material/Image';
import ListIcon from "@mui/icons-material/List";
import { Link } from 'react-router-dom';
import { addResepti, getLaatijat } from "./ruokakommunikointi";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

function ReseptilomakeMUI() {

  const [resepti, setValues] = useState({
    nimi: "",
    kuvaus: "",
    ainekset: "",
    ohje: "",
    kesto: 0,
    kuva: [],
    laatija:""
  });

  const [viesti, setViesti] = useState("");

  const lisaa = (e) => {
    setValues({
      ...resepti,
      [e.target.name]: e.target.value,
    });
    setViesti(e.target.name + " muutettu arvoksi: " + e.target.value);
    console.log(viesti);
  };

  let kuvanNimi = "";
  if (resepti.kuva !== null) {
    kuvanNimi = resepti.kuva.name;
  }
    
  const lisaaKuva = (e) => {
      setValues({
          ...resepti, kuva:e.target.files[0]
      })
  }

  const lisaaResepti = (e) => {
    console.log("RESEPTI STATE: ", resepti);
    const formData = new FormData();
    formData.append('nimi', resepti.nimi);
    formData.append('kuva', resepti.kuva);
    formData.append('kuvaus', resepti.kuvaus);
    formData.append('kesto', resepti.kesto);
    formData.append('ainekset', resepti.ainekset);
    formData.append('ohje', resepti.ohje);
    formData.append('idl', resepti.laatija);
    try {
      addResepti(formData);
   //   setValues({ nimi: '', kuvaus: '', ainekset: '', ohje: '', kesto: '', kuva: [] });
      setViesti('Resepti lisätty');
      setValues({
        nimi: "",
        kuvaus: "",
        ainekset: "",
        ohje: "",
        kesto: 0,
        kuva: "",
        idl:""
    });

    } catch (error) {
      setViesti('Reseptin lisäys epäonnistui')
      //console.log(error);
    }
  };

  const tyhjennaLomake = (e) => {
    setValues({
        nimi: "",
        kuvaus: "",
        ainekset: "",
        ohje: "",
        kesto: 0,
        kuva: "",
        idl: setLaatijat[1]
    });
    setViesti("Lomake tyhjennetty");
    console.log(viesti);
  };

  const [laatijat, setLaatijat] = useState([]);
  const haeKaikkiLaatijat = async () => {
    try {
        const response = await getLaatijat();
        setLaatijat(response);
        setViesti('');
    } catch (error) {
        setViesti('Haku ei onnistunut');
        //console.log(error);
    }
  }
  useEffect(() => {
    haeKaikkiLaatijat();
  }, []);
  
  return (
    <Paper sx={{ p: 2, mx: 'auto', mt: 10, maxWidth: 'md' }}>
      <Typography variant="h4" sx={{margin: 3, color:"secondary.main"}}>Lisää uusi resepti</Typography>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { mb: 2 } }}
      >
        <TextField
          label="Reseptin otsikko"
          required
          variant="outlined"
          name="nimi"
          value={resepti.nimi}
          onChange={(e) => lisaa(e)}
          fullWidth
          autoFocus
        />
       
        <TextField
          label="Lyhyt kuvaus"
          required
          variant="outlined"
          name="kuvaus"
          value={resepti.kuvaus}
          onChange={(e) => lisaa(e)}
          fullWidth  
          multiline
          rows={2}
        />

        <TextField
          label="Ainekset"
          required
          variant="outlined"
          name="ainekset"
          value={resepti.ainekset}
          onChange={(e) => lisaa(e)}
          fullWidth  
          multiline
          rows={5}
        />
      
        <TextField
          label="Ohje"
          required
          variant="outlined"
          name="ohje"
          value={resepti.ohje}
          onChange={(e) => lisaa(e)}
          multiline
          rows={5}
          fullWidth
        />
        
        <TextField
          label="Kesto, min"
          type="number"
          variant="outlined"
          name="kesto"
          value={resepti.kesto}
          onChange={(e) => lisaa(e)}
          inputProps={{min:0}}
        />
        <Input
          accept="image/*"
          name="kuva"
          type="file"
          id="kuva"
          onChange={(e) => lisaaKuva(e)}
          sx={{ display: 'none' }}
        />
        <InputLabel htmlFor="kuva" >
          <Typography sx={{ display: "inline", color:"secondary.main" }}>Lisää kuva</Typography>
          <Button component="span" sx={{color:"secondary.main"}}>
              <ImageIcon/>
          </Button>
          <Typography sx={{ display: "inline", color:"secondary.main" }}>{ kuvanNimi }</Typography>      
        </InputLabel>
        
        <FormControl focused fullWidth>
          <InputLabel variant="standard" htmlFor="laatija">
            Laatija
          </InputLabel>
          <NativeSelect defaultValue={1} onChange={(e) => lisaa(e)} inputProps={{ name: 'laatija',
              id: 'laatija',
            }}
          >
            {laatijat.map(laatija => (
              <option key={laatija.idl} value={laatija.idl}>{laatija.etunimi}</option>
            ))}
          </NativeSelect>
        </FormControl>
        
        <Box sx={{ textAlign: "center", p:3 }}>
          <Button
            onClick={(e) => lisaaResepti(e)}
            variant="contained"
            sx={{ marginRight: 3 }}
            startIcon={<CheckIcon />}
          >Lisää
          </Button>
          <Button
            onClick={(e) => tyhjennaLomake(e)}
            variant="contained"
            sx={{ marginRight: 3 }}
            startIcon={<ClearIcon />}
          >Tyhjennä
          </Button>
          <Button          
              component={Link} to='/'
              variant='contained'
              color='primary'
              sx={{ marginRight: 3 }}>
          <ListIcon />Takaisin
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ReseptilomakeMUI;