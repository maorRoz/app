import { io } from 'socket.io-client';
import { AssetsGrid } from './assets-grid';
import { useSelectedAssets } from './use-selected-assets';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

//const socket = io('ws://localhost:80');

export const MainPage = () => {
  const { selectedAssets, onAssetSelect } = useSelectedAssets();

  const { data } = useQuery({
    queryKey: ['getAssets', selectedAssets],
    queryFn: async () => {
      const { data } = await axios.get('/api/latest-price', {
        params: { code: 'BTC' },
      });

      return data;
    },
  });

  console.log(data);
/* 
  socket.on('connect', () => {
    console.log(socket.id);
  }); */

  return (
    <div className="bg-[#f2f4fc] h-screen">
      <div className="max-w-[1200px] m-auto h-full pt-12">
        <AssetsGrid
          selectedAssets={selectedAssets}
          onAssetSelect={onAssetSelect}
        />
      </div>
    </div>
  );
};
