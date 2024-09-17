import { IsAuthenticated } from '@/components/IsAuthenticated'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <div className='opacity-80 pt-10'>
      <div className="pl-12 pr-12">
        <div className="grid max-w-full grid-cols-5 gap-4">
          <div className="h-[35vh]">
            <img
              src="/images/homepage/spray-can.png"
              alt="spray can"
              className="max-w-[18vw] translate-x-[10%] rotate-12 transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/heart.png"
              alt="heart"
              className="max-w-[14vw] translate-x-[5%] translate-y-[30%] -rotate-[18deg] transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/skateboard.png"
              alt="skateboard"
              className="max-w-[14vw] -translate-y-12  rotate-[35deg] transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/fire-hydrant.png"
              alt="fire hydrant"
              className="max-w-[16vw] -translate-x-[10%] translate-y-[5%] rotate-6 transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/mural.png"
              alt="mural"
              className="max-w-[18vw] -translate-x-[10%] transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/graffiti.png"
              alt="spray can"
              className="max-w-[18vw]  translate-x-[15%] transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/bin.png"
              alt="lightning bolt"
              className="max-w-[16vw] translate-x-[40%] translate-y-[15%] -rotate-[18deg] transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/mural-1.png"
              alt="mural"
              className="max-w-[16vw] translate-x-[70%] translate-y-[20%] transform"
            />
          </div>

          <div className="h-[35vh]">
            <img
              src="/images/homepage/spray-can-1.png"
              alt="spray can"
              className="max-w-[22vw] -translate-y-[15%] translate-x-[50%] -rotate-12 transform opacity-90"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col">
        <Link to="/play">
          <Button variant="tagHunter" size="homepage">
            Start Game
          </Button>
        </Link>
        <IsAuthenticated>
          <Link to="/gallery">
            <Button variant="tagHunter" size="homepage">
              Gallery
            </Button>
          </Link>
          <Link to="/play/leaderboard">
            <Button variant="tagHunter" size="homepage">
              Leaderboard
            </Button>
          </Link>
        </IsAuthenticated>
      </div>
      </>
  )
}
