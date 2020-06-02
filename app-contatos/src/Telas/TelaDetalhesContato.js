import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import Cartao from '../components/cartaoTemplate/Cartao';
import { useSelector, useDispatch } from 'react-redux';
import * as contatosActions from '../store/contatosAction';
import ImageSelect from '../components/image/imageSelect'


const TelaDetalhesContato = (props) => {
    const [usuarioConfirmou, setUsuarioConfirmou] = useState(false);
    const [contato, setContato] = useState({ id: '', nome: '', numero: '' });
    const [imagem, setImagem] = useState(props.navigation.getParam("contatoImagem"));
    const [imagemURI, setImagemURI] = useState();
    const [contatoAtual, setContatoAtual] = useState({
        id: props.navigation.getParam("idContato"),
        nome: props.navigation.getParam("contatoNome"),
        numero: props.navigation.getParam("contatoNumero")
    });

    const dispatch = useDispatch();

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
            if (imagemURI) {
                setImagem(imagemURI);
            }
            setUsuarioConfirmou(false);
        } else if (contato.numero == '') {
            setContatoAtual({ id: contatoAtual.id, nome: contato.nome, numero: contatoAtual.numero });
            if (imagemURI) {
                setImagem(imagemURI);
            }
            setUsuarioConfirmou(false);
        } else if (contato.nome == '') {
            setContatoAtual({ id: contatoAtual.id, nome: contatoAtual.nome, numero: contato.numero });
            if (imagemURI) {
                setImagem(imagemURI);
            }
            setUsuarioConfirmou(false);
        }
        else {
            setContatoAtual({ id: contatoAtual.id, nome: contato.nome, numero: contato.numero });
            if (imagemURI) {
                setImagem(imagemURI);
            }
            setUsuarioConfirmou(false);
        }
    }

    const confirmarEdicao = () => {
        setUsuarioConfirmou(true);
    }

    const editar = (contatoEditado) => {
        dispatch(contatosActions.editarContato(contatoEditado, imagem));
        props.navigation.goBack();
    }

    const fotoSelecionada = imagemURI => {
        setImagemURI(imagemURI);
    }

    let editFields;

    if (usuarioConfirmou) {
        editFields =
            <Cartao style={styles.campoEditar}>
                <ScrollView>
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
                        <View style={styles.imageLayout}>
                            <ImageSelect onFotoSelecionada={fotoSelecionada} />
                        </View>
                    </View>
                    <View style = {styles.botaoLayout}>
                        <TouchableOpacity
                            onPress={() => {
                                editarContato(contato);
                                setContato({ nome: '', numero: '' });
                            }}
                            style={styles.botao}>
                            <Text style={styles.iconeBotao}>confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Cartao>
    }


    return (
        <ScrollView>
            <View style={styles.telaPrincipalView}>
                <Cartao style={styles.itemDaLista}>
                    <Image style={styles.imagem} source={{ uri: imagem }} />
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
                        onPress={() => { editar(contatoAtual) }}
                    />

                    <Button
                        title="editar"
                        onPress={confirmarEdicao}
                    />
                </View>
            </View>
        </ScrollView>
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

    imagem: {
        width: Medidas.imagem.imagemWidth,
        height: Medidas.imagem.imagemHeight,
        borderRadius: Medidas.imagem.imageBorderRadius,
        backgroundColor: Cores.imgBackground,
        borderColor: Cores.primaryBlack,
        borderWidth: Medidas.imagem.imageBorderWidth,
    },

    imageLayout: {
        width: Medidas.detalhes.imagemLayoutWidth,
        height: Medidas.detalhes.imagemLayoutHeight,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        paddingBottom: Medidas.detalhes.imagemLayoutPadBot,
        paddingTop: Medidas.detalhes.imagemLayoutPadTop

    },

    botaoLayout: {
        paddingTop: Medidas.detalhes.botaoLayoutPad,
    }

})

TelaDetalhesContato.navigationOptions = (dadosNav) => {
    return {
        headerTitle: dadosNav.navigation.getParam('contatoNome')
    }
};

export default TelaDetalhesContato;