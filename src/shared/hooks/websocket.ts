import { useEffect } from 'react';
import client from '../../API/index';

const useWebsocket = (path: string, fn?: (data: any) => void) => {
  useEffect(() => {
    if (!fn) {
      return;
    }

    const onMessage = (pairPath: string, data: any) => {
      if (pairPath !== 'pairGet') return;
      if (data['path'] === path) {
        fn(data);
      } 
    };

    client.on('message', onMessage);

    return () => {
      client.off('message', onMessage);
    }
  }, [path, fn]);

  return (data: any) => {
    const dataSend = {
      ...data,
      path: path
    };

    client.send('pairSend', dataSend);
  }
};

export default useWebsocket;