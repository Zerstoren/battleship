import client from './index';

export const sendReady = () => {
  client.send('pairSend', {
    path: 'ready'
  });
}