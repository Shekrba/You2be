package com.example.youtubeTwo.repository;

import com.example.youtubeTwo.model.Liking;
import com.example.youtubeTwo.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikingRepository extends JpaRepository<Liking, Long> {

    @Query("SELECT l FROM Liking l WHERE l.video.id=?1 AND l.user.id=?2")
    Liking findOneByVideoAndUser(Long videoId, Long userId);
}
