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
import MainLayout from './layout/MainLayout';

const router = createBrowserRouter([
  {
   path:"/",
   element: <AuthLayout />,
   children: [
    {
      index: true,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: 'stats',
      element: (
        <MainLayout>
          <Stats />
        </MainLayout>
      )
    },
    {
      path: 'profile',
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      )
    },
    {
      path: "dashboard",
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      )
    },
    {
      path: 'signin',
      element: <SignIn />
    },
    {
      path: 'signup',
      element: <SignUp />
    },
    {
      path: 'signout',
      element: (
        <MainLayout>
          <SignOut />
        </MainLayout>
      )
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
