package com.example.youtubeTwo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String text;

    private Date createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Video video;

    @OneToMany(mappedBy = "parent",cascade = CascadeType.REMOVE)
    private List<Comment> children = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private Comment parent;
}
