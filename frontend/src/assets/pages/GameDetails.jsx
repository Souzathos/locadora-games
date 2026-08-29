import { useParams } from 'react-router-dom'

export default function GameDetails() {
  // Isso pega o ID do jogo lá na URL (ex: /jogos/1)
  const { id } = useParams() 

  return (
    <div>
      <h1>Detalhes do Jogo (ID: {id})</h1>
    </div>
  )
}