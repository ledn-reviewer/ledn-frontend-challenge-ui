import { QueryClient, QueryClientProvider } from 'react-query';
import DataExample from './DataExample';

const App = () => {
  const queryClient = new QueryClient();

  return  (
    <QueryClientProvider client={queryClient}>
      <h1 style={{
        width: "100%",
        textAlign: 'center',
      }}>Ledn frontend challenge</h1>
      <DataExample />
    </QueryClientProvider>
  );
};

export default App;
