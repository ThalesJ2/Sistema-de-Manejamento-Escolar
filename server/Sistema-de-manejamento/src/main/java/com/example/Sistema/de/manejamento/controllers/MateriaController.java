package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Aluno;
import com.example.Sistema.de.manejamento.entities.Materia;
import com.example.Sistema.de.manejamento.services.MateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
