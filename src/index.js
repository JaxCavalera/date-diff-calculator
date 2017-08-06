// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

// CRA Boilerplate
import registerServiceWorker from './registerServiceWorker';

// Components
import App from './container/App';

// Styles
import './index.css';

ReactDOM.render(
    <Provider store={{}}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
