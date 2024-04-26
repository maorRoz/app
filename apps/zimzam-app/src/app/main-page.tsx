import { io } from 'socket.io-client';
import { AssetsGrid } from './assets-grid';

const socket = io('ws://localhost:80');

export const MainPage = () => {
  socket.on('connect', () => {
    console.log(socket.id);
  });

  return (
    <div className="bg-[#f2f4fc] h-screen">
      <div className="max-w-[1200px] m-auto h-full pt-12">
        <AssetsGrid />
      </div>
    </div>
  );
};
