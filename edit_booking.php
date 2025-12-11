<?php
include 'koneksi.php';

$id = null;
$booking = null;

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("SELECT * FROM bookings WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $booking = $result->fetch_assoc();
    } else {
        die("Data booking tidak ditemukan.");
    }
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update'])) {
    $id = $_POST['id'];
    $nama_pelanggan = $_POST['nama_pelanggan'];
    $email = $_POST['email'];
    $tanggal_booking = $_POST['tanggal_booking'];
    $waktu_booking = $_POST['waktu_booking'];
    $layanan = $_POST['layanan'];

    $stmt = $conn->prepare("UPDATE bookings SET nama_pelanggan=?, email=?, tanggal_booking=?, waktu_booking=?, layanan=? WHERE id=?");
    $stmt->bind_param("sssssi", $nama_pelanggan, $email, $tanggal_booking, $waktu_booking, $layanan, $id);
    
    if ($stmt->execute()) {
        header("Location: admin.php?status=updated"); 
        echo "Error updating record: " . $conn->error;
    }
    $stmt->close();
}

$conn->close();
?>