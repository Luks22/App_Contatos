import { ADD_CONTATO, EDITAR_CONTATO, DELETAR_CONTATO } from "./contatosAction";
import Contato from '../model/Contato';

const estadoInicial = {
    contatos: []
};

export default (estado = estadoInicial, action) => {
    switch (action.type) {
        case ADD_CONTATO:
            const c = new Contato(new Date().toString(), action.dadosContato.nome, action.dadosContato.numero, action.dadosContato.imagem);
            return {
                contatos: estado.contatos.concat(c)
            };
        case EDITAR_CONTATO:

            estado.contatos = [];

            const l = action.listaEditada.lista;
        
            return {
                contatos: estado.contatos.concat(l)
            };

        case DELETAR_CONTATO:
            return {
                contatos: action.listaEditada.lista
            };
        default:
            return estado;
    }
}