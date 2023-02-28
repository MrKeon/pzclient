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

export async function fetchPostPZConfig(body: BodyInit) {
  console.log(body);
  return fetch('http://localhost:3001/pzconfig', {
    method: 'POST', body: body, headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((response) => {
      return response.status;
    });
}

function App() {
  const [config, setConfig] = useState<{ [key: string]: any }>([]);
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

  async function uploadConfig() {
    //console.log(JSON.stringify(config));
    fetchPostPZConfig(await JSON.stringify(config)).then((status) => {
      console.log(`servertest.ini update sent. Status: ${status}`);
    });
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
