import React from 'react';
import Sidebar from './components/sideBar';
import Home from './Home';

function App() {
  return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Home />
      </div>
  );
}

export default App;
