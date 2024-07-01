package com.kodnest.tunehub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kodnest.tunehub.entity.Song;
import com.kodnest.tunehub.serviceimpl.SongServiceImpl;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@RestController
public class SongController {
	
	@Autowired
	SongServiceImpl songServiceImpl;
	
	@PostMapping("/addsong")
	public String addSong(@RequestBody Song song) {
		String name = song.getName();
		boolean songStatus = songServiceImpl.songExists(name);
		if (songStatus==false) {
			songServiceImpl.addSong(song);
			System.out.println("Song added successfully");
		}
		else {
			System.out.println("Song already exsits");
			return "songexists";
		}
		return "adminhome";
	}
	
//	 for admin
//	@GetMapping("/viewsongs")
//	public String viewSongs(Model model) {
//		List <Song> songList = songServiceImpl.fetchAllSongs();
//		model.addAttribute("songs", songList);
//		return "displaysongs";
//	}
	
	 @GetMapping("/viewsongs")
	    public @ResponseBody List<Song> viewSongs() {
	        return songServiceImpl.fetchAllSongs();
	    }
	
	//for customers
	@GetMapping("/playsongs")
	public String playSongs (Model model) {
		boolean premium = true;
		if(premium) {
		List <Song> songList = songServiceImpl.fetchAllSongs();
		model.addAttribute("songs", songList);
		return "displaysongs";
		}
		else {
			return "subscriptionform";
		}
	}
}
