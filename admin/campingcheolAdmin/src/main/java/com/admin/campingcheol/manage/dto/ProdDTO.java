package com.admin.campingcheol.manage.dto;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class ProdDTO {

	private String prodKeyNum;
	private String prodTitle;
	private String prodImage;
	private String prodPrice;
	private String prodCategory;
	private String prodStock;
	private String prodBrand;
	private String prodState;
	private int prodReadCount;
	private String prodRegdate;

	//상품관리페이지에서 사진첨부를 받아 처리해주는 멤버변수
	private MultipartFile imgname;
	
}
