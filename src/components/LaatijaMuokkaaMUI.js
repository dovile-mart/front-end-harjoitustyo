import React,{ useState } from "react";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/List";
import { Link } from 'react-router-dom';
import { editLaatija } from "./ruokakommunikointi";

function LaatijaMuokkaaMUI() {
  
  const [viesti, setViesti] = useState("");
  let { idl, etunimi } = useParams();
  const [laatija, setValues] = useState({
      idl: idl,
      etunimi: etunimi
  })

  const muuta = (e) => {
    setValues({
      ...laatija,
      [e.target.name]: e.target.value
    });
  };

  const muokkaaLaatija = async() => {
    //tietokantaan tallennusta varten
        const formData = new FormData();
        formData.append('etunimi', laatija.etunimi);
      try {
          editLaatija(formData);
          // setViesti('Laatijan tietoja muokkattu');
          /*setValues({
            etunimi: "",
        });*/
        setViesti("Laatijan muokkaus: " + laatija.etunimi);
          console.log(viesti);
        } catch (error) {
          setViesti('Laatijan muokkaus epäonnistui')
          //console.log(error);
        }
      };
  
  return (
    <Paper sx={{ p: 2, mx: 'auto', mt: 10, maxWidth: 'md' }}>
      <Box sx={{ margin: "20px" }} component="form" >
        <TextField
          label="Etunimi"
          //required
          variant="outlined"
          name="etunimi"
          value={laatija.etunimi}
          onChange={(e) => muuta(e)}
          fullWidth
          autoFocus
        />
                 
        <Box sx={{ textAlign: "center", paddingTop:3}}>
          <Button
              onClick={(e)=>muokkaaLaatija(e)}
              variant='contained'
              color='primary'
              sx={{ marginRight: 3 }}>
              <CheckIcon />Muokkaa
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
export default LaatijaMuokkaaMUI;