package com.admin.campingcheol.manage.service;

import java.util.List;
import java.util.Map;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.UserDTO;
import com.admin.campingcheol.manage.dto.UserDropDTO;

public interface UserService {
	
	////////////////////////////////////////////
	//회원관리
	public int countProcess(Map<String, String> search);	//총 회원 조회+검색
	public List<UserDTO> listAllUserProcess(PageDTO pv);	//전체 회원 조회+검색
	
	public int countDropProcess();	//총 탈퇴회원 조회
	public List<UserDropDTO> listAllDropUserProcess(PageDTO pv);	//전체 탈퇴회원 조회


	
	//회원탈퇴
	public void DropUserProcess(String userKeynum);

}