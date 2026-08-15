import { useEffect, useState } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from "../firebase";


const DAY_START_MINUTES = 9 * 60; // 9:00 AM
const DAY_END_MINUTES = 17 * 60; // 5:00 PM
const SLOT_LENGTH_MINUTES = 30;

function buildSlotTemplate() {
  const slots = [];
  for (let m = DAY_START_MINUTES; m < DAY_END_MINUTES; m += SLOT_LENGTH_MINUTES) {
    const hours = Math.floor(m / 60);
    const minutes = m % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const label = `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
    slots.push({ id: `${hours}-${minutes}`, label });
  }
  return slots;
}

const SLOT_TEMPLATE = buildSlotTemplate();

/**
 * Live availability for a given date (format: "YYYY-MM-DD").
 * Reads/writes Firebase Realtime Database at bookings/{dateKey}/{slotId}.
 * Returns:
 *  - slots: [{ id, label, taken }]
 *  - loading
 *  - bookSlot(slotId, details) -> Promise<boolean> (false if someone beat you to it)
 */
export function useAvailability(dateKey) {
  const [bookedSlotIds, setBookedSlotIds] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dateKey) return;
    setLoading(true);
    const dateRef = ref(db, `bookings/${dateKey}`);

    const unsubscribe = onValue(dateRef, (snapshot) => {
      setBookedSlotIds(snapshot.val() || {});
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dateKey]);

  const slots = SLOT_TEMPLATE.map((slot) => ({
    ...slot,
    taken: Boolean(bookedSlotIds[slot.id]),
  }));

  // Uses a Firebase transaction so two simultaneous bookings can't both win the same slot:
  // returning `undefined` from the update function tells Firebase to abort without writing.
  async function bookSlot(slotId, details) {
    const slotRef = ref(db, `bookings/${dateKey}/${slotId}`);
    const result = await runTransaction(slotRef, (current) => {
      if (current) return undefined; // already taken - aborts transaction
      return { ...details, bookedAt: Date.now() };
    });
    return result.committed; 
  }

  return { slots, loading, bookSlot }; 
}