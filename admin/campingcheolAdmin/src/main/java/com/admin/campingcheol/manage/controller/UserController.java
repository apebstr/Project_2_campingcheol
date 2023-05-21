package com.admin.campingcheol.manage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.UserDTO;
import com.admin.campingcheol.manage.service.UserService;

//@CrossOrigin(origins={"http://localhost:3000"})
@CrossOrigin("*")

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private PageDTO pdto;

	private int currentPage;

	public UserController() {
		// TODO Auto-generated constructor stub
	}
 
	/////////////////////////////////////////////////////////
	//1. 회원관리
	//전체 회원 조회
	@GetMapping("/admin/user/userlist/{currentPage}")
	public Map<String, Object> selectAllUser(@RequestParam ("table") String table, @RequestParam ("searchKey") String searchKey, @RequestParam ("searchWord") String searchWord, @PathVariable("currentPage") int currentPage, PageDTO pv) {
		
		System.out.println("table : "+table); 
		System.out.println("searchKey : "+searchKey);
		System.out.println("searchWord : "+searchWord);
		
		Map<String, String> search = new HashMap<String, String>();
		search.put("table", table);
		search.put("searchKey", searchKey);
		search.put("searchWord", searchWord);
		
		
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = userService.countProcess(search);
		System.out.println(totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord, table, searchKey, searchWord);
			System.out.println("currentPage Check : "+currentPage);
			map.put("userList", userService.listAllUserProcess(this.pdto));
			map.put("pv", this.pdto);
		}

		return map; 
	}//selectAllUser
	
	//전체 탈퇴회원 조회
	@GetMapping("/admin/user/userdroplist/{currentPage}")
	public Map<String, Object> selectAllDropUser(@PathVariable("currentPage") int currentPage, PageDTO pv) {
		Map<String, Object> map = new  HashMap<>();
		int totalRecord = userService.countDropProcess();
		System.out.println(totalRecord);

		if(totalRecord>=1) {
			if(pv.getCurrentPage()==0)
				this.currentPage=currentPage;
			else
				this.currentPage = pv.getCurrentPage();

			this.pdto = new PageDTO(this.currentPage, totalRecord);
			System.out.println("currentPage Check : "+currentPage);
			map.put("userDropList", userService.listAllDropUserProcess(this.pdto));
			map.put("pv", this.pdto);
		}
		return map; 
	}//selectAllDropUser
	
	//회원탈퇴
	@PutMapping("/admin/user/updatedropuser/{userKeynum}")      
	public void updateExecute(@PathVariable("userKeynum") String userKeynum) {
		System.out.println(userKeynum);
		userService.DropUserProcess(userKeynum);
	}//updateExecute
	
	

	
}//end class