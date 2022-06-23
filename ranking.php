<?php
$url = "localhost";
$id = "baedalko";
$password="비밀번호";
$db = "baedalko";

$conn = mysqli_connect($url,$id,$password,$db);

if ( mysqli_connect_errno() ){echo "DB 연결에 실패했습니다 " . mysqli_connect_error();}
// 쿼리가 제대로 실행되었는지 확인

// html로부터 값 가져오기
$name = $_POST["username"];
$score = $_POST["score"];

if ( !mysqli_query ($conn,"insert into game(name, score) values('$name','$score')") ){echo("쿼리오류 발생: " . mysqli_error($conn));}





/*
$sql = "insert into game(name, socer) values('$name','$score')";
mysqli_query($conn,$sql);
mysqli_close($conn);
*/
?>

<meta http-equiv="refresh" content="1;url=rankingShow.php">