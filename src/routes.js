import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Page from './components/page';

const Router = (props) => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/bc" element={<div>index</div>} />
          {props.rooms.map((room, idx) => 
            <Route 
              key={idx} 
              path={"bc/rooms/"+room.name.replace(' ','-')} 
              element={<Page room={room} />} 
            />
          )}
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

export default Router;