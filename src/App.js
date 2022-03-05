import { createContext, useState } from 'react';
import AppRouter from './AppRouter';

export const userContext = createContext();

function App() {
  const [dataContainer, setDataContainer] = useState({ sidebarShow: true, token: localStorage.getItem('token') } || { sidebarShow: true });

  return (
    <userContext.Provider value={[dataContainer, setDataContainer]}>
      <AppRouter />
    </userContext.Provider>
  );
}

export default App;
