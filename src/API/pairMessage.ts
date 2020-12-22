import client from './index';

export const sendReady = () => {
  client.send('pairSend', {
    path: 'ready'
  });
}

client.on('message', (path: string, data: any) => {

});