export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';
export const PLAYER_IS_READY = 'PLAYER_IS_READY';
export const CHANGE_PLAYER_INFO = 'CHANGE_PLAYER_INFO';
export const CHANGE_VOTING = 'CHANGE_VOTING';
export const CHANGE_CIRCLE = 'CHANGE_CIRCLE';
export const CHANGE_KILL_STATUS = 'CHANGE_KILL_STATUS';
export const CHANGE_KICK_STATUS = 'CHANGE_KICK_STATUS';
export const ADD_CHECK = 'ADD_CHECK';
export const SET_BEST_MOVE = 'SET_BEST_MOVE';
export const SET_ARRAY_PLAYERS = 'SET_ARRAY_PLAYERS';
export const SET_RESULT_GAME = 'SET_RESULT_GAME';
export const CHANGE_SHOW_INFO = 'CHANGE_SHOW_INFO';
export const CHANGE_COURT_STATUS = 'CHANGE_COURT_STATUS';
export const CHANGE_COUNT_ACTIVE_PLAYERS = 'CHANGE_COUNT_ACTIVE_PLAYERS';
export const SHOW_INFO_FOR_LEAD = 'SHOW_INFO_FOR_LEAD';
export const SET_ROLES = 'SET_ROLES';
export const SET_ALL_GAMES = 'SET_ALL_GAMES';
export const CLEAR_INFO_ABOUT_PLAYERS = 'CLEAR_INFO_ABOUT_PLAYERS';
export const SET_WHO_PLAYER_START_CIRCLE = 'SET_WHO_PLAYER_START_CIRCLE';


export const startGame = value => ({
    type: START_GAME,
    payload: value
});export const endGame = value => ({
    type: END_GAME,
    payload: value
});
export const playersIsReady = value => ({
    type: PLAYER_IS_READY,
    payload: value
});
export const changePlayerInfo = value => ({
    type: CHANGE_PLAYER_INFO,
    payload: value
});
export const changeVoting = value => ({
    type: CHANGE_VOTING,
    payload: value
});
export const changeKillStatus = value => ({
    type: CHANGE_KILL_STATUS,
    payload: value
});
export const changeKickStatus = value => ({
    type: CHANGE_KICK_STATUS,
    payload: value
});
export const changeCircle = value => ({
    type: CHANGE_CIRCLE,
    payload: value
});
export const addCheck = value => ({
    type: ADD_CHECK,
    payload: value
});
export const setBestMove = value => ({
    type: SET_BEST_MOVE,
    payload: value
});
export const setArrayPlayers = value => ({
    type: SET_ARRAY_PLAYERS,
    payload: value
});
export const setResultGame = value => ({
    type: SET_RESULT_GAME,
    payload: value
});
export const changeShowInfo = value => ({
    type: CHANGE_SHOW_INFO,
    payload: value
});
export const changeCourtStatus = value => ({
    type: CHANGE_COURT_STATUS,
    payload: value
});
export const changeCountActivePLayers = value => ({
    type: CHANGE_COUNT_ACTIVE_PLAYERS,
    payload: value
});
export const showInfoForLead= value => ({
    type: SHOW_INFO_FOR_LEAD,
    payload: value
});
export const setRoles= value => ({
    type: SET_ROLES,
    payload: value
});
export const setAllGames= value => ({
    type: SET_ALL_GAMES,
    payload: value
});
export const clearInfoAboutPlayers= value => ({
    type: CLEAR_INFO_ABOUT_PLAYERS,
    payload: value
});
export const setStartPlayerInCircle= value => ({
    type: SET_WHO_PLAYER_START_CIRCLE,
    payload: value
});