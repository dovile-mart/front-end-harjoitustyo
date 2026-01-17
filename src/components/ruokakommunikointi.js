import axios from 'axios';
let palvelin = 'http://localhost:8080';

export const getReseptit = async () => {
    try {
        const response = await axios.get(palvelin + '/resepti/all');
        return (response.data);
        } catch (error) {
        throw new Error('Haku ei onnistunut');
    }
}
export const addResepti = async (resepti) => {
    try {
        await axios.post(palvelin + '/resepti/add', resepti);
        } catch (error) {
        throw new Error('Lisäys ei onnistunut')
    }
}

export const deleteResepti = async (id) => {
    try {
        await axios.get(palvelin + '/resepti/delete/' + id);
        //return (response.data.count);
    } catch (error) {
    throw new Error('Poisto ei onnistunut')
}
}

export const getLaatijat = async () => {
    try {
        const response = await axios.get(palvelin + '/laatija/all');
        return (response.data); //response.status-palauttaa vastauskoodin
        } catch (error) {
        throw new Error('Haku ei onnistunut');
    }
}

//yhden laatijan haku reseptilistaa varten --
export const getLaatija = async (id) => {
    try {
        await axios.get(palvelin + '/laatija/one/' + id);
    } catch (error) {
        throw new Error('Haku ei onnistunut')
    }
}

export const addLaatija = async (laatija) => {
    try {
        await axios.post(palvelin + '/laatija/add', laatija);
        } catch (error) {
        throw new Error('Lisäys ei onnistunut')
    }
}

export const deleteLaatija = async (id) => {
    try {
        await axios.get(palvelin + '/laatija/delete/' + id);
    } catch (error) {
        throw new Error('Poisto ei onnistunut')
    }
}

export const getKuvat = async () => {
    try {
      const response = await axios.get(palvelin + '/resepti/kuva');
      return response;
    } catch (error) {
        throw new Error('Kuvien haku ei onnistunut')
    }
}

//ei tehty loppuun
export const editLaatija = async (id, data) => {
    try {
    await axios.put(palvelin + '/laatija/edit/' + id, data);
    //return (response.data.count);
} catch (error) {
    throw new Error('Laatijan muokkaus ei onnistunut')
}
}
export const editResepti = async (id) => {
    try {
    await axios.put(palvelin + '/resepti/edit/' + id); // put
    //return (response.data.count);
} catch (error) {
    throw new Error('Reseptin muokkaus ei onnistunut')
}
}
