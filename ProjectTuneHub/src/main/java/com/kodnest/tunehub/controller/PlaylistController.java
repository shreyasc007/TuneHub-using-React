package com.kodnest.tunehub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.kodnest.tunehub.entity.Playlist;
import com.kodnest.tunehub.entity.Song;
import com.kodnest.tunehub.model.PlaylistDTO;
import com.kodnest.tunehub.serviceimpl.PlaylistServiceImpl;
import com.kodnest.tunehub.serviceimpl.SongServiceImpl;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@RestController
public class PlaylistController {
	
	@Autowired
	SongServiceImpl songServiceImpl;
	
	@Autowired
	PlaylistServiceImpl playlistServiceImpl;

	//model stores the list of songs coming from the db and render it back to the FE part
	@GetMapping("/createplaylists")
	public List<Song> createPlaylist(Model model) {
		List <Song> songList = songServiceImpl.fetchAllSongs();
		model.addAttribute("songs", songList);
		return songList;
	}
	
//	@PostMapping("/addplaylist")
//	public String addPlaylist(@RequestBody Playlist playlist) {
//		//updating the playlist table
//		
//		playlistServiceImpl.addPlaylist(playlist);
//		
//		//updating the song table
//		//based on M2M
//		List<Song> songList = playlist.getSongs();
//		for(Song s:songList) {
//			s.getPlaylists().add(playlist);//add=save()
//			songServiceImpl.updateSong(s);
//		}
//		return "adminhome";
//	}
	
	@PostMapping("/addplaylist")
    public String addPlaylist(@RequestBody PlaylistDTO playlistDTO) {
        Playlist playlist = convertToEntity(playlistDTO);
        playlistServiceImpl.addPlaylist(playlist);
        for (Song s : playlist.getSongs()) {
            s.getPlaylists().add(playlist);//add=save()
            songServiceImpl.updateSong(s);
        }
        return "adminhome";
    }
	
	private Playlist convertToEntity(PlaylistDTO playlistDTO) {
        Playlist playlist = new Playlist();
        playlist.setName(playlistDTO.getName());
        List<Song> songs = songServiceImpl.fetchAllSongsByIds(playlistDTO.getSongIds());
        playlist.setSongs(songs);
        return playlist;
    }
	
	@GetMapping("/viewplaylists")
	public List<Playlist> viewPlaylists(Model model) {
		List<Playlist> playlists = playlistServiceImpl.fetchAllPlaylist();
		model.addAttribute("playlist", playlists);
		return playlists;
		
	}
}
