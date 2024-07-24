package com.ssafy.foss.schedule.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MenteeScheduleResponse {
    private String day;
    private List<MentorInfoAndSchedule> mentors;

    @Data
    @AllArgsConstructor
    public static class MentorInfoAndSchedule {
        private Long scheduleId;
        private String time;
        private String mentorName;
        private String companyName;
        private String department;
        private String profileImg;
        private boolean isConfirmed;
        private int years;
    }
}
