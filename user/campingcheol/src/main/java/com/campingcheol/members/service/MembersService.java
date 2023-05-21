package com.campingcheol.members.service;

import com.campingcheol.members.dto.AuthInfo;
import com.campingcheol.members.dto.ChangePwdCommand;
import com.campingcheol.members.dto.MembersDTO;

public interface MembersService {

	//회원가입(POST)
	public void addMemberProcess(MembersDTO dto);

	//아이디 중복체크(POST)
	public int idCheckProcess(String userID);
	
	//닉네임 중복체크(POST)
	public int nickCheckProcess(String userNick);
	
	//회원정보 조회(GET)
//	public MembersDTO updateMemberProcess(String memberEmail);
//	
//	//회원정보 수정(POST)
//	public AuthInfo updateMemberProcess(MembersDTO dto);
//	
//	//비밀번호 변경시 사용
//	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd);
	
}//interface MembersService 
