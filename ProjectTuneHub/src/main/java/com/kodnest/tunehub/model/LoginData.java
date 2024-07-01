package com.kodnest.tunehub.model;
// model is used in order to transfer the data
public class LoginData {
	public String email;
	public String password;
	
	public LoginData() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "LoginData [email=" + email + ", password=" + password + "]";
	}
	
	
	
	

}
