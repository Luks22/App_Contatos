import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, FlatList, Alert } from 'react-native';
import ContatoItem from '../components/contatoItem/ContatoItem';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import BotaoCabecalho from '../components/BotaoCabecalho/BotaoCabecalho';
import { useSelector, useDispatch } from 'react-redux';
import * as contatosActions from '../store/contatosAction';


const TelaContatos = (props) => {

  let contatos = useSelector(estado => estado.contatos.contatos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contatosActions.listaDeContatos());
  }, [dispatch]);


  const removeAlert = (id) => {

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
          onPress: () => { removerContato(id) }
        }
      ]
    );
    return;


  }

  const removerContato = (idASerRemovida) => {

    dispatch(contatosActions.removerContato(idASerRemovida));
    props.navigation.goBack();
  }


  return (
    <View style={styles.telaPrincipalView}>

      <View style={styles.contatos}>
        <Text style={styles.titulo}>Lista de Contatos</Text>
      </View>

      <FlatList
        data={contatos}
        keyExtractor={contato => contato.id}
        renderItem={contato =>
          <ContatoItem
            nomeContato={contato.item.nome}
            numeroContato={contato.item.numero}
            onSelect={() =>
              props.navigation.navigate('DetalheDoContato', {
                contatoNome:
                  contato.item.nome, idContato: contato.item.id, contatoNumero: contato.item.numero, contatoImagem: contato.item.imagem
              })}
            onDelete={() => { removeAlert(contato.item.id) }}
            imagem={contato.item.imagem}
          />
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
          onPress={() => { dadosNav.navigation.navigate("NovoContato") }} />
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
