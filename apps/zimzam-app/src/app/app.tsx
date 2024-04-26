import { Route, Routes } from 'react-router-dom';
import { MainPage } from './main-page';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D3FD3',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
