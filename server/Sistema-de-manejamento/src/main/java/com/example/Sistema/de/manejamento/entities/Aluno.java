package com.example.Sistema.de.manejamento.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Aluno {

    @Id
    private Integer ra;
    private String nome;
    private String senha;
    private String email;

    public Aluno() {
    }

    public Aluno(Integer ra, String nome, String senha, String email) {
        this.ra = ra;
        this.nome = nome;
        this.senha = senha;
        this.email = email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aluno aluno = (Aluno) o;
        return Objects.equals(ra, aluno.ra);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ra);
    }
}
