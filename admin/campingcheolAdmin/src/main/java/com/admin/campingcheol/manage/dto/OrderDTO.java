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
public class OrderDTO {

	//주문
    private String prodOrderNum;
    private String userKeynum;
    private String pOrderRecName;
    private String pOrderRecAddr;
    private String pOrderContact;
    private String porderMessage;
    private String orderData;
    
    //주문상세
    private String prodDetailNum;
    private String prodKeyNum;
    private int prodCartCount; //구매수량
    private String prodOrderCheck;  //주문상태
    private String prodOrderMethod;  //결제방법
    private String prodpayAmt;  //결제금액
    private String prodPayCheck;  //결제여부
    private String prodDate;  //주문일자
    private String whetherReview; //리뷰작성여부
    
    //상품정보
	private String prodTitle;
	private String prodImage;
	private String prodPrice;
	private String prodCategory;
	private String prodStock;
	private String prodBrand;
	private String prodState;
	private int prodReadCount;
	private String prodRegdate;
	
	//유저정보
	private String userName;
	private String userID;
	
	//주문번호에 따른 정보
	private String totalProdCount; //주문상품 총 갯수
	private String totalPayAmt;  //주문상품 총 금액
	private int prodrm; //rownum
    
    
}
