import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [contadorContatos, setContadorContatos] = useState(10);
  const [contato, setContato] = useState({ nome: '', numero: '' });
  const [contatos, setContatos] = useState([]);

  const capturarNome = (name) => {
    
    let nomeContato = name;
    let numeroContato = contato.numero;
    setContato({ nome: nomeContato, numero: numeroContato });

  };

  const capturarNumero = (number) => {

    let nomeContato = contato.nome;
    let numeroContato = number;

    setContato({ nome: nomeContato, numero: numeroContato });
  };

  const adicionarContato = () => {
    
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
  return (
    <View style={styles.telaPrincipalView}>
      <View style={styles.lembreteView}>
        <View style={styles.contatoInputBox}>
          <TextInput
            placeholder="Nome do Contato"
            style={styles.contatoInputText}
            onChangeText={capturarNome}
            value={contato.nome}
          />

          <TextInput
            placeholder="Número do contato"
            style={styles.contatoInputText}
            onChangeText={capturarNumero}
            value={contato.numero}
          />

        </View>
        <TouchableOpacity
          onPress={() => {
            adicionarContato();
            setContato({ nome: '', numero: '' });
          }}
          style={styles.botao}>
          <Text style={styles.iconeBotao}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contatos}>
        <Text style={styles.titulo}>Lista de Contatos</Text>
      </View>


      <FlatList
        data={contatos}
        renderItem={
          contato => (
            <View style={styles.itemNaLista}>
              <View style={styles.contato}>
                <Text style={styles.contatoNome}>{contato.item.nome}</Text>
              </View>
              <View style={styles.contato}>
                <Text style={styles.contatoNumero}>{contato.item.numero}</Text>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({

  telaPrincipalView: {
    padding: 50
  },

  lembreteView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingBottom: 20,

  },

  contatoInputBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingTop: 10
  },

  contatoInputText: {
    width: '150%',
    maxWidth: 200,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderEndWidth: 50,
    padding: 2,
    paddingBottom: 5,
  },

  itemNaLista: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    marginBottom: 8,
    marginTop: 8
  },

  botao: {
    position: 'absolute',
    width: 70,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: -10,
    bottom: 15,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },

  iconeBotao: {
    fontSize: 40,
    color: 'white'
  },

  contato: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contatos: {
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

  titulo: {
    fontSize: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }

});
