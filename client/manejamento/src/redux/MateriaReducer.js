import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estado.js"
const urlBase = "http://localhost:8080/materias";

export const createMateria = createAsyncThunk('createMateria', async (materia) => {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(materia)
    });

    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            materia
        }
    }
    else {
        const erroTexto = await resposta.text();
        throw new Error(erroTexto || 'ERRO: Algo deu errado ao adicionar a materia.');      
    }
});
export const buscarMateria = createAsyncThunk('buscarMateria', async () => {
    try {
        const resposta = await fetch(urlBase, { 
            method: 'GET' 
        });
        const dados = await resposta.json();
        if (resposta.status==200) {
            return {
                status: true,
                listaMaterias: dados,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaMaterias: [],
                mensagem: 'ERRO.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaMaterias: [],
            mensagem: 'ERRO: ' + erro.message
        }
    }
});
export const updateMateria = createAsyncThunk('updateAluno', async (materia) => {
    const resposta = await fetch(`${urlBase}/${materia.id}`       , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(materia)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'ERRO: ' + erro.message
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            materia
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO.',
            materia
        }
    }
});
export const deleteMateria = createAsyncThunk('deleteAluno', async (materia) => {
    const resposta = await fetch(`${urlBase}/${materia.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(materia)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'ERRO:' + erro.message,
            materia
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            materia
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO.',
            materia
        }
    }
});
const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    materias: []
};
const materiaSlice = createSlice({
    name: 'materia',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarMateria.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Buscando.";
        }).addCase(buscarMateria.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.materias = action.payload.listaMaterias;
            } else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.materias = [];
            }
        }).addCase(buscarMateria.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message;
            state.materias = [];
        }).addCase(createMateria.fulfilled, (state, action) => {
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.materias.push(action.payload.materia);       
            }  
            else
            {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(createMateria.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Adicionando.";
        }).addCase(createMateria.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(updateMateria.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            const indice = state.materias.findIndex(materia => materia.id === action.payload.materia.id);
            state.materias[indice] = action.payload.materia;
            state.mensagem = action.payload.mensagem;
        }).addCase(updateMateria.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Atualizando.";
        }).addCase(updateMateria.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(deleteMateria.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.alunos = state.materias.filter(materia => materia.id !== action.payload.materia.id);
        }).addCase(deleteMateria.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Removendo.";
        }).addCase(deleteMateria.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        })
    }
});

export default materiaSlice.reducer;