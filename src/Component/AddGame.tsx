import React from "react";
import { addGame } from "../services/gameService";
import { useStateValue } from "../state/state";
import { Game, ProfileModel } from '../types';
import { rootNavigate } from "./CustomRouter";

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

    const [{games}, dispatch] = useStateValue();

    const handleSubmit = (e: React.FormEvent<YourFormElement>) => {
        e.preventDefault();

        const name = e.currentTarget.elements.GameName.value;
        const nick = e.currentTarget.elements.NicknameIngame.value;
        const hours = Number(e.currentTarget.elements.HoursPlayed.value);
        const rank = e.currentTarget.elements.Rank.value;
        const server = e.currentTarget.elements.Server.value;
        const comment = e.currentTarget.elements.Comment.value;
       
        const id = Object.values(games).concat().pop()?.GameId as number

        const newGame: Game = {
            GameId: id+1,
            GameName: name,
            NicknameIngame: nick,
            HoursPlayed: hours,
            Rank: rank,
            Server: server,
            Comments: comment,
            ProfileId: Number(currentUser.ProfileId)
        }

        addGame(newGame);
        //dispatch({type:"ADD_GAME", payload:newGame});
        rootNavigate("/profile");
        closeForm();
    }
    const handleCancel = () => {
        closeForm();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="w-screen h-full bg-darkBackground min-h-[calc(100vh-65px)] overflow-clip">
                    <div className='basis-2/3 bg-darkBackground relative'>

                        <div className='absolute h-[700px] w-[700px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 rotate-45 -right-[100px] -top-[500px] z-10'>
                            <div className='absolute h-[670px] w-[670px] bg-darkBackground'></div>
                        </div>

                        <div className='absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 opacity-50 rotate-45 -right-[300px] -top-[800px]'>
                            <div className='absolute h-[1070px] w-[1070px] bg-darkBackground'></div>
                        </div>

                        <div className='absolute h-[1000px] w-[1100px] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-50 -rotate-45 -left-[700px] -bottom-[130vh] z-10'>
                            <div className='absolute h-[970px] w-[1070px] bg-darkBackground'></div>
                        </div>

                        <div className='absolute h-[1100px] w-[1100px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50 -rotate-45 -left-[560px] -bottom-[130vh]'>
                            <div className='absolute h-[1070px] w-[1070px] bg-darkBackground'></div>
                        </div>

                    </div>
                    <div className="flex md:w-[800px] lg:w-[1000px] 2xl:w-[1100px] mx-auto pt-10 relative z-10 drop-shadow-lg">
                        <div className="w-1/2 min-h-[800px] rounded-l-lg bg-primary flex justify-center">
                            <h4 className="text-4xl font-bold my-auto uppercase text-gray-300">[game cover]</h4>
                        </div>
                        <div className="w-1/2 text-gray-300 bg-lightBackground rounded-r-lg">
                            <div className="m-10">
                                <h1 className="text-4xl font-bold">
                                    <input name='GameName' id="GameName" className="w-full rounded-md px-2 py-1 bg-darkBackground" placeholder="Game name" />
                                </h1>
                                <ul className="py-5 my-5 border-y border-gray-600">
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Nickname ingame: </p> <input name='NicknameIngame' id="NicknameIngame" className="font-semibold px-2 bg-darkBackground rounded-t-md w-[calc(100%-153px)] border-b-2 border-lightBackground" placeholder="Nickname Ingame" />
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Hours played:</p> <input name='HoursPlayed' id="HoursPlayed" className="font-semibold px-2 bg-darkBackground w-[calc(100%-153px)] border-b-2 border-lightBackground" placeholder="Hours Played" />
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Rank:</p> <input name='Rank' id='Rank' className="font-semibold px-2 bg-darkBackground w-[calc(100%-153px)] border-b-2 border-lightBackground" placeholder="Rank (optional)" />
                                    </li>
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Server:</p> <input name="Server" id="Server" className="font-semibold px-2 bg-darkBackground rounded-b-md w-[calc(100%-153px)]"  placeholder="Server you play (optional)" />
                                    </li>

                                </ul>

                                <div className="border-b pb-5 border-gray-600">
                                    <h4 className="font-bold">Comment:</h4>
                                    <textarea name="Comment" rows={4} cols={40} id="Comment" placeholder="Comments about the game (optional)" className="mt-1 px-5 bg-darkBackground rounded-md w-full"/>
                                </div>

                                <div className="w-full justify-end flex">
                                    <button onClick={handleCancel} className="mt-5 text-gray-300 text-sm px-4 py-2 w-24 hover:text-white">Cancel</button>
                                    <button type='submit' className="mt-5 rounded-full bg-primary text-white text-sm px-4 py-2 w-24 hover:ring-4">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );

    {/* 
     <form onSubmit={handleSubmit}>
            <ul className="py-5 my-5 border-y border-gray-600 h-[146px]">
                <li className="flex">
                    <p className="w-[153px]">Nickname ingame: </p> <input id="nick" name="nick" className="font-semibold px-2 bg-darkBackground rounded-t-md w-[calc(100%-153px)] border-b-2 border-lightBackground" defaultValue={currentGame.NicknameIngame} placeholder="Nickname (ingame)" />
                </li>
                <li className="flex">
                    <p className="w-[132px] mr-5">Hours played:</p> <input id="hours" name="hours" className="font-semibold px-2 bg-darkBackground w-[calc(100%-153px)] border-b-2 border-lightBackground" type="number" defaultValue={currentGame.HoursPlayed} placeholder="Hours played" />
                </li>
                <li className="flex">
                    <p className="w-[132px] mr-5">Rank:</p> <input id="rank" name="rank" className="font-semibold px-2 bg-darkBackground w-[calc(100%-153px)] border-b-2 border-lightBackground" defaultValue={currentGame.Rank} placeholder="Rank" />
                </li>
                <li className="flex">
                    <p className="w-[132px] mr-5">Server:</p> <input id="server" name="server" className="font-semibold px-2 bg-darkBackground rounded-b-md w-[calc(100%-153px)]" defaultValue={currentGame.Server} placeholder="Server" />
                </li>
            </ul>

            <div className="border-b border-gray-600 pb-5">
                <h4 className="font-bold">Comment:</h4>
                <p className="mt-1"><textarea id="comment" name="comment" className="px-5 bg-darkBackground rounded-md w-full" defaultValue={currentGame.Comments} placeholder="Comments " rows={4} cols={40} /></p>
            </div>

            <button type="submit" className="mt-5 rounded-full bg-primary text-white text-sm px-4 py-2 w-28 hover:ring-4">Update</button>
        </form> 
        */}
}

export default AddGame;