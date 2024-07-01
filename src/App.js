import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Adminhome from "./Pages/Adminhome";
import Customerhome from "./Pages/Customerhome";
import Viewsongs from "./Pages/Viewsongs";
import Newsong from "./Pages/Newsong";
import Createplaylists from "./Pages/Createplaylists";
import Viewplaylist from "./Pages/Viewplaylist";
import Pay from "./Pages/Pay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/adminhome" element={<Adminhome />}></Route>
        <Route path="/customerhome" element={<Customerhome />}></Route>
        <Route path="/viewsongs" element={<Viewsongs />}></Route>
        <Route path="/newsong" element={<Newsong />}></Route>
        <Route path="/createplaylists" element={<Createplaylists />}></Route>
        <Route path="/viewplaylists" element={<Viewplaylist />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/pay" element={<Pay />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
