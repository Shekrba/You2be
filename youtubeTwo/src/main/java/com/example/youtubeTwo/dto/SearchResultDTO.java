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
public class SearchResultDTO {

    private ArrayList<VideoDTO> videos;
    private ArrayList<ChannelDTO> channels;
}
