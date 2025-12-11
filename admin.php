<?php
include 'koneksi.php';

if (isset($_GET['delete_id'])) {
    $id = $_GET['delete_id'];
    $stmt = $conn->prepare("DELETE FROM bookings WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        header("Location: admin.php?msg=Data berhasil dihapus!");
    } else {
        header("Location: admin.php?msg=Gagal menghapus data.");
    }
    $stmt->close();
}

$search_query = "";
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search = $_GET['search'];
       $search_query = "WHERE client_name LIKE '%" . mysqli_real_escape_string($conn, $search) . "%' OR service LIKE '%" . mysqli_real_escape_string($conn, $search) . "%'";
}

$sql = "SELECT * FROM bookings " . $search_query . " ORDER BY booking_date DESC";
$result = mysqli_query($conn, $sql);
?>