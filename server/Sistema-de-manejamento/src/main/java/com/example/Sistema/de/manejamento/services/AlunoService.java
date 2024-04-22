package com.example.Sistema.de.manejamento.services;

import com.example.Sistema.de.manejamento.entities.Aluno;

import com.example.Sistema.de.manejamento.repositories.AlunoRepository;
import com.example.Sistema.de.manejamento.services.exceptions.ResourceBadRequestException;
import jakarta.persistence.EntityNotFoundException;

import com.example.Sistema.de.manejamento.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;


   @Transactional
    public Aluno create(Aluno aluno){

        if(alunoRepository.findById(aluno.getRa()).isEmpty()){
            return  alunoRepository.save(aluno);
        }

        throw new ResourceBadRequestException("Ra ja cadastrado");
    }

    @Transactional(readOnly = true)
    public List<Aluno> findAll(){
        return alunoRepository.findAll();
    }

    @Transactional
    public Aluno findByRA(Integer ra){
       return alunoRepository.findById(ra).orElseThrow(()-> new ResourceNotFoundException("Aluno nao encontrado"));
    }

    @Transactional
    public void delete(Integer ra){
        if(!alunoRepository.existsById(ra))
            throw new ResourceNotFoundException("Aluno não encontrado");
        alunoRepository.deleteById(ra);

   }
    @Transactional
    public Aluno update(Integer id, Aluno aluno){
        try{
            Aluno a = alunoRepository.getReferenceById(id);

            a.setNome(aluno.getNome());
            a.setEmail(aluno.getSenha());
            a.setSenha(a.getSenha());
            a = alunoRepository.save(a);

            return a;
        }
        catch(EntityNotFoundException e){
            throw new ResourceNotFoundException("Aluno não encontrada.");
        }
    }
}
