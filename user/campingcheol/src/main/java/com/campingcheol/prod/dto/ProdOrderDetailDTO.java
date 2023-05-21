package com.campingcheol.prod.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;


@Component
public class ProdOrderDetailDTO {
	
	private int prodDetailNum;
	private int prodOrderNum;
	private int prodKeyNum;
	private int userKeynum;
	private int prodCartCount;
	private String prodOrderCheck;
	private String prodOrderMethod;
	private String prodpayAmt;
	private String prodPayCheck;
	private Date prodDate;
	private String whetherReview;
	
	
//	결제내역 출력을 위함 
	private String prodImage;
	private String prodTitle;
	
	
	
	public int getProdDetailNum() {
		return prodDetailNum;
	}
	public void setProdDetailNum(int prodDetailNum) {
		this.prodDetailNum = prodDetailNum;
	}
	public int getProdOrderNum() {
		return prodOrderNum;
	}
	public void setProdOrderNum(int prodOrderNum) {
		this.prodOrderNum = prodOrderNum;
	}
	public int getProdKeyNum() {
		return prodKeyNum;
	}
	public void setProdKeyNum(int prodKeyNum) {
		this.prodKeyNum = prodKeyNum;
	}
	public int getUserKeynum() {
		return userKeynum;
	}
	public void setUserKeynum(int userKeynum) {
		this.userKeynum = userKeynum;
	}

	public String getProdOrderCheck() {
		return prodOrderCheck;
	}
	public void setProdOrderCheck(String prodOrderCheck) {
		this.prodOrderCheck = prodOrderCheck;
	}
	public String getProdOrderMethod() {
		return prodOrderMethod;
	}
	public void setProdOrderMethod(String prodOrderMethod) {
		this.prodOrderMethod = prodOrderMethod;
	}
	public String getProdpayAmt() {
		return prodpayAmt;
	}
	public void setProdpayAmt(String prodpayAmt) {
		this.prodpayAmt = prodpayAmt;
	}
	public String getProdPayCheck() {
		return prodPayCheck;
	}
	public void setProdPayCheck(String prodPayCheck) {
		this.prodPayCheck = prodPayCheck;
	}
	public Date getProdDate() {
		return prodDate;
	}
	public void setProdDate(Date prodDate) {
		this.prodDate = prodDate;
	}
	public int getProdCartCount() {
		return prodCartCount;
	}
	public void setProdCartCount(int prodCartCount) {
		this.prodCartCount = prodCartCount;
	}
	public String getProdImage() {
		return prodImage;
	}
	public void setProdImage(String prodImage) {
		this.prodImage = prodImage;
	}
	public String getProdTitle() {
		return prodTitle;
	}
	public void setProdTitle(String prodTitle) {
		this.prodTitle = prodTitle;
	}
	public String getWhetherReview() {
		return whetherReview;
	}
	public void setWhetherReview(String whetherReview) {
		this.whetherReview = whetherReview;
	}

	
	
}
