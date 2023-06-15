package com.gaga.bo.service.chatbot;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.gaga.bo.service.domain.Meeting;

@Mapper
public interface GagaMapper {
	
	@Select("SELECT * FROM Meeting WHERE meeting_name = #{title}")
    List<Meeting> findMeetingByTitle(String title);

    @Select("SELECT * FROM Meeting WHERE meeting_addr = #{addr}")
    List<Meeting> findMeetingByAddr(String addr);

    @Select("SELECT * FROM Meeting WHERE meeting_intro = #{intro}")
    List<Meeting> findMeetingByIntro(String intro);
}