import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Developer from "./pages/Developer";
import Stats from "./pages/Stats";
import Access from "./pages/Access";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/access" element={<Access />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
