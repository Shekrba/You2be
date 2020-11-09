package com.example.youtubeTwo.services;

import com.example.youtubeTwo.dto.AddLikingDTO;
import com.example.youtubeTwo.dto.CheckLikingDTO;
import com.example.youtubeTwo.dto.LikingDTO;
import com.example.youtubeTwo.model.Liking;
import com.example.youtubeTwo.model.LikingValue;
import com.example.youtubeTwo.model.User;
import com.example.youtubeTwo.model.Video;
import com.example.youtubeTwo.repository.LikingRepository;
import com.example.youtubeTwo.repository.UserRepository;
import com.example.youtubeTwo.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class LikingService {

    @Autowired
    LikingRepository likingRepository;

    @Autowired
    VideoRepository videoRepository;

    @Autowired
    UserRepository userRepository;

    public LikingDTO addLiking(AddLikingDTO addLikingDTO) {

        Video video = videoRepository.getOne(addLikingDTO.getVideoId());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        if(video == null || user == null){
            return null;
        }

        Liking liking = likingRepository.findOneByVideoAndUser(addLikingDTO.getVideoId(),user.getId());

        if(liking == null){
            liking = new Liking();

            liking.setUser(user);
            liking.setVideo(video);
        }

        liking.setValue(addLikingDTO.getValue());

        liking = likingRepository.save(liking);

        user.getLikings().add(liking);
        userRepository.save(user);

        video.getLikings().add(liking);
        videoRepository.save(video);

        return likingToDTO(liking);
    }

    private LikingDTO likingToDTO(Liking liking){
        LikingDTO dto = new LikingDTO();

        dto.setId(liking.getId());
        dto.setUserId(liking.getUser().getId());
        dto.setValue(liking.getValue());
        dto.setVideoId(liking.getVideo().getId());

        return dto;
    }

    public LikingDTO deleteLiking(Long videoId) {

        Video video = videoRepository.getOne(videoId);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        if(video == null || user == null){
            return null;
        }

        Liking liking = likingRepository.findOneByVideoAndUser(videoId,user.getId());

        if(liking == null){
            return null;
        }

        LikingDTO ret = likingToDTO(liking);

        likingRepository.delete(liking);

        return ret;
    }

    public CheckLikingDTO checkLiking(Long videoId) {

        CheckLikingDTO ret = new CheckLikingDTO();

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        Liking liking = likingRepository.findOneByVideoAndUser(videoId,user.getId());

        if(liking == null){
            ret.setValue("NONE");
        }else{
            LikingValue enumValue = liking.getValue();
            if(enumValue == LikingValue.LIKE){
                ret.setValue("LIKE");
            }else if(enumValue == LikingValue.DISLIKE){
                ret.setValue("DISLIKE");
            }else{
                ret.setValue("NONE");
            }
        }

        return ret;
    }
}
