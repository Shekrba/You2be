package com.example.youtubeTwo.controller;

import com.example.youtubeTwo.dto.*;
import com.example.youtubeTwo.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "/comment", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommentController {

    @Autowired
    CommentService commentService;

    @RequestMapping(value = "/{videoId}", method = RequestMethod.GET)
    public ResponseEntity<?> getTopLevelComments(@PathVariable Long videoId){
        ArrayList<CommentDTO> comments = commentService.getTopLevelComments(videoId);

        if(comments == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/reply/{parentId}", method = RequestMethod.GET)
    public ResponseEntity<?> getReplies(@PathVariable Long parentId){
        ArrayList<CommentDTO> comments = commentService.getReplies(parentId);

        if(comments == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }

    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addComment(@RequestBody AddCommentDTO addCommentDTO) {
        CommentDTO ret = commentService.addComment(addCommentDTO);

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/{commentId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        CommentDTO ret = commentService.deleteComment(commentId);

        if(ret == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(ret, HttpStatus.OK);
        }
    }
}
