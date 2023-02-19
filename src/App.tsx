import './App.css';

import Container from './container/Container';
import { useEffect, useState } from 'react';
import Interface from './component/Interface';
export let currentConfig = {};

function App() {
  const [config, setConfig] = useState({});

  async function fetchConfig() {
    return fetch('http://localhost:3001/pzconfig')
    .then((response) => {
      return response.json();
    });
  }

  useEffect(() => {
    fetchConfig().then((c) => setConfig(c));
  }, []);

  return (
    <div className="App">
      <Interface currentConfig={currentConfig} fetchConfig={fetchConfig} setConfig={setConfig} />
      <Container config={config} currentConfig={currentConfig}/>
    </div>
  );
}

export default App;
