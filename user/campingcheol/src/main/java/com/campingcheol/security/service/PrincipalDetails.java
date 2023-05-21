package com.campingcheol.security.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.campingcheol.members.dto.MembersDTO;


public class PrincipalDetails implements UserDetails{
	
	@Autowired
	private MembersDTO membersDTO;
	
	
	public PrincipalDetails() {
		// TODO Auto-generated constructor stub
	}

	public PrincipalDetails(MembersDTO membersDTO) {
		this.membersDTO = membersDTO;
	}

	public MembersDTO getMembersDTO() {
		return membersDTO;
	}
	
	//권한 목록을 리턴
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Collection<GrantedAuthority> collect = new ArrayList<GrantedAuthority>();
		collect.add(new GrantedAuthority() {
			
			@Override
			public String getAuthority() {
				return membersDTO.getAuthRole();
			}
		});
		
		return collect;
	}//getAuthorities

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return membersDTO.getUserPass();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return membersDTO.getUserID();
	}
	
	
	//계정 만료여부 리턴 - true(계정유효) / false(계정만료)
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	//계정 잠김여부 리턴 - true(잠기지않음) / false(계정잠김)
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	//비밀번호 잠김여부 리턴 - true(잠기지않음)
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	//계정 활성화 여부 리턴 - true(활성화됨)
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}// class Principaldetails
