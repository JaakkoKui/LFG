import { useStateValue } from "../state/state";
import { Game, ProfileModel } from "../types";

interface Props {
    currentUser: ProfileModel;
}
/* eslint-disable react/prop-types */
const Games: React.FC<Props> = ({ currentUser }) => {
    const [{ games }] = useStateValue();
    /* eslint-disable react/prop-types */
    const myGames = Object.values(games).filter(game => Number(game.ProfileId) === Number(currentUser.ProfileId));
    //const myGames = Games.filter(game => game.ProfileId === currentUser.ProfileId)
    if (myGames) {
        return (
            <div className='flex'>
                {myGames.map(game =>
                    <div key={Number(game.GameId)} className='flex flex-col h-96 w-60 relative rounded-lg border-8 border-white'>
                        <div className='hover:ring-4 ring-primary rounded-lg w-full h-full ring-offset-4 font-bold text-7xl bg-darkBackground text-white hover:bg-primary'>
                            <div className='absolute top-0 w-full text-center py-3'>
                                <h4 className='text-md italic text-center my-auto'></h4> { /*&quot;{game.Comments}&quot;*/}
                            </div>
                            <img className='object-contain mt-10' src='/images/game-empty.png' alt='game' />
                            <div className='px-5 pb-5 pt-7 mt-auto h-full'>
                                <h1 className='text-xl font-semibold border-b pb-1 text-center'>{game.GameName}</h1>
                                <h1 className='text-lg italic font-semibold text-center'>{game.HoursPlayed} Hours</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    } else {
        return (<></>)
    }

}

export default Games;