import { Routes, Route, HashRouter } from "react-router-dom";
import Page from './components/page';

const Router = (props) => {
  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default Router;