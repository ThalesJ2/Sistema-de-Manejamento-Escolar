package com.example.Sistema.de.manejamento.repositories;

import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.entities.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AtividadeRepository extends JpaRepository<Atividade,Integer> {

    Optional<Atividade> findByNome(String nome);

}
