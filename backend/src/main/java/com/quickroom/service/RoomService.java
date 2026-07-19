package com.quickroom.service;

import com.quickroom.dto.RoomDto;
import com.quickroom.model.Room;
import com.quickroom.model.User;
import com.quickroom.repository.RoomRepository;
import com.quickroom.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SecureRandom random = new SecureRandom();
    private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    public RoomService(RoomRepository roomRepository, UserRepository userRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public RoomDto createRoom(Long userId) {
        User creator = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String code = generateCode();
        while (roomRepository.existsByRoomCode(code)) {
            code = generateCode();
        }

        Room room = new Room();
        room.setRoomCode(code);
        room.setCreatedBy(creator);
        room.setParticipantOne(creator);
        room.setStatus("ACTIVE");

        roomRepository.save(room);
        return toDto(room);
    }

    public RoomDto joinRoom(Long userId, String roomCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findByRoomCode(roomCode.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Room not found!"));

        if (isInRoom(room, user)) {
            return toDto(room);
        }

        if (room.getParticipantOne() == null) {
            room.setParticipantOne(user);
        } else if (room.getParticipantTwo() == null) {
            room.setParticipantTwo(user);
            room.setStatus("FULL");
        } else {
            throw new RuntimeException("Room is full! Max 2 users.");
        }

        roomRepository.save(room);
        return toDto(room);
    }

    public boolean leaveRoom(Long userId, String roomCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findByRoomCode(roomCode.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Room not found!"));

        if (room.getParticipantOne() != null && room.getParticipantOne().getId().equals(user.getId())) {
            room.setParticipantOne(null);
        } else if (room.getParticipantTwo() != null && room.getParticipantTwo().getId().equals(user.getId())) {
            room.setParticipantTwo(null);
        }

        int count = getCount(room);
        if (count == 0) {
            roomRepository.delete(room);
            return true;
        }

        room.setStatus("ACTIVE");
        roomRepository.save(room);
        return false;
    }

    public RoomDto getRoom(String roomCode) {
        Room room = roomRepository.findByRoomCode(roomCode.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Room not found!"));
        return toDto(room);
    }

    private String generateCode() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
    }

    private boolean isInRoom(Room room, User user) {
        return (room.getParticipantOne() != null && room.getParticipantOne().getId().equals(user.getId())) ||
               (room.getParticipantTwo() != null && room.getParticipantTwo().getId().equals(user.getId()));
    }

    private int getCount(Room room) {
        int count = 0;
        if (room.getParticipantOne() != null) count++;
        if (room.getParticipantTwo() != null) count++;
        return count;
    }

    private RoomDto toDto(Room room) {
        RoomDto dto = new RoomDto();
        dto.setId(room.getId());
        dto.setRoomCode(room.getRoomCode());
        dto.setCreatedByName(room.getCreatedBy() != null ? room.getCreatedBy().getName() : null);
        dto.setParticipantOneName(room.getParticipantOne() != null ? room.getParticipantOne().getName() : null);
        dto.setParticipantTwoName(room.getParticipantTwo() != null ? room.getParticipantTwo().getName() : null);
        dto.setStatus(room.getStatus());
        dto.setParticipantCount(getCount(room));
        dto.setCreatedAt(room.getCreatedAt());
        return dto;
    }
}
