import React from 'react';
import ContatosNavigator from './src/Routes'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import contatosReducer from './src/store/contatosReducer';
import { YellowBox } from 'react-native'

const rootReducer = combineReducers({
  contatos: contatosReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

YellowBox.ignoreWarnings(['setTimeout']);


export default function App() {

  return (
    <Provider store={store}>
      <ContatosNavigator />
    </Provider>
  );
}
