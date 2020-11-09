package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDTO {

    private Long id;
    private String username;
    private String name;
    private String email;
    private int numOfSubs;
    private ArrayList<VideoDTO> videos;
    private String userImage;
}
