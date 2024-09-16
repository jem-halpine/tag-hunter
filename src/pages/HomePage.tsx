import { IsAuthenticated } from '@/components/IsAuthenticated'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="pl-12 pr-12">
      <div className="grid max-w-full grid-cols-5 gap-4 overflow-hidden">
        <div className="h-[35vh]">
          <img
            src="/images/homepage/spray-can.png"
            alt="spray can"
            className="max-w-[18vw] rotate-12"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/heart.png"
            alt="heart"
            className="max-w-[16vw]  -translate-x-[20%] translate-y-[40%] transform"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/skateboard.png"
            alt="skateboard"
            className="rotate-14 max-w-[16vw] -translate-x-[20%] transform"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/fire-hydrant.png"
            alt="fire hydrant"
            className="max-w-[16vw] translate-x-[10%] translate-y-[10%] rotate-6 transform"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/mural.png"
            alt="mural"
            className="max-w-[18vw]"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/graffiti.png"
            alt="spray can"
            className="max-w-[16vw] translate-x-[10%] translate-y-[10%] transform"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/lightning-bolt.png"
            alt="lightning bolt"
            className="max-w-[12vw] translate-x-[80%] translate-y-[40%] rotate-3 transform"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/mural-1.png"
            alt="mural"
            className="max-w-[16vw] translate-x-[80%] translate-y-[15%] transform"
          />
        </div>

        <div className="h-[35vh]">
          <img
            src="/images/homepage/spray-can-1.png"
            alt="spray can"
            className="max-w-[22vw] -translate-y-[15%] translate-x-[60%] -rotate-12 transform"
          />
        </div>
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
          <Link to="/play/leaderboard">
            <Button variant="default" size="lg">
              Leaderboard
            </Button>
          </Link>
        </IsAuthenticated>
      </div>
    </div>
  )
}
