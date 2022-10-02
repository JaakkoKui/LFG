import { useStateValue } from "../state/state";
//import { Game } from "../types";

const Games: React.FC = () => {
    const [{games}] = useStateValue();

    const myGames = Object.values(games).concat();
    
    return(
        <>
            <ul>
            {myGames.map(game =>
                    <li key={game.GameId}>{game.GameName}, Hours played: {game.HoursPlayed}, comment: {game.Comments} </li>
                )}
            </ul>
        </>
    )
}

export default Games;