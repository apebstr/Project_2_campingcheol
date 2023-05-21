package com.campingcheol.campSite.dto;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class CampSitePageDTO {
	private int currentPage; // 현재페이지
	private int totalCount; // 총 레코드수
	private int blockCount = 10; // 한 페이지에 보여줄 레코드 수
	private int blockPage = 5; // 한 블록에 보여줄 페이지 수
	private int totalPage; // 총 페이지수
	private int startRow; // 시작 레코드 번호
	private int endRow; // 끝 레코드 번호
	private int startPage; // 한 블록의 시작 페이지 번호
	private int endPage; // 한 블록의 끝 페이지 번호
	private int number;


	private String searchWord;
	private String category;
	private String campDo;
	private String tags;
	private int tagKeynum;
	private int tagCount;
	private List<Integer> tagKeynumList;
	
	private int campKeyNum;
	
	

	public CampSitePageDTO() {
	}

	public CampSitePageDTO(int currentPage, int totalCount) {
		System.out.println(((currentPage - 1) * blockCount + 1));
		System.out.println("시작 페이지 : " + (startRow + blockCount - 1));
		
		this.currentPage = currentPage;
		this.totalCount = totalCount;
		
		// 총 페이지수
		totalPage = totalCount / blockCount + (totalCount % blockCount == 0 ? 0 : 1);
		if(totalPage<currentPage)
		  this.currentPage = totalPage;

		// 시작레코드
		this.startRow = (this.currentPage - 1) * blockCount + 1;
		// 끝레코드
		this.endRow = startRow + blockCount - 1;

		// 시작 페이지
		startPage = (int) ((this.currentPage - 1) / blockPage) * blockPage + 1;

		// 끝 페이지
		endPage = startPage + blockPage - 1;
		if (totalPage < endPage)
			endPage = totalPage;

		// 리스트에서에 출력번호
		number = totalCount - (this.currentPage - 1) * blockCount;
	}

	public CampSitePageDTO(int currentPage, int totalCount, String searchWord, String campDo) {
		this(currentPage, totalCount);

		this.searchWord = searchWord;
		this.campDo = campDo; 

	}
	
	public CampSitePageDTO(int currentPage, int totalCount, int campKeyNum) {
		
		this(currentPage, totalCount);

		this.campKeyNum = campKeyNum;
		System.out.println("캠프키넘:" + campKeyNum);
		System.out.println("페이징:" + currentPage);
		System.out.println("페이징2:" + totalCount);
		
		
		
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getBlockCount() {
		return blockCount;
	}

	public void setBlockCount(int blockCount) {
		this.blockCount = blockCount;
	}

	public int getBlockPage() {
		return blockPage;
	}

	public void setBlockPage(int blockPage) {
		this.blockPage = blockPage;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getStartRow() {
		return startRow;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	public int getEndRow() {
		return endRow;
	}

	public void setEndRow(int endRow) {
		this.endRow = endRow;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}


	public String getSearchWord() {
		return searchWord;
	}

	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCampDo() {
		return campDo;
	}

	public void setCampDo(String campDo) {
		this.campDo = campDo;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public int getTagKeynum() {
		return tagKeynum;
	}

	public void setTagKeynum(int tagKeynum) {
		this.tagKeynum = tagKeynum;
	}

	public int getTagCount() {
		return tagCount;
	}

	public void setTagCount(int tagCount) {
		this.tagCount = tagCount;
	}

	public List<Integer> getTagKeynumList() {
		return tagKeynumList;
	}

	public void setTagKeynumList(List<Integer> tagKeynumList) {
		this.tagKeynumList = tagKeynumList;
	}

	public int getCampKeyNum() {
		return campKeyNum;
	}

	public void setCampKeyNum(int campKeyNum) {
		this.campKeyNum = campKeyNum;
	}

	
	
	
}
