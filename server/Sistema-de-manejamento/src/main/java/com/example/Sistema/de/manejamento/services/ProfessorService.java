//package com.example.Sistema.de.manejamento.services;
//
//
//import com.example.Sistema.de.manejamento.entities.Atividade;
//import com.example.Sistema.de.manejamento.entities.Professor;
//import com.example.Sistema.de.manejamento.repositories.ProfessorRepository;
//import com.example.Sistema.de.manejamento.services.exceptions.ResourceNotFoundException;
//import jakarta.persistence.EntityNotFoundException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Service
//public class ProfessorService {
//
//    @Autowired
//    private ProfessorRepository profRepository;
//
//    @Transactional
//    public Professor create(Professor prof){
//        return  profRepository.save(prof);
//    }
//
//    @Transactional(readOnly = true)
//    public List<Professor> findAll(){
//        return profRepository.findAll();
//    }
//
//    @Transactional
//    public Professor findByID(Integer id){
//        return profRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Professor nao encontrado"));
//    }
//
////    @Transactional
////    public Atividade findByName(String nome){
////        return profRepository.findByNome(nome).orElseThrow(()-> new ResourceNotFoundException("Professor não encontrado."));
////    }
//
//    @Transactional
//    public void delete(Integer id){
//        if(!profRepository.existsById(id))
//            throw new ResourceNotFoundException("Professor não encontrado");
//        profRepository.deleteById(id);
//
//    }
//    @Transactional
//    public Professor update(Integer id, Professor professor){
//        try{
//            Professor entity = profRepository.getReferenceById(id);
//
//            entity.setNome(professor.getNome());
//            entity.setSenha(professor.getSenha());
//            entity.setFormacao(professor.getFormacao());
//
//            entity = profRepository.save(entity);
//
//            return entity;
//        }
//        catch(EntityNotFoundException e){
//            throw new ResourceNotFoundException("Professor não encontrado.");
//        }
//    }
//
//
//}