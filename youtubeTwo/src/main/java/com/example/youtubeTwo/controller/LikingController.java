package com.example.youtubeTwo.controller;

import com.example.youtubeTwo.dto.*;
import com.example.youtubeTwo.services.LikingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/liking", produces = MediaType.APPLICATION_JSON_VALUE)
public class LikingController {

    @Autowired
    LikingService likingService;

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addLiking(@RequestBody AddLikingDTO addLikingDTO) {
        LikingDTO likingDTO = likingService.addLiking(addLikingDTO);

        if(likingDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(likingDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/{videoId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteLiking(@PathVariable Long videoId) {
        LikingDTO likingDTO = likingService.deleteLiking(videoId);

        if(likingDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(likingDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/check/{videoId}", method = RequestMethod.GET)
    public ResponseEntity<?> checkLiking(@PathVariable Long videoId){
       CheckLikingDTO ret = likingService.checkLiking(videoId);

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }

    }
}
