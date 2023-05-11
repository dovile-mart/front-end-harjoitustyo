import React, { useState, useEffect} from "react";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getReseptit, deleteResepti } from "./ruokakommunikointi";
import { KuvaSlider } from "./KuvaSlider";


function Karuselli() {
  
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

  const [checked, setChecked] = useState(false);
  const handleChange = () => {
      setChecked((prev) => !prev);
    };
  const lista = (
    <Box sx={{ display: 'flex' }}>
      <List sx={{ width: 460, maxWidth: 460 }}>
        {taulukko.map((resepti) => (
          <ListItem
            key={resepti.id}
            disableGutters
            width={360}
            sx={{ borderBottom: 1, borderColor:'secondary.main' }}
            secondaryAction={
              <Box>
                <IconButton color='primary' component={Link} to={'/muokkaaresepti/' + resepti.id +'/'+ resepti.nimi + '/'+resepti.kuvaus+'/'+resepti.ainekset+'/'+resepti.ohje+'/'+resepti.kesto+'/'+resepti.kuva}><EditIcon />
                  </IconButton>
                <IconButton color='secondary' onClick={() => poista(resepti.id)}><DeleteIcon />
                  </IconButton>
              </Box>
              }
            >
            {resepti.nimi}
          </ListItem>
        ))}
      </List>
    </Box>
  )
  
  
  const poista = async (id) => {
    try {
      await deleteResepti(id);
      setViesti('Resepti poistettu');
    } catch (error) {
      setViesti('Poistaminen epäonnistui')
    }
  }

  if (viesti === 'Resepti poistettu') {
      return (
        <div>
          {<Karuselli/>}
        </div>
    )
  }
  if (viesti.length > 0) {
    return (<Typography>{viesti}</Typography>);
  }
  
  if (taulukko.length === 0) {
    return (<Typography>Ei ole listattavaa tietoa</Typography>)
  }
    

  return (
    <Box>
      <Typography variant="h4" sx={{margin: 3, color:"secondary.main"}}>Tietokannassa olevat kuvat</Typography>
      <KuvaSlider />
      <Typography variant="h4" sx={{ mt: 10, color: "secondary.main" }}>Reseptit</Typography>
      
      <Box paddingBottom={5}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Näytä" sx={{color: "secondary.main" }}
      />
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
          <Fade in={checked}>{lista}</Fade>
        </Box>
      </Box>

     
    </Box>
  );
}

export default Karuselli;