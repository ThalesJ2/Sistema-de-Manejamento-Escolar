package com.example.Sistema.de.manejamento.services;


import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.entities.Atividade;
import com.example.Sistema.de.manejamento.repositories.AlunoRepository;
import com.example.Sistema.de.manejamento.repositories.AtividadeRepository;
import com.example.Sistema.de.manejamento.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AtividadeService {

    @Autowired
    private AtividadeRepository ativRepository;

    @Transactional
    public Atividade create(Atividade ativ){
        return  ativRepository.save(ativ);
    }

    @Transactional(readOnly = true)
    public List<Atividade> findAll(){
        return ativRepository.findAll();
    }

    @Transactional
    public Atividade findById(Integer id){
        return ativRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Atividade não encontrada."));
    }

    @Transactional
    public void delete(Integer id){
        if(!ativRepository.existsById(id))
            throw new ResourceNotFoundException("Atividade não encontrada.");
        ativRepository.deleteById(id);
    }
}
