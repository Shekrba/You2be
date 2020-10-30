package com.example.youtubeTwo.services;

import com.example.youtubeTwo.dto.AddCommentDTO;
import com.example.youtubeTwo.dto.CommentDTO;
import com.example.youtubeTwo.model.Comment;
import com.example.youtubeTwo.model.User;
import com.example.youtubeTwo.model.Video;
import com.example.youtubeTwo.repository.CommentRepository;
import com.example.youtubeTwo.repository.UserRepository;
import com.example.youtubeTwo.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    VideoRepository videoRepository;

    public ArrayList<CommentDTO> getTopLevelComments(Long videoId) {

        ArrayList<Comment> topLevelComments = commentRepository.findAllTopLevelComments(videoId);

        if(topLevelComments==null){
            return null;
        }

        ArrayList<CommentDTO> ret = new ArrayList<>();

        for (Comment comment:topLevelComments) {
            CommentDTO dto = commentToDTO(comment);
            ret.add(dto);
        }

        return ret;
    }

    private CommentDTO commentToDTO(Comment comment){
        CommentDTO dto = new CommentDTO();

        dto.setId(comment.getId());
        dto.setText(comment.getText());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setNumOfReplies(comment.getChildren().size());
        dto.setUserId(comment.getUser().getId());
        dto.setUsername(comment.getUser().getUsername());
        dto.setVideoId(comment.getVideo().getId());
        dto.setVideoUploaderId(comment.getVideo().getUser().getId());

        dto.setUserImage(comment.getUser().getImageSrc());

        if(comment.getParent() != null){
            dto.setParentId(comment.getParent().getId());
        }else{
            dto.setParentId(0L);
        }

        return dto;
    }

    public ArrayList<CommentDTO> getReplies(Long parentId) {
        ArrayList<Comment> replyComments = commentRepository.findReplies(parentId);

        if(replyComments==null){
            return null;
        }

        ArrayList<CommentDTO> ret = new ArrayList<>();

        for (Comment comment:replyComments) {
            CommentDTO dto = commentToDTO(comment);
            ret.add(dto);
        }

        return ret;
    }

    public CommentDTO addComment(AddCommentDTO addCommentDTO) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        Video video = videoRepository.getOne(addCommentDTO.getVideoId());

        if(user==null || video==null){
            return null;
        }

        Comment parent = null;

        if(addCommentDTO.getParentId()>0){
            parent = commentRepository.getOne(addCommentDTO.getParentId());
            if(parent == null){
                return null;
            }
        }

        Comment comment = new Comment();
        comment.setText(addCommentDTO.getText());
        comment.setCreatedAt(new Date());
        comment.setParent(parent);
        comment.setUser(user);
        comment.setVideo(video);

        comment = commentRepository.save(comment);

        if(parent != null){
            parent.getChildren().add(comment);
            commentRepository.save(parent);
        }

        user.getComments().add(comment);
        userRepository.save(user);

        video.getComments().add(comment);
        videoRepository.save(video);

        return commentToDTO(comment);
    }

    public CommentDTO deleteComment(Long commentId) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Comment comment = commentRepository.getOne(commentId);

        if(!username.equals(comment.getUser().getUsername()) && !username.equals(comment.getVideo().getUser().getUsername())){
            return null;
        }

        CommentDTO commentDTO = commentToDTO(comment);

        commentRepository.delete(comment);

        return commentDTO;
    }
}
