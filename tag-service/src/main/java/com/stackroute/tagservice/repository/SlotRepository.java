package com.stackroute.tagservice.repository;

import com.stackroute.tagservice.model.Slot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlotRepository extends MongoRepository<Slot, Long> {

    List<Slot> findByInterviewerEmailId(String interviewerEmailId);

    List<Slot> findByBookedTagEmailId(String bookedTagEmailId);

    Slot findByBookedSlotId(String bookedSlotId);
}
