import { IsAuthenticated } from '@/components/IsAuthenticated'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="ml-12 mr-12 flex flex-col items-center justify-center">
      <Button variant="default" size="lg">
        <Link to="/play">Start Game</Link>
      </Button>
      <IsAuthenticated>
        <Button variant="default" size="lg">
          <Link to="/gallery">Gallery</Link>
        </Button>
      </IsAuthenticated>
    </div>
  )
}
