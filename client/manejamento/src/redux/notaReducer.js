import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estado.js";
const urlBase = "http://localhost:8080/notas";

export const createNota = createAsyncThunk('createNota', async (nota) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nota)
        });

        if (resposta.ok) {
            const dados = await resposta.json();
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                nota
            };
        } else {
            const erroTexto = await resposta.text();
            throw new Error(erroTexto || 'ERRO: Algo deu errado ao adicionar a nota.');
        }
    } catch (erro) {
        throw new Error('ERRO: ' + erro.message);
    }
});

export const buscarNotas = createAsyncThunk('buscarNotas', async () => {
    try {
        const resposta = await fetch(urlBase, {
            method: "GET",
        });
        const dados = await resposta.json();
        if (resposta.status === 200) {
            return {
                status: true,
                listaNotas: dados,
                mensagem: ''
            };
        } else {
            return {
                status: false,
                listaNotas: [],
                mensagem: 'ERRO.'
            };
        }
    } catch (erro) {
        return {
            status: false,
            listaNotas: [],
            mensagem: 'ERRO: ' + erro.message
        };
    }
});

export const updateNota = createAsyncThunk('updateNota', async (nota) => {
    try {
        const resposta = await fetch(`${urlBase}/${nota.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nota)
        });
        if (resposta.ok) {
            const dados = await resposta.json();
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                nota
            };
        } else {
            return {
                status: false,
                mensagem: 'ERRO.',
                nota
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: 'ERRO: ' + erro.message
        };
    }
});

export const deleteNota = createAsyncThunk('deleteNota', async (nota) => {
    try {
        const resposta = await fetch(`${urlBase}/${nota.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nota)
        });
        if (resposta.ok) {
            const dados = await resposta.json();
            return {
                status: dados.status,
                mensagem: dados.mensagem,
                nota
            };
        } else {
            return {
                status: false,
                mensagem: 'ERRO.',
                nota
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: 'ERRO: ' + erro.message,
            nota
        };
    }
});

const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    notas: []
};

const notaSlice = createSlice({
    name: "nota",
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(buscarNotas.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando";
            })
            .addCase(buscarNotas.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.notas = action.payload.listaNotas;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.notas = [];
                }
            })
            .addCase(buscarNotas.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.message;
                state.notas = [];
            })
            .addCase(createNota.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando";
            })
            .addCase(createNota.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.notas.push(action.payload.nota);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.notas = [];
                }
            })
            .addCase(createNota.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.message;
            })
            .addCase(updateNota.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
            })
            .addCase(updateNota.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Atualizando.";
            })
            .addCase(updateNota.rejected, (state, action) => {
                state.mensagem = "ERRO: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
            .addCase(deleteNota.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.notas = state.notas.filter(nota => nota.ra !== action.payload.nota.id);
            })
            .addCase(deleteNota.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Removendo.";
            })
            .addCase(deleteNota.rejected, (state, action) => {
                state.mensagem = "ERRO: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })
    }
});

export default notaSlice.reducer;
