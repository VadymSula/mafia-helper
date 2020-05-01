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