package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Materia;
import com.example.Sistema.de.manejamento.entities.Notas;
import com.example.Sistema.de.manejamento.services.NotaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/notas")
@CrossOrigin(origins = "http://localhost:5173")
public class NotaController {
    @Autowired
    private NotaService notaService;

    @GetMapping
    public ResponseEntity<List<Notas>> findAll(){
        return ResponseEntity.ok(notaService.findAll());
    }

    @PostMapping
    public ResponseEntity<Notas> create(@Valid @RequestBody  Notas notas){
        return ResponseEntity.ok(notaService.create(notas));
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<Notas> update(@PathVariable Integer id, @Valid @RequestBody Notas notas){
        notas = notaService.update(id, notas);
        return ResponseEntity.ok(notas);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id){
        notaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
