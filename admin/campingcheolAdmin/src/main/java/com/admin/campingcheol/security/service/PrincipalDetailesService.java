package com.admin.campingcheol.security.service;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.admin.campingcheol.members.dao.MembersDAO;
import com.admin.campingcheol.members.dto.AdminDTO;



@Service
public class PrincipalDetailesService implements UserDetailsService{
	
	@Autowired
	private MembersDAO membersDAO;
	
	public PrincipalDetailesService() {

	}
	
	//1. AuthenticationProvider에서 loaduserByUsername(String username)을 호출한다.
	//2. loadUserByUsername(String username)에서는 DB에서 username에 해당하는 데이터를 검색해서 userDetails에 담아
	//3. AuthenticationProvider에서 UserDetailes받아서 Authentication에 저장을 함으로써 결국 Security Seission에 
	
	@Override
	public UserDetails loadUserByUsername(String adminID) throws UsernameNotFoundException {
		System.out.println("loadUserByusername : "+ adminID);
		
		AdminDTO userEntity = membersDAO.selectByAdminID(adminID);
		System.out.println("userEntity : "+ userEntity.getAdminName());
		
		if(userEntity == null) {
			throw new UsernameNotFoundException(adminID);
		}
		
		return new PrincipalDetails(userEntity);
	}//loadUserByUsername

}//class PrincipalDetailesService
