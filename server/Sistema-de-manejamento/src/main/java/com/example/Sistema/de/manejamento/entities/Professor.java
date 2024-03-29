package com.example.Sistema.de.manejamento.entities;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

public class Professor {

    @Id
    private Integer id;

    @NotBlank
    private String nome;

    @NotBlank
    private String senha;

    @NotBlank
    private String formacao;

    public Professor() {
    }

    public Professor(Integer id, String nome, String senha, String formacao) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.formacao = formacao;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getFormacao() {
        return formacao;
    }

    public void setFormacao(String formacao) {
        this.formacao = formacao;
    }
}
