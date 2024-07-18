import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import SignOut from './pages/SignOut';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
   path:"/",
   element: <AuthLayout />,
   children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: 'stats',
      element: <Stats />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: "dashboard",
      element: <Dashboard />
    },
    {
      path: 'signout',
      element: <SignOut />
    }
   ] 
  }
])


function App() {

  return(
    <RouterProvider router={router}/>
  )
}

export default App
