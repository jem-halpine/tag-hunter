import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'

export default function Layout() {
  return (
    <>
      <Nav />
      <Gallery />
      <Outlet />
      <Footer />
    </>
  )
}
