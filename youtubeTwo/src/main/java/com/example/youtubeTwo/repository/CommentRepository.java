package com.example.youtubeTwo.repository;

import com.example.youtubeTwo.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.video.id=?1 AND c.parent IS NULL")
    ArrayList<Comment> findAllTopLevelComments(Long videoId);

    @Query("SELECT c FROM Comment c WHERE c.parent.id=?1")
    ArrayList<Comment> findReplies(Long parentId);
}
