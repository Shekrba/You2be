package com.example.youtubeTwo.services;

import com.example.youtubeTwo.dto.EditVideoDTO;
import com.example.youtubeTwo.dto.SrcDTO;
import com.example.youtubeTwo.dto.UploadVideoDTO;
import com.example.youtubeTwo.dto.VideoDTO;
import com.example.youtubeTwo.model.*;
import com.example.youtubeTwo.repository.UserRepository;
import com.example.youtubeTwo.repository.VideoRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.bytedeco.javacv.Frame;
import org.bytedeco.javacv.Java2DFrameConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.bytedeco.javacpp.opencv_core.IplImage;
import org.bytedeco.javacv.FFmpegFrameGrabber;
import org.bytedeco.javacv.FrameGrabber.Exception;

import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class VideoService {

    @Autowired
    VideoRepository videoRepository;

    @Autowired
    UserRepository userRepository;

    public SrcDTO upload(MultipartFile file) throws Exception {

        //UPLOAD VIDEO TO FILE SYSTEM
        String fileName = file.getOriginalFilename();
        File dir = new File("C:/Users/Shekrba/Documents/Projects/You2be/youtubeTwo/src/main/resources/videos");
        if (dir.isDirectory()) {
            try {
                File serverFile = new File(dir, fileName);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(file.getBytes());
                stream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        SrcDTO ret = new SrcDTO();
        ret.setSrc(fileName);

        String thumbnailName = fileName.split("\\.")[0] +".png";

        //THUMBNAIL
        Java2DFrameConverter bimConverter = new Java2DFrameConverter();
        FFmpegFrameGrabber frameGrabber = new FFmpegFrameGrabber("C:/Users/Shekrba/Documents/Projects/You2be/youtubeTwo/src/main/resources/videos/"+fileName);
        frameGrabber.start();
        Frame frame;

        try {
            frame = frameGrabber.grab();
            BufferedImage bi = bimConverter.convert(frame);
            ImageIO.write(bi,"png", new File("C:/Users/Shekrba/Documents/Projects/You2be/youtubeTwo/src/main/resources/thumbnails/"+thumbnailName));
            frameGrabber.stop();
        } catch (Exception e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ret;
    }

    public byte[] getThumbnail(String src) throws IOException {

        InputStream in = new FileInputStream("C:/Users/Shekrba/Documents/Projects/You2be/youtubeTwo/src/main/resources/thumbnails/"+src);

        return IOUtils.toByteArray(in);
    }

    public VideoDTO add(UploadVideoDTO uploadVideoDTO){

        //SAVE VIDEO IN DATABASE
        Video video = new Video();

        video.setTitle(uploadVideoDTO.getTitle());
        video.setDescription(uploadVideoDTO.getDescription());
        video.setUploadDate(new Date());
        video.setViews(0);
        video.setSrc(uploadVideoDTO.getSrc());
        video.setThumbnailSrc(uploadVideoDTO.getSrc().split("\\.")[0]+".png");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        if(user == null){
            return null;
        }

        video.setUser(user);
        video = videoRepository.save(video);

        user.getVideos().add(video);
        userRepository.save(user);

        VideoDTO ret = new VideoDTO();
        ret.setId(video.getId());
        ret.setDescription(video.getDescription());
        ret.setSrc(video.getSrc());
        ret.setTitle(video.getTitle());
        ret.setUploadDate(video.getUploadDate());
        ret.setViews(video.getViews());
        ret.setThumbnailSrc(video.getThumbnailSrc());

        return ret;
    }

    public ArrayList<VideoDTO> getMyVideos() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        ArrayList<Video> myVideos = videoRepository.findMyVideos(username);
        ArrayList<VideoDTO> myVideosDTO = new ArrayList<>();

        for (Video v: myVideos) {
            VideoDTO vDTO = videoToDTO(v);

            myVideosDTO.add(vDTO);
        }

        return myVideosDTO;
    }

    public VideoDTO getVideo(Long videoId) {

        Video video = videoRepository.getOne(videoId);

        if(video == null){
            return null;
        }

        video.setViews(video.getViews()+1);
        video = videoRepository.save(video);

        VideoDTO videoDTO = videoToDTO(video);

        return videoDTO;
    }

    public void setLikesDislikes(VideoDTO vDTO, Video v){

        int likes = 0;
        int dislikes = 0;

        for (Liking l:v.getLikings()) {

            if(l.getValue() == LikingValue.LIKE){
                likes = likes + 1;
            }
            else if(l.getValue() == LikingValue.DISLIKE){
                dislikes = dislikes + 1;
            }
        }

        vDTO.setLikes(likes);
        vDTO.setDislikes(dislikes);
    }

    public byte[] downloadVideo(String src) throws IOException {

        InputStream in = new FileInputStream("C:/Users/Shekrba/Documents/Projects/You2be/youtubeTwo/src/main/resources/videos/"+src);

        return IOUtils.toByteArray(in);
    }

    public ArrayList<VideoDTO> getAllVideos() {
        ArrayList<VideoDTO> ret = new ArrayList<>();
        ArrayList<Video> allVideos = videoRepository.findAll();

        for (Video video:allVideos) {
            VideoDTO videoDTO = videoToDTO(video);
            ret.add(videoDTO);
        }

        return ret;
    }

    public ArrayList<VideoDTO> searchVideos(String query){
        ArrayList<VideoDTO> ret = new ArrayList<>();
        ArrayList<Video> searchedVideos = videoRepository.searchByTitleDescUsername(query);

        for (Video video:searchedVideos) {
            VideoDTO videoDTO = videoToDTO(video);
            ret.add(videoDTO);
        }

        return ret;
    }

    public VideoDTO videoToDTO(Video video){
        VideoDTO videoDTO = new VideoDTO();

        videoDTO.setId(video.getId());
        videoDTO.setNumOfComments(video.getComments().size());
        setLikesDislikes(videoDTO,video);
        videoDTO.setDescription(video.getDescription());
        videoDTO.setSrc("http://localhost:8080/video/download/src/"+video.getSrc());
        videoDTO.setThumbnailSrc("http://localhost:8080/video/thumbnail/"+video.getThumbnailSrc());
        videoDTO.setUploadDate(video.getUploadDate());
        videoDTO.setViews(video.getViews());
        videoDTO.setTitle(video.getTitle());
        videoDTO.setNumOfSubscribers(video.getUser().getChannelSubscribers().size());
        videoDTO.setUploaderId(video.getUser().getId());
        videoDTO.setUploaderUsername(video.getUser().getUsername());
        videoDTO.setUserImage(video.getUser().getImageSrc());

        return videoDTO;
    }

    public VideoDTO deleteVideo(Long videoId) throws IOException {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        Video video = videoRepository.getOne(videoId);

        if(video==null || user==null){
            System.out.println("VIDEO OR USER IS NULL");
            return null;
        }

        if(video.getUser().getId() != user.getId()){
            System.out.println("VIDEO UPLOADER IS NOT LOGGED IN USER");
            return null;
        }

        VideoDTO videoDTO = videoToDTO(video);

        File file = new File("C:/Users/Shekrba/Documents/Projects/You2be/youtubeTwo/src/main/resources/videos/"+video.getSrc());

        if (file.exists()) {
            file.delete();
            videoRepository.delete(video);
            return videoDTO;
        } else {
            return null;
        }
    }

    public VideoDTO edit(EditVideoDTO editVideoDTO) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        if(user==null){
            return null;
        }

        Video video = videoRepository.getOne(editVideoDTO.getId());

        if(video == null){
            return null;
        }

        if(video.getUser().getId() != user.getId()){
            return null;
        }

        video.setTitle(editVideoDTO.getTitle());
        video.setDescription(editVideoDTO.getDescription());

        video = videoRepository.save(video);

        return videoToDTO(video);
    }
}
