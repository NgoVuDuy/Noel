<?php

$servername = "localhost"; // Tên máy chủ MySQL
$username = "root"; // Tên người dùng MySQL
$password = ""; // Mật khẩu MySQL
$dbname = "mydatabase"; // Tên cơ sở dữ liệu

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
}


$nameSend = $_POST['name-send'];
$classSend = $_POST['class-send'];
$shoolSend = $_POST['school-send'];
$SDTSend = $_POST['phone-send'];
$nameReceive = $_POST['name-receive'];
$shoolReceive = $_POST['school-receive'];
$SDTReceive = $_POST['phone-receive'];
$waySend = $_POST['way-send'];
$classReceive = $_POST['class-receive'];
$nd = $_POST['nd'];
 $giaithuong = $_POST['gift'];


$sql = "INSERT INTO Letter (NguoiGui,LopGui,TruongGui,SDTGui,NguoiNhan,LopNhan,TruongNhan,SDTNhan,CachNhan,TrungThuong,Noidung) VALUES ('$nameSend', '$classSend','$shoolSend','$SDTSend','$nameReceive','$classReceive','$shoolReceive','$SDTReceive','$waySend','$giaithuong','$nd')";
//$sql = "INSERT INTO Letter (TrungThuong) VALUES ('Gấu bông')";

if (mysqli_query($conn, $sql)) {
    echo "Dữ liệu đã được chèn thành công.";
} else {
    echo "Lỗi: " . $sql . "<br>" . mysqli_error($conn);
}

?>