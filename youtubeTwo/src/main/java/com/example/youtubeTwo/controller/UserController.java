package com.example.youtubeTwo.controller;

import com.example.youtubeTwo.dto.*;
import com.example.youtubeTwo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public ResponseEntity<?> getProfile(@PathVariable Long userId){

        ProfileDTO ret = userService.getProfile(userId);

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        SrcDTO srcDTO = userService.upload(file);

        if(srcDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(srcDTO, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/image/download/{src}", method = RequestMethod.GET)
    public @ResponseBody byte[] downloadVideo(@PathVariable String src) throws IOException {

        return userService.download(src);
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> edit(@RequestBody EditProfileDTO editProfileDTO) {
        ProfileDTO profileDTO = userService.edit(editProfileDTO);

        if(profileDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(profileDTO, HttpStatus.OK);
        }
    }
}
