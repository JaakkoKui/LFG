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
    Id: number;
    Nickname: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    DiscordNick?: string;
    JoiningDate?: Date;
}

export interface Login {
    Id?: number;
    Email: string;
    Password: string;
}