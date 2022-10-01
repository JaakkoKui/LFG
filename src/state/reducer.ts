import {Game, Login, ProfileModel } from "../types"
import { State } from "./state";


export type Action =
    | {
        type: "GET_GAME_LIST";
        payload: Game[];
    }
    | {
        type: "ADD_GAME";
        payload: Game;
    }
    | {
        type: "LOGIN";
        payload: string;
    }
    | {
        type: "LOGOUT";
        payload: string;
    }
    | {
        type: "GET_PROFILE";
        payload: ProfileModel;
    }
    | {
        type: "ADD_PROFILE";
        payload: ProfileModel;
    }
    | {
        type: "ADD_LOGIN";
        payload: Login;
    }
    | {
        type: "GET_PROFILES";
        payload: ProfileModel[];
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "GET_GAME_LIST":
            return {
                ...state,
                games: {
                    ...action.payload.reduce(
                        (memo, game) => ({ ...memo, [game.GameId]: game }), {}),
                    ...state.games
                }
            };
        case "ADD_GAME":
            return {
                ...state,
                games: {
                    ...state.games,
                    [action.payload.GameId]: action.payload
                }
            };
        case "LOGIN":
            return {
                ...state,
                email: action.payload
                
            };
        case "LOGOUT":
            return{
                ...state,
                email: action.payload
            };
        case "ADD_LOGIN":
            return{
                ...state,
                login: {
                    ...state.login,
                    [action.payload.email]: action.payload
                }
            };
        case "ADD_PROFILE":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    [action.payload.Nickname]: action.payload
                }
            };
        case "GET_PROFILE":
            return {
                ...state,
                profile: {
                    
                }
            };
        case "GET_PROFILES":
            return {
                ...state,
                profile: {
                    ...action.payload.reduce(
                        (memo, profile) => ({ ...memo, [profile.Nickname]: profile }), 
                        {}
                        ),
                    ...state.profile
                }
            };
        default:
            return state;
    }
};


