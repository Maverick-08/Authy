import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Stats from "./pages/Stats";
import Dashboard from "./pages/Dashboard";
import PromptLogin from "./components/PromptLogin";
import Profile from "./pages/Profile";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

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
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>

            <Route element={<MainLayout />}>
              <Route path="/prompt" element={<PromptLogin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
