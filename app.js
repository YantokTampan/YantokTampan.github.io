// Inisialisasi koneksi ke server Socket.IO
const socket = io('https://tesbackend.onrender.com');

// 1. Event listener ketika berhasil terhubung
socket.on('connect', () => {
    console.log('Terhubung ke server Socket.IO!');
});

// 2. Event listener untuk menangani BATCH
// Nama event 'status_parkir_batch' harus cocok dengan server.py
socket.on('status_parkir_batch', (batchData) => {
    console.log('Menerima data batch:', batchData);
    // Data yang diharapkan: {'A1': 'penuh', 'A2': 'kosong', ...}

    // 3. Loop melalui setiap data di dalam objek batchData
    // 'slotId' akan berisi "A1", "A2", "B1", dst.
    for (const slotId in batchData) {
        
        // 'status' akan berisi "penuh" atau "kosong"
        const status = batchData[slotId];
        
        // Cari elemen div berdasarkan ID
        const slotElement = document.getElementById(slotId);

        // Pastikan elemennya ada
        if (slotElement) {
            // Ubah warnanya berdasarkan status
            if (status === 'penuh') {
                slotElement.classList.add('penuh');
            } else {
                slotElement.classList.remove('penuh');
            }
        }
    }
});


// Opsional: Handle jika koneksi terputus
socket.on('disconnect', () => {
    console.log('Koneksi ke server terputus.');
});
