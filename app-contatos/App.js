import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import ContatoItem from './src/components/contatoItem/ContatoItem';
import ContatoInput from './src/components/contatoInput/ContatoInput';
import Cores from './src/cores/Cores';
import Medidas from './src/medidas/Medidas';


export default function App() {
  const [contadorContatos, setContadorContatos] = useState(10);
  const [contatos, setContatos] = useState([]);

  const adicionarContato = (contato) => {
    
    if(contato.nome === '' || contato.numero === ''){
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

  const removerContato = (keyASerRemovida) => {

    setContatos((contatos) => {
      return contatos.filter((contato) => {
        return contato.key !== keyASerRemovida;
      });
    });

  }

  return (
    <View style={styles.telaPrincipalView}>
      
      <ContatoInput onAdicionarContato = {adicionarContato}/>

      <View style={styles.contatos}>
        <Text style={styles.titulo}>Lista de Contatos</Text>
      </View>

      <FlatList
        data={contatos}
        renderItem={
          contato => (
            <ContatoItem 
            chave = {contato.item.key}
            nome = {contato.item.nome} 
            numero = {contato.item.numero}
            onDelete = {removerContato}
            />
          )
        }
      />
    </View>
  );
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
