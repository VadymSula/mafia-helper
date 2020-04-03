import {
    ADD_CHECK,
    CHANGE_ACTIVE_ROLE, CHANGE_CIRCLE,
    CHANGE_COUNT_ROLES, CHANGE_KICK_STATUS, CHANGE_KILL_STATUS,
    CHANGE_PLAYER_INFO,
    CHANGE_VOTING, END_GAME,
    PLAYER_IS_READY, SET_BEST_MOVE,
    START_GAME
} from "./actions";

const defaultState = {
    currentCircle: 0,
    kills: [],
    voting: [],
    activeRole: 'civil',
    mafiaLeft: 2,
    donLeft: 1,
    sheriffLeft: 1,
    civilLeft: 6,
    isKilled: true,
    isKicked: false,
    gameIsEnd: false,
    checks: [],
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
        case CHANGE_COUNT_ROLES:
            return {
                ...state,
                [action.payload.role]: action.payload.count
            };
        case CHANGE_ACTIVE_ROLE:
            return {
                ...state,
                activeRole: action.payload
            };
        case CHANGE_PLAYER_INFO:
            return {
                ...state,
                [action.payload.name]: action.payload.value
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

    }
    return state;
};