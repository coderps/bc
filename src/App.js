import React from 'react';
import ResponsiveAppBar from './components/appBar';
import Router from './routes';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';

import './static/css/index.scss';

function App() {
  const [rooms, setRooms] = React.useState([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!ready) {
      console.log('updating table...');
      axios.get('https://praxtheslayer.pythonanywhere.com/api/rooms/') //192.168.1.143
      .then(response => {
          console.log('rooms:', response.data);
          setRooms(response.data);
          setReady(true);
      })
      .catch(error => console.log(error))
    }
  });

  return <React.Fragment>
    <HashRouter>
      <div className="App">
        <ResponsiveAppBar rooms={rooms} />
        <Router rooms={rooms} />
      </div>
    </HashRouter>
  </React.Fragment>
}

export default App;
