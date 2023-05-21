package com.admin.campingcheol.members.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.campingcheol.members.dao.MembersDAO;
import com.admin.campingcheol.members.dto.AdminDTO;

@Service
public class MembersServiceImp implements MembersService{

	@Autowired
	private MembersDAO membersDao;
	
	public MembersServiceImp() {
		// TODO Auto-generated constructor stub
	}

	//회원가입
	@Override
	public void insertAdminProcess(AdminDTO dto) {
		membersDao.insertAdmin(dto);
	}

//	//아이디 중복체크
//	@Override
//	public int idCheckProcess(String userID) {
//		return membersDao.idCheck(userID);
//	}
	
	
//	@Override
//	public AuthInfo loginProcess(MembersDTO dto) {
//		MembersDTO member = membersDao.selectByUserKeynum(dto.getUserKeynum());
//		
//		if(member == null) {
//			System.out.println("회원이 아닙니다.");
//			throw new WrongEmailPasswordException();
//		}
//		
//		if(!member.matchPassword(dto.getUserPass())) {
//			System.out.printf("pass:%s, getpass:%s\n", member.getUserPass(), dto.getUserPass());
//			System.out.println("비밀번호가 다릅니다");
//			throw new WrongEmailPasswordException();
//		}
//		return new AuthInfo(member.getUserKeynum(), member.getMemberName(), member.getMemberPass());
//	}
//
//	@Override
//	public MembersDTO updateMemberProcess(String memberEmail) {
//		return membersDao.selectByEmail(memberEmail);
//	}
//
//	@Override
//	public AuthInfo updateMemberProcess(MembersDTO dto) {
//		membersDao.updateMember(dto);
//		MembersDTO member = membersDao.selectByEmail(dto.getMemberEmail());
//		return new AuthInfo(member.getMemberEmail(), member.getMemberName(), member.getMemberPass());
//	}
//
//	@Override
//	public void updatePassProcess(String memberEmail, ChangePwdCommand changePwd) {
//		MembersDTO member = membersDao.selectByEmail(memberEmail);
//		if(member==null)
//			throw new WrongEmailPasswordException();
//		
//		member.changePassword(changePwd.getCurrentPassword(), changePwd.getNewPassword());
//		membersDao.updateByPass(member);
//	}
//	
}//class MemberServiceImp
