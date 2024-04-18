package com.example.Sistema.de.manejamento.services;


import com.example.Sistema.de.manejamento.entities.Materia;
import com.example.Sistema.de.manejamento.repositories.MateriaRepository;
import com.example.Sistema.de.manejamento.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
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

    @Transactional
    public Materia create(Materia materia){
        return  materiaRepository.save(materia);
    }
    @Transactional
    public void delete(Integer id){
        if(!materiaRepository.existsById(id))
            throw new ResourceNotFoundException("Materia não encontrado");
        materiaRepository.deleteById(id);

    }
    @Transactional
    public Materia update(Integer id, Materia materia){
        try{
            Materia nova = materiaRepository.getReferenceById(id);

            nova.setNome(materia.getNome());


            nova =  materiaRepository.save(nova);

            return nova;
        }
        catch(EntityNotFoundException e){
            throw new ResourceNotFoundException("Materia não encontrada.");
        }
    }
}
