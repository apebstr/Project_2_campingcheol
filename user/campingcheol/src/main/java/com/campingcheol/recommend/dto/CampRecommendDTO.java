package com.campingcheol.recommend.dto;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class CampRecommendDTO {

	private String campKeyNum;
	private String userKeyum;
	private String campPayCheck;

	
}
