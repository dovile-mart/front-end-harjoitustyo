function Reseptilista(props) {
    //jos taulukko on tyhjä:
    if (props.reseptitpropsi.length === 0) {
        return (<p>Resepteja ei ole listassa.</p>);
    }
    return (
        <div className="resepti">
            {props.reseptitpropsi.map(reseptiobj => {
                return (
                    <p key={reseptiobj.id}>
                        <b>Nimi:</b> {reseptiobj.nimi}<br />
                        <b>Kuvaus:</b> {reseptiobj.kuvaus}<br />
                        <b>Kesto:</b> {reseptiobj.kesto} min <br />
                        <b>Ainekset:</b>{reseptiobj.ainekset}<br/>
                        {/*{reseptiobj.ainekset.aines1}<br />
                        {reseptiobj.ainekset.aines2}<br />
                        {reseptiobj.ainekset.aines3}<br/>
                        {reseptiobj.ainekset.aines4}<br/>
                {reseptiobj.ainekset.aines5}<br/>*/}
                        <b>Ohje:</b> {reseptiobj.ohje}
                    </p>
                )
            })}
       </div>
    )
}

export default Reseptilista;