package com.campingcheol.prod.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;



@Component
public class ProdDTO {
	private int prodKeyNum;
	private String prodTitle;
	private String prodImage;
	private String prodPrice;
	private String prodCategory;
	private String prodStock;
	private String prodBrand;
	private String prodState;
	private int prodReadCount;
	private Date prodRegdate;

	public int getReviewCount() {
		return reviewCount;
	}



	public void setReviewCount(int reviewCount) {
		this.reviewCount = reviewCount;
	}



	public double getAvgRating() {
		return avgRating;
	}



	public void setAvgRating(double avgRating) {
		this.avgRating = avgRating;
	}



	private int prodCartCount;
	private int reviewCount;
	private double avgRating;


	private int userKeynum; //주문상세 넣으려고.. 

	public ProdDTO() {
		// TODO Auto-generated constructor stub
	}



	public ProdDTO(int prodKeyNum, String prodTitle, String prodImage, String prodPrice, String prodCategory,
			String prodStock, String prodBrand, String prodState, int prodReadCount, Date prodRegdate,
			int prodCartCount) {
		this.prodKeyNum = prodKeyNum;
		this.prodTitle = prodTitle;
		this.prodImage = prodImage;
		this.prodPrice = prodPrice;
		this.prodCategory = prodCategory;
		this.prodStock = prodStock;
		this.prodBrand = prodBrand;
		this.prodState = prodState;
		this.prodReadCount = prodReadCount;
		this.prodRegdate = prodRegdate;
		this.prodCartCount = prodCartCount;
	}

	public int getProdKeyNum() {
		return prodKeyNum;
	}


	public void setProdKeyNum(int prodKeyNum) {
		this.prodKeyNum = prodKeyNum;
	}


	public String getProdTitle() {
		return prodTitle;
	}


	public int getProdCartCount() {
		return prodCartCount;
	}


	public void setProdCartCount(int prodCartCount) {
		this.prodCartCount = prodCartCount;
	}


	public void setProdTitle(String prodTitle) {
		this.prodTitle = prodTitle;
	}


	public String getProdImage() {
		return prodImage;
	}


	public void setProdImage(String prodImage) {
		this.prodImage = prodImage;
	}


	public String getProdPrice() {
		return prodPrice;
	}


	public void setProdPrice(String prodPrice) {
		this.prodPrice = prodPrice;
	}


	public String getProdCategory() {
		return prodCategory;
	}


	public void setProdCategory(String prodCategory) {
		this.prodCategory = prodCategory;
	}


	public String getProdStock() {
		return prodStock;
	}


	public void setProdStock(String prodStock) {
		this.prodStock = prodStock;
	}


	public String getProdBrand() {
		return prodBrand;
	}


	public void setProdBrand(String prodBrand) {
		this.prodBrand = prodBrand;
	}


	public String getProdState() {
		return prodState;
	}


	public void setProdState(String prodState) {
		this.prodState = prodState;
	}


	public int getProdReadCount() {
		return prodReadCount;
	}


	public void setProdReadCount(int prodReadCount) {
		this.prodReadCount = prodReadCount;
	}


	public Date getProdRegdate() {
		return prodRegdate;
	}


	public void setProdRegdate(Date prodRegdate) {
		this.prodRegdate = prodRegdate;
	}



	public int getUserKeynum() {
		return userKeynum;
	}



	public void setUserKeynum(int userKeynum) {
		this.userKeynum = userKeynum;
	}



}
