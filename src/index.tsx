import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './API';
import { Provider } from 'mobx-react';
import Stores from './stores';
import Reactotron from 'reactotron-react-js'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

Reactotron
  .configure()
  .connect();

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider {...Stores}>
        <App />
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
