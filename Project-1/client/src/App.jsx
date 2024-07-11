import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Stats from "./pages/Stats";
import Access from "./pages/Dashboard";
import { RecoilRoot } from "recoil";

// import MainLayout from "./layouts/MainLayout";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import PromptLogin from "./components/PromptLogin";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<AuthLayout />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/access" element={<Access />} />
              </Route>
            </Route>
            
            <Route path="/prompt" element={<PromptLogin />}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
