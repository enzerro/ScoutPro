import { useParams } from 'react-router-dom'
import { PlayerProfile } from '../components/player-profile'

export default function PlayerProfilePage() {
  const { id } = useParams<{ id: string }>()
  
  return <PlayerProfile playerId={id || ''} />
}
