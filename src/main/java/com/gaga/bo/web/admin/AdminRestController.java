package com.gaga.bo.web.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaga.bo.service.domain.User;

//@RestController
//@RequestMapping("/rest/admin")
public class AdminRestController {

    private final UserService userService;
    private final ReportService reportService;

    @Autowired
    public AdminRestController(UserService userService, ReportService reportService) {
        this.userService = userService;
        this.reportService = reportService;
    }

    // 사용자 정보 조회
    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable("userId") int userId) {
        return userService.getUser(userId);
    }

    // 사용자 블랙리스트 추가
    @PutMapping("/user/{userId}/blacklist")
    public void addBlacklist(@PathVariable("userId") int userId) {
        userService.addBlacklist(userId);
    }

    // 신고 당한 유저 조회
    @GetMapping("/user/reported")
    public List<User> getReportUser() {
        return reportService.getReportUser();
    }
}