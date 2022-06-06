mysql> create table game(
    -> name varchar(30) not null,
    -> socre int(40)
    -> );
Query OK, 0 rows affected, 1 warning (0.07 sec)

mysql> desc game;
+-------+-------------+------+-----+---------+-------+
| Field | Type        | Null | Key | Default | Extra |
+-------+-------------+------+-----+---------+-------+
| name  | varchar(30) | NO   |     | NULL    |       |
| socre | int         | YES  |     | NULL    |       |
+-------+-------------+------+-----+---------+-------+
2 rows in set (0.00 sec)