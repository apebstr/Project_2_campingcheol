package com.admin.campingcheol.members.dto;

import org.springframework.stereotype.Component;

import com.admin.campingcheol.common.exception.WrongEmailPasswordException;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class AdminDTO {
	
	private String adminID;
	private String adminPass;
	private String adminName;
	
	private String authRole;
	
}//class MembersDTO
