import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ReseptiKortti = ({ kuva }) => {
    return (
        <Card sx={{ minWidth: 250, maxWidth: 350, position:'relative', m:3 }}>
            <Box sx={{position:'relative', m:1}}>
                <CardMedia
                    component="img"
                    height="250"
                    image={ kuva.startsWith('http') ? kuva : 'http://localhost:8080/download/' + kuva}
                    alt="Kuvan kuvaus"
                />
            </Box>
            <CardContent  sx={{ color:"secondary.main" }}>
                <Typography variant='subtitle' gutterBottom>{kuva}</Typography>
            </CardContent>        
        </Card>
    )
}
export default ReseptiKortti;