package com.example.youtubeTwo.repository;

import com.example.youtubeTwo.model.Subscription;
import com.example.youtubeTwo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SubRepository extends JpaRepository<Subscription, Long> {

    @Query("SELECT s FROM Subscription  s WHERE s.channel.id=?1 AND s.follower.id=?2")
    Subscription findOneByChannelAndFollower(Long channelId, Long followerId);
}
