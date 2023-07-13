import React from 'react';
import ResponsiveAppBar from './components/appBar';
import Router from './routes';
import axios from 'axios';

import './static/css/index.scss';
import { HashRouter, createHashRouter, RouterProvider } from 'react-router-dom';

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

  const router = createHashRouter([
    {
      path: "/*",
      element: <React.StrictMode>
        <HashRouter>
          <div className="App">
            <ResponsiveAppBar rooms={rooms} />
            <Router rooms={rooms} />
          </div>
        </HashRouter>
      </React.StrictMode>,
    }
  ]);

  return <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
}

export default App;
