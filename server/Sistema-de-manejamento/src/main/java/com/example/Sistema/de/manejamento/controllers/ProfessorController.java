package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Professor;
import com.example.Sistema.de.manejamento.services.ProfessorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/profesorres")
public class ProfessorController {


    @Autowired
    private ProfessorService profService;

    @GetMapping
    public ResponseEntity<List<Professor>> findAll(){
        return ResponseEntity.ok(profService.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Professor>findByID(@PathVariable Integer id){

        return ResponseEntity.ok(profService.findByID(id));
    }

    @PostMapping
    public ResponseEntity<Professor> create(@Valid @RequestBody Professor prof){
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(prof.getId()).toUri();
        return ResponseEntity.created(uri).body(profService.create(prof));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id){
        profService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{nome}")
    public ResponseEntity<Professor>findByNome(@PathVariable String nome){

        return ResponseEntity.ok(profService.findByName(nome));
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<Professor> update(@PathVariable Integer id, @Valid @RequestBody Professor professor){
        professor = profService.update(id, professor);

        return ResponseEntity.ok(professor);
    }

}
