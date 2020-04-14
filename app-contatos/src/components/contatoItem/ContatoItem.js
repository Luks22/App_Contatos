import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Cartao from '../cartaoTemplate/Cartao';
import Cores from '../../cores/Cores';
import Medidas from '../../medidas/Medidas';

const ContatoItem = (props) => {

  return (

    <TouchableOpacity onLongPress={props.onDelete.bind(this, props.chave)}>

      <Cartao style={styles.itemNaLista}>
        <View style={styles.contato}>
          <Text style={styles.contatoNome}>{props.nome}</Text>
        </View>
        <View style={styles.contato}>
          <Text style={styles.contatoNumero}>{props.numero}</Text>
        </View>
      </Cartao>

    </TouchableOpacity>


  )

}


const styles = StyleSheet.create({

  itemNaLista: {
    padding: Medidas.Listcontato.itemPadding,
    borderWidth: Medidas.Listcontato.itemBorder,
    borderRadius: Medidas.Listcontato.itemBorderRadius,
    borderColor: Cores.primaryBlue,
    marginBottom: Medidas.Listcontato.itemMargin,
    marginTop: Medidas.Listcontato.itemMargin,
    backgroundColor: Cores.primaryWhite
  },

  contato: {
    paddingBottom: Medidas.Listcontato.contatoPaddingBot,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contatoNome: {
    fontSize: Medidas.Listcontato.contatoFontSize,
    color: Cores.primaryRed,
    fontStyle: 'italic',
    fontFamily: 'sans-serif-light',
  },

  contatoNumero: {
    fontSize: Medidas.Listcontato.contatoFontSize,
    fontFamily: 'sans-serif',
  },
});


export default ContatoItem;