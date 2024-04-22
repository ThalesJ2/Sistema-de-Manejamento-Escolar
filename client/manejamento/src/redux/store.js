import {configureStore} from '@reduxjs/toolkit';
import atividadeSlice from './atividadeReducer';
import alunoSlice from './AlunoReducer'
import materiaSlice from "./MateriaReducer"

const store = configureStore({
    reducer:{
        atividade: atividadeSlice,
        aluno: alunoSlice,
        materia: materiaSlice
    }
});

export default store;