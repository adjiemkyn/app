// src/App.js
import React, { useState, useEffect } from 'react';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';

function App() {
    const [guests, setGuests] = useState([]);

    // Fetch guests from the API
    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = () => {
        fetch('http://localhost:3000/api/guest')
            .then((response) => response.json())
            .then((data) => setGuests(data))
            .catch((error) => console.error('Error fetching guests:', error));
    };

    // Add new guest to the list
    const addGuest = (guest) => {
        fetch('http://localhost:3000/api/guest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guest),
        })
            .then((response) => response.json())
            .then((newGuest) => {
                setGuests([newGuest, ...guests]); // Add new guest to the top of the list
            })
            .catch((error) => console.error('Error adding guest:', error));
    };

    // Update guest by ID
    const updateGuest = (id, updatedGuest) => {
        fetch(`http://localhost:3000/api/guest/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedGuest),
        })
            .then((response) => response.json())
            .then(() => {
                setGuests(
                    guests.map((guest) => (guest.id === id ? { ...guest, ...updatedGuest } : guest))
                );
            })
            .catch((error) => console.error('Error updating guest:', error));
    };

    // Delete guest by ID
    const deleteGuest = (id) => {
        fetch(`http://localhost:3000/api/guest/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setGuests(guests.filter((guest) => guest.id !== id));
            })
            .catch((error) => console.error('Error deleting guest:', error));
    };

    return (
        <div className="App">
            <h1>Buku Tamu</h1>
            <GuestForm addGuest={addGuest} />
            <GuestList guests={guests} updateGuest={updateGuest} deleteGuest={deleteGuest} />
        </div>
    );
}

export default App;
