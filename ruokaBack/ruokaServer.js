const express = require('express');
const app = express();

var helmet = require('helmet');
app.use(helmet( { crossOriginResourcePolicy: false } ));

app.use(express.json()); 
app.use(express.urlencoded( { limit: '5mb', extended: true } ));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ruoka.db');

app.listen(8080, () => {
	console.log('Node toimii localhost:8080');
});

//OK
app.get('/', (req, res, next) => {
	return res.status(200).json( { error: false, message: 'Toimii' } );
});

//OK
app.get('/resepti/all', (req, res, next) => {
		db.all('SELECT * FROM resepti', (error, results) => {
		if(error) throw error;
		console.log('tietokannasta haettussa resepti-taulukkossa on ' + results.length + ' objektia');
            return res.status(200).json(results);
		}) // db.all
}) // app.get

//OK
app.get('/resepti/one/:id', (req, res, next) => {
	let id = req.params.id;

	db.get('SELECT * FROM resepti where id=?', [id], (error, result) => {
		if (error) throw error;
        if (typeof (result) == 'undefined') {
            console.log('tietokannassa ei ole objektia id:llä ' + id);
            return res.status(200).json({});
        }
        console.log('tietokannasta haettu objekti id:llä ' + result.id);
        return res.status(200).json(result);
	}) // db.get
}) // app.get

//kuvan lataaminen, postmanin kautta testaus OK
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './images'); // Mihin kansioon ladataan
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);  // Millä tiedostonimellä
	}
});
const upload = multer({ storage: storage })

app.post('/resepti/add', upload.single('kuva'), (req, res, next) => {
		console.log("======= BACKEND DEBUG ==========");
	console.log("BODY:", req.body);
	console.log("FILE:", req.file);
	console.log("======= BACKEND DEBUG ==========");
	let resepti = req.body;
	//let laatija = req.body;
	let kuvaNimi = null;
	if (req.file) {
		kuvaNimi = req.file.originalname;
	}
	//db.serialize(()=>{
		db.run('INSERT INTO resepti (nimi,kuva,kuvaus,kesto,ainekset,ohje,idl) VALUES (?, ?, ?, ?, ?, ?,?)',
			[resepti.nimi, kuvaNimi, resepti.kuvaus, resepti.kesto, resepti.ainekset, resepti.ohje, resepti.idl], (error, result) => {
				if (error) throw error;
			return res.status(200).json({ count: 1 });
		});
	//})
})

app.post('/laatija/add', upload.single('kuva'), (req, res, next) => {
	let laatija = req.body;
	let kuvaNimi = null;
	if (req.file) {
		kuvaNimi = req.file.originalname;
	}
	db.run('INSERT INTO laatija (etunimi,paiva,kuva) VALUES (?, ?, ?)',
		[laatija.etunimi, laatija.paiva, kuvaNimi], (error, result) => {
			if (error) throw error;
			console.log('Laatija lisätty')
		return res.status(200).json({ count: 1 });
	});
})


app.get('/download/:nimi', (req, res, next) => {
	let file = './images/' + req.params.nimi;
	res.download(file);
});

//OK
app.get('/resepti/delete/:id', (req, res, next) => {
	let id = req.params.id;
	db.run('DELETE FROM resepti WHERE id = ?', [id], function (error, result) {
		console.log('Yritetään poistaa resepti id:llä: ' + id);
		if (error) throw error;
		console.log("Resepti " + id + " poistettu");
		return res.status(200).json({ count: this.changes });
		})
})

//muokkaus ei toimiva
app.put('/resepti/edit/:id', (req, res, next) => {
	let id = req.params.id;
	let resepti = req.body;
	db.run('UPDATE resepti SET nimi=?, kuvaus=?, ainekset=?, ohje=?, kesto=?, kuva=?, idl=? WHERE id=?', [resepti.nimi, resepti.kuvaus, resepti.ainekset, resepti.ohje, resepti.kesto, resepti.kuva, resepti.idl, id], (error, result)=> {
		console.log('Yritetään muokata reseptin tietoja, id: ' + id);
		console.log(resepti.nimi);
		console.log(resepti);
		if (error) throw error;
		return res.status(200).json( {count: this.changes} );
	})
})

//OK
app.get('/laatija/all', (req, res, next) => {
	db.all('SELECT * FROM laatija', (error, results) => {
		if (error) throw error;
		console.log('tietokannasta haettussa laatija-taulukkossa on ' + results.length + ' objektia');
		return res.status(200).json(results);
	}) // db.all
}) // app.get

//OK
app.get('/laatija/one/:idl', (req, res, next) => {
	let id = req.params.idl;
	db.get('SELECT * FROM laatija where idl=?', [id], (error, result) => {
		if (error) throw error;
		if (typeof (result) == 'undefined') {
            console.log('tietokannassa ei ole objektia id:llä ' + id);
            return res.status(200).json({});
		}
		console.log('tietokannasta haettu objekti id:llä ' + id);//result.idl
		return res.status(200).json(result);
	}) // db.get
}) // app.get

//OK
app.get('/laatija/delete/:id', (req, res, next) => {
	let id = req.params.id;
	db.run('DELETE FROM laatija WHERE idl = ?', [id], function (error, result) {
		console.log('Yritetään poistaa laatija id:llä: ' + id);
		if (error) throw error;
		return res.status(200).json( {count: this.changes} );
	})
})

//muokkaus NYT SE LUO UUDEN  [object FormData]-nimellä
app.put('/laatija/edit/:id', (req, res, next) => {
	let id = req.params.id;
	let laatija = req.body;
	db.run('UPDATE laatija SET etunimi=? WHERE idl=?', [laatija.etunimi, id], (error, result)=> {
		console.log('Yritetään muokata laatijan tietoja, id: ' + id);
		console.log(laatija.etunimi); //undefined
		console.log(laatija); //[object Object]
		if (error) throw error;
		return res.status(200).json( {count: this.changes} );
	})
})

// kaikki yhden laatijan reseptit, toimii mutta ei poimi etunimeä
app.get('/laatija/one/:idl/reseptit', (req, res, next) => {
	let id = req.params.idl;
	db.all('SELECT * FROM resepti WHERE idl=?', [id], (error, results) => {
		if (error) throw error;

		console.log('resepti-taulukkossa ' + results.length + ' resepti/-ia, joita on luonut laatija ' + id);
		return res.status(200).json(results);
	}) // db.all
}) // app.get
//TAI
app.get('/resepti/all/:idl', (req, res, next) => {
	let id = req.params.idl;
	db.all('SELECT * FROM resepti WHERE idl=?', [id], (error, results) => {
		if (error) throw error;
		console.log('resepti-taulukkossa on laatijan ' + id + ' reseptit: ' + results.length);
		console.log(results.toString(id.nimi));
		return res.status(200).json(results);
	}) // db.all
}) // app.get




//OK
app.get('*', (req, res, next) => {
	return res.status(404).json( { error: true, message: 'Ei pyydettyä palvelua' } );
})
