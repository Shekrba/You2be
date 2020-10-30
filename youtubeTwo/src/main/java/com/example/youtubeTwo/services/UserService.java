package com.example.youtubeTwo.services;

import com.example.youtubeTwo.dto.*;
import com.example.youtubeTwo.model.User;
import com.example.youtubeTwo.model.Video;
import com.example.youtubeTwo.repository.UserRepository;
import com.example.youtubeTwo.repository.VideoRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    VideoService videoService;

    public ArrayList<ChannelDTO> searchUsers(String query){
        ArrayList<ChannelDTO> ret = new ArrayList<>();
        ArrayList<User> searchedChannels = userRepository.searchByUsernameNameEmail(query);

        for (User u:searchedChannels) {
            ChannelDTO channelDTO = userToChannelDTO(u);
            ret.add(channelDTO);
        }

        return ret;
    }

    public SrcDTO upload(MultipartFile file) {

        //UPLOAD IMAGE TO FILE SYSTEM
        String fileName = file.getOriginalFilename();
        File dir = new File("C:/Users/praksa.1.ITENGINE/Documents/Milan Skrbic/youtubeTwo/src/main/resources/userImages");
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

        return ret;
    }

    public byte[] download(String src) throws IOException {

        InputStream in = new FileInputStream("C:/Users/praksa.1.ITENGINE/Documents/Milan Skrbic/youtubeTwo/src/main/resources/userImages/"+src);

        return IOUtils.toByteArray(in);
    }

    public ChannelDTO userToChannelDTO(User user){
        ChannelDTO dto = new ChannelDTO();

        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setNumOfSubs(user.getChannelSubscribers().size());
        dto.setUserImage(user.getImageSrc());

        return dto;
    }

    private ProfileDTO userToProfileDTO(User user){
        ProfileDTO dto = new ProfileDTO();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setNumOfSubs(user.getChannelSubscribers().size());
        dto.setUserImage(user.getImageSrc());
        dto.setVideos(new ArrayList<>());

        for(Video video:user.getVideos()){
            VideoDTO videoDTO = videoService.videoToDTO(video);
            dto.getVideos().add(videoDTO);
        }

        return dto;
    }

    public ProfileDTO getProfile(Long userId) {

        User user = userRepository.getOne(userId);

        if(user == null){
            return null;
        }

        return userToProfileDTO(user);
    }

    public ProfileDTO edit(EditProfileDTO editProfileDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        if(user==null){
            return null;
        }

        if(user.getId()!=editProfileDTO.getId()){
            return null;
        }

        user.setName(editProfileDTO.getName());
        user.setUsername(editProfileDTO.getUsername());
        user.setEmail(editProfileDTO.getEmail());

        user = userRepository.save(user);

        return userToProfileDTO(user);
    }
}
