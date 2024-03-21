package com.example.Sistema.de.manejamento.entities;

public class Professor {
    private int RP;
    private String nome;
    private String cpf;
    private String endereco;
    private int telefone;
    private String formacao;
    private String senha;

    public Professor(int RP, String nome, String cpf, String endereco, int telefone, String formacao, String senha) {
       setRP(RP);
       setNome(nome);
       setCpf(cpf);
       setEndereco(endereco);
       setTelefone(telefone);
       setFormacao(formacao);
       setSenha(senha);
    }

    public Professor(String nome, String cpf, String endereco, int telefone, String formacao, String senha) {
        setNome(nome);
        setCpf(cpf);
        setEndereco(endereco);
        setTelefone(telefone);
        setFormacao(formacao);
        setSenha(senha);
    }

    public Professor() {
    }

    public int getRP() {
        return RP;
    }

    public void setRP(int RP) {
        this.RP = RP;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public int getTelefone() {
        return telefone;
    }

    public void setTelefone(int telefone) {
        this.telefone = telefone;
    }

    public String getFormacao() {
        return formacao;
    }

    public void setFormacao(String formacao) {
        this.formacao = formacao;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
