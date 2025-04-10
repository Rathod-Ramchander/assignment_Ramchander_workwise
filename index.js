import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeatGrid from '../components/SeatGrid';

export default function Home() {
  const [seats, setSeats] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [booked, setBooked] = useState([]);
  const [token, setToken] = useState(null);

  const fetchSeats = async () => {
    const response = await axios.get('http://localhost:5000/api/seats');
    setSeats(response.data);
  };

  useEffect(() => {
    fetchSeats();
    setToken(localStorage.getItem('token'));
  }, []);

  const bookSeats = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/seats/book',
        { seats: booked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Seats booked successfully!');
      fetchSeats();
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed.');
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Train Ticket Booking</h1>
      <SeatGrid seats={seats} setBooked={setBooked} booked={booked} />
      <div className="mt-4 text-center">
        <button onClick={bookSeats} className="bg-blue-500 text-white p-2 rounded">Book</button>
      </div>
    </div>
  );
}
