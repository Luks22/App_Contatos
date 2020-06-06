import * as FileSystem from 'expo-file-system';
import 'firebase/firestore';
import * as firebase from 'firebase';
import ENV from '../env';

export const ADD_CONTATO = 'ADD_CONTATO';
export const LISTA_CONTATOS = 'LISTA_CONTATOS';

if (!firebase.apps.length)
    firebase.initializeApp(ENV);

const db = firebase.firestore();

export const addContatos = (nomeContato, numeroContato, imagemURI, latitudeContato, longitudeContato, horarioContato) => {
    return async dispatch => {

        let id = '';
        const nomeArquivo = imagemURI.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
        try {
            await FileSystem.moveAsync({
                from: imagemURI,
                to: novoPath
            });

            db.collection('contatos').add({
                nome: nomeContato,
                numero: numeroContato,
                latitude: latitudeContato,
                longitude: longitudeContato,
                horario: horarioContato,
                imagem: novoPath
            }).then(function (docRef) {
                id = docRef.id;
            })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });

            dispatch({
                type: ADD_CONTATO, dadosContato:
                {
                    chave: id, nome: nomeContato, numero: numeroContato,
                    imagem: novoPath,
                    latitude: latitudeContato,
                    longitude: longitudeContato,
                    horario: horarioContato
                }
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const editarContato = (contatoEditado, imagemUri) => {

    return async dispatch => {

        const nomeArquivo = imagemUri.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
        try {
            await FileSystem.moveAsync({
                from: imagemUri,
                to: novoPath
            });


            db.collection('contatos').doc(contatoEditado.id).update({
                nome: contatoEditado.nome,
                numero: contatoEditado.numero,
                imagem: novoPath
            });

            db.collection('contatos').onSnapshot((snapshot) => {
                let aux = [];
                snapshot.forEach(doc => {
                    aux.push({
                        nome: doc.data().nome,
                        numero: doc.data().numero,
                        chave: doc.id,
                        horario: doc.data().horario,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        imagem: doc.data().imagem
                    })
                    dispatch({ type: LISTA_CONTATOS, contatos: aux });
                });
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const removerContato = (idASerRemovida) => {

    return async dispatch => {
        try {

            db.collection('contatos').doc(idASerRemovida).delete();

            db.collection('contatos').onSnapshot((snapshot) => {
                let aux = [];
                snapshot.forEach((doc) => {
                    aux.push({
                        nome: doc.data().nome,
                        numero: doc.data().numero,
                        chave: doc.id,
                        horario: doc.data().horario,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        imagem: doc.data().imagem
                    })
                })
                dispatch({ type: LISTA_CONTATOS, contatos: aux });
            })

        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export const listaDeContatos = () => {
    return async dispatch => {
        try {
            db.collection('contatos').onSnapshot((snapshot) => {
                let aux = [];
                snapshot.forEach(doc => {
                    aux.push({
                        nome: doc.data().nome,
                        numero: doc.data().numero,
                        chave: doc.id,
                        horario: doc.data().horario,
                        latitude: doc.data().latitude,
                        longitude: doc.data().longitude,
                        imagem: doc.data().imagem
                    })
                    dispatch({ type: LISTA_CONTATOS, contatos: aux });
                });
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}