package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Atividade;
import com.example.Sistema.de.manejamento.services.AtividadeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value="/atividade")
public class AtividadeController {

    @Autowired
    private AtividadeService ativService;


    @PostMapping
    public ResponseEntity<Atividade> create(@Valid @RequestBody Atividade ativ){
        Atividade at = ativService.create((ativ));
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(ativ.getId()).toUri();
        return ResponseEntity.created(uri).body(ativService.create(ativ));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id){
        ativService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Atividade>> findAll(){
        return ResponseEntity.ok(ativService.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Atividade>findById(@PathVariable Integer id){

        return ResponseEntity.ok(ativService.findById(id));
    }

}
