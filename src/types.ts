export interface Game {
    GameId: number;
    GameName: string;
    NicknameIngame?: string;
    HoursPlayed?: number;
    Rank?: string;
    Server?: string;
    Comments?: string;
}

export interface ProfileModel {
    Id?: string;
    Nickname: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    DiscordNick?: string;
    JoiningDate?: string;
    avatar?: string;
    email?: string;
}

export interface Login {
    email: string;
    password: string;
    confirmPassword?: string;
}