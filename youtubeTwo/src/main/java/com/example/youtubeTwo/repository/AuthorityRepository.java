package com.example.youtubeTwo.repository;


import com.example.youtubeTwo.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findOneByName(String name);
}
