package com.admin.campingcheol.members.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.admin.campingcheol.members.dto.AdminDTO;
import com.admin.campingcheol.members.service.MembersService;

//@CrossOrigin(origins={"http://localhost:3000"})
@CrossOrigin("*")

@RestController
public class MembersController {

	@Autowired
	private MembersService membersService;
	
	@Autowired
	private BCryptPasswordEncoder encodePassword;

	public MembersController() {
		// TODO Auto-generated constructor stub
	}

	//관리자 회원가입 처리 (sql developer말고 postman으로 회원생성하세요!!!)
	//http://localhost:8090/admin/signup
	//{ "adminID" : "admin", "adminPass" : "aaa", "adminName" : "관리자" }
	@PostMapping("/admin/signup")
	public String insertAdmin(@RequestBody AdminDTO adminDTO) {
		adminDTO.setAdminPass(encodePassword.encode(adminDTO.getAdminPass()));
		membersService.insertAdminProcess(adminDTO);
		return "회원가입 성공!";
	}//addMember

}//MembersController
