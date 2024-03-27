import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estado.js"
const urlBase = "http://localhost:8080/atividades";

export const addAtividade = createAsyncThunk('addAtividade', async (atividade) => {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(atividade)
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
            atividade
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO: ',
            atividade
        }
    }
});

export const buscarAtividades = createAsyncThunk('buscarAtividades', async () => {
    try {
        const resposta = await fetch(urlBase, { 
            method: 'GET' 
        });
        const dados = await resposta.json();
        if (dados.status) {
            return {
                status: true,
                listaAtividades: dados.listaAtividades,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaAtividades: [],
                mensagem: 'ERRO.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaAtividades: [],
            mensagem: 'ERRO: ' + erro.message
        }
    }
});

export const updateAtividades = createAsyncThunk('updateAtividades', async (atividade) => {
    const resposta = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(atividade)
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
            atividade
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO.',
            atividade
        }
    }
});

export const deleteAtividade = createAsyncThunk('deleteAtividade', async (atividade) => {
    const resposta = await fetch(urlBase, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(atividade)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'ERRO:' + erro.message,
            atividade
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            atividade
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO.',
            atividade
        }
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    atividades: []
};

const atividadeSlice = createSlice({
    name: 'atividade',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarAtividades.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Buscando.";
        }).addCase(buscarAtividades.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.atividades = action.payload.listaAtividades;
            } else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.atividades = [];
            }
        }).addCase(buscarAtividades.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message;
            state.atividades = [];
        }).addCase(addAtividade.fulfilled, (state, action) => {
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.atividades.push(action.payload.atividade);       
            }  
            else
            {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(addAtividade.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Adicionando.";
        }).addCase(addAtividade.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(updateAtividades.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            const indice = state.atividades.findIndex(atividade => atividade.id === action.payload.atividade.id);
            state.atividades[indice] = action.payload.atividade;
            state.mensagem = action.payload.mensagem;
        }).addCase(updateAtividades.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Atualizando.";
        }).addCase(updateAtividades.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(deleteAtividade.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.atividades = state.atividades.filter(atividade => atividade.id !== action.payload.atividade.id);
        }).addCase(deleteAtividade.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Removendo.";
        }).addCase(deleteAtividade.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        })
    }
});


export default atividadeSlice.reducer;