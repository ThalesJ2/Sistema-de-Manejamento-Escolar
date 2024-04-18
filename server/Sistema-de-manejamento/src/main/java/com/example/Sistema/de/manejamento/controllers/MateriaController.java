package com.example.Sistema.de.manejamento.controllers;


import com.example.Sistema.de.manejamento.entities.Materia;
import com.example.Sistema.de.manejamento.services.MateriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping(value="/materias")
@CrossOrigin(origins = "http://localhost:5173")
public class MateriaController {


    @Autowired
    private MateriaService materiaService;

    @GetMapping
    public ResponseEntity<List<Materia>> findAll(){
        return ResponseEntity.ok(materiaService.findAll());
    }

    @PostMapping

    public ResponseEntity<Materia> create(@Valid @RequestBody  Materia materia){
        return ResponseEntity.ok(materiaService.create(materia));
    }
    @PutMapping(value="/{id}")
    public ResponseEntity<Materia> update(@PathVariable Integer id, @Valid @RequestBody Materia materia){
        materia = materiaService.update(id, materia);

        return ResponseEntity.ok(materia);
    }
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer id){
        materiaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
