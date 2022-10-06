import { useStateValue } from "../state/state";
import { Game, ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}
/* eslint-disable react/prop-types */
const Games: React.FC<Props> = ({currentUser}) => {
    const [{games}] = useStateValue();
/* eslint-disable react/prop-types */
    const myGames = Object.values(games).filter(game => Number(game.ProfileId) === Number(currentUser.ProfileId));
    //const myGames = Games.filter(game => game.ProfileId === currentUser.ProfileId)
    if(myGames){
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
    }else{
        return( <></>)
    }
    
}

export default Games;