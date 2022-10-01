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
    ProfileId?: string;
    Nickname: string;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    DiscordNick?: string;
    JoiningDate?: string;
    Avatar?: string;
    Email: string;
}

export interface Login {
    Email: string;
    Password: string;
    confirmPassword?: string;
}