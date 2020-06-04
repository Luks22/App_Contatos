import { ADD_CONTATO, LISTA_CONTATOS } from "./contatosAction";
import Contato from '../model/Contato';

const estadoInicial = {
    contatos: []
};

export default (estado = estadoInicial, action) => {
    switch (action.type) {
        case ADD_CONTATO:
            const c = new Contato(action.dadosContato.id.toString(), action.dadosContato.nome, 
            action.dadosContato.numero, 
            action.dadosContato.imagem, 
            action.dadosContato.latitude,
            action.dadosContato.horario,
            );
            return {
                contatos: estado.contatos.concat(c)
            };
        case LISTA_CONTATOS:
            return {
                contatos: action.contatos.map(c => new Contato(c.id.toString(), c.nome, c.numero, c.imagem, c.latitude, c.longitude, c.horario))
            }
        default:
            return estado;
    }
}