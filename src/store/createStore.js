import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { MainReducer } from '../routes/main/controller/MainReducer';
import * as ApiReducer from '../common/services/api/ApiReducer';

const reducer = combineReducers({
    api: ApiReducer.reducer,
    main: MainReducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
};

const pReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    pReducer,
    applyMiddleware(thunk),
)

export const persistor = persistStore(store);
