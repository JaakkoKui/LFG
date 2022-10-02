import React from "react";
import { useStateValue } from "../state/state";

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

const AddGame: React.FC = () => {
    const [, dispatch] = useStateValue();

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();


    }

    return(
        <>
            <form onSubmit={handleSubmit}>

            </form>
        </>
    );
}

export default AddGame;