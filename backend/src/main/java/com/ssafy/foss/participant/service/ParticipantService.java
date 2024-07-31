package com.ssafy.foss.participant.service;

import com.ssafy.foss.participant.domain.Participant;
import com.ssafy.foss.meeting.domain.MeetingInfo;
import com.ssafy.foss.participant.repository.ParticipantRepository;
import com.ssafy.foss.meeting.repository.MeetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final MeetingRepository meetingRepository;

    public ParticipantService(ParticipantRepository participantRepository, MeetingRepository meetingRepository) {
        this.participantRepository = participantRepository;
        this.meetingRepository = meetingRepository;
    }

    public Participant createParticipant(Long meetingId, Participant participant) {
        MeetingInfo meeting = meetingRepository.findById(meetingId).orElse(null);
        if (meeting != null) {
            participant.setMeeting(meeting);
            return participantRepository.save(participant);
        }
        return null;
    }

    public List<Participant> getParticipantsByMeeting(String sessionId) {
        return participantRepository.findByMeetingSessionId(sessionId);
    }

    public Participant updateParticipant(Long id, Participant participantDetails) {
        return participantRepository.findById(id)
                .map(participant -> {
                    participant.setName(participantDetails.getName());
                    participant.setRole(participantDetails.getRole());
                    participant.setMuted(participantDetails.isMuted());
                    participant.setCameraOn(participantDetails.isCameraOn());
                    return participantRepository.save(participant);
                }).orElse(null);
    }

    public void deleteParticipant(Long id) {
        participantRepository.deleteById(id);
    }
}