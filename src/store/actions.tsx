export const START_GAME = 'START_GAME';
export const PLAYER_IS_READY = 'PLAYER_IS_READY';
export const CHANGE_COUNT_ROLES = 'CHANGE_COUNT_ROLES';
export const CHANGE_ACTIVE_ROLE = 'CHANGE_ACTIVE_ROLE';
export const CHANGE_PLAYER_INFO = 'CHANGE_PLAYER_INFO';
export const CHANGE_VOTING = 'CHANGE_VOTING';
export const CHANGE_CIRCLE = 'CHANGE_CIRCLE';
export const ADD_CHECK = 'ADD_CHECK';

export const startGame = value => ({
    type: START_GAME,
    payload: value
});
export const playersIsReady = value => ({
    type: PLAYER_IS_READY,
    payload: value
});
export const changeCountRoles = value => ({
    type: CHANGE_COUNT_ROLES,
    payload: value
});
export const changeActiveRole = value => ({
    type: CHANGE_ACTIVE_ROLE,
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
export const changeCircle = value => ({
    type: CHANGE_CIRCLE,
    payload: value
});
export const addCheck = value => ({
    type: ADD_CHECK,
    payload: value
});