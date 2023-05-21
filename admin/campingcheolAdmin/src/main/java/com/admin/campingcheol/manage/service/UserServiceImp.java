package com.admin.campingcheol.manage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dao.UserDAO;
import com.admin.campingcheol.manage.dto.UserDTO;
import com.admin.campingcheol.manage.dto.UserDropDTO;

@Service
public class UserServiceImp implements UserService{
	
	@Autowired
	private UserDAO userDao;
	
	public UserServiceImp() {
		// TODO Auto-generated constructor stub
	}
	
	////////////////////////////////////////////
	//회원관리

	//총 회원 조회
	@Override
	public int countProcess(Map<String, String> search) {
		return userDao.count(search);
	}
	
	//전체 회원 조회
	@Override
	public List<UserDTO> listAllUserProcess(PageDTO pv) {
		return userDao.listAllUser(pv);
	}

	//총 탈퇴회원 조회
	@Override
	public int countDropProcess() {
		return userDao.countDrop();
	}

	//전체 탈퇴회원 조회
	@Override
	public List<UserDropDTO> listAllDropUserProcess(PageDTO pv) {
		return userDao.listAllDropUser(pv);
	}
	
	
	
	//회원탈퇴
	@Override
	public void DropUserProcess(String userKeynum) {
		userDao.insertDropUser(userKeynum);
		userDao.UpdateDropUser(userKeynum);
	}

	
	
}