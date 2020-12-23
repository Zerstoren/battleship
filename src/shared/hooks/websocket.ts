import { useEffect } from 'react';
import client from '../../API/index';

const useWebsocket = (path: string, fn: (data: any) => void) => {
  useEffect(() => {
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
};

export default useWebsocket;