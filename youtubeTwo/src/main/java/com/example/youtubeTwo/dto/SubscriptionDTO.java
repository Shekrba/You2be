package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {

    private Long id;
    private Long channelId;
    private Long followerId;
}
