import { createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'

export default createRoutesFromElements(
<Route path="/" element={<Layout />}> 
  <Route index element={<HomePage/>}/>
  <Route path="/play" element={<GamePage/>}/>
</Route> 
)
