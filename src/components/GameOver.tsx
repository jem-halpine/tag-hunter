import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { useNavigate } from 'react-router-dom'

interface Props {
  open: boolean
  win: boolean
  onOpenChange: ()=>void
  playAgain: ()=>void
}

export default function GameOver(props: Props) {

  const navigate = useNavigate()

  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          {!props.win && <AlertDialogTitle className='font-pageName text-center text-[100px]'>Game Over</AlertDialogTitle>}
          {props.win && <AlertDialogTitle className='font-pageName text-center text-[100px]'>You Win!</AlertDialogTitle>}
          <AlertDialogDescription>
            {
            props.win 
              ? "Congratulations! Head over to the leaderboard to see where you rank amongst the taghunter elite!" 
              : "No luck this time. Remember to keep your eyes peeled when you're out and about on the streets!"
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={props.playAgain}>Play Again</AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate('/play/leaderboard')}>View Leaderboard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
