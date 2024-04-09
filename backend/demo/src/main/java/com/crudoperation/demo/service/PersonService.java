package com.crudoperation.demo.service;

import com.crudoperation.demo.entitiy.Person;
import com.crudoperation.demo.repo.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepo personRepo;

    public List<Person> allPerson(){
        return personRepo.findAll();
    }

    public Person savePerson(Person person){
        return personRepo.save(person);
    }

    public void deletePerson(String name) {
        Person person = personRepo.findByName(name);
        if (person != null) {
            personRepo.delete(person);
        }
    }

    public Person updatePerson(String name, Person person){
        Person person1 =  personRepo.findByName(name);
        if(person1 != null){
            person1.setName(person.getName());
            person1.setNumber(person.getNumber());
            return personRepo.save(person1);
        }
        return null;
    }

}
