import React from "react";
import { addGame } from "../services/gameService";
import { useStateValue } from "../state/state";
import { Game } from '../types';

interface FormElements extends HTMLFormControlsCollection {
    GameName: HTMLInputElement;
    NicknameIngame: HTMLInputElement;
    HoursPlayed: HTMLInputElement;
    Rank: HTMLInputElement;
    Server: HTMLInputElement;
    Comment: HTMLInputElement;
}

interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

interface Props {
    closeForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddGame: React.FC<Props> = ({ closeForm }) => {
    const [, dispatch] = useStateValue();

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const name = e.currentTarget.elements.GameName.value;
        const nick = e.currentTarget.elements.NicknameIngame.value;
        const hours = Number(e.currentTarget.elements.HoursPlayed.value);
        const rank = e.currentTarget.elements.Rank.value;
        const server = e.currentTarget.elements.Server.value;
        const comment = e.currentTarget.elements.Comment.value;

        const newGame: Game = {
            GameName: name,
            NicknameIngame: nick,
            HoursPlayed: hours,
            Rank: rank,
            Server: server,
            Comments: comment
        }

        addGame(newGame);
        dispatch({ type: "ADD_GAME", payload: newGame });
        closeForm(false);
    }
    const handleCancel = () => {
        closeForm(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>Name: </div><input name='GameName'
                    id="GameName"
                    placeholder="Game name"
                /><br />
                <div>Nickname ingame:</div> <input name='NicknameIngame'
                    id="NicknameIngame"
                    placeholder="Nickname Ingame"
                /><br />
                <div>HoursPlayed:</div> <input name='HoursPlayed'
                    id="HoursPlayed"

                    placeholder="Hours Played"
                /><br />

                <div>Rank:</div> <input name='Rank' id='Rank'
                    placeholder="Rank (optional)" /> <br />

                <div>Server:</div> <input name="Server"
                    id="Server" placeholder="Server you play (optional)" /><br />

                <div>Comments:</div> <input name="Comment"
                    id="Comment" placeholder="Comments about the game (optional)" /> <br />

                <button type='submit'>Add Game</button><br />
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </>
    );
}

export default AddGame;