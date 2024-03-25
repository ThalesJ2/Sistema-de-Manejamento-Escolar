package com.example.Sistema.de.manejamento.services;

import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.repositories.AlunoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;


    @Transactional
    public Aluno create(Aluno aluno){
        return  alunoRepository.save(aluno);
    }
}
