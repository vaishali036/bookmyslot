package com.stackroute.tagservice.service;

import com.stackroute.tagservice.enums.BookedStatus;
import com.stackroute.tagservice.model.Slot;
import java.util.List;

public interface SlotService {

    Slot bookSlot(Slot slot);

    List<Slot> getAllSlotsByInterviewerEmailId(String interviewerEmailId);

    List<Slot> getAllSlotsByTagEmailId(String bookedTagEmailId);

    Slot updateSlot(Slot slot);

    Slot deleteSlot(String bookedSlotId);

    long generateSequence(String seqName);

    List<Slot> getAllSlots();

    Slot updateSlotStatus(String slotId, Slot slot);

}
