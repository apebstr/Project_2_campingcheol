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
public class UserDropDTO {

	private String dropKeynum;
	private String userKeynum;
	private String userID;
	private String userName;
	private String userDropdate; //가입일
	
}
