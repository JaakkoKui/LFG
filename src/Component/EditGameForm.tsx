import React from "react";
import { editGame, getAll } from "../services/gameService";
import { useStateValue } from "../state/state";
import { Game } from "../types";
import { rootNavigate } from "./CustomRouter";

interface FormElements extends HTMLFormControlsCollection {
    hours: HTMLInputElement;
    rank: HTMLInputElement;
    nick: HTMLInputElement;
    server: HTMLInputElement;
    comment: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface Props {
    currentGame: Game;
    toggleForm: () => void;
}

const EditGameForm: React.FC<Props> = ({ currentGame, toggleForm }) => {
    const [, dispatch] = useStateValue();

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const hours = Number(e.currentTarget.elements.hours.value);
        const rank = e.currentTarget.elements.rank.value;
        const server = e.currentTarget.elements.server.value;
        const nick = e.currentTarget.elements.nick.value;
        const comment = e.currentTarget.elements.comment.value;

        const updatedGame: Game = {
            GameId: currentGame.GameId,
            GameName: currentGame.GameName,
            HoursPlayed: hours,
            Rank: rank,
            Server: server,
            NicknameIngame: nick,
            Comments: comment,
            ProfileId: currentGame.ProfileId
        }

        editGame(updatedGame).then(mes => {
            console.log(mes);
            getAll().then(game => {
                const games: Game[] = game as Game[];

                dispatch({ type: "GET_GAME_LIST", payload: games });
            });
        });

        toggleForm();
        rootNavigate("/profile");
        window.location.reload();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div><label>
                    Hours played: <input id="hours" name="hours" type="number" defaultValue={currentGame.HoursPlayed} placeholder="First name" />
                </label></div>
                <div><label>
                    Nickname ingame: <input id="nick" name="nick" defaultValue={currentGame.NicknameIngame} placeholder="Nickname ingame" />
                </label></div>
                <div><label>
                    Rank: <input id="rank" name="rank" defaultValue={currentGame.Rank} placeholder="Rank" />
                </label></div>
                <div><label>
                    Server: <input id="server" name="server" defaultValue={currentGame.Server} placeholder="Server" />
                </label></div>
                <div><label>
                    Comments: <textarea id="comment" name="comment" defaultValue={currentGame.Comments} placeholder="Comments " rows={4} cols={40}/>
                </label></div>
                <button type="submit" className="text-xl">Edit game info</button>
            </form>
        </>
    )
}

export default EditGameForm;