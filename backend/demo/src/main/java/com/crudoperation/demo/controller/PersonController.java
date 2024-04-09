package com.crudoperation.demo.controller;

import com.crudoperation.demo.entitiy.Person;
import com.crudoperation.demo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("savePerson")
    public Person addPerson(@RequestBody Person person){
        return personService.savePerson(person);
    }

    @GetMapping("getPerson")
    public List<Person> allPersons(){
        return personService.allPerson();
    }

    @DeleteMapping("/{name}")
    public void deletePerson(@PathVariable String name){
        personService.deletePerson(name);
    }

    @PutMapping("/{name}")
    public Person updatePerson(@PathVariable String name, @RequestBody Person person){
        return personService.updatePerson(name, person);
    }

}

