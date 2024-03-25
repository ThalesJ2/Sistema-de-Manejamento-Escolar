package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.services.AlunoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/aluno")
public class AlunoController {


    @Autowired
    private AlunoService alunoService;


    @PostMapping
    public ResponseEntity<Aluno> create(@Valid @RequestBody Aluno aluno){
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{ra}")
                .buildAndExpand(aluno.getRa()).toUri();
        return ResponseEntity.created(uri).body(alunoService.create(aluno));
    }
}
