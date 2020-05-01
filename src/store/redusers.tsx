import {
    ADD_CHECK,
    CHANGE_CIRCLE,
    CHANGE_KICK_STATUS, CHANGE_KILL_STATUS,
    CHANGE_PLAYER_INFO, CHANGE_SHOW_INFO,
    CHANGE_VOTING, END_GAME,
    PLAYER_IS_READY, SET_ARRAY_PLAYERS, SET_BEST_MOVE, SET_RESULT_GAME,
    START_GAME
} from "./actions";

const defaultState = {
    currentCircle: 0,
    kills: [],
    voting: [],
    // activeRole: 'civil',
    // mafiaLeft: 2,
    // donLeft: 1,
    // sheriffLeft: 1,
    // civilLeft: 6,
    isKilled: true,
    isKicked: false,
    gameIsEnd: false,
    checks: [],
    showInfo:false,
    // player1: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player2: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player3: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player4: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player5: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player6: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player7: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player8: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player9: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    // player10: {
    //     ready: false,
    //     role: '',
    //     fouls: 0
    // },
    /*             TEST PLAYERS              */
    player1: {name: "Zalypelnik", role: "civil", ready: true, number: 1, fouls: 0, active: true},
    player2: {name: "Mr.Od1n", role: "civil", ready: true, number: 2, fouls: 0, active: true},
    player3: {name: "WhoAmI", role: "civil", ready: true, number: 3, fouls: 0, active: true},
    player4: {name: "SUBARIST", role: "civil", ready: true, number: 4, fouls: 0, active: true},
    player5: {name: "Drews", role: "civil", ready: true, number: 5, fouls: 0, active: true},
    player6: {name: "Vitalik", role: "civil", ready: true, number: 6, fouls: 0, active: true},
    player7: {name: "Bananator", role: "sheriff", ready: true, number: 7, fouls: 0, active: true},
    player8: {name: "Микола", role: "don", ready: true, number: 8, fouls: 0, active: true},
    player9: {name: "Михайло", role: "mafia", ready: true, number: 9, fouls: 0, active: true},
    player10: {name: "Дьома", role: "mafia", ready: true, number: 10, fouls: 0, active: true},
    // gameIsEnd: true,
    gameIsStarted: true,
    resultGame: {
        "checksResult": [{"sheriffCheck": 1, "donCheck": 2, "numberOfTheCircle": 1}, {
            "sheriffCheck": 3,
            "donCheck": 3,
            "numberOfTheCircle": 2
        }, {"sheriffCheck": 4, "donCheck": 4, "numberOfTheCircle": 3}],
        "gameDuration": 511,
        "win": "draw",
        "typeWin": "3#3",
        "playersResult": [{"name":"amarsik",
            "foulsQuantity": 0,
            "firstKillSheriff": false,
            "killed": false,
            "roleInGame": "civil",
            "role":"mafia"
        },
            {"name":"amarsik", "foulsQuantity": 0, "firstKillSheriff": false, "killed": true, "roleInGame": "civil"}, {
            "name":"amarsik1","foulsQuantity": 0,
            "firstKillSheriff": false,
            "killed": false,
            "roleInGame": "civil",
                "role":"mafia"

            }, {"name":"amarsik", "foulsQuantity": 0, "firstKillSheriff": false, "killed": true, "roleInGame": "civil"}, {
            "name":"amarsik", "foulsQuantity": 0,
            "firstKillSheriff": false,
            "killed": false,
            "roleInGame": "mafia"
        }, {"name":"amarsik", "foulsQuantity": 0, "firstKillSheriff": false, "killed": false, "roleInGame": "mafia"}, {
            "name":"amarsik", "foulsQuantity": 0,
            "firstKillSheriff": true,
            "killed": true,
            "roleInGame": "civil",
                "role":"don",
                "number": 7,
                "active": true

            }, {
            "name":"amarsik", "foulsQuantity": 0,"number":8,
            "firstKillSheriff": false,
            "killed": true,
            "roleInGame": "civil",
            "goldenMove": [5, 10, 6],
                "role":"sheriff"

            }, {
            "name":"amarsik", "foulsQuantity": 0,
            "firstKillSheriff": false,
            "killed": false,
            "roleInGame": "sheriff"
        }, {"name":"amarsik", "foulsQuantity": 0, "firstKillSheriff": false, "killed": false, "roleInGame": "don"}],
        "kills": [{"playerNumber": 1, "circleNumber": 1}, {"playerNumber": 2, "circleNumber": 2}, {
            "playerNumber": 4,
            "circleNumber": 3
        }]
    },
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

    }
    return state;
};