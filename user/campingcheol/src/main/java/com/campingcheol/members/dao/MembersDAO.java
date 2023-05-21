package com.campingcheol.members.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.campingcheol.members.dto.MembersDTO;


@Mapper
@Repository
public interface MembersDAO {

	public int insertMember(MembersDTO dto);
	public MembersDTO selectByUserID(String userID);
	
	public int idCheck(String userID);
	public int nickCheck(String userNick);
//	
//	public void updateMember(MembersDTO dto); //회원정보수정
//	public void updateByPass(MembersDTO dto); //비밀번호수정

	
}//interface MembersDAO
