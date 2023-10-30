import { TFilterConfig, TPagination, TServer } from "./types";

export const INITIAL_PAGINATION_CONFIG: TPagination<TServer> = {
    data: [],
    currentPage: 0,
    pageSize: 15,
    totalPages: 0,
};

export const FILTER_CONFIG: TFilterConfig[] = [
    {
        name: 'Name',
        label: 'Name',
        type: 'Text',
        placeholder: 'Enter the server name...'
    },
    {
        name: 'Region',
        label: 'Region',
        type: 'Select',
        options: [
            {
                label: 'Europe',
                value: 'Europe_Central',
            },
            {
                label: 'Brazil',
                value: 'Brazil_Central',
            },
            {
                label: 'America',
                value: 'America_Central',
            },
            {
                label: 'Japan',
                value: 'Japan_Central',
            },
            {
                label: 'Australia',
                value: 'Australia_Central',
            },
            {
                label: 'Asia',
                value: 'Asia_Central',
            },
        ],
    },
    {
        name: 'PlayerSituation',
        label: 'Player Situation',
        type: 'Select',
        options: [
            {
                label: 'Empty',
                value: 'Empty',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const current = players.split('/')[0];
                    return current === '0';
                },
            },
            {
                label: 'Full',
                value: 'Full',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const [current, size] = players.split('/');
                    return current === size;
                },
            },
            {
                label: '1 or more players',
                value: 'OneOrMorePlayers',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const current = players.split('/')[0];
                    return Number(current) > 1;
                },
            },
        ],
    },
    {
        name: 'PlayerSize',
        label: 'Player Size',
        type: 'Select',
        options: [
            {
                label: '32',
                value: '32',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const size = players.split('/')[1];
                    return size === '32';
                },
            },
            {
                label: '64',
                value: '64',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const size = players.split('/')[1];
                    return size === '64';
                },
            },
            {
                label: '128',
                value: '128',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const size = players.split('/')[1];
                    return size === '128';
                },
            },
            {
                label: '254',
                value: '254',
                tableColumnParam: 'Players',
                criteria: (item: string) => {
                    const [players] = item.split(' ');
                    const size = players.split('/')[1];
                    return size === '254';
                },
            },
        ],
    },
    {
        name: 'Gamemode',
        label: 'Game mode',
        type: 'Select',
        options: [
            {
                label: 'Front line',
                value: 'FRONTLINE',
            },
            {
                label: 'Conquest',
                value: 'CONQ',
            },
            {
                label: 'Capture The Flag',
                value: 'CaptureTheFlag',
            },
            {
                label: 'Domination',
                value: 'DOMI',
            },
            {
                label: 'Team Deathmatch',
                value: 'TDM',
            },
            {
                label: 'Infantry Conquest',
                value: 'INFCONQ',
            },
            {
                label: 'Rush',
                value: 'RUSH',
            },
        ],
    },
];

export const COLUMN_CONFIG = [
    {
        label: "Name",
        value: "Name"
    },
    {
        label: "Map",
        value: "Map"
    },
    {
        label: "Map Size",
        value: "MapSize"
    },
    {
        label: "Game mode",
        value: "Gamemode"
    },
    {
        label: "Region",
        value: "Region"
    },
    {
        label: "Players",
        value: "Players"
    },
    {
        label: "Hz",
        value: "Hz"
    },
    {
        label: "Period",
        value: "DayNight"
    },
    {
        label: "Anti Cheat",
        value: "AntiCheat"
    },
    {
        label: "Build",
        value: "Build"
    }
]
