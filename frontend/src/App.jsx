import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/home' element={<PrivateRoute>{<Home/>}</PrivateRoute>}/>
      <Route path='/profile' element={<PrivateRoute>{<Profile/>}</PrivateRoute>}/>
      <Route path='/admin' element={<AdminRoute>{<Admin/>}</AdminRoute>}/>
      <Route path='*' element={<Navigate to='/home' replace />} />
    </Routes>
  )
}

export default App
