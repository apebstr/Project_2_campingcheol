package com.campingcheol.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.campingcheol.campSite.dto.CampReviewDTO;
import com.campingcheol.members.dto.AuthInfo;
import com.campingcheol.members.dto.ChangePwdCommand;
import com.campingcheol.members.dto.MembersDTO;
import com.campingcheol.my.dao.MymyDAO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.notice.common.exception.WrongEmailPasswordException;
import com.campingcheol.prod.dto.ProdReviewDTO;



@Repository
@Service
public class MymyServiceImp implements MymyService {
	@Autowired
	public MymyDAO mymyDao;

	public MymyServiceImp() {

	}

	@Override
	public MembersDTO selectBynumProcess(String userKeynum) {

		return mymyDao.selectBynum(userKeynum);
	}

	@Override
	public MembersDTO updateUserProcess(String userKeynum) {
		 return mymyDao.selectBynum(userKeynum);
	}

	
	
	
	@Override
	public AuthInfo updateMemberProcess(MembersDTO dto) {
		mymyDao.updateUser(dto);
		MembersDTO member = mymyDao.selectBynum(dto.getUserKeynum());
		return new AuthInfo(member.getUserKeynum(), member.getUserPass(), member.getUserAddr());
		
	}

	
	@Override
	public void updatePassProcess(String userKeynum, ChangePwdCommand changePwd) {
		MembersDTO member = mymyDao.selectBynum(userKeynum);
		if(member == null)
			throw new WrongEmailPasswordException();
		
		member.changePassword(changePwd.getCurrentPassword(), changePwd.getNewPassword());
		
		mymyDao.updateByPass(member);
		
	}
	

	
	//회원탈퇴
	@Override
	public void DropUserProcess(String userKeynum) {
		mymyDao.insertDropUser(userKeynum);
		mymyDao.UpdateDropUser(userKeynum);
	}

	
	
   ////////////////////////////////////////////////////////////////////
	

	
	@Override
	public CampReviewDTO selectCKNProcess(int campRewNum) {
		return mymyDao.selectCKN(campRewNum);
	}

	
	
	
	@Override
	public void deleteCreviewProcess(int campRewNum) {
		mymyDao.deleteCreview(campRewNum);
		
	}

	@Override
	public void deletePreviewProcess(int prodReviewNum) {
		mymyDao.deletePreview(prodReviewNum);
		
	}

	@Override
	public void saveCampReviewProcess(CampReviewDTO rdto) {
		mymyDao.saveCampReview(rdto);
		
	}
	
	@Override
	public void campReviewTrueProcess(int campPayKeyNum) {
		mymyDao.campReviewTrue(campPayKeyNum);
		
	}

	@Override
	public void updateCampReviewProcess(CampReviewDTO rdto) {
		mymyDao.updateCampReview(rdto);
		
	}

	@Override
	public void updateProdReviewProcess(ProdReviewDTO pdto) {
		mymyDao.updateProdReview(pdto);
		
	}

	@Override
	public ProdReviewDTO selectPRNProcess(int prodReviewNum) {
		return mymyDao.selectPRN(prodReviewNum);
	}

	@Override
	public int countCreviewProcess(int userKeyNum) {
		return mymyDao.countCreview(userKeyNum);
	}

	@Override
	public List<CampReviewDTO> selectCreviewProcess(MyPageDTO pv) {
		return mymyDao.selectCreview(pv);
	}

	@Override
	public int countPreviewProcess(int userKeynum) {
		return mymyDao.countPreview(userKeynum);
	}

	@Override
	public List<ProdReviewDTO> selectPreviewProcess(MyPageDTO pv) {
	    return mymyDao.selectPreview(pv);
	}

	
	

	
	

	
	
	


}
