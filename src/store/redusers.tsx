import {
    ADD_CHECK,
    CHANGE_CIRCLE, CHANGE_COUNT_ACTIVE_PLAYERS, CHANGE_COURT_STATUS,
    CHANGE_KICK_STATUS, CHANGE_KILL_STATUS,
    CHANGE_PLAYER_INFO, CHANGE_SHOW_INFO,
    CHANGE_VOTING, END_GAME,
    PLAYER_IS_READY, SET_ALL_GAMES, SET_ARRAY_PLAYERS, SET_BEST_MOVE, SET_RESULT_GAME, SET_ROLES, SHOW_INFO_FOR_LEAD,
    START_GAME
} from "./actions";

const defaultState = {
    currentCircle: 0,
    kills: [],
    voting: [],
    isKilled: true,
    isKicked: false,
    checks: [],
    allGames: [],
    showInfo:false,
    courtStatus: false,
    countActivePlayers: 10,
    showInfoForLead: false,
    gameIsEnd: false,
    // player0: {},
    // player1: {},
    // player2: {},
    // player3: {},
    // player4: {},
    // player5: {},
    // player6: {},
    // player7: {},
    // player8: {},
    // player9: {},
    // player10: {},
    /*             TEST PLAYERS              */
    player0: {name: "Zalypelnik", role: "Lead", ready: true, number: 1, fouls: 0, active: true},
    player1: {name: "Zalypelnik", role: "Civil", ready: true, number: 1, fouls: 0, active: true},
    player2: {name: "Mr.Od1n", role: "Civil", ready: true, number: 2, fouls: 0, active: true},
    player3: {name: "WhoAmI", role: "Civil", ready: true, number: 3, fouls: 0, active: true},
    player4: {name: "SUBARIST", role: "Civil", ready: true, number: 4, fouls: 0, active: true},
    player5: {name: "Drews", role: "Civil", ready: true, number: 5, fouls: 0, active: true},
    player6: {name: "Vitalik", role: "Civil", ready: true, number: 6, fouls: 0, active: true},
    player7: {name: "Bananator", role: "Sheriff", ready: true, number: 7, fouls: 0, active: true},
    player8: {name: "Микола", role: "Don", ready: true, number: 8, fouls: 0, active: true},
    player9: {name: "Михайло", role: "Mafia", ready: true, number: 9, fouls: 0, active: true},
    player10: {name: "Дьома", role: "Mafia", ready: true, number: 10, fouls: 0, active: true},
    // gameIsEnd: true,
    // gameIsStarted: true,
    // resultGame: {
    //     "checksResult": [{"sheriffCheck": 1, "donCheck": 2, "numberOfTheCircle": 1}, {
    //         "sheriffCheck": 3,
    //         "donCheck": 3,
    //         "numberOfTheCircle": 2
    //     }, {"sheriffCheck": 4, "donCheck": 4, "numberOfTheCircle": 3}],
    //     "gameDuration": 7300,
    //     "win": "draw",
    //     "typeWin": "3#3",
    //     "playersResult": [{
    //         "name": "lead",
    //         "number": 0,
    //         "foulsQuantity": 0,
    //         "firstKillSheriff": false,
    //         "killed": false,
    //         "roleInGame": "civil",
    //         "role": "mafia"
    //     },{
    //         "name": "1",
    //         "number": 1,
    //         "foulsQuantity": 0,
    //         "firstKillSheriff": false,
    //         "killed": false,
    //         "roleInGame": "civil",
    //         "role": "mafia"
    //     },
    //         {
    //             "name": "2",
    //             "number": 2,
    //             "foulsQuantity": 0,
    //             "firstKillSheriff": false,
    //             "killed": true,
    //             "roleInGame": "civil"
    //         }, {
    //             "name": "3", "foulsQuantity": 0,
    //             "firstKillSheriff": false, "number": 3,
    //             "killed": false,
    //             "roleInGame": "civil",
    //             "role": "mafia"
    //
    //         }, {
    //             "name": "4",
    //             "foulsQuantity": 0,
    //             "number": 4,
    //             "firstKillSheriff": false,
    //             "killed": true,
    //             "roleInGame": "civil"
    //         }, {
    //             "name": "55", "foulsQuantity": 0, "number": 5,
    //             "firstKillSheriff": false,
    //             "killed": false,
    //             "roleInGame": "mafia"
    //         }, {
    //             "name": "6",
    //             "foulsQuantity": 0,
    //             "number": 6,
    //             "firstKillSheriff": false,
    //             "killed": false,
    //             "roleInGame": "mafia"
    //         }, {
    //             "name": "amrgdfarsik", "foulsQuantity": 0,
    //             "firstKillSheriff": true,
    //             "killed": true,
    //             "roleInGame": "civil",
    //             "role": "don",
    //             "number": 7,
    //             "active": true
    //
    //         }, {
    //             "name": "sdfgdfs", "foulsQuantity": 0, "number": 8,
    //             "firstKillSheriff": false,
    //             "killed": true,
    //             "roleInGame": "civil",
    //             "goldenMove": [5, 10, 6],
    //             "role": "sheriff"
    //
    //         }, {
    //             "name": "dsfgdsfg", "foulsQuantity": 0,
    //             "firstKillSheriff": false,
    //             "killed": false,
    //             "roleInGame": "sheriff", "number": 9,
    //         }, {
    //             "name": "amarssdfsfdik",
    //             "foulsQuantity": 0,
    //             "firstKillSheriff": false,
    //             "killed": false,
    //             "roleInGame": "don","number": 10,
    //         }],
    //     "kills": [{"playerNumber": 1, "circleNumber": 1}, {"playerNumber": 2, "circleNumber": 2}, {
    //         "playerNumber": 4,
    //         "circleNumber": 3
    //     }]
    // },
    /*                 End test                     */
};


export const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                startGame: action.payload
            };
        case PLAYER_IS_READY:
            return {
                ...state,
                ['player' + [action.payload.number]]: action.payload
            };
        case CHANGE_PLAYER_INFO:
            return {
                ...state
            };
        case CHANGE_VOTING:
            return {
                ...state,
                voting: action.payload
            };
        case CHANGE_CIRCLE:
            return {
                ...state,
                currentCircle: action.payload
            };
        case CHANGE_KILL_STATUS:
            return {
                ...state,
                isKilled: action.payload.status,
                kills: action.payload.arr
            };
        case CHANGE_KICK_STATUS:
            return {
                ...state,
                isKicked: action.payload
            };
        case ADD_CHECK:
            return {
                ...state,
                checks: action.payload
            };
        case END_GAME:
            return {
                ...state,
                gameIsEnd: action.payload
            };
        case SET_BEST_MOVE:
            return {
                ...state,
                bestMove: action.payload
            };
        case SET_ARRAY_PLAYERS:
            return {
                ...state,
                arrayStartPlayers: action.payload
            };
        case SET_RESULT_GAME:
            return {
                ...state,
                resultGame: action.payload
            };
        case CHANGE_SHOW_INFO:
            return {
                ...state,
                showInfo: action.payload
            };
        case CHANGE_COURT_STATUS:
            return {
                ...state,
                courtStatus: action.payload
            };
        case CHANGE_COUNT_ACTIVE_PLAYERS:
            return {
                ...state,
                countActivePlayers: action.payload
            };
        case SHOW_INFO_FOR_LEAD:
            return {
                ...state,
                showInfoForLead: action.payload
            };
        case SET_ROLES:
            return {
                ...state,
                roles: action.payload
            };
        case SET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload
            };
    }
    return state;
};