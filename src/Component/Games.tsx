import { useStateValue } from "../state/state";
//import { Game } from "../types";

const Games: React.FC = () => {
    const [{games}] = useStateValue();

    const myGames = Object.values(games).concat();
    
    return(
        <div className='grid'>
            {myGames.map(game =>
                <div key={game.GameId} className='flex ring-2 rounded-md ring-primary p-4 mx-6 my-2'>
                    <img className='h-[100px] object-contain' src='/images/game-empty.png' alt='game' />
                    <div className='flex flex-col ml-4'>
                        <h1 className='text-2xl font-semibold'>{game.GameName}</h1>
                        <h4 className='text-md italic mt-auto'>comment: &quot;{game.Comments}&quot;</h4>
                    </div>
                    <h1 className='ml-auto my-auto text-xl italic font-semibold'>{game.HoursPlayed} Hours</h1>
                </div>
            )}
        </div>
    )
}

export default Games;