export type TServerResponse = {
    Name: string;
    Map: string;
    MapSize: string;
    Gamemode: string;
    Region: string;
    Players: number;
    QueuePlayers: number;
    MaxPlayers: number;
    Hz: number;
    DayNight: string;
    IsOfficial: boolean;
    HasPassword: boolean;
    AntiCheat: string;
    Build: string;
};

export type TServer = {
    Name: string;
    Map: string;
    MapSize: string;
    Gamemode: string;
    Region: string;
    Players: string;
    Hz: number;
    DayNight: string;
    AntiCheat: string;
    Build: string;
};

export type TPagination<T> = {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    paginatedData?: T[][];
};
