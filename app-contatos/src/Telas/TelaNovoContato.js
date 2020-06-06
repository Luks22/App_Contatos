import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Cores from '../cores/Cores';
import Medidas from '../medidas/Medidas';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as contatosActions from '../store/contatosAction';
import ImageSelect from '../components/image/imageSelect';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'


const TelaNovoContato = (props) => {

    const dispatch = useDispatch();

    const [contato, setContato] = useState({ nome: '', numero: '' });
    const [imagemURI, setImagemURI] = useState();

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

    const fotoSelecionada = imagemURI => {
        setImagemURI(imagemURI);
    }

    const verificarPermissoes = async () => {
        const resultado = await Permissions.askAsync(Permissions.LOCATION);
        if (resultado.status !== "granted") {
            Alert.alert(
                'Sem permissão para uso do mecanismo de localização',
                "É preciso liberar acesso ao mecanismo de localização",
                [{ text: "Ok" }]
            )
            return false;
        }
        return true;
    }

    const adicionarContato = async () => {
        const temPermissao = await verificarPermissoes();
        if (temPermissao) {
            try {
                const localizacao = await Location.getCurrentPositionAsync({
                    timeout:
                        8000
                });
                
                let lat = localizacao.coords.latitude;
                let lon = localizacao.coords.longitude;

                let data = new Date();
                let minutos = data.getMinutes();
                if(minutos < 10){
                    minutos = "0".concat(minutos.toString());
                }else if(minutos % 10 == 0){
                    minutos = minutos.toString().concat("0");
                }

                let horario = data.getHours() + ":" + minutos;


                if (contato.nome === '' || contato.numero === '') {
                    alert("Insira um contato válido");
                    return;
                }

                dispatch(contatosActions.addContatos(contato.nome, contato.numero, imagemURI, lat, lon, horario));
                props.navigation.goBack();
            }
            catch (err) {
                Alert.alert(
                    "Impossível obter localização",
                    "Para cadastar um contato e necessário o uso da localização",
                    [{ text: "Ok" }]
                );
                return;
            }
        }
    }

    return (
        <ScrollView>
            <View style={styles.textInputBox}>
                <TextInput style={styles.textInput}
                    placeholder="Nome do Contato"
                    placeholderTextColor="#00008B"
                    value={contato.nome}
                    onChangeText={capturarNome}
                />
                <TextInput style={styles.textInput}
                    placeholder="Número do Contato"
                    placeholderTextColor="#00008B"
                    value={contato.numero}
                    onChangeText={capturarNumero}
                />
                <ImageSelect onFotoSelecionada={fotoSelecionada} />
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
    },
});


export default TelaNovoContato;