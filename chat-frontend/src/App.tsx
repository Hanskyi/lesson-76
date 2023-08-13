import React from 'react';
import User from "./Containers/User/User";
import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";


const App: React.FC = () => {
  return (
      <>
          <CssBaseline/>
          <div className="App">
              <Routes>
                  <Route path="/message" element={<User/>} ></Route>
                  {/*<Route path="/message/:date" element={<User/>} ></Route>*/}
              </Routes>
          </div>
      </>


  );
};

export default App;
