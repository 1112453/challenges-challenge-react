import * as actionTypes from './ApiActionTypes';

const initialState = {	
	loading: false, //  ui block/unblock when request
	refreshing: false,
	loadingMore: false,
	timeout: false,
	authorizeRequired: false,
	waiting: false,
	readyApp : false,
	percent: 0 
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
				...action.api,
			};
		default:
			return state;
	}
};
