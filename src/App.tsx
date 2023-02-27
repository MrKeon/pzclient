import './App.css';

import { useEffect, useState } from 'react';
import { ButtonToolbar, Button } from 'rsuite';
import Item from './component/Item';

export async function fetchConfig() {
  return fetch('http://localhost:3001/pzconfig')
    .then((response) => {
      return response.json();
    });
}

function App() {
  const [config, setConfig] = useState<{[key:string]: any}>([]);
  let list: any[] = [];
  let index = 0;
  function downloadConfig() {
    fetchConfig().then((c) => {
        setConfig(c);
        Object.keys(config).forEach((title) => {
          const obj = config[title];
          list.push(Item(title, obj.value, index++, config, setConfig, obj.description))
        });        
    });
  }

  function uploadConfig() {

  }

  // useEffect(() => {
  //   fetchConfig().then(c => {
  //     setConfig(c);
  //   });
  // });

  Object.keys(config).forEach((title) => {
    const obj = config[title];
    list.push(Item(title, obj.value, index++, config, setConfig, obj.description))
  });

  return (
    <div className="App">
      <ButtonToolbar>
        <Button color="green" appearance="primary" onClick={() => downloadConfig()}>
          Download Config
        </Button>
        <Button color="blue" appearance="primary" onClick={() => uploadConfig()}>
          Upload Config
        </Button>
      </ButtonToolbar>
      <div className="Container">{list}</div>
    </div>
  );
}

export default App;
