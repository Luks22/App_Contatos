import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Button } from 'react-native';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import { ScrollView } from 'react-native-gesture-handler';

const TelaNovoContato = (props) => {

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

    const adicionarContato = () => {
        props.navigation.push("Contatos", {contato: contato});
    }

    return (
        <ScrollView>
            <View style={styles.textInputBox}>
                <TextInput style={styles.textInput} 
                placeholder = "Nome do Contato"
                placeholderTextColor = "#00008B"
                value = {contato.nome}
                onChangeText = {capturarNome}
                />
                <TextInput style={styles.textInput} 
                placeholder = "Número do Contato"
                placeholderTextColor = "#00008B"
                value = {contato.numero}
                onChangeText = {capturarNumero}
                />
                <TouchableOpacity
                    onPress={() => {
                        adicionarContato(contato);
                        setContato({ nome: '', numero: '' });
                    }}
                    style={styles.botao}>
                    <Text style={styles.iconeBotao}>Salvar Contato</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}

TelaNovoContato.navigationOptions = (dadosNav) => {
    return {
        headerTitle: "Novo Contato",
    }
}

const styles = StyleSheet.create({

    botao: {
        width: Medidas.inputContato.buttonWidth,
        height: Medidas.inputContato.buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        left: Medidas.inputContato.buttonLeft,
        backgroundColor: Cores.primaryWhite,
        borderRadius: Medidas.inputContato.buttonBorder,
        elevation: Medidas.inputContato.buttonElevation
    },

    iconeBotao: {
        fontSize: Medidas.inputContato.buttonFontSize,
        color: Cores.primaryBlue,
    },
    textInputBox: {
        margin: Medidas.inputContato.textInputBox
    },
    textInput: {
        borderBottomColor: Cores.primaryBlack,
        borderBottomWidth: Medidas.inputContato.textInputBottonW,
        marginBottom: Medidas.inputContato.textInputMarginB,
        paddingVertical: Medidas.inputContato.textInputPaddingV
    }
});


export default TelaNovoContato;