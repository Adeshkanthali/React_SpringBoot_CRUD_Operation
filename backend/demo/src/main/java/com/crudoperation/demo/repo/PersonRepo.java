package com.crudoperation.demo.repo;

import com.crudoperation.demo.entitiy.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepo extends JpaRepository<Person,Long> {

    Person findByName(String name);
}
