export interface Game {
    GameId: number;
    GameName: string;
    NicknameIngame?: string;
    HoursPlayed?: number;
    Rank?: string;
    Server?: string;
    Comments?: string;
    ProfileId: number;
}

export interface ProfileModel {
    ProfileId?: number;
    Nickname: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    DiscordNick?: string;
    JoiningDate?: string;
    Avatar?: string;
    Email: string;
}

export interface User {
    Email: string;
    Password?: string;
    confirmPassword?: string;
}

export interface Post {
    PostId: number;
    Title: string;
    CreateDate: string;
    Content: string;
    PosterProfile: number;
}

export interface Message{
    IsSuccess: boolean,
    Message: string
}