package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    private Long id;
    private String text;
    private Date createdAt;
    private Long userId;
    private String username;
    private Long videoId;
    private int numOfReplies;
    private Long videoUploaderId;
    private Long parentId;
    private String userImage;

}
