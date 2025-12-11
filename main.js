document.addEventListener('DOMContentLoaded', () => {
    const bookingList = document.getElementById('bookingList');
    const editModal = document.getElementById('editModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const saveEditButton = document.getElementById('saveEdit');

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [
        { id: 1, name: 'Adi Santoso', date: '2025-11-20', service: 'Potong Rambut', status: 'Confirmed' },
        { id: 2, name: 'Budi Raharjo', date: '2025-11-21', service: 'Spa & Pijat', status: 'Booked' },
        { id: 3, name: 'Citra Dewi', date: '2025-11-22', service: 'Manicure', status: 'Cancelled' }
    ];

    function saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    function renderBookings() {
        bookingList.innerHTML = '';
        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.name}</td>
                <td>${booking.date}</td>
                <td>${booking.service}</td>
                <td>${booking.status}</td>
                <td>
                    <button class="btn-edit" onclick="editBooking(${booking.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteBooking(${booking.id})">Hapus</button>
                </td>
            `;
            bookingList.appendChild(row);
        });
    }

        window.deleteBooking = function(id) {
        if (confirm('Anda yakin ingin menghapus booking ini?')) {
            bookings = bookings.filter(booking => booking.id !== id);
            saveBookings();
            renderBookings();
        }
    };

       window.editBooking = function(id) {
        const booking = bookings.find(b => b.id === id);
        if (booking) {
            document.getElementById('editBookingId').value = booking.id;
            document.getElementById('editName').value = booking.name;
            document.getElementById('editDate').value = booking.date;
            document.getElementById('editService').value = booking.service;
            document.getElementById('editStatus').value = booking.status;
            editModal.style.display = 'block';
        }
    };

   
    saveEditButton.onclick = function() {
        const id = parseInt(document.getElementById('editBookingId').value);
        const name = document.getElementById('editName').value;
        const date = document.getElementById('editDate').value;
        const service = document.getElementById('editService').value;
        const status = document.getElementById('editStatus').value;

        const bookingIndex = bookings.findIndex(b => b.id === id);
        if (bookingIndex > -1) {
            bookings[bookingIndex] = { id, name, date, service, status };
            saveBookings();
            renderBookings();
            editModal.style.display = 'none';
        }
    };

   
    closeModal.onclick = function() {
        editModal.style.display = 'none';
    };

   
    window.onclick = function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    };

    
    renderBookings();
});