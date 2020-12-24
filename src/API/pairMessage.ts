import client from './index';

export const sendReady = () : void => {
  client.send('pairSend', {
    path: 'ready',
  });
};
