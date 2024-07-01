package com.kodnest.tunehub.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kodnest.tunehub.entity.Song;
import com.kodnest.tunehub.entity.User;
import com.kodnest.tunehub.model.PaymentDTO;
import com.kodnest.tunehub.serviceimpl.SongServiceImpl;
import com.kodnest.tunehub.serviceimpl.UserServiceImpl;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class PaymentController {
	@Autowired
	UserServiceImpl userServiceImpl;

	@Autowired
	SongServiceImpl songServiceImpl;

	@GetMapping("/pay")
	public String pay() {
		return "pay";
	}

	@SuppressWarnings("finally")
	@PostMapping("/createOrder")
	@ResponseBody
	public String createOrder(HttpSession session) {
		String email = (String) session.getAttribute("email");
		if(email==null) {
			return "user has not logged in";
		}
		int  amount  = 199;
		Order order=null;
		try {
			RazorpayClient razorpay=new RazorpayClient("rzp_test_XEpO7zQzzsnXb3" , "0ml0PuIh4HH1B3DPmX4vdlJq");

			JSONObject orderRequest = new JSONObject();
			orderRequest.put("amount", amount*100); // amount in the smallest currency unit
			orderRequest.put("currency", "INR");
			orderRequest.put("receipt", "order_rcptid_11");
			order = razorpay.orders.create(orderRequest);

		} catch (RazorpayException e) {
			e.printStackTrace();
		}
		finally {
			return order.toString();
		}
	}


	@PostMapping("/verify")
	@ResponseBody
	public boolean verifyPayment(@RequestBody PaymentDTO paymentDTO) {


		try {
			// Initialize Razorpay client with your API key and secret
			RazorpayClient razorpayClient = new RazorpayClient("rzp_test_XEpO7zQzzsnXb3", "0ml0PuIh4HH1B3DPmX4vdlJq");
			// Create a signature verification data string
			String verificationData = paymentDTO.getOrderId() + "|" + paymentDTO.getPaymentId();

			// Use Razorpay's utility function to verify the signature
			boolean isValidSignature = Utils.verifySignature(verificationData, paymentDTO.getSignature(), "0ml0PuIh4HH1B3DPmX4vdlJq");

			return isValidSignature;  //key value=signature
		} 

		catch (RazorpayException e) {
			e.printStackTrace();
			return false;
		}
	}



	@GetMapping("/payment-success")
	public String paymentSuccess(HttpSession session, Model model) {
		String email = (String) session.getAttribute("email");
		System.out.println(email);
		User user = userServiceImpl.getUser(email);
		user.setIspremium(true);
		userServiceImpl.updateUser(user);

		return "customerhome";


	}
	//payment-failure -> redirect to login 
	@GetMapping("/payment-failure")
	public String paymentFailure(){
		return "customerhome";
	}	

	@GetMapping("/premiumuser")
	public boolean premiumUser(HttpSession session) {
		String email = (String) session.getAttribute("email");
		User user = userServiceImpl.getUser(email);
		boolean premiemUser = user.getIspremium();
		return premiemUser;
	}

	@GetMapping("/premiumsongs")
	public List<Song> premiumUser() {
		List<Song> allSongs = songServiceImpl.fetchAllSongs();
		return allSongs;
	}	


}