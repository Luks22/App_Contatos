import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import Cores from '../../cores/Cores';
import * as ImagePicker from 'expo-image-picker';
import Medidas from '../../medidas/Medidas';

const ImageSelect = props => {
    const [imagemURI, setImagemURI] = useState();

    const selecionaFoto = async () => {
        const foto = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        setImagemURI(foto.uri);
        props.onFotoSelecionada(foto.uri);
    }

    return (
        <View style={styles.principal}>
            <View style={styles.previewDaImagem}>
                {
                    !imagemURI ?
                        <Text>Nenhuma foto.</Text>
                        :
                        <Image
                            style={styles.imagem}
                            source={{ uri: imagemURI }}
                        />
                }
            </View>

            <Button
                title="Selecionar foto"
                color={Cores.primaryBlue}
                onPress={selecionaFoto}
            />
        </View>
    )
};

const styles = StyleSheet.create({

    principal: {
        alignItems: 'center',
        marginBottom: Medidas.imagem.principalComponent
    },
    previewDaImagem: {
        width: Medidas.imagem.imagemWidthPerCent,
        height: Medidas.imagem.imagemHeightComponet,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Medidas.imagem.imagemMarginComponet,
        borderColor: Cores.imgBackground,
        borderWidth: Medidas.imagem.imageBorderWidth
    },
    imagem: {
        width: Medidas.imagem.imagemWidthPerCent,
        height: Medidas.imagem.imagemHeightPerCent
    },

});

export default ImageSelect;