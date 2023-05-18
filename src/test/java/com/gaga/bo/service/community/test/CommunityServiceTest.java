package com.gaga.bo.service.community.test;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;

import com.gaga.bo.service.community.CommunityService;
import com.gaga.bo.service.domain.Report;

@SpringBootTest
class CommunityServiceTest {

	///field
	@Autowired
	@Qualifier("communityServiceImpl")
	CommunityService communityService;
	
	@Test
	public void testAddReport() {
		Report report = new Report();
		
	    report.setReportingNo(1);
	    report.setReportedNo(2);
	    report.setReportCategoryNo(1);
	    report.setReportContent("This is a report.");
	    report.setReportDate(LocalDateTime.now());
	    report.setReportImg("report_img1.jpg");
	    report.setReportImg2("report_img2.jpg");
	    report.setReportImg3("report_img3.jpg");
		
	    communityService.addReport(report);
	}

}
