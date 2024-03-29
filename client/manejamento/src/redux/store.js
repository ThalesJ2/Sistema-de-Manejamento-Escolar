import {configureStore} from '@reduxjs/toolkit';
import atividadeSlice from './atividadeReducer';
import alunoSlice from './AlunoReducer'

const store = configureStore({
    reducer:{
        atividade: atividadeSlice,
        aluno: alunoSlice
    }
});

export default store;