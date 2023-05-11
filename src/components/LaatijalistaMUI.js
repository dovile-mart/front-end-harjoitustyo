import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FaceIcon from '@mui/icons-material/Face';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { getLaatijat, deleteLaatija } from './ruokakommunikointi';
import { Typography } from '@mui/material';

function LaatijalistaMUI() {
    
    const [laatijat, setLaatijat] = useState([]);
    const [viesti, setViesti] = useState('Haetaan');

    const haeKaikkiLaatijat = async () => {
        try {
            const response = await getLaatijat();
            setLaatijat(response);
            setViesti('');
        } catch (error) {
            setViesti('Haku ei onnistunut');
        }
    }

    useEffect(() => {
        haeKaikkiLaatijat();
    }, []);

    const poista = async (idl) => {
        try {
            await deleteLaatija(idl);
            setViesti('Laatija poistettu');
        } catch (error) {
            setViesti('Poistaminen epäonnistui')
        }
    }
    if (viesti === 'Laatija poistettu') {
        return (
            <div>
                {<LaatijalistaMUI />}
            </div>
        )
    }else if(viesti.length > 0) {
        return (<Typography>{viesti}</Typography>);
    }
    //jos taulukko on tyhjä: 
    if (laatijat.length === 0) {
        return (<Typography>Laatijoita ei ole listassa.</Typography>);
    }

    return (
        <Box>
            <Box style={{ display:'flex', justifyContent:'center', paddingTop: 15 }}>
                <Button          
                    component={Link} to='/llomake'
                    variant='contained'
                    color='secondary'
                    sx={{ marginRight: 3 }}
                ><FaceIcon /> Lisää uusi
                </Button>
            </Box>
            <Grid container spacing={3} sx={{ margin: 1 }} style={{ display: 'flex', justifyContent: 'center' }}>
                {laatijat.map(laatija => {
                    return (
                        <Grid item key={laatija.idl}>
                            <Card  sx={{ align:'center',  boxShadow: 5,  maxWidth: 200, color:'secondary.main', backgroundColor: 'secondary.light'}}>
                                <CardHeader
                                    title={laatija.etunimi}
                                    subheader={"Jäsenenä " + laatija.paiva + " alkaen"}
                                />
                                <CardContent>
                                    <Avatar
                                        sx={{ width: 156, height: 156, backgroundColor: 'primary.main', color:'secondary.main' }}
                                        alt={laatija.etunimi}
                                        src={ 'http://localhost:8080/download/' + laatija.kuva}
                                        //src={laatija.kuva}
                                    />
                                </CardContent>
                                <CardActions>
                                    <IconButton color='primary' sx={{ border: '1px solid', borderColor: 'secondary.main'}} component={Link} to={'/muokkaahlo/' + laatija.idl + '/'+laatija.etunimi }><EditIcon /></IconButton>
                                    <IconButton color='secondary' sx={{ border: '1px solid', borderColor: 'secondary.main' }} onClick={() => poista(laatija.idl)}><DeleteIcon/></IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })
                }
            </Grid>
        </Box>
    );
}

export default LaatijalistaMUI;