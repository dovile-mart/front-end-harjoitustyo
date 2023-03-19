
function Laatijalista(props) {
    //jos taulukko on tyhjä:
    if (props.laatijatpropsi.length === 0) {
        return (<p>Laatijoita ei ole listassa.</p>);
    }
    return (
        <div>
            {props.laatijatpropsi.map(laatijaobj => {
                return (
                    <p key={laatijaobj.id}>
                        <b>Etunimi:</b> {laatijaobj.etunimi}<br />
                        <b>Liittymispäivämäärä:</b> {laatijaobj.liitymisPvm}<br />
                        <b>Kuva:</b> {laatijaobj.kuva}
                    </p>
                );
            })
            }
        </div>
    );
}

export default Laatijalista;