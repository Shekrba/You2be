package com.example.youtubeTwo.repository;

import com.example.youtubeTwo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findOneByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username LIKE CONCAT('%',?1,'%') OR u.name LIKE CONCAT('%',?1,'%') OR u.email LIKE CONCAT('%',?1,'%')")
    ArrayList<User> searchByUsernameNameEmail(String query);
}
