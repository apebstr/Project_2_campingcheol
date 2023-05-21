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
public class CampSiteDTO {

	private int campKeyNum;
	private String campName;
	private String campImg;
	private String campDo;
	private String campSigun;
	private String campAddr;
	private String campTel;
	private String campLineIntro;
	private String campIntro;
	private String campEnv;
	private String campType;
	private String campFcity;
	private String campAvailable;
	private String campHomePage;
	private String campMapY;
	private String campMapX;
	private String campModdate;

	//상품관리페이지에서 사진첨부를 받아 처리해주는 멤버변수
	private MultipartFile imgname;

}
