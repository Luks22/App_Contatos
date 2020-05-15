import { createStackNavigator } from 'react-navigation-stack';
import TelaContatos from './Telas/TelaContatos';
import TelaDetalhesContato from './Telas/TelaDetalhesContato';
import TelaNovoContato from './Telas/TelaNovoContato';
import { Platform } from 'react-native';
import Cores from './cores/Cores';
import { createAppContainer } from 'react-navigation'

const ContatosNavigator = createStackNavigator({
    Contatos: TelaContatos,
    NovoContato: TelaNovoContato,
    DetalheDoContato: TelaDetalhesContato
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Cores.primaryBlue : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Cores.primaryBlue
    }
});

export default createAppContainer(ContatosNavigator);