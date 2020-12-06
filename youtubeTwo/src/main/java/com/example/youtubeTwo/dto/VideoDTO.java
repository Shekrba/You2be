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
public class VideoDTO {

    private Long id;

    private String title;

    private String description;

    private int views;

    private Date uploadDate;

    private String src;

    private int numOfComments;

    private int likes;

    private int dislikes;

    private int numOfSubscribers;

    private Long uploaderId;

    private String uploaderUsername;

    private String userImage;

    private String thumbnailSrc;

}
