// src/components/GuestList.js
import React, { useState } from 'react';

function GuestList({ guests, updateGuest, deleteGuest }) {
    const [isEditing, setIsEditing] = useState(null); // Track guest ID being edited
    const [editData, setEditData] = useState({ name: '', message: '' }); // Track edit form

    // Handle edit mode
    const handleEdit = (guest) => {
        setIsEditing(guest.id);
        setEditData({ name: guest.name, message: guest.message });
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditData({ name: '', message: '' });
    };

    // Handle form submission for edit
    const handleSubmitEdit = (e) => {
        e.preventDefault();
        updateGuest(isEditing, editData);
        handleCancelEdit();
    };

    return (
        <ul>
            {guests.map((guest) => (
                <li key={guest.id}>
                    {isEditing === guest.id ? (
                        <form onSubmit={handleSubmitEdit}>
                            <input
                                type="text"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            />
                            <textarea
                                value={editData.message}
                                onChange={(e) => setEditData({ ...editData, message: e.target.value })}
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCancelEdit}>Cancel</button>
                        </form>
                    ) : (
                        <>
                            <strong>{guest.name}</strong>: {guest.message}
                            <small> ({new Date(guest.created_at).toLocaleString()})</small>
                            <button onClick={() => handleEdit(guest)}>Edit</button>
                            <button onClick={() => deleteGuest(guest.id)}>Delete</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default GuestList;
