package com.gaga.bo.service.chatbot;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.gaga.bo.service.domain.Meeting;

@Service
public class GagaService {
    private final GagaMapper gagaMapper;

    public GagaService(GagaMapper gagaMapper) {
        this.gagaMapper = gagaMapper;
    }

    public List<Meeting> findMeeting(String title, String addr, String intro) {
        List<Meeting> titleMeetings = gagaMapper.findMeetingByTitle(title);
        List<Meeting> addrMeetings = gagaMapper.findMeetingByAddr(addr);
        List<Meeting> introMeetings = gagaMapper.findMeetingByIntro(intro);

        // 각 검색 결과를 합칩니다. (중복된 결과는 제거합니다.)
        Set<Meeting> meetings = new HashSet<>();
        meetings.addAll(titleMeetings);
        meetings.addAll(addrMeetings);
        meetings.addAll(introMeetings);

        return new ArrayList<>(meetings);
    }
    
    // 기타 메소드들...
}