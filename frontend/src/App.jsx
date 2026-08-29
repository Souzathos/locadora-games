import { Routes, Route } from 'react-router-dom'
import './App.css'

// Importando as páginas com a extensão .jsx no final
import Home from './pages/Home.jsx'
import Games from './pages/Games.jsx'
import GameDetails from './pages/GameDetails.jsx'
import Offers from './pages/Offers.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogos" element={<Games />} />
          <Route path="/jogos/:id" element={<GameDetails />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App