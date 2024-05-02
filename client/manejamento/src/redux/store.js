import {configureStore} from '@reduxjs/toolkit';
import atividadeSlice from './atividadeReducer';
import alunoSlice from './AlunoReducer'
import materiaSlice from "./MateriaReducer"
import notaSlice from "./NotaReducer"

const store = configureStore({
    reducer:{
        atividade: atividadeSlice,
        aluno: alunoSlice,
        materia: materiaSlice,
        nota:notaSlice
    }
});

export default store;