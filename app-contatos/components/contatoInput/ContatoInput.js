import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const ContatoInput = (props) => {

    const [contato, setContato] = useState({ nome: '', numero: '' });

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

    return (

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
                    props.onAdicionarContato(contato);
                    setContato({ nome: '', numero: '' });
                }}
                style={styles.botao}>
                <Text style={styles.iconeBotao}>+</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({

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

});






export default ContatoInput;