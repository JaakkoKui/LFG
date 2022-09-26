import React, { createContext, useContext, useReducer } from "react";
import { Game, Login, Profile } from "../types";
import { Action } from "./reducer";

export interface State {
    games: { [GameId: number]: Game }
    profile: { [Id: string]: Profile}
    email: string,
    login: {[email: string]: Login}
}

const initialState: State = {
    games: {},
    profile: {},
    email: "",
    login: {}
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => initialState
]);

type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement;
};


export const StateProvider = ({
    reducer,
    children
}: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);