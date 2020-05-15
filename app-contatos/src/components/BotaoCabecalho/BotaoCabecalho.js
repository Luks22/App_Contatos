import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import Cores from '../../cores/Cores'

const BotaoCabecalho = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={22}
            color={Platform.OS === 'android' ? 'white' : Cores.primaryBlack}
        />

    );
};
export default BotaoCabecalho;