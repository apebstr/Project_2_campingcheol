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
public class ReservDTO {

	//예약정보 t2
    private String campReservNum; //예약번호
    private String campKeyNum; //캠핑장번호
    private String userKeyNum;  //유저번호
    private String campRoom;  //선택객실
    private String campRoomCount;  //객실갯수
    private String campReservStart;  //예약시작일
    private String campReservEnd;   //예약종료일
    private String campReservPerson;  //예약인원수
    private String campReservDate;  //예약일자 
    private String campReservCheck;  //결제여부 - 0결제완료, 1결제미확인
    
    //결제정보 t3
    private String campPayKeyNum;
    private String campPayment;  //결제수단
    private String campPayCheck;  //결제여부 - 0결제완료, 1결제미확인
    private String campPayAmt;  //결제금액

	//캠핑장정보 t4
    private String campName; //캠핑장이름
    
	//유저정보 t1
	private String userName;
	private String userPhone;
    
    
}
