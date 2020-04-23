import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import TelaContatos from './src/Telas/TelaContatos';
import TelaDetalhesContato from './src/Telas/TelaDetalhesContato';
import Medidas from './src/medidas/Medidas';


export default function App() {
  const [contato, setContato] = useState({ key: '', nome: '', numero: '' });
  const [contatos, setContatos] = useState([]);
  const [contador, setContador] = useState(10);

  const detalhesContato = (contatoDetalhes, listaContatos, contadorAtual) => {

    let nomeDetalhe = contatoDetalhes.nome;
    let numeroDetalhe = contatoDetalhes.numero;
    let chave = contatoDetalhes.key;

    setContato({key: chave, nome: nomeDetalhe, numero: numeroDetalhe });
    setContatos(listaContatos);

    setContador(contadorAtual);

  }

  const reiniciar = (contatoEditado) => {
    
    setContato({ key: '', nome: '', numero: '' });

    setContatos((contatos) => {
      contatos.map((contato) => {
        if (contato.key === contatoEditado.key) {
          contato.nome = contatoEditado.nome;
          contato.numero = contatoEditado.numero;
        }
      });
      return contatos;
    });

  }


  let conteudo = <TelaContatos onDetalhes={detalhesContato}
    listaContatos = {contatos}
    contador = {contador}
  />

  if (contato.nome != '' && contato.numero != '') {
    conteudo = <TelaDetalhesContato detalhesContato={contato}
      onVoltar={reiniciar}
    />
  }


  return (
    <View style={styles.tela}>
      {conteudo}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: Medidas.telainicial.tela,
  },
});