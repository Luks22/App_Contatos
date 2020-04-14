import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Cores from '../../cores/Cores';
import Medidas from '../../medidas/Medidas';

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
        paddingBottom: Medidas.inputContato.lembretePadding,

    },

    contatoInputBox: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: Medidas.inputContato.inputBoxPadding
    },

    contatoInputText: {
        width: Medidas.inputContato.inputTextWidth,
        maxWidth: Medidas.inputContato.inputTextWidthMax,
        borderBottomColor: Cores.primaryBlack,
        borderBottomWidth: Medidas.inputContato.inputBorderBot,
        borderEndWidth: Medidas.inputContato.inputBorderEnd,
        padding: Medidas.inputContato.inputPadding,
        paddingBottom: Medidas.inputContato.inputPadding,
    },

    botao: {
        position: 'absolute',
        width: Medidas.inputContato.buttonWidth,
        height: Medidas.inputContato.buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        right: Medidas.inputContato.buttonRigth,
        bottom: Medidas.inputContato.buttonBot,
        backgroundColor: Cores.primaryBlue,
        borderRadius: Medidas.inputContato.buttonBorder,
        elevation: Medidas.inputContato.buttonElevation
    },

    iconeBotao: {
        fontSize: Medidas.inputContato.buttonFontSize,
        color: Cores.primaryWhite,
    },

});


export default ContatoInput;