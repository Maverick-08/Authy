import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Unauthorized from './components/Unauthorized'
import Players from './components/Players'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth" element={<SignIn />}/>
          <Route path="/register" element={<SignUp />}/>
          <Route path="/unauthorized" element={<Unauthorized />}/>
          <Route path="/players" element={<Players />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
