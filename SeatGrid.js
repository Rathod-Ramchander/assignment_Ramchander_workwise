import React from 'react';
import Seat from './Seat';

export default function SeatGrid({ seats, booked, setBooked }) {
  const toggleSeat = (num) => {
    if (booked.includes(num)) {
      setBooked(booked.filter(n => n !== num));
    } else if (booked.length < 7) {
      setBooked([...booked, num]);
    } else {
      alert('Max 7 seats allowed.');
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2 max-w-md mx-auto mt-6">
      {seats.map((seat, i) => (
        <Seat
          key={i}
          number={seat.seat_number}
          isBooked={seat.status === 'booked'}
          isSelected={booked.includes(seat.seat_number)}
          onClick={() => !seat.status && toggleSeat(seat.seat_number)}
        />
      ))}
    </div>
  );
}
