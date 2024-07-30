package org.launchcode.TEAR_API.repositories;

import org.launchcode.TEAR_API.models.Child;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildRepository extends CrudRepository<Child, Long> {
}