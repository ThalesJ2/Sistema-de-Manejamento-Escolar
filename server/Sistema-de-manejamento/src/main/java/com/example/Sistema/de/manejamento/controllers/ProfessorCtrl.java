package com.example.Sistema.de.manejamento.controllers;

import com.example.Sistema.de.manejamento.entities.Professor;
import com.example.Sistema.de.manejamento.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value="/professor")
public class ProfessorCtrl {

    @Autowired
    ProfessorRepository prepo;

    @GetMapping(value="getallprofessores")
    public ResponseEntity<Object> getAllProfessores()
    {
        return ResponseEntity.ok(prepo.getProfessores());
    }
    @GetMapping(value="findprofessor/{rp}")
    public ResponseEntity<Object> getProfessore(@PathVariable("rp")int rp)
    {
        Professor pro=null;
        if(rp>=0 && rp<prepo.getProfessores().size())
            pro=prepo.getProfessores().get(rp);
        if(pro!=null)
            return ResponseEntity.ok(pro);
        else
            return ResponseEntity.badRequest().body("filme não encontrado");

    }
    @PostMapping(value="addprofessor")
    public ResponseEntity<Object> addProfessor(@RequestBody Professor pro)
    {
        prepo.addProfessor(pro);
        return ResponseEntity.ok("ok,professor adicionado");
    }
}
