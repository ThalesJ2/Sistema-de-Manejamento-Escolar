package com.example.Sistema.de.manejamento.services;


import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.entities.Materia;
import com.example.Sistema.de.manejamento.repositories.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MateriaService {


    @Autowired
    private MateriaRepository materiaRepository;


    @Transactional(readOnly = true)
    public List<Materia> findAll(){
        return  materiaRepository.findAll();
    }
}
