package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChannelDTO {

    private Long id;
    private String username;
    private String name;
    private String email;
    private int numOfSubs;
    private boolean alreadySubscribed;
    private String userImage;
}
