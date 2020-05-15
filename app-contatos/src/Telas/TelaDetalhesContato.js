import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import Cartao from '../components/cartaoTemplate/Cartao';

const TelaDetalhesContato = (props) => {
    const [usuarioConfirmou, setUsuarioConfirmou] = useState(false);
    const [contato, setContato] = useState({ key: '', nome: '', numero: '' });
    const [contatoAtual, setContatoAtual] = useState(props.navigation.getParam("contato"));

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

    const editarContato = (contato) => {
        if (contato.nome == '' && contato.numero == '') {
            setUsuarioConfirmou(false);
        } else if (contato.numero == '') {
            setContatoAtual({ key: contatoAtual.key, nome: contato.nome, numero: contatoAtual.numero });
            setUsuarioConfirmou(false);
        } else if (contato.nome == '') {
            setContatoAtual({ key: contatoAtual.key, nome: contatoAtual.nome, numero: contato.numero });
            setUsuarioConfirmou(false);
        } else {
            setContatoAtual({ key: contatoAtual.key, nome: contato.nome, numero: contato.numero });
            setUsuarioConfirmou(false);
        }
    }


    const confirmarEdicao = () => {
        setUsuarioConfirmou(true);
    }

    const editar = (contato) => {
        
        let lista = props.navigation.getParam("lista");

        lista.map(l => {
            if (l.key === contato.key) {
                l.nome = contato.nome;
                l.numero = contato.numero;
                l.key = contato.key;
            }
        });

        setContatoAtual({});
        props.navigation.goBack();
    }

    let editFields;

    if (usuarioConfirmou) {
        editFields =
            <Cartao style={styles.campoEditar}>
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
                        editarContato(contato);
                        setContato({ nome: '', numero: '' });
                    }}
                    style={styles.botao}>
                    <Text style={styles.iconeBotao}>confirmar</Text>
                </TouchableOpacity>
            </Cartao>
    }


    return (
        <View style={styles.telaPrincipalView}>
            <Cartao style={styles.itemDaLista}>
                <View style={styles.contato}>
                    <Text style={styles.contatoNome}>{contatoAtual.nome}</Text>
                </View>
                <View style={styles.contato}>
                    <Text style={styles.contatoNumero}>{contatoAtual.numero}</Text>
                </View>
            </Cartao>
            {editFields}
            <View style={styles.botoes}>
                <Button
                    title="voltar"
                    onPress={() => {editar(contatoAtual)}}
                />

                <Button
                    title="editar"
                    onPress={confirmarEdicao}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({


    telaPrincipalView: {
        flex: Medidas.detalhes.telaFlex,
        padding: Medidas.detalhes.telaPadding,
        alignItems: 'center',
    },

    titulo: {
        fontSize: Medidas.detalhes.tituloFont,
        marginVertical: Medidas.detalhes.tituloMargin,
    },

    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Medidas.detalhes.botoesMargin,
        width: Medidas.detalhes.botoesWidth,
        maxWidth: Medidas.detalhes.botoesMaxWidth
    },

    itemDaLista: {
        padding: Medidas.detalhes.itemListPadding,
        borderWidth: Medidas.detalhes.itemListBorder,
        borderRadius: Medidas.Listcontato.itemBorderRadius,
        borderColor: Cores.primaryBlue,
        marginBottom: Medidas.Listcontato.itemMargin,
        marginTop: Medidas.detalhes.itemListMargin,
        backgroundColor: Cores.primaryWhite,
        width: Medidas.detalhes.itemListWidth,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: Medidas.detalhes.botaoWidth,
        height: Medidas.inputContato.buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        right: Medidas.detalhes.botaoPositionRigth,
        bottom: Medidas.inputContato.buttonBot,
        backgroundColor: Cores.primaryWhite,
    },

    iconeBotao: {
        fontSize: Medidas.detalhes.botaoTextFont,
        color: Cores.primaryBlue,
    },

    campoEditar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingBottom: Medidas.inputContato.lembretePadding,
        width: Medidas.detalhes.editarWidth

    },
})

export default TelaDetalhesContato;