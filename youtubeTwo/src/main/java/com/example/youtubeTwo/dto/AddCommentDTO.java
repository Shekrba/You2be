package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddCommentDTO {

    private String text;
    private Long videoId;
    private Long parentId;
}
