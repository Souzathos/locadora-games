import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/home' element={<PrivateRoute>{<Home/>}</PrivateRoute>}/>
      <Route path='/profile' element={<PrivateRoute>{<Profile/>}</PrivateRoute>}/>
    </Routes>
  )
}

export default App
