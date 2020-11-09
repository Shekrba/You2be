package com.example.youtubeTwo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String imageSrc;
    private String token;
    private int expiresIn;
}
