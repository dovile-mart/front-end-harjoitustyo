import { useState } from "react";

function Reseptilomake() {
    const [arvo, setArvo] = useState('');
    const [resepti, setValues] = useState({
        nimi: "",
        kuvaus: "",
        ainekset: "",/*{
            aines1: "",
            aines2: "",
            aines3: "",
            aines4: "",
            aines5: ""
        },*/
        ohje: "",
        kesto: Number
    });

    const lisaa = (e) => {
        setValues({
            ...resepti, [e.target.name]: e.target.value,
        });
    };

    const [viesti, setViesti] = useState('');

    const lisaaResepti = (e) => {
        setViesti("Resepti lisätty reseptikirjaan onnistuneesti!");
        setValues({
            nimi: "",
            kuvaus: "",
            ainekset: "",
            /*{
                aines1: "",
                aines2: "",
                aines3: "",
                aines4: "",
                aines5: ""
            },*/
            ohje: "",
            kesto: Number
        });
    };
    return (
        <div>
            <form>
                <label htmlFor="nimi">Reseptin nimi: </label>
                <input type="text" name="nimi" value={resepti.nimi} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="kuvaus">Reseptin kuvaus: </label>
                <input type="text" name="kuvaus" value={resepti.kuvaus} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="ainekset">Ainekset: </label>
                <input type="text" name="ainekset" value={resepti.ainekset} onChange={(e) => lisaa(e)} />
                <br />
                {/** <label htmlFor="aines1">Aines 1: </label>
                <input type="text" name="aines1" value={resepti.ainekset.aines1} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="aines2">Aines 2: </label>
                <input type="text" name="aines2" value={resepti.ainekset.aines2} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="aines3">Aines 3: </label>
                <input type="text" name="aines3" value={resepti.ainekset.aines3} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="aines4">Aines 4: </label>
                <input type="text" name="aines4" value={resepti.ainekset.aines4} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="aines5">Aines 5: </label>
                <input type="text" name="aines5" value={resepti.ainekset.aines5} onChange={(e) => lisaa(e)} />
                <br />*/}
                <label htmlFor="ohje">Reseptin ohje: </label>
                <input type="text" name="ohje" value={resepti.ohje} onChange={(e) => lisaa(e)} />
                <br />
                <label htmlFor="kesto">Reseptin kesto (min): </label>
                <input type="Number" name="kesto" value={resepti.kesto} onChange={(e) => lisaa(e)} />
                <br />
                <input type="button" value="Lisää" onClick={(e) => lisaaResepti(e)} style={{ backgroundColor: 'lightblue', color: 'white', padding: 15, marginTop:'5em'} }></input>
            </form>
            <h3>{viesti}</h3>
        </div>
    )
}
export default Reseptilomake;