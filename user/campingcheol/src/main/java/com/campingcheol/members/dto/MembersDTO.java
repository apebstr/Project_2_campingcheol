package com.campingcheol.members.dto;

import org.springframework.stereotype.Component;

import com.campingcheol.common.exception.WrongEmailPasswordException;


@Component
public class MembersDTO {
	
	private String userKeynum;
	private String userID;
	private String userPass;
	private String userName;
	private String userNick;
	private String userAddr;
	private String userPhone;
	private String userSex; //남자1 여자2
	private String userAge;
	private String userRegdate; //가입일
	
	private String authRole;
	
	public MembersDTO() {
		// TODO Auto-generated constructor stub
	}
	

	public boolean matchPassword(String userPass) {
		return this.userPass.equals(userPass);
	}
	
	public void changePassword(String oldPassword, String newPassword) {
		if(!this.userPass.equals(oldPassword))
			throw new WrongEmailPasswordException();
		this.userPass = newPassword;
	}


	public String getUserKeynum() {
		return userKeynum;
	}


	public void setUserKeynum(String userKeynum) {
		this.userKeynum = userKeynum;
	}


	public String getUserID() {
		return userID;
	}


	public void setUserID(String userID) {
		this.userID = userID;
	}


	public String getUserPass() {
		return userPass;
	}


	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getUserNick() {
		return userNick;
	}


	public void setUserNick(String userNick) {
		this.userNick = userNick;
	}


	public String getUserAddr() {
		return userAddr;
	}


	public void setUserAddr(String userAddr) {
		this.userAddr = userAddr;
	}


	public String getUserPhone() {
		return userPhone;
	}


	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}





	public String getUserSex() {
		return userSex;
	}


	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}


	public String getUserAge() {
		return userAge;
	}


	public void setUserAge(String userAge) {
		this.userAge = userAge;
	}


	public String getUserRegdate() {
		return userRegdate;
	}


	public void setUserRegdate(String userRegdate) {
		this.userRegdate = userRegdate;
	}


	public String getAuthRole() {
		return authRole;
	}


	public void setAuthRole(String authRole) {
		this.authRole = authRole;
	}


	
	
}//class MembersDTO
