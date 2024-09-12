import { IsAuthenticated } from '@/components/IsAuthenticated'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Button variant="default" size="lg">
        <Link to="/play">Start Game</Link>
      </Button>
      {/* Conditional Access Below */}
      <IsAuthenticated>
        <Button variant="default" size="lg">
          <Link to="/gallery">Gallery</Link>
        </Button>
      </IsAuthenticated>
    </div>
  )
}
