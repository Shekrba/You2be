package com.example.youtubeTwo.controller;

import com.example.youtubeTwo.dto.*;
import com.example.youtubeTwo.services.VideoService;
import org.bytedeco.javacv.FrameGrabber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import sun.nio.ch.IOUtil;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping(value = "/video", produces = MediaType.APPLICATION_JSON_VALUE)
public class VideoController {

    @Autowired
    VideoService videoService;

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws FrameGrabber.Exception {
        SrcDTO srcDTO = videoService.upload(file);

        if(srcDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(srcDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody UploadVideoDTO uploadVideoDTO) {
        VideoDTO videoDTO = videoService.add(uploadVideoDTO);

        if(videoDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(videoDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/my", method = RequestMethod.GET)
    public ResponseEntity<?> getMyVideos(){
        ArrayList<VideoDTO> list = videoService.getMyVideos();

        if(list == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/thumbnail/{src}", method = RequestMethod.GET)
    public @ResponseBody byte[] getThumbnail(@PathVariable String src) throws IOException {

        return videoService.getThumbnail(src);
    }

    @RequestMapping(value = "download/{videoId}", method = RequestMethod.GET)
    public ResponseEntity<?> getVideo(@PathVariable Long videoId){
        VideoDTO videoDTO = videoService.getVideo(videoId);

        if(videoDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(videoDTO, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/download/src/{src}", method = RequestMethod.GET)
    public @ResponseBody byte[] downloadVideo(@PathVariable String src) throws IOException {

        return videoService.downloadVideo(src);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllVideos(){
        ArrayList<VideoDTO> list = videoService.getAllVideos();

        if(list == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(list, HttpStatus.OK);
        }

    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/{videoId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteVideo(@PathVariable Long videoId) throws IOException {
        VideoDTO videoDTO = videoService.deleteVideo(videoId);

        if(videoDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(videoDTO, HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> edit(@RequestBody EditVideoDTO editVideoDTO) {
        VideoDTO videoDTO = videoService.edit(editVideoDTO);

        if(videoDTO == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            return new ResponseEntity<>(videoDTO, HttpStatus.OK);
        }
    }
}
