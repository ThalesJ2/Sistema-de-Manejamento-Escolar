package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Aluno;

import com.example.Sistema.de.manejamento.services.AlunoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/alunos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlunoController {


    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<Aluno>> findAll(){
        return ResponseEntity.ok(alunoService.findAll());
    }

    @GetMapping(value = "/{ra}")
    public ResponseEntity<Aluno>findByRA(@PathVariable Integer ra){
        return ResponseEntity.ok(alunoService.findByRA(ra));
    }

    @PostMapping
    public ResponseEntity<Aluno> create(@Valid @RequestBody Aluno aluno){
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{ra}")
                .buildAndExpand(aluno.getRa()).toUri();
        return ResponseEntity.created(uri).body(alunoService.create(aluno));
    }

    @DeleteMapping(value = "/{ra}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer ra){
        alunoService.delete(ra);
        return ResponseEntity.noContent().build();
    }
    @PutMapping(value="/{ra}")
    public ResponseEntity<Aluno> update(@PathVariable Integer ra, @Valid @RequestBody Aluno aluno){
        aluno = alunoService.update(ra, aluno);
        return ResponseEntity.ok(aluno);
    }


}
