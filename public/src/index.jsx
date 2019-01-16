import React from 'react'
import ReactDOM from 'react-dom'
// import {AppContainer} from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/index'
import Routes from './routes'
import App from './app';
import './styles/index.scss'

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);


//
// // Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     renderApp(require('./routes').default);
//   })
// }
