package com.admin.campingcheol.manage.service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dao.ProdDAO;
import com.admin.campingcheol.manage.dto.ProdDTO;

@Service
public class ProdServiceImp implements ProdService{

	@Autowired
	private ProdDAO prodDao;

	public ProdServiceImp() {
		// TODO Auto-generated constructor stub
	}

	
	////////////////////////////////////////////////
	//캠핑용품 조회+검색
	@Override
	public int searchProdCountProcess(Map<String, String> search) {
		return prodDao.searchProdCount(search);
	}
	@Override
	public List<ProdDTO> searchProdListProcess(PageDTO pv) {
		return prodDao.searchProdList(pv);
	}

	//상품상세
	public ProdDTO detailProdProcess(String prodKeyNum) {
		return prodDao.detailProd(prodKeyNum);
	}
	
	//상품추가
	@Override
	public void insertProdProcess(ProdDTO dto) {
		prodDao.insertProd(dto);
		
	}
	
	//상품수정
	@Override
	public void updateProdProcess(ProdDTO dto, String urlpath) {
		String filename = dto.getProdImage();
		System.out.println(filename);
		
		//수정할 첨부파일이 있으면 / DB에서 기존 첨부파일이 있는지 먼저 확인하기
		if(filename != null) {
			String path = prodDao.getImg(dto.getProdKeyNum());
			System.out.println(path);
			
			//기존 첨부파일이 있으면
			if(path != null) {
				if(!path.contains("https://")) {
					File file = new File(urlpath, path);
					file.delete();
				}
			}
		}
		prodDao.updateProd(dto);		
	}//updateProdImgProcess
	
	//캠핑용품삭제
	@Override
	public void deleteProdProcess(String prodKeyNum, String urlpath) {
		String path = prodDao.getImg(prodKeyNum);
		if(path!=null) {
			File file = new File(urlpath, path);
			file.delete();
		}
		prodDao.deleteProd(prodKeyNum);
	}
	

	
	////////////////////////////////////////////////
	//캠핑장 갯수
	@Override
	public int countSiteProcess(Map<String, String> search) {
		return prodDao.countSite(search);
	}

	//전체 캠핑장 리스트
	@Override
	public List<ProdDTO> listAllSiteProcess(PageDTO pv) {
		return prodDao.listAllSite(pv);
	}//listAllProdProcess

	
	//캠핑장 삭제
	@Override
	public void deleteCampProcess(String campKeyNum) {
		prodDao.deleteCamp(campKeyNum);
		
	}




}
