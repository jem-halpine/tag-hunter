import { IsAuthenticated } from '@/components/IsAuthenticated'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="pl-12">
      <div>
        <img
          src="../../public/images/homepage/heart.png"
          alt="heart"
          className="left-18 fixed top-96 w-48 rotate-12"
        />
        <img
          src="../../public/images/homepage/spray-can.png"
          alt="spray can"
          className="left-18 fixed w-72"
        />
        <img
          src="../../public/images/homepage/spray-can-1.png"
          alt="spray can"
          className="fixed right-20 w-48"
        />
        <img
          src="../../public/images/homepage/lightning-bolt.png"
          alt="lightning bolt"
          className="fixed bottom-36 right-52 w-28"
        />
        <img
          src="../../public/images/homepage/mural.png"
          alt="mural"
          className="fixed bottom-72 right-52 w-56"
        />
        <img
          src="../../public/images/homepage/fire-hydrant.png"
          alt="fire hydrant"
          className="fixed right-96 top-28 w-36"
        />
        <img
          src="../../public/images/homepage/skateboard.png"
          alt="skateboard"
          className="fixed bottom-72 left-20 w-32"
        />
        <img
          src="../../public/images/homepage/poster.png"
          alt="poster"
          className="fixed w-28"
        />
      </div>
      <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col">
        <Link to="/play">
          <Button variant="default" size="lg">
            Start Game
          </Button>
        </Link>
        <IsAuthenticated>
          <Link to="/gallery">
            <Button variant="default" size="lg">
              Gallery
            </Button>
          </Link>
        </IsAuthenticated>
      </div>
    </div>
  )
}
