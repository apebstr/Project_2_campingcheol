package com.campingcheol.prod.dto;

import org.springframework.stereotype.Component;

@Component
public class ProdCartDTO {
   private int prodCartNum;
   private int prodKeyNum;
   private int userKeynum;
   private int prodCartCount;
   private String prodCartCheck;
   
   //장바구니에서 출력하기 위한 값들
   private String prodImage;
   private String prodPrice;
   private String prodTitle;
   
   //상품 구매불가 처리
   private String prodState;
   private int prodStock; 
   
   public ProdCartDTO() {
      // TODO Auto-generated constructor stub
   }

   public int getProdCartNum() {
      return prodCartNum;
   }

   public void setProdCartNum(int prodCartNum) {
      this.prodCartNum = prodCartNum;
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

   public int getProdCartCount() {
      return prodCartCount;
   }

   public void setProdCartCount(int prodCartCount) {
      this.prodCartCount = prodCartCount;
   }

   public String getProdCartCheck() {
      return prodCartCheck;
   }

   public void setProdCartCheck(String prodCartCheck) {
      this.prodCartCheck = prodCartCheck;
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
   
   public void setProdTitle(String prodTitle) {
      this.prodTitle = prodTitle;
   }
   public String getProdTitle() {
      return prodTitle;
   }

   public String getProdState() {
      return prodState;
   }

   public void setProdState(String prodState) {
      this.prodState = prodState;
   }

   public int getProdStock() {
      return prodStock;
   }

   public void setProdStock(int prodStock) {
      this.prodStock = prodStock;
   }
   
   
   
}