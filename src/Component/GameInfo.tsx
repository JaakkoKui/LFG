import React from "react";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../state/state";
import { Game, ProfileModel } from "../types";

const GameInfo: React.FC = () => {
    const [{games, profile}] = useStateValue();

    const id = useParams().id as string;
    const gameInfo = Object.values(games).find(game => Number(game.GameId) === Number(id)) as Game;
    
    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.ProfileId) === Number(gameInfo.ProfileId)) as ProfileModel;

    return ( 
        <>
            <h1 className="text-3xl font-bold underline">
                {gameInfo.GameName}
            </h1>
            <div>
                Hours played: {gameInfo.HoursPlayed}
            </div>
            <div>
                Rank: {gameInfo.Rank}
            </div>
            <div>
                Server: {gameInfo.Server}
            </div>
            <div>
                Nickname ingame: {gameInfo.NicknameIngame}
            </div>
            <div>
                Comments about the game: {gameInfo.Comments} by <Link to={`/profile/${Number(thisUser.ProfileId)}`}>{thisUser.Nickname}</Link>
            </div>
        </>
    )
}

export default GameInfo;