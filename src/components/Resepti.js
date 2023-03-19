import RuokaApp from "../RuokaApp";
import { Link } from "react-router-dom";
import laatijatTaulukko from "../RuokaApp";
function Resepti(props) {
    return (
        <div>
            <h4>Resepti: {props.resProps.nimi} </h4>
            <h4>Kuvaus: {props.resProps.kuvaus}</h4>
            <h4>Kesto: {props.resProps.kesto} min</h4>
            <h4>Ainekset:</h4>
            {props.resProps.ainekset.aines1}<br />
            {props.resProps.ainekset.aines2}<br />
            {props.resProps.ainekset.aines3}<br/>
            {props.resProps.ainekset.aines4}<br/>
            {props.resProps.ainekset.aines5}<br/>
            <h4>Ohje:</h4> {props.resProps.ohje} <br/>
            <h4>Reseptin laatija: ei</h4>
        </div>
    )
}

export default Resepti;