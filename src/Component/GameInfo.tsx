import React from "react";
import { Link, useParams } from "react-router-dom";
import { deleteGame, getAll } from "../services/gameService";
import { useStateValue } from "../state/state";
import { Game, ProfileModel } from "../types";
import { rootNavigate } from "./CustomRouter";
import EditGameForm from "./EditGameForm";
import CSS from 'csstype';

const GameInfo: React.FC = () => {
    const [{ games, profile, email }, dispatch] = useStateValue();
    const [editForm, toggleForm] = React.useState<boolean>(false);

    const toggle = () => {
        toggleForm(!editForm);
    }
    const id = useParams().id as string;
    const gameInfo = Object.values(games).find(game => Number(game.GameId) === Number(id)) as Game;

    const thisUser: ProfileModel = Object.values(profile).find(prof => Number(prof.ProfileId) === Number(gameInfo.ProfileId)) as ProfileModel;

    const handleRemove = () => {
        if (window.confirm(`Are you sure you want to remove ${gameInfo.GameName} from your games list?`)) {
            deleteGame(Number(gameInfo.GameId)).then(mes => {
                console.log(mes);
                getAll().then(game => {
                    const games: Game[] = game as Game[];

                    dispatch({ type: "GET_GAME_LIST", payload: games });
                    rootNavigate("/profile");
                    window.location.reload();
                });
            });

        }
    }

    const contentStyle: CSS.Properties = {
        whiteSpace: "pre-line"
    }
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
            <p style={contentStyle}>
                Comments about the game: {gameInfo.Comments} <br /> by <Link to={`/profile/${Number(thisUser.ProfileId)}`}>{thisUser.Nickname}</Link>
            </p>
            <br />
            {thisUser.Email === email && <div>
                <button onClick={toggle} className="text-xl">Edit game</button>
            </div>}
            {editForm && <EditGameForm currentGame={gameInfo} toggleForm={toggle} />}
            <div>
            {thisUser.Email === email && <button onClick={handleRemove} className="text-xl">Delete this game from the list</button>}
            </div>
        </>
    )
}

export default GameInfo;