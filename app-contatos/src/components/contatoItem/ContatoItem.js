import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Cartao from '../cartaoTemplate/Cartao';
import Cores from '../../cores/Cores';
import Medidas from '../../medidas/Medidas';

const ContatoItem = (props) => {

  return (

    <TouchableOpacity onLongPress={props.onDelete}
      onPress={props.onSelect}
    >
      <Cartao style={styles.itemNaLista}>
        <Image style={styles.imagem} source={{ uri: props.imagem }} />
        <View style={styles.contato}>
          <Text style={styles.contatoNome}>{props.nomeContato}</Text>
        </View>
        <View style={styles.contato}>
          <Text style={styles.contatoNumero}>{props.numeroContato}</Text>
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
    backgroundColor: Cores.primaryWhite,
  },

  imagem: {
    width: Medidas.imagem.imagemWidth,
    height: Medidas.imagem.imagemHeight,
    borderRadius: Medidas.imagem.imageBorderRadius,
    backgroundColor: Cores.imgBackground,
    borderColor: Cores.primaryBlack,
    borderWidth: Medidas.imagem.imageBorderWidth,
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