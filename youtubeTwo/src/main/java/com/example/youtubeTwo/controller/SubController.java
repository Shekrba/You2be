package com.example.youtubeTwo.controller;

import com.example.youtubeTwo.dto.*;
import com.example.youtubeTwo.model.Subscription;
import com.example.youtubeTwo.services.SubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "/sub", produces = MediaType.APPLICATION_JSON_VALUE)
public class SubController {

    @Autowired
    SubService subService;

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/{channelId}", method = RequestMethod.POST)
    public ResponseEntity<?> subscribeToChannel(@PathVariable Long channelId) {
        SubscriptionDTO subscriptionDTO = subService.subscribeToChennel(channelId);

        if(subscriptionDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(subscriptionDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/{channelId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> unsubscribeFromChannel(@PathVariable Long channelId) {
        SubscriptionDTO subscriptionDTO = subService.unsubscribeFromChennel(channelId);

        if(subscriptionDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(subscriptionDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/check/{channelId}", method = RequestMethod.GET)
    public ResponseEntity<?> checkIfAlreadySubscribed(@PathVariable Long channelId){
        Boolean ret = subService.checkIfAlreadySubscribed(channelId);

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }

    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getSubs(){
        SubscriptionOverviewDTO ret = subService.getSubs();

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }

    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public ResponseEntity<?> checkIfAlreadySubscribedGroup(@RequestBody ArrayList<ChannelDTO> channels){
        ArrayList<ChannelDTO> ret = subService.checkIfAlreadySubscribedGroup(channels);

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }

    }
}
