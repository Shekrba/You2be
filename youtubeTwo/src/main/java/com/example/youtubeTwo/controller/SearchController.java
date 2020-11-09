package com.example.youtubeTwo.controller;

import com.example.youtubeTwo.dto.ChannelDTO;
import com.example.youtubeTwo.dto.SearchResultDTO;
import com.example.youtubeTwo.dto.VideoDTO;
import com.example.youtubeTwo.services.UserService;
import com.example.youtubeTwo.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
public class SearchController {

    @Autowired
    UserService userService;

    @Autowired
    VideoService videoService;

    @RequestMapping(value = "/{query}", method = RequestMethod.GET)
    public ResponseEntity<?> searchVideosAndChannels(@PathVariable String query){

        ArrayList<VideoDTO> videos = videoService.searchVideos(query);
        ArrayList<ChannelDTO> channels = userService.searchUsers(query);

        if(videos == null || channels == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{

            SearchResultDTO ret = new SearchResultDTO();
            ret.setChannels(channels);
            ret.setVideos(videos);

            return new ResponseEntity<>(ret, HttpStatus.OK);
        }

    }
}
