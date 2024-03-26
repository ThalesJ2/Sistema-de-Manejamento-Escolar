package com.example.Sistema.de.manejamento.repositories;

import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.entities.Atividade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AtividadeRepository extends JpaRepository<Atividade,Integer> {

}
