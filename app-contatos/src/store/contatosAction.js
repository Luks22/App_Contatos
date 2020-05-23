

export const ADD_CONTATO = 'ADD_CONTATO';
export const EDITAR_CONTATO = 'EDITAR_CONTATO';
export const DELETAR_CONTATO = 'DELETAR_CONTATO';


export const addContatos = (nomeContato, numeroContato, imagemURI) => {
    return {
        type: ADD_CONTATO, dadosContato: { nome: nomeContato, numero: numeroContato, imagem: imagemURI }
    }
}

export const editarContato = (contatoEditado, listaContato, imagemUri) => {

    let lista = listaContato;

    lista.map((contato) => {
        if (contatoEditado.id === contato.id) {
            contato.nome = contatoEditado.nome;
            contato.numero = contatoEditado.numero;
            contato.imagem = imagemUri;
        }
    });

    return {
        type: EDITAR_CONTATO, listaEditada: { lista: lista }
    }
}

export const deletarContato = (idASerRemovida, listaContato) => {

    let lista = [];

    listaContato.map((contato) => {
        if(contato.id !== idASerRemovida){
            lista.push(contato);
        } 
    });

    return {
        type: DELETAR_CONTATO, listaEditada: { lista: lista }
    }
}