import { Route, Routes } from 'react-router-dom';
import { MainPage } from './main-page';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
