package com.example.youtubeTwo.services;

import com.example.youtubeTwo.dto.ChannelDTO;
import com.example.youtubeTwo.dto.SubscriptionDTO;
import com.example.youtubeTwo.dto.SubscriptionOverviewDTO;
import com.example.youtubeTwo.model.Subscription;
import com.example.youtubeTwo.model.User;
import com.example.youtubeTwo.repository.SubRepository;
import com.example.youtubeTwo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubService {

    @Autowired
    SubRepository subRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    public SubscriptionDTO subscribeToChennel(Long channelId) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User subscriber = userRepository.findOneByUsername(username);

        if(subscriber == null){
            return null;
        }

        User channel = userRepository.getOne(channelId);

        if(channel == null){
            return null;
        }

        if(subscriber.getId() == channelId){
            return null;
        }

        Subscription subscription = new Subscription();

        subscription.setChannel(channel);
        subscription.setFollower(subscriber);

        subscription = subRepository.save(subscription);

        channel.getChannelSubscribers().add(subscription);
        userRepository.save(channel);

        subscriber.getMySubscriptions().add(subscription);
        userRepository.save(subscriber);

        return subToDTO(subscription);
    }

    private SubscriptionDTO subToDTO(Subscription sub){
        SubscriptionDTO subDTO = new SubscriptionDTO();
        subDTO.setId(sub.getId());
        subDTO.setChannelId(sub.getChannel().getId());
        subDTO.setFollowerId(sub.getFollower().getId());

        return subDTO;
    }

    public SubscriptionDTO unsubscribeFromChennel(Long channelId) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User subscriber = userRepository.findOneByUsername(username);

        if(subscriber == null){
            return null;
        }

        User channel = userRepository.getOne(channelId);

        if(channel == null){
            return null;
        }

        Subscription sub = subRepository.findOneByChannelAndFollower(channel.getId(),subscriber.getId());

        if(sub == null){
            return null;
        }

        SubscriptionDTO ret = subToDTO(sub);

        subRepository.delete(sub);

        return ret;
    }

    public Boolean checkIfAlreadySubscribed(Long channelId){
        User channel = userRepository.getOne(channelId);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User subscriber = userRepository.findOneByUsername(username);

        if(channel == null || subscriber == null){
            return null;
        }

        Boolean ret = isAlreadySubscribed(channel.getChannelSubscribers(),subscriber.getId());

        return ret;
    }

    public boolean isAlreadySubscribed(final List<Subscription> list, final Long id){
        return list.stream().filter(o -> o.getFollower().getId().equals(id)).findFirst().isPresent();
    }

    public ArrayList<ChannelDTO> checkIfAlreadySubscribedGroup(ArrayList<ChannelDTO> channels) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User subscriber = userRepository.findOneByUsername(username);

        if(subscriber == null){
            return null;
        }

        for (ChannelDTO dto:channels) {
            User user = userRepository.getOne(dto.getId());
            if(user == null){
                return null;
            }

            dto.setAlreadySubscribed(isAlreadySubscribed(user.getChannelSubscribers(),subscriber.getId()));
        }

        return channels;
    }

    public SubscriptionOverviewDTO getSubs() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findOneByUsername(username);

        if(user == null){
            return null;
        }

        SubscriptionOverviewDTO ret = new SubscriptionOverviewDTO();
        ret.setMySubscriptions(new ArrayList<>());
        ret.setChannelSubs(new ArrayList<>());

        for (Subscription s : user.getMySubscriptions()) {
            ChannelDTO dto = userService.userToChannelDTO(s.getChannel());
            dto.setAlreadySubscribed(true);

            ret.getMySubscriptions().add(dto);
        }

        for (Subscription s : user.getChannelSubscribers()) {
            ChannelDTO dto = userService.userToChannelDTO(s.getFollower());
            dto.setAlreadySubscribed(isAlreadySubscribed(s.getFollower().getChannelSubscribers(),user.getId()));

            ret.getChannelSubs().add(dto);
        }

        return ret;
    }
}
