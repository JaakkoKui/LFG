import { useStateValue } from "../state/state";
//import { Game } from "../types";

const Games: React.FC = () => {
    const [{games}] = useStateValue();

    const myGames = Object.values(games).concat();
    
    return(
        <div className='flex'>
            {myGames.map(game =>
                <div key={game.GameId} className='ring-2 rounded-lg ring-darkBackground flex flex-col h-96 w-60 mx-2 relative text-white bg-darkBackground'>
                    <div className='absolute top-0 w-full text-center py-3'>
                        <h4 className='text-md italic text-center my-auto'></h4> { /*&quot;{game.Comments}&quot;*/ }
                    </div>
                    <img className='object-contain mt-10' src='/images/game-empty.png' alt='game' />
                    <div className='px-5 pb-5 pt-7 mt-auto h-full'>
                        <h1 className='text-xl font-semibold border-b pb-1 text-center'>{game.GameName}</h1>
                        <h1 className='text-lg italic font-semibold text-center'>{game.HoursPlayed} Hours</h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Games;