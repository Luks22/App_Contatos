import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cores from '../../cores/Cores';
import Medidas from '../../medidas/Medidas';


const Cartao = (props) => {

    return(
        <View style = {{...styles.cartao, ...props.style}}>
            {props.children}
        </View>
    )
};


const styles = StyleSheet.create({
    cartao: {
        shadowColor: Cores.primaryBlack,
        shadowOffset: {
            width: Medidas.cartao.cartaoShadowWidth,
            height: Medidas.cartao.cartaoShadowHeigth
        },
        shadowRadius: Medidas.cartao.cartaoShadowRadius,
        shadowOpacity: Medidas.cartao.cartaoShadowOpacity,
        backgroundColor: Cores.primaryWhite,
        elevation: Medidas.cartao.cartaoElevation,
        padding: Medidas.cartao.cartaoPadding,
        borderRadius: Medidas.cartao.cartaoBorderRadius
        
    }
});


export default Cartao;