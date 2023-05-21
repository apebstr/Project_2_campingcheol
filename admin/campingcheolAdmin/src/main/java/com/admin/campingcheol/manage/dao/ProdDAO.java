package com.admin.campingcheol.manage.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.admin.campingcheol.common.page.PageDTO;
import com.admin.campingcheol.manage.dto.ProdDTO;


@Mapper
@Repository
public interface ProdDAO {
	
	/////캠핑용품//////////////////////////////////////////
	//캠핑용품 조회+검색
	public int searchProdCount(Map<String, String> search); 
	public List<ProdDTO> searchProdList(PageDTO pv);
	
	//상품 추가
	public void insertProd(ProdDTO dto);
	
	//상품 상세
	public ProdDTO detailProd(String prodKeyNum);
	
	//상품 수정
	public String getImg(String prodKeyNum); 
	public void updateProd(ProdDTO dto);
	
	//상품 삭제
	public void deleteProd(String prodKeyNum);

	/////캠핑장//////////////////////////////////////////////
	public int countSite(Map<String, String> search); //전체 총 상품
	public List<ProdDTO> listAllSite(PageDTO pv); //전체 상품 목록
	
	//캠핑장 삭제
	public void deleteCamp(String campKeyNum);
}
