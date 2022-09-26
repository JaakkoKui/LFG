export interface Game {
    GameId: number;
    GameName: string;
    NicknameIngame?: string;
    HoursPlayed?: number;
    Rank?: string;
    Server?: string;
    Comments?: string;
}

export interface Profile {
    Id: string;
    Nickname: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    DiscordNick?: string;
    JoiningDate?: Date;
    Email: string;
}

export interface Login {
    email: string;
    password: string;
    confirmPassword?: string;
}