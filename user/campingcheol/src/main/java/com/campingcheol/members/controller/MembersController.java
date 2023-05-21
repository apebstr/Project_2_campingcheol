package com.campingcheol.members.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.campingcheol.members.dto.CheckDTO;
import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.members.service.MembersService;



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

	// http://localhost:8090/signup
	//회원가입 처리
	@PostMapping("/signup")
	public String addMember(@RequestBody MembersDTO membersDTO) {
		membersDTO.setUserPass(encodePassword.encode(membersDTO.getUserPass()));
		membersService.addMemberProcess(membersDTO);
		System.out.println(membersDTO.getUserID());
		return "회원가입 성공!";
	}//addMember
	
	//아이디 중복체크
	@PostMapping("/signup/idcheck")
	public int idCheck(@RequestBody CheckDTO checkDTO) {
		int idCheckCount = membersService.idCheckProcess(checkDTO.getUserID());
		System.out.printf("입력아이디 : %s / 조회갯수 : %d \n", checkDTO.getUserID(), idCheckCount);
		
		return idCheckCount;
	}//addMember
	
	
	//닉네임 중복체크
	@PostMapping("/signup/nickcheck")
	public int nickCheck(@RequestBody CheckDTO checkDTO) {
		int nickCheckCount = membersService.nickCheckProcess(checkDTO.getUserNick());
		System.out.printf("입력닉네임 : %s / 조회갯수 : %d \n", checkDTO.getUserNick(), nickCheckCount);
		
		return nickCheckCount;
	}//addMember

//	//회원정보 가져오기
//	@GetMapping("/member/editinfo/{memberEmail}")
//	public MembersDTO getMember(@PathVariable("memberEmail") String memberEmail) {
//		return membersService.updateMemberProcess(memberEmail);
//	}//getMember
//	
//	
//	//회원정보 수정
//	@PostMapping("/member/update")
//	public void updateMember(@RequestBody MembersDTO membersDTO) {
//		membersDTO.setMemberPass(encodePassword.encode(membersDTO.getMemberPass()));
//		membersService.updateMemberProcess(membersDTO);
//	}//updateMember
	


}//MembersController
