package com.kodnest.tunehub.model;

import java.util.List;

public class PlaylistDTO {
    private String name;
    private List<Integer> songIds;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getSongIds() {
        return songIds;
    }

    public void setSongIds(List<Integer> songIds) {
        this.songIds = songIds;
    }
}



