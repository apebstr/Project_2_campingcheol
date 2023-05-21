package com.campingcheol.prod.dto;

import org.springframework.stereotype.Component;

@Component
public class ProdOrderDTO {

 	private int prodOrderNum;
 	private int userKeynum;
 	private String pOrderRecName;
 	private String pOrderRecAddr;
 	private String pOrderContact;
 	private String pOrderMessage;
 	
 	
 	
 	public ProdOrderDTO() {
		// TODO Auto-generated constructor stub
	}

	public int getProdOrderNum() {
		return prodOrderNum;
	}

	public void setProdOrderNum(int prodOrderNum) {
		this.prodOrderNum = prodOrderNum;
	}

	public int getUserKeynum() {
		return userKeynum;
	}

	public void setUserKeynum(int userKeynum) {
		this.userKeynum = userKeynum;
	}

	public String getpOrderRecName() {
		return pOrderRecName;
	}

	public void setpOrderRecName(String pOrderRecName) {
		this.pOrderRecName = pOrderRecName;
	}

	public String getpOrderRecAddr() {
		return pOrderRecAddr;
	}

	public void setpOrderRecAddr(String pOrderRecAddr) {
		this.pOrderRecAddr = pOrderRecAddr;
	}

	public String getpOrderContact() {
		return pOrderContact;
	}

	public void setpOrderContact(String pOrderContact) {
		this.pOrderContact = pOrderContact;
	}

	public String getpOrderMessage() {
		return pOrderMessage;
	}

	public void setpOrderMessage(String pOrderMessage) {
		this.pOrderMessage = pOrderMessage;
	}



}

