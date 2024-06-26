import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Unauthorized from "./components/Unauthorized";
import Players from "./components/Players";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/players" element={<Players />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
