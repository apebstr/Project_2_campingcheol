package com.admin.campingcheol.members.service;

import com.admin.campingcheol.members.dto.AdminDTO;

public interface MembersService {

	//회원가입(POST)
	public void insertAdminProcess(AdminDTO dto);

	//아이디 중복체크(POST)
	//public int idCheckProcess(String userID);
	
	//회원정보 조회(GET)
//	public MembersDTO updateMemberProcess(String memberEmail);
//	
//	//회원정보 수정(POST)
//	public AuthInfo updateMemberProcess(MembersDTO dto);
//	
//	//비밀번호 변경시 사용
//	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd);
	
}//interface MembersService 
