import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Collapse } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getReseptit } from "./ruokakommunikointi";
import { getLaatijat } from "./ruokakommunikointi";
//import { getLaatija } from "./ruokakommunikointi";
import { useParams } from "react-router";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function ReseptilistaMUI() {

    const [taulukko, setTaulukko] = useState([]);
    const [viesti, setViesti] = useState('Haetaan');
    
    const haeKaikkiReseptit = async () => {
        try {
            const response = await getReseptit();
            setTaulukko(response);
            setViesti('');
        } catch (error) {
            setViesti('Haku ei onnistunut');
            //console.log(error);//sa
        }
    }

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
/*  useEffect(() => {
        haeKaikkiLaatijat();
    }, []);
*/
    let { idl, etunimi } = useParams();
    const [laatija, setValues] = useState({
        idl: idl,
        etunimi: etunimi
    })
/*
    const [laatija, setLaatija] = useState('');
    const haeYksiLaatija = async () => {
        try {
            const response = await getLaatija();
            setLaatija(response);
            setViesti('');
        } catch (error) {
            setViesti('Laatijan haku epäonnistui');
        }
    }
    /*useEffect(() => {
        haeYksiLaatija();
    });*/
//****tähän asti laatijat */

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [isOpenCollapse, setIsOpenCollapse] = React.useState(null);

    const handleOpen = (clickedIndex) => {
        if (isOpenCollapse === clickedIndex) {
            setIsOpenCollapse(null);
        } else {
            setIsOpenCollapse(clickedIndex);
        }
    };
 
    
    useEffect(() => {
        haeKaikkiReseptit();
    }, []);

    if (viesti.length > 0) {
        return (<Typography>{viesti}</Typography>);
    }

    if (taulukko.length === 0) {
        return (<Typography>Resepteja ei ole</Typography>)
    }

    return (
        <Box sx={{ marginBottom: 5 }}>
            <Box style={{ display: 'flex', justifyContent: 'center', paddingTop: 15 }}>
                <Button          
                    component={Link} to='/rlomake'
                    variant='contained'
                    color='secondary'
                    sx={{ marginRight: 3 }}
                ><MenuBookIcon /> Lisää uusi
                </Button>
            </Box>
            
            <Grid container rowSpacing={2} columnSpacing={2} style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
                {taulukko.map((resepti) => {
                    {/**{props.reseptitPropsi.map((resepti) =>  */ }
                    return (
                        <Grid item key={resepti.id}>
                            <Card sx={{ width: 400, boxShadow: 5, color: 'secondary.main' }} onClick={() => handleOpen(resepti.id)}>
                                <CardHeader
                                    sx={{ height: 80}}
                                    title={resepti.nimi}    
                                />
                                  
                                <div style={{ position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={ resepti.kuva.startsWith('http') ? resepti.kuva : 'http://localhost:8080/download/' + resepti.kuva }
                                        alt="Kuvan kuvaus"
                                    />
                                    <div style={{ position: "absolute", color: "white", fontWeight:'bolder', bottom: 10, left: 10, transform: "translateX(0)", backgroundColor: '#da707b', padding:2, borderStyle:'ridge' }}>
                                        {resepti.kesto} min</div>                                
                                </div>
                                {/* <Divider textAlign="left" variant="fullWidth" sx={{ fontSize: 'small' }}>Kesto</Divider>
                                <Typography>{resepti.kesto} min</Typography>*/}
                            
                                <CardContent sx={{ height: 150 }}title={resepti.idl}>
                                    <Typography sx={{color:"secondary.main" }}>Reseptilaatijan id: {resepti.idl}</Typography>
                                    <Typography>{resepti.kuvaus}</Typography>                                  
                                </CardContent>

                            {/* <Divider textAlign='left' sx={{fontSize:'small'}}>Lue lisää</Divider>*/} 
                            
                                <CardActions>
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        sx={{
                                            bgcolor: '#da707b',
                                            '&:hover': {
                                                bgcolor: '#ffc77d',
                                            }
                                        }}
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={isOpenCollapse === resepti.id} timeout="auto" unmountOnExit>
                                    <CardContent >
                                        <Divider textAlign="left" variant='fullWidth' sx={{ fontSize: 'small' }}>Ainekset</Divider>
                                        <Typography paragraph>{resepti.ainekset}</Typography>
                                        <Divider textAlign="left" variant='fullWidth' sx={{ fontSize: 'small' }}>Ohje</Divider>
                                        <Typography paragraph>{ resepti.ohje}</Typography>
                                    </CardContent>
                                </Collapse>
                            {/* <Typography>Ohje: {resepti.ohje}</Typography>*/}    
                            </Card>
                        </Grid>
                    )
                })
                }
            </Grid>
        </Box>
    )
}

export default ReseptilistaMUI;