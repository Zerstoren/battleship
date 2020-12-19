import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './API';
import { Provider } from 'mobx-react';
import Stores from './stores';
import Reactotron from 'reactotron-react-js'

Reactotron
  .configure()
  .connect();

ReactDOM.render(
  <React.StrictMode>
    <Provider {...Stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
