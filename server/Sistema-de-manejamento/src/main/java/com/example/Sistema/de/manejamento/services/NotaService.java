package com.example.Sistema.de.manejamento.services;

import com.example.Sistema.de.manejamento.entities.Notas;
import com.example.Sistema.de.manejamento.repositories.NotaRepository;
import com.example.Sistema.de.manejamento.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    @Transactional
    public Notas create(Notas notas){return notaRepository.save(notas);}

    @Transactional
    public List<Notas> findAll(){return  notaRepository.findAll();}

    @Transactional
    public void delete(Integer id)
    {
        if(!notaRepository.existsById(id))
            throw new ResourceNotFoundException("Nota nao encontrada");
        notaRepository.deleteById(id);
    }

    @Transactional
    public Notas update(Integer id, Notas nota) {
        try {
            Notas entity = notaRepository.getReferenceById(id);
            entity.setValor(nota.getValor());
            entity = notaRepository.save(entity);
            return entity;
        }
        catch(EntityNotFoundException e){
            throw new ResourceNotFoundException("Nota nao encontrada");
        }
    }
}
