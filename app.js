// Inisialisasi koneksi ke server Socket.IO
const socket = io('https://tesbackend.onrender.com');

// 1. Event listener ketika berhasil terhubung
socket.on('connect', () => {
    console.log('Terhubung ke server Socket.IO!');
});

// 2. Event listener utama: "mendengarkan" pesan 'status_parkir'
socket.on('status_parkir', (data) => {
    console.log('Menerima data:', data);
    // Data yang diharapkan: { slotId: 'A1', status: 'penuh' }

    // 3. Cari elemen div berdasarkan ID yang dikirim server
    const slotElement = document.getElementById(data.slotId);

    // 4. Pastikan elemennya ada
    if (slotElement) {
        // 5. Ubah warnanya berdasarkan status
        if (data.status === 'penuh') {
            // Tambahkan class 'penuh' (yang merah)
            slotElement.classList.add('penuh');
        } else {
            // Hapus class 'penuh' (kembali ke hijau)
            slotElement.classList.remove('penuh');
        }
    }
});

// Opsional: Handle jika koneksi terputus
socket.on('disconnect', () => {
    console.log('Koneksi ke server terputus.');
});
