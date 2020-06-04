import * as FileSystem from 'expo-file-system';
import { inserirContato, listarContatos, atualizarContato, deletarContato } from '../helpers/db';

export const ADD_CONTATO = 'ADD_CONTATO';
export const LISTA_CONTATOS = 'LISTA_CONTATOS';


export const addContatos = (nomeContato, numeroContato, imagemURI, latitudeContato, longitudeContato, horarioContato) => {
    return async dispatch => {
    
        const nomeArquivo = imagemURI.split("/").pop();
        const novoPath = FileSystem.documentDirectory + nomeArquivo;
        try {
            await FileSystem.moveAsync({
                from: imagemURI,
                to: novoPath
            });

            const resultadoDB = await inserirContato(
                nomeContato,
                numeroContato,
                novoPath,
                latitudeContato,
                longitudeContato,
                horarioContato
            );

            dispatch({
                type: ADD_CONTATO, dadosContato:
                    { id: resultadoDB.insertId, nome: nomeContato, numero: numeroContato, 
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

            const resultadoDB = await atualizarContato(
                contatoEditado.nome,
                contatoEditado.numero,
                novoPath,
                contatoEditado.id
            );

            const result = await listarContatos();

            dispatch({
                type: LISTA_CONTATOS, contatos: result.rows._array
            });
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

            const resultadoDB = await deletarContato(idASerRemovida);
            const result = await listarContatos();
            dispatch({ type: LISTA_CONTATOS, contatos: result.rows._array });
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
            const resultadoDB = await listarContatos();
            dispatch({ type: LISTA_CONTATOS, contatos: resultadoDB.rows._array });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}