import React from "react";
import { addGame } from "../services/gameService";
import { Game, ProfileModel } from '../types';

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
    closeForm: () => void;
    currentUser: ProfileModel;
}

const AddGame: React.FC<Props> = ({ closeForm, currentUser }) => {

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const name = e.currentTarget.elements.GameName.value;
        const nick = e.currentTarget.elements.NicknameIngame.value;
        const hours = Number(e.currentTarget.elements.HoursPlayed.value);
        const rank = e.currentTarget.elements.Rank.value;
        const server = e.currentTarget.elements.Server.value;
        const comment = e.currentTarget.elements.Comment.value;
       


        const newGame: Game = {
            GameId: undefined,
            GameName: name,
            NicknameIngame: nick,
            HoursPlayed: hours,
            Rank: rank,
            Server: server,
            Comments: comment,
            ProfileId: Number(currentUser.ProfileId)
        }

        addGame(newGame);
        closeForm();
    }
    const handleCancel = () => {
        closeForm();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Name: </label><input name='GameName'
                    id="GameName"
                    placeholder="Game name"
                /><br />
                <label>Nickname ingame:</label> <input name='NicknameIngame'
                    id="NicknameIngame"
                    placeholder="Nickname Ingame"
                /><br />
                <label>HoursPlayed:</label> <input name='HoursPlayed'
                    id="HoursPlayed"
                    placeholder="Hours Played"
                /><br />

                <label>Rank:</label> <input name='Rank' id='Rank'
                    placeholder="Rank (optional)" /> <br />

                <label>Server:</label> <input name="Server"
                    id="Server" placeholder="Server you play (optional)" /><br />

                <label>Comments: <br />
                    <textarea name="Comment" rows={4} cols={40}
                        id="Comment" placeholder="Comments about the game (optional)" /> <br />
                </label>
                <button type='submit'>Add Game</button><br />
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </>
    );
}

export default AddGame;