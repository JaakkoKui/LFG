export interface Game {
    GameId: number | undefined;
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
    UserId?: number;
    Email: string;
    Password?: string;
    confirmPassword?: string;
}

export interface Post {
    PostId: number | undefined;
    Title: string;
    CreateDate: string;
    Content: string;
    PosterProfile: number;
    PhotoFileName: string;
    Like?: number;
    Dislike?: number;
}

export interface Message{
    IsSuccess: boolean,
    Message: string
}

export interface Comment{
    Id: number | undefined;
    CommentContent: string;
    Date: string;
    CommentingProfile: number;
    PostId: number;
}