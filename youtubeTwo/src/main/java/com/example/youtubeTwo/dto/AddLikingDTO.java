package com.example.youtubeTwo.dto;

import com.example.youtubeTwo.model.LikingValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddLikingDTO {

    private Long videoId;

    private LikingValue value;
}
