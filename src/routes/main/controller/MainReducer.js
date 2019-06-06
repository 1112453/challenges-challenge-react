import {
    FETCH_CHARITIES
    , FETCH_PAYMENTS
    , UPDATE_TOTAL_DONATE
    , UPDATE_MESSAGE
} from './ActionTypes';

const initialState = {
    charites: [],
    donate: 0,
    message: ""
}

function handleFetchCharities(state, action) {
    return {
        ...state,
        charites: action.payload,
    }
}
function handleFetchPayments(state, action) {
    return {
        ...state,
        donate: action.payload
    }
}
function handleUpdateTotalDonate(state, action) {
    return {
        ...state,
        donate: action.payload + state.donate
    }
}
function handleUpdateMessage(state, action) {
    return {
        ...state,
        message: action.payload
    }
}
const ACTION_HANDLES = {
    FETCH_CHARITIES: handleFetchCharities,
    FETCH_PAYMENTS: handleFetchPayments,
    UPDATE_TOTAL_DONATE: handleUpdateTotalDonate,
    UPDATE_MESSAGE: handleUpdateMessage,
}

export function MainReducer(state = initialState, action) {
    const handler = ACTION_HANDLES[action.type];

    return handler ? handler(state, action) : state;
}