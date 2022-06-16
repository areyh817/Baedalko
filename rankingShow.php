<?php
    // 데이터베이스 연동
    $url = "localhost";
    $id = "baedalko";
    $password="123456";
    $db = "bdk_db";

    $conn = mysqli_connect($url,$id,$password,$db);

    // 데이터베이스로부터 값 가져오기
    $sql="select * from game";
    $result=mysqli_query($conn,$sql);
    $num=mysqli_num_rows($result);

    for($i=0;$i<$num;$i++) {

        $re=mysqli_fetch_array($result);
        echo "이름 : ".$re[0]."   점수 : ".$re[1]."<br/>";

    }

?>