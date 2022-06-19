<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="rankingShow.css">
    <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div class="rankingbox">
        <span class="rankingtitle">랭킹</span>
    </div>
    <div class="ranking">
        <div style="text-align:left; margin-left : 420px; float:left;">
            <span class="rank_name">
            <?php
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
                    echo $re[0]."<br><br>";

                }
            ?>    
            </span>
        </div>

        <span class="rank_score">
        <?php
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
                    echo $re[1]."점<br><br>";

                }
            ?>  
        </span>
    </div>
</body>
</html>