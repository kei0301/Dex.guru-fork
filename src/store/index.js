import { configureStore } from '@reduxjs/toolkit';
import TokenReducer from './Token';
const store = configureStore({
    reducer: {
        Token: TokenReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export default store;
