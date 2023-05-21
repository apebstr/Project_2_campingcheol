package com.admin.campingcheol.manage.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.UserDTO;
import com.admin.campingcheol.manage.dto.UserDropDTO;


@Mapper
@Repository
public interface UserDAO {
	
	////////////////////////////////////////////
	//회원관리
	public int count(Map<String, String> search); //전체 총 회원 조회+검색
	public List<UserDTO> listAllUser(PageDTO pv); //전체 회원 목록 조회+검색
	
	public int countDrop(); //전체 총 탈퇴회원
	public List<UserDropDTO> listAllDropUser(PageDTO pv); //전체 탈퇴회원 목록
	
	
	//회원탈퇴
	public void insertDropUser(String userKeynum); 
	public void UpdateDropUser(String userKeynum); 

	
}
