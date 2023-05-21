package com.campingcheol.my.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.campingcheol.campSite.dto.CampRoomDTO;
import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.my.dao.CampcartDAO;
import com.campingcheol.my.dto.CampMyPageDTO;
import com.campingcheol.my.dto.MyPageDTO;
import com.campingcheol.prod.dto.ProdOrderDetailDTO;


@Repository
@Service
public class CampcartServiceImp implements CampcartService {

	@Autowired
	public CampcartDAO campcartDao;
	
	public CampcartServiceImp() {
		
	}

	

	@Override
	public int campLikeCountProcess(String userID) {
		return campcartDao.campLikeCount(userID);
	}


	@Override
	public List<CampRoomDTO> selectByCampProcess(CampMyPageDTO pv) {
		return campcartDao.selectByCamp(pv);
	}



	@Override
	public List<CampSiteDTO> listProcess(MyPageDTO pv) {
		return campcartDao.list(pv);
	}



	
	
	@Override
	public void deleteCartProcess(int campKeyNum) {
		campcartDao.deleteCart(campKeyNum);
		
	}
	
	///////////////////////////////////////////////////////////////

	@Override
	public int countByCampProcess(int userKeynum) {
		return campcartDao.countByCamp(userKeynum);
	}


	
	@Override
	public int prodOrderCountProcess(String userKeynum) {
		return campcartDao.prodOrderCount(userKeynum);
	}



	@Override
	public List<ProdOrderDetailDTO> selectByProdProcess(MyPageDTO pv) {
		return campcartDao.selectByProd(pv);
	}



	








	
	

	

	

	
	
}
