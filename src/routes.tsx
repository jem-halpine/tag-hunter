import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import Profile from './pages/Profile'
import Gallery from './pages/GalleryPage'
import Register from './components/Register'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="/play" element={<GamePage />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/register" element={<Register />} />
  </Route>,
)
