import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, FlatList } from 'react-native';
import ContatoItem from '../components/contatoItem/ContatoItem';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import BotaoCabecalho from '../components/BotaoCabecalho/BotaoCabecalho';


const TelaContatos = (props) => {
  const [contadorContatos, setContadorContatos] = useState(0);
  const [contatos, setContatos] = useState([]);

  if(props.navigation.getParam("contato") != null){
    console.log(props.navigation.getParam("contato"));
  }

  const adicionarContato = (contato) => {

    if (contato.nome === '' || contato.numero === '') {
      alert("Insira um contato válido");
      return;
    }

    setContatos((contatos) => {
      setContadorContatos(contadorContatos + 2);
      return [...contatos, {
        key: contadorContatos.toString(), nome:
          contato.nome, numero: contato.numero
      }];
    });
  }


  const removeAlert = (key) => {

    Alert.alert(
      'Deletar Contato:',
      'Tem certeza que deseja deletar este contato?',
      [
        {
          text: 'Voltar',
          style: 'default',

        },

        {
          text: 'Sim',
          style: 'default',
          onPress: () => { removerContato(key) }
        }
      ]
    );
    return;


  }


  const removerContato = (keyASerRemovida) => {

    setContatos((contatos) => {
      return contatos.filter((contato) => {
        return contato.key !== keyASerRemovida;
      });
    });

  }

  const detalhesContato = (keyProcurada) => {

    let nomeDetalhe = '';
    let numeroDetalhe = '';
    let chave = '';

    contatos.map(contact => {
      if (contact.key === keyProcurada) {
        nomeDetalhe = contact.nome;
        numeroDetalhe = contact.numero;
        chave = contact.key;
      }
    })

    setContato({ key: chave, nome: nomeDetalhe, numero: numeroDetalhe });
  }

  return (
    <View style={styles.telaPrincipalView}>

      <View style={styles.contatos}>
        <Text style={styles.titulo}>Lista de Contatos</Text>
      </View>

      <FlatList
        data={contatos}
        renderItem={
          contato => (
            <ContatoItem
              chave={contato.item.key}
              nome={contato.item.nome}
              numero={contato.item.numero}
              onDelete={removeAlert}
              onDetalhesContato={detalhesContato}
            />
          )
        }
      />
    </View>
  );
}

TelaContatos.navigationOptions = dadosNav => {
  return {
    headerTitle: "Contatos",
    headerRight:
      <HeaderButtons
        HeaderButtonComponent={BotaoCabecalho}>
        <Item
          title="Adicionar"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => { dadosNav.navigation.navigate("NovoContato")}} />
      </HeaderButtons>

  }
}

const styles = StyleSheet.create({

  telaPrincipalView: {
    padding: Medidas.telaPrincipal.paddingTela,
  },

  contatos: {
    alignItems: 'center',
    justifyContent: 'center',

  },

  titulo: {
    fontSize: Medidas.telaPrincipal.fontSizeTela,
    borderBottomColor: Cores.primaryBlack,
    borderBottomWidth: Medidas.telaPrincipal.bottomWidth,
  }

});


export default TelaContatos;
