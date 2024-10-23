// src/components/GuestForm.js
import React, { useState } from 'react';

function GuestForm({ addGuest }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && message) {
            addGuest({ name, message });
            setName('');
            setMessage('');
        } else {
            alert('Nama dan pesan wajib diisi!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Pesan"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type="submit">Tambah Tamu</button>
        </form>
    );
}

export default GuestForm;
