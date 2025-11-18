export interface AvailabilitySlot {
  /** ISO-дата слота, например '2025-11-27' */
  date: string;
  /** Время в локали пользователя, напр. '18:00' */
  time: string;
  /** серверный ключ слота, если нужен для брони */
  slotId?: string;
}

export interface AvailabilityDay {
  date: string;              // '2025-11-27'
  label: string;             // 'Сб 27' — для UI
  slots: AvailabilitySlot[]; // список слотов
}

export interface AvailabilityResponse {
  mentorId: number;
  timezone: string;         // напр. 'Europe/Moscow'
  days: AvailabilityDay[];
}

export interface CreateReservationBody {
  mentorId: number;
  slot: { date: string; time: string; slotId?: string };
}

export interface Reservation {
  id: string;
  mentorId: number;
  date: string;
  time: string;
  /** timestamp ISO до какого момента держим бронь */
  expiresAt: string;
}

export interface Step2Payload {
  selectedMentorId: number;
  /** echo текущего выбора пользователя для восстановления */
  slot?: { dateLabel: string; time: string } | null;
  /** серверная бронь, если уже создали */
  reservationId?: string;
}
