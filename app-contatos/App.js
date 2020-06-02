import React from 'react';
import ContatosNavigator from './src/Routes'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import contatosReducer from './src/store/contatosReducer';
import { init } from './src/helpers/db';

init().then(() => {
  console.log("Êxito na criação da base de dados");
}).catch((err) => {
  console.log('Criação da base falhou.');
  console.log(err);
});

const rootReducer = combineReducers({
  contatos: contatosReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ContatosNavigator />
    </Provider>
  );
}
