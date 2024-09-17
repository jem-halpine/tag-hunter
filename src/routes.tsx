import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import Profile from './pages/Profile'
import Gallery from './pages/GalleryPage'
import Register from './components/Register'
import ViewArt from './pages/ViewArt'
import Leaderboard from './pages/Leaderboard'
import SubmitArt from './pages/SubmitArt'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="/play" element={<GamePage />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/register" element={<Register />} />
    <Route path="/gallery/:id" element={<ViewArt />} />
    <Route path="/play/leaderboard" element={<Leaderboard />} />
    <Route path="/submit" element={<SubmitArt />} />
  </Route>,
)
