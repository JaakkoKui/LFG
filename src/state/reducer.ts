import { Game, User, Post, ProfileModel, Comments } from "../types"
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
        type: "ADD_LOGIN";
        payload: User;
    }
    | {
        type: "GET_USERS";
        payload: User[];
    }
    | {
        type: "ADD_PROFILE";
        payload: ProfileModel;
    }
    | {
        type: "GET_PROFILES";
        payload: ProfileModel[];
    }
    | {
        type: "GET_POSTS";
        payload: Post[];
    }
    | {
        type: "ADD_POST";
        payload: Post;
    }
    | {
        type: "ADD_COMMENT";
        payload: Comments;
    }
    | {
        type: "GET_COMMENTS";
        payload: Comments[];
    } |
    {
        type: "LIKE_POST";
        payload: Post;
    }
    | {
        type: "DISLIKE_POST";
        payload: Post;
    } |
    {
        type: "UPDATE_GAME";
        payload: Game;
    }
    | {
        type: "UPDATE_PROFILE";
        payload: ProfileModel;
    }
    | {
        type: "UPDATE_POST";
        payload: Post;
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "GET_GAME_LIST":
            return {
                ...state,
                games: {
                    ...action.payload.reduce(
                        (memo, game) => ({ ...memo, [Number(game.GameId)]: game }), {}),
                    ...state.games
                }
            };
        case "ADD_GAME":
            return {
                ...state,
                games: {
                    ...state.games,
                    [Number(action.payload.GameId)]: action.payload
                }
            };
        case "LOGIN":
            return {
                ...state,
                email: action.payload

            };
        case "LOGOUT":
            return {
                ...state,
                email: action.payload
            };
        case "ADD_LOGIN":
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.Email]: action.payload
                }
            };
        case "ADD_PROFILE":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    [action.payload.Email]: action.payload
                }
            };
        case "GET_PROFILES":
            return {
                ...state,
                profile: {
                    ...action.payload.reduce(
                        (memo, profile) => ({ ...memo, [profile.Email]: profile }),
                        {}
                    ),
                    ...state.profile
                }
            };
        case "GET_USERS":
            return {
                ...state,
                user: {
                    ...action.payload.reduce(
                        (memo, login) => ({ ...memo, [login.Email]: login }),
                        {}
                    ),
                    ...state.user
                }
            };
        case "GET_POSTS":
            return {
                ...state,
                posts: {
                    ...action.payload.reduce(
                        (memo, post) => ({ ...memo, [Number(post.PostId)]: post }),
                        {}
                    ),
                    ...state.posts
                }
            };
        case "ADD_POST":
            return {
                ...state,
                posts: {
                    [Number(action.payload.PostId)]: action.payload,
                    ...state.posts
                }
            };
        case "GET_COMMENTS":
            return {
                ...state,
                comment: {
                    ...action.payload.reduce(
                        (memo, comment) => ({ ...memo, [Number(comment.Id)]: comment }),
                        {}
                    ),
                    ...state.comment
                }
            };
        case "ADD_COMMENT":
            return {
                ...state,
                comment: {
                    [Number(action.payload.Id)]: action.payload,
                    ...state.comment
                }
            };
        case "LIKE_POST":
            return { ...state };

        case "DISLIKE_POST":
            return { ...state };

        case "UPDATE_GAME":
            return {
                ...state,
                games: {
                    ...state.games,
                    [Number(action.payload.GameId)]: action.payload
                }
            };

        case "UPDATE_PROFILE":

            return {
                ...state,
                profile: {
                    ...state.profile,
                    [action.payload.Email]: action.payload
                }
            };
        case "UPDATE_POST":
            return {
                ...state,
                posts: {
                    [Number(action.payload.PostId)]: action.payload,
                    ...state.posts
                }
            };

        default:
            return state;
    }
};

