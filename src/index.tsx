import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './API';
import { Provider } from 'mobx-react';
import Stores from './stores';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...Stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
