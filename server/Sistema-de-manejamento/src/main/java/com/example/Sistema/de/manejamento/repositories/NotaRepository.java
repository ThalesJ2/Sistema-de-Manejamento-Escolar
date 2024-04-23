package com.example.Sistema.de.manejamento.repositories;

import com.example.Sistema.de.manejamento.entities.Notas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Notas,Integer> {

}