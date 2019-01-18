import React from 'react'
import ReactDOM from 'react-dom'
// import {AppContainer} from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './store/index'
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import App from './app';
import './styles/index.scss'

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);


//
// // Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     renderApp(require('./routes').default);
//   })
// }
