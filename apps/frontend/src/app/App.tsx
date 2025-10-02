import { AppProviders } from './providers/AppProviders';
import { Router } from './router/Router';

function App() {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
}

export default App;