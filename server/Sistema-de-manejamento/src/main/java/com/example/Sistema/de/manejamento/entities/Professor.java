package com.example.Sistema.de.manejamento.entities;

public class Professor {

    @Id
    private Integer id;

    @NotBlank
    private String nome;

    @NotBlank
    private String senha;

    @NotBlank
    private String formacao;

    public Aluno() {
    }

    public Aluno(Integer ra, String nome, String senha, String formacao) {
        this.ra = ra;
        this.nome = nome;
        this.senha = senha;
        this.formacao = formacao;
    }

    public Integer getRa() {
        return ra;
    }

    public void setRa(Integer ra) {
        this.ra = ra;
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

    @Override
    public int hashCode() {
        return Objects.hash(ra);
    }
}
