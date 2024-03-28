import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estado.js"
const urlBase = "http://localhost:8080/alunos";

export const createAluno = createAsyncThunk('createAluno', async (aluno) => {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    });

    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            aluno
        }
    }
    else {
        const erroTexto = await resposta.text();
        throw new Error(erroTexto || 'ERRO: Algo deu errado ao adicionar a atividade.');      
    }
});
export const buscarAlunos = createAsyncThunk('buscarAlunos', async () => {
    try {
        const resposta = await fetch(urlBase, { 
            method: 'GET' 
        });
        const dados = await resposta.json();
        if (resposta.status==200) {
            return {
                status: true,
                listaAlunos: dados,
                mensagem: ''
            }
        }
        else {
            return {
                status: false,
                listaAlunos: [],
                mensagem: 'ERRO.'
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaAlunos: [],
            mensagem: 'ERRO: ' + erro.message
        }
    }
});
export const updateAluno = createAsyncThunk('updateAluno', async (aluno) => {
    const resposta = await fetch(`${urlBase}/${aluno.ra}`       , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
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
            aluno
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO.',
            aluno
        }
    }
});
export const deleteAluno = createAsyncThunk('deleteAluno', async (aluno) => {
    const resposta = await fetch(`${urlBase}/${aluno.ra}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    }).catch(erro => {
        return {
            status: false,
            mensagem: 'ERRO:' + erro.message,
            aluno
        }
    });
    if (resposta.ok) {
        const dados = await resposta.json();
        return {
            status: dados.status,
            mensagem: dados.mensagem,
            aluno
        }
    }
    else {
        return {
            status: false,
            mensagem: 'ERRO.',
            aluno
        }
    }
});
const estadoInicial = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    alunos: []
};
const alunoSlice = createSlice({
    name: 'aluno',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarAlunos.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Buscando.";
        }).addCase(buscarAlunos.fulfilled, (state, action) => {
            if (action.payload.status) {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.alunos = action.payload.listaAlunos;
            } else {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
                state.alunos = [];
            }
        }).addCase(buscarAlunos.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message;
            state.alunos = [];
        }).addCase(createAluno.fulfilled, (state, action) => {
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.alunos.push(action.payload.aluno);       
            }  
            else
            {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
        }).addCase(createAluno.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Adicionando.";
        }).addCase(createAluno.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(updateAluno.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            const indice = state.atividades.findIndex(atividade => atividade.id === action.payload.atividade.id);
            state.atividades[indice] = action.payload.atividade;
            state.mensagem = action.payload.mensagem;
        }).addCase(updateAluno.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Atualizando.";
        }).addCase(updateAluno.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        }).addCase(deleteAluno.fulfilled, (state, action) => {
            state.estado = ESTADO.OCIOSO;
            state.mensagem = action.payload.mensagem;
            state.alunos = state.alunos.filter(aluno => aluno.ra !== action.payload.aluno.id);
        }).addCase(deleteAluno.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Removendo.";
        }).addCase(deleteAluno.rejected, (state, action) => {
            state.mensagem = "ERRO: " + action.error.message;
            state.estado = ESTADO.ERRO;
        })
    }
});

export default alunoSlice.reducer;