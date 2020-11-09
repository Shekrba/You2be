package com.example.youtubeTwo.repository;

import com.example.youtubeTwo.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query("SELECT v FROM Video v WHERE v.user.username=?1")
    ArrayList<Video> findMyVideos(String username);

    ArrayList<Video> findAll();

    @Query("SELECT v FROM Video v WHERE v.title LIKE CONCAT('%',?1,'%') OR v.description LIKE CONCAT('%',?1,'%') OR v.user.username LIKE CONCAT('%',?1,'%')")
    ArrayList<Video> searchByTitleDescUsername(String query);
}
