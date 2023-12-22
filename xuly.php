<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
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
    $fbSend = $_POST['fb-send'];
    $nameReceive = $_POST['name-receive'];
    $shoolReceive = $_POST['school-receive'];
    $SDTReceive = $_POST['phone-receive'];
    $fbReceive = $_POST['fb-receive'];
    $waySend = $_POST['way'];
    $classReceive = $_POST['class-receive'];
    $nd = $_POST['nd'];
    $giaithuong = $_POST['gift'];


    $sql = "INSERT INTO Letter (NguoiGui,LopGui,TruongGui,SDTGui,FBGui,NguoiNhan,LopNhan,TruongNhan,SDTNhan,FBNhan,CachNhan,TrungThuong,Noidung) 

    VALUES ('$nameSend', '$classSend','$shoolSend','$SDTSend','$fbSend','$nameReceive','$classReceive','$shoolReceive','$SDTReceive','$fbReceive','$waySend','$giaithuong','$nd')";

    mysqli_query($conn, $sql)
    //$sql = "INSERT INTO Letter (TrungThuong) VALUES ('Gấu bông')";

    // if (mysqli_query($conn, $sql)) {
    //     echo "Dữ liệu đã được chèn thành công.";
    // } else {
    //     echo "Lỗi: " . $sql . "<br>" . mysqli_error($conn);
    // }

    ?>
    
</body>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="js/xuly.js"></script>
</html>

