package com.campingcheol.members.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

//로그인 성공 후 인증 상태 정보를 '세션'에 보관할 때 사용
public class AuthInfo {

	private String userKeynum;
	private String userId;
	private String userPass;
	private String userName;
	
	public AuthInfo() {
		// TODO Auto-generated constructor stub
	}
	
	public AuthInfo(String userKeynum, String userId, String userPass, String userName) {
		super();
		this.userKeynum = userKeynum;
		this.userId = userId;
		this.userPass = userPass;
		this.userName = userName;
	}

	public AuthInfo(String userKeynum, String userId, String userPass) {
		this.userKeynum = userKeynum;
		this.userId = userId;
		this.userPass = userPass;
	}

	public String getUserKeynum() {
		return userKeynum;
	}

	public void setUserKeynum(String userKeynum) {
		this.userKeynum = userKeynum;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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
	
	
	
}//class AuthInfo
