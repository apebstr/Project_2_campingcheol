package com.admin.campingcheol.manage.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class UserDTO {

	private String userKeynum;
	private String userID;
	private String userPass;
	private String userName;
	private String userNick;
	private String userAddr;
	private String userPhone;
	private String userSex; //남자1 여자2
	private String userAge; //출생년도
	private String userRegdate; //가입일
	
	//탈퇴회원
	private String dropKeynum;
	private String userDropdate; //가입일
	
}
