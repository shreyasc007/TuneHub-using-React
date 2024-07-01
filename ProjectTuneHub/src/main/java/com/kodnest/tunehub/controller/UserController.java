package com.kodnest.tunehub.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kodnest.tunehub.entity.Song;
import com.kodnest.tunehub.entity.User;
import com.kodnest.tunehub.model.LoginData;
import com.kodnest.tunehub.serviceimpl.SongServiceImpl;
import com.kodnest.tunehub.serviceimpl.UserServiceImpl;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

@RestController
public class UserController {
	
	@Autowired
	UserServiceImpl userServiceImpl;
	
	@Autowired
	SongServiceImpl songServiceImpl;
	
	@PostMapping("/register")
	public String addUser(@RequestBody User user) {
		System.out.println(user.getUsername()+" "+user.getEmail()+" "+user.getPassword()+" "+user.getGender()+" "
	                           +user.getRole()+" "+user.getAddress());
		
		//email taken from the registration form
		String email = user.getEmail();
		
		//checking the entered mail in DB
		boolean status=userServiceImpl.emailExists(email);
		
		if (status == false) {
			userServiceImpl.addUser(user);
			System.out.println("User added");
		}
		
		else {
			System.out.println("User already exists");
			return "registration";
		}
		
		return "login";
	}
	
	@PostMapping("/validate")
	public String validate(@RequestBody LoginData loginData, HttpSession session, Model model){
		
		if(userServiceImpl.validateUser(loginData.getEmail(),loginData.getPassword())==true) {
			
			String role = userServiceImpl.getRole(loginData.getEmail());
			
			session.setAttribute("email", loginData.getEmail());
			System.out.println(loginData.getEmail());
			
			if(role.equals("admin")){
				System.out.println(loginData);
				return "adminhome";
			}
			
			else {
				System.out.println(loginData);
				User user = userServiceImpl.getUser(loginData.getEmail());
				boolean userStatus = user.getIspremium();
				model.addAttribute("isPremium", userStatus);
				
				List<Song> allSongs = songServiceImpl.fetchAllSongs();
				model.addAttribute("songs", allSongs);
				
				return "customerhome";
			}
		}
		
		else {
			return "login";
		}
		
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();//terminates the session
		return "login";
	}
	
	
	// 'ctrl shift o' for importing and removing the packages
}
