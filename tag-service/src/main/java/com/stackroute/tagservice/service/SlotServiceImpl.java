package com.stackroute.tagservice.service;

import com.stackroute.tagservice.enums.BookedStatus;
import com.stackroute.tagservice.exception.InterviewerNotFoundException;
import com.stackroute.tagservice.exception.SlotNotFoundException;
import com.stackroute.tagservice.exception.TagMemberNotFoundException;
import com.stackroute.tagservice.model.DatabaseSequence;
import com.stackroute.tagservice.model.Slot;
import com.stackroute.tagservice.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.query.Query.query;
import java.util.Objects;
import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import org.springframework.data.mongodb.core.query.Update;
import static org.springframework.data.mongodb.core.query.Criteria.where;


import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SlotServiceImpl implements SlotService {

    @Autowired
    SlotRepository slotRepository;

    @Override
    public Slot bookSlot(Slot slot) {
        slot.setBookedStatus(BookedStatus.BOOKED);
        slot.setBookingTime(new Date(System.currentTimeMillis()));
        slot.setBookingDate(new Date(System.currentTimeMillis()));
        return slotRepository.save(slot);
    }

    @Override
    public List<Slot> getAllSlotsByInterviewerEmailId(String interviewerEmailId) {
        List<Slot> slots = slotRepository.findByInterviewerEmailId(interviewerEmailId);
        if(slots.isEmpty()){
            throw new InterviewerNotFoundException("Interviewer not exist with email id: "+interviewerEmailId);
        }
        else{
            return slots;
        }
    }

    @Override
    public List<Slot> getAllSlotsByTagEmailId(String bookedTagEmailId) {
        List<Slot> slots = slotRepository.findByBookedTagEmailId(bookedTagEmailId);
        if(slots.size()==0){
            throw new TagMemberNotFoundException("Interviewer not exist with email id: "+bookedTagEmailId);
        }
        else{
            return slots;
        }
    }

    @Override
    public Slot updateSlot(Slot slot) {
        try {
            Slot fetchedSlot = slotRepository.findByBookedSlotId(slot.getBookedSlotId());
            fetchedSlot.setBookedTagEmailId(slot.getBookedTagEmailId());
            fetchedSlot.setBookedTagName(slot.getBookedTagName());
            fetchedSlot.setInterviewerEmailId(slot.getInterviewerEmailId());
            fetchedSlot.setInterviewerName(slot.getInterviewerName());
            fetchedSlot.setInterviewTopic(slot.getInterviewTopic());
            fetchedSlot.setDescription(slot.getDescription());
            fetchedSlot.setTechTrack(slot.getTechTrack());
            fetchedSlot.setBookedStatus(slot.getBookedStatus());
            fetchedSlot.setBookingTime(new Date(System.currentTimeMillis()));
            fetchedSlot.setStartTime(slot.getStartTime());
            fetchedSlot.setEndTime(slot.getEndTime());
            fetchedSlot.setBookingDate(new Date(System.currentTimeMillis()));
            slotRepository.save(fetchedSlot);
            return fetchedSlot;

        } catch (Exception exception) {

            throw new SlotNotFoundException("slot does not exists with id: "+slot.getBookedSlotId());
        }
    }

    @Override
    public Slot deleteSlot(String bookedSlotId) {
        try {
            Slot slot = slotRepository.findByBookedSlotId(bookedSlotId);

            if (slot != null) {
                slotRepository.delete(slot);
                return slot;
            }else{
                throw new SlotNotFoundException("slot does not exists with id: "+bookedSlotId);
            }
        }catch (Exception exception){
            throw new SlotNotFoundException("slot does not exists with id: "+bookedSlotId);
        }
    }

    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    public SlotServiceImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public  long generateSequence(String seqName) {
        DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 10000;

    }

    @Override
    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    @Override
    public Slot updateSlotStatus(String slotId, Slot slot) {
        Slot slotFetched = slotRepository.findByBookedSlotId(slotId);
        if(slotFetched != null){
            slotFetched.setBookedStatus(slot.getBookedStatus());
            slotRepository.save(slotFetched);
            return slotFetched;
        }
        else{
            throw new SlotNotFoundException("Slot with id: "+slotId+" not found.");
        }
    }
}
