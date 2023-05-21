package com.admin.campingcheol.members.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.campingcheol.members.dto.AdminDTO;

@Mapper
@Repository
public interface MembersDAO {
	
	public void insertAdmin(AdminDTO dto);
	public AdminDTO selectByAdminID(String adminID);

}
