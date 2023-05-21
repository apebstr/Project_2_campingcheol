package com.campingcheol.members.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
@Component
public class CheckDTO {

	private String userID;
	private String userNick;
	
	public CheckDTO() {
		// TODO Auto-generated constructor stub
	}
  
	

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}
	



	public String getUserNick() {
		return userNick;
	}



	public void setUserNick(String userNick) {
		this.userNick = userNick;
	}



	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}

}
