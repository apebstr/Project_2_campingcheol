package com.admin.campingcheol.manage.service;

import java.util.List;
import java.util.Map;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.ProdDTO;

public interface ProdService {
	
	//캠핑용품관리////////////////////////////////////////////
	
	//캠핑용품 조회+검색
	public int searchProdCountProcess(Map<String, String> search);
	public List<ProdDTO> searchProdListProcess(PageDTO pv);
	
	public void insertProdProcess(ProdDTO dto); //상품추가
	
	public ProdDTO detailProdProcess(String prodKeyNum);  //상품상세
	
	public void updateProdProcess(ProdDTO dto, String urlpath); //캠핑용품 수정
	
	public void deleteProdProcess(String prodKeyNum, String urlpath); //캠핑용품 삭제
	
	////////////////////////////////////////////
	//캠핑장관리
	public int countSiteProcess(Map<String, String> search);	//총 캠핑용품 조회
	public List<ProdDTO> listAllSiteProcess(PageDTO pv);	//전체 캠핑용품 조회
	
	public void deleteCampProcess(String campKeyNum); //캠핑장 삭제
}
