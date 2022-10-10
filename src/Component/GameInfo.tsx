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
            <div className="flex md:w-[800px] lg:w-[1000px] 2xl:w-[1100px] mx-auto pt-20 relative z-10 drop-shadow-lg">
                <div className="w-1/2 rounded-l-lg bg-primary flex justify-center">
                    <img className='object-contain rounded-l-lg' src='/images/wolfenstein-demo.jpg' alt='game' />
                </div>

                <div className="w-1/2 text-gray-300 bg-lightBackground rounded-r-lg">
                    <div className="m-10">
                        <h1 className="text-4xl font-bold">
                            {gameInfo.GameName}
                        </h1>
                        { !editForm &&
                            <>
                            <ul className="py-5 my-5 border-y border-gray-600">
                                <li className="flex">
                                    <p className="w-[132px] h-[26px] mr-5">Nickname ingame: </p> <Link className="italic font-semibold" to={`/profile/${Number(thisUser.ProfileId)}`}>{gameInfo.NicknameIngame}</Link>
                                </li>
                                <li className="flex">
                                    <p className="w-[132px] h-[26px] mr-5">Hours played:</p> <p className="italic font-semibold">{gameInfo.HoursPlayed}</p>
                                </li>
                                { gameInfo.Rank &&
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Rank:</p> <p className="italic font-semibold">{gameInfo.Rank}</p>
                                    </li>
                                }
                                { gameInfo.Server &&
                                    <li className="flex">
                                        <p className="w-[132px] h-[26px] mr-5">Server:</p> <p className="italic font-semibold">{gameInfo.Server}</p>
                                    </li>
                                }
                                
                            </ul>

                            <div>
                                <h4 className="font-bold">Comment: <Link className="text-sm italic font-semibold" to={`/profile/${Number(thisUser.ProfileId)}`}>(by {thisUser.Nickname})</Link></h4>
                                <p className="mt-1 ml-5">{gameInfo.Comments}</p>
                            </div>
                            </>
                        }
                        {editForm && <EditGameForm currentGame={gameInfo} toggleForm={toggle} />}
                    </div>

                    { thisUser.Email === email && 
                        <div className="absolute bottom-5 w-1/2 flex justify-center text-xl text-gray-400">
                            <button onClick={toggle} className="px-5 border-r border-gray-600 hover:text-white">Edit</button>
                            <button onClick={handleRemove} className="px-5 hover:text-white">Delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GameInfo;