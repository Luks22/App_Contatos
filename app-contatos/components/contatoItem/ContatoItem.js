import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const ContatoItem = (props) => {

  return (

    <TouchableOpacity onLongPress = {props.onDelete.bind(this, props.chave)}>

      <View style={styles.itemNaLista}>
        <View style={styles.contato}>
          <Text style={styles.contatoNome}>{props.nome}</Text>
        </View>
        <View style={styles.contato}>
          <Text style={styles.contatoNumero}>{props.numero}</Text>
        </View>
      </View>

    </TouchableOpacity>

  )

}


const styles = StyleSheet.create({

  itemNaLista: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    marginBottom: 8,
    marginTop: 8
  },

  contato: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contatoNome: {
    fontSize: 18,
    color: 'red',
    fontStyle: 'italic',
    fontFamily: 'sans-serif-light',
  },

  contatoNumero: {
    fontSize: 18,
    fontFamily: 'sans-serif',
  },
});


export default ContatoItem;