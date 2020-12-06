package com.example.youtubeTwo.services;


import com.example.youtubeTwo.dto.RegCompletedDTO;
import com.example.youtubeTwo.dto.RegUserDTO;
import com.example.youtubeTwo.dto.UserDTO;
import com.example.youtubeTwo.model.Authority;
import com.example.youtubeTwo.model.User;
import com.example.youtubeTwo.repository.AuthorityRepository;
import com.example.youtubeTwo.repository.UserRepository;
import com.example.youtubeTwo.security.TokenUtils;
import com.example.youtubeTwo.security.auth.JwtAuthenticationRequest;
import com.example.youtubeTwo.util.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenUtils tokenUtils;

    public UserDTO checkCredentials(JwtAuthenticationRequest request) {
        User user=userRepository.findOneByUsername(request.getUsername());
        if(user!=null){
            if(passwordEncoder.matches(request.getPassword(),user.getPassword())){

                String jwt = tokenUtils.generateToken(request.getUsername());
                int expiresIn = tokenUtils.getExpiredIn();
                UserDTO userDTO= ObjectMapperUtils.map(user,UserDTO.class);
                userDTO.setExpiresIn(expiresIn);
                userDTO.setToken(jwt);

                return userDTO;
            }
        }
        return null;
    }

    public RegCompletedDTO register(RegUserDTO regUserDTO){
        User user = userRepository.findOneByUsername(regUserDTO.getUsername());
        RegCompletedDTO ret = new RegCompletedDTO();

        if(user!=null){
            ret.setMessage("Registration failed");
            return null;
        }else{
            user = new User();
            user.setUsername(regUserDTO.getUsername());
            user.setEmail(regUserDTO.getEmail());
            user.setName(regUserDTO.getName());
            user.setPassword(passwordEncoder.encode(regUserDTO.getPassword()));

            if(regUserDTO.getImageSrc()==null || regUserDTO.getImageSrc().trim().equals("")){
                user.setImageSrc("http://localhost:8080/user/image/download/user.png");
            }else{
                user.setImageSrc("http://localhost:8080/user/image/download/"+regUserDTO.getImageSrc());
            }

            Authority authority = authorityRepository.findOneByName("ROLE_USER");
            List<Authority> authorities = new ArrayList<>();
            authorities.add(authority);
            user.setAuthorities(authorities);

            user = userRepository.save(user);

            ret.setMessage("Registration successful");
            ret.setEmail(user.getEmail());
            ret.setId(user.getId());
            ret.setName(user.getName());
            ret.setUsername(user.getUsername());

            return ret;
        }

    }
}