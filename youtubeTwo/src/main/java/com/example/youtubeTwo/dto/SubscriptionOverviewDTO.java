package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionOverviewDTO {
    private ArrayList<ChannelDTO> mySubscriptions;
    private ArrayList<ChannelDTO> channelSubs;
}
