import {configureStore} from '@reduxjs/toolkit';
import atividadeSlice from './atividadeReducer';

const store = configureStore({
    reducer:{
        atividade: atividadeSlice
    }
});

export default store;