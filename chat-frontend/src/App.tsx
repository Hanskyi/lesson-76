import React from 'react';
import User from "./Containers/User/User";
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";


const App: React.FC = () => {
  return (
      <>
          <CssBaseline/>
          <Container maxWidth="lg" className="App">
              <Routes>
                  <Route path="/message" element={<User/>} ></Route>
              </Routes>
          </Container>
      </>
  );
};

export default App;
