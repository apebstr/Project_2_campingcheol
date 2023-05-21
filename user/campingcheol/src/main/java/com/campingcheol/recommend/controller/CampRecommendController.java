package com.campingcheol.recommend.controller;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.campingcheol.campSite.dto.CampSiteDTO;
import com.campingcheol.prod.dto.ProdDTO;
import com.campingcheol.recommend.service.CampRecommendService;

//@CrossOrigin("*")
@RestController
public class CampRecommendController {

	@Autowired
	private CampRecommendService campRecommendService;
	private static final Map<String, String> CACHE = new HashMap<>();

	public CampRecommendController() {

	}

	//http://localhost:5000/camprecommendation?campKeyNum=23
	@GetMapping("/camprecommendation/{userKeyNum}")
	public Map<String, Object> getRecommendedCamps(@PathVariable("userKeyNum")String userKeyNum ) {
		Map<String, Object> map = new  HashMap<>();

		CloseableHttpClient httpClient = HttpClients.createDefault();
		//		String userKeyNumStr = String.valueOf(userKeyNum);
		String campKeyNum =  campRecommendService.getCampKeyNumProcess(userKeyNum);
		System.out.println(campKeyNum);


		if(userKeyNum==null || campKeyNum==null) {
			map.put("recommendList", campRecommendService.callTopCampSite());
			return map;

		}

		// 파이썬 작업 시작
		String result = "";
		if (CACHE.containsKey(campKeyNum)) {
			result = CACHE.get(campKeyNum);
			System.out.println("캐시된 결과: " + result);
		} else {
			try {
				URI uri = new URI("http://localhost:5000/camprecommendation?campKeyNum=" + campKeyNum);
				HttpGet httpGet = new HttpGet(uri);
				CloseableHttpResponse httpResponse = httpClient.execute(httpGet);
				String responseString = EntityUtils.toString(httpResponse.getEntity());
				System.out.println("API 결과: " + responseString);
				httpResponse.close();
				CACHE.put(campKeyNum, responseString);
				result = responseString;
			} catch (URISyntaxException e) {
				System.err.println("잘못된 URI 구문: " + e.getMessage());
			} catch (IOException e) {
				System.err.println("I/O 오류 발생: " + e.getMessage());
			}
		}

		String[] dataArray = result.replaceAll("\\s", "").replaceAll("[\\[\\]\"]", "").split(",");

		List<CampSiteDTO> reList = new ArrayList<CampSiteDTO>();

		for (int i = 0; i <= 9; i++) {
			int recommendCampkeynum = Integer.parseInt(dataArray[i]);

			CampSiteDTO getCampInfo = campRecommendService.campInfoProcess(recommendCampkeynum);

			if (getCampInfo != null) {
				reList.add(getCampInfo);
			}

		}

		map.put("recommendList", reList);
		map.put("recommendCheck", 2);


		return map;
	}


	//	최신순으로 상품 10개 가져오기 
	@GetMapping("/camprecommendation/prod")
	public List<ProdDTO> recentProdList(){

		return campRecommendService.callRecentProdList();
	}



}

