<?php
// 데이터베이스 연동
$url = "localhost";
$id = "root";
$password="111111";
$db = "bdk_db";

$conn = mysqli_connect($url,$id,$password,$db);

// 데이터베이스로부터 값 가져오기
$sql="select * from game order by score desc;";
$result=mysqli_query($conn,$sql);
$num=mysqli_num_rows($result);

for($i=0;$i<$num;$i++) {

    $re=mysqli_fetch_array($result);
    echo $re[0]."&nbsp;&nbsp;".$re[1]."<br/>";

}

?>