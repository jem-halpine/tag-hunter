import { useQuery } from "@tanstack/react-query"

export default function GamePage() {

  const artworkID = 2

  const artwork = useQuery({
    queryKey: ["artwork", artworkID],
    queryFn: () => {
      
    }
  })

  return (
    <div>GamePage</div>
  )
}
