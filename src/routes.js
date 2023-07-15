import { Routes, Route, HashRouter } from "react-router-dom";
import Page from './components/page';

/*

        {props.rooms.map((room, idx) => 
          <Route 
            key={idx} 
            path={"/"+room.name.replace(' ','-')} 
            element={<Page room={room} />} 
          />
        )}
*/

const Router = (props) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;