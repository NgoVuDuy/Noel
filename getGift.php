<?php

$servername = "localhost"; // Tên máy chủ MySQL
$username = "root"; // Tên người dùng MySQL
$password = ""; // Mật khẩu MySQL
$dbname = "mydatabase"; // Tên cơ sở dữ liệu

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
}

$sql = "SELECT TrungThuong FROM Letter";

$data = mysqli_query($conn, $sql);

$Array = array();

while($row = mysqli_fetch_assoc($data)){
    $Array[] = $row;
}
echo json_encode($Array);


?>