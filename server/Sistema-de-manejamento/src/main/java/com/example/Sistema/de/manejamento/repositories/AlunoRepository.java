package com.example.Sistema.de.manejamento.repositories;

import com.example.Sistema.de.manejamento.entities.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno,Integer> {
}
