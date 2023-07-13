import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from './components/page';

const Router = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>index</div>} />
        {props.rooms.map((room, idx) => 
          <Route 
            key={idx} 
            path={"/rooms/"+room.name.replace(' ','-')} 
            element={<Page room={room} />} 
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;