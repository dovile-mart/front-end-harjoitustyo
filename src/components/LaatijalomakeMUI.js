import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button, InputLabel, Typography, Input } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from '@mui/icons-material/Image';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateFnsUtils from '@date-io/date-fns';
import fiLocale from 'date-fns/locale/fi';
import ListIcon from "@mui/icons-material/List";
import { Link } from 'react-router-dom';
import { addLaatija } from "./ruokakommunikointi";

function LaatijalomakeMUI() {

  const [laatija, setValues] = useState({
    etunimi: "",
    paiva: new Date(),
    kuva: [],
  //  kuvanNimi:""
  });

  const [viesti, setViesti] = useState("");

  const lisaa = (e) => {
    setValues({
      ...laatija,
      [e.target.name]: e.target.value,
    });
    setViesti(e.target.name + " muutettu arvoksi: " + e.target.value);
    console.log(viesti);
  };

  let kuvanNimi = "";
  if (laatija.kuva !== null) {
    kuvanNimi = laatija.kuva.name;//kuvanNimi;
    
  }
  
  const lisaaKuva = (e) => {
      setValues({
          ...laatija, kuva:e.target.files[0]
      })
    //kuvanNimi=laatija.kuva.kuvanNimi;
    console.log(" muutettu kuva");
  }

  const lisaaPaiva = (e) => {
      setValues({
          ...laatija,
          paiva: e
      })
    console.log(" muutettu päivämäärä");
  }
  
  const lisaaLaatija = async() => {
//tietokantaan tallennusta varten
    const formData = new FormData();
    formData.append('etunimi', laatija.etunimi);
    let paiva = laatija.paiva.getDate() + '-' + (laatija.paiva.getMonth()+1)+ '-' + laatija.paiva.getFullYear();
    formData.append('paiva', paiva);
//    formData.append('paiva', laatija.paiva);
    formData.append('kuva', laatija.kuva);
    try {
      addLaatija(formData);
      setViesti('Laatija lisätty');
      setValues({
        etunimi: "",
        paiva: new Date(),
        kuva: ''//[],
//        kuvanNimi:""
    });
    //setViesti("Laatija lisättiin" + laatija.etunimi + " " + laatija.paiva + " " + laatija.kuva);
      console.log(viesti);
    } catch (error) {
      setViesti('Laatijan lisäys epäonnistui')
      //console.log(error);
    }
  };

  const tyhjennaLomake = (e) => {
    setValues({
        etunimi: "",
        paiva: new Date(),
        kuva: ''//[],
//        kuvanNimi: ""
    });
    setViesti("");
  };

  return (
    <Paper sx={{ p:2, mx: 'auto', mt: 10, maxWidth: 'md'}}>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { marginBottom: 2 } }}
      >
        <TextField
          sx={{ width: 500, marginRight:1 }}
            label="Etunimi"
            required
            variant="outlined"
            name="etunimi"
            value={laatija.etunimi}
            onChange={(e) => lisaa(e)}
            fullWidth
            autoFocus
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} utils={DateFnsUtils} adapterLocale={fiLocale}>
          <DatePicker
            inputFormat="dd.MM.yyyy"
            value={laatija.paiva}
            onChange={(e) => lisaaPaiva(e)}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>
        <Input
          accept="image/*"
          name="kuva"
          type="file"
          id="kuva"
          onChange={(e) => lisaaKuva(e)}
          sx={{ display: 'none' }}
        />
        <InputLabel htmlFor="kuva">
          <Typography sx={{ display: "inline", color:"secondary.main" }}>Lisää kuva</Typography>
          <Button component="span" sx={{color:"secondary.main" }}><ImageIcon/></Button>
          <Typography sx={{ display: "inline", color:"secondary.main" }}>{ kuvanNimi }</Typography>      
        </InputLabel>
        
        <Box sx={{ textAlign: "center", p:3 }}>
          <Button
            onClick={(e) => lisaaLaatija(e)}
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
              component={Link} to='/laatijat'
              variant='contained'
              color='primary'
              sx={{ marginRight: 3 }}>
          <ListIcon />Listaukseen
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default LaatijalomakeMUI;