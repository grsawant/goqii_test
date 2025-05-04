<?php 
try {
$db_name = "mysql:host=localhost;dbname=goqii_test;charset=utf8mb4";
$username = "goqii_test";
$password = "goqii_test@2025";
$pdo = new PDO($db_name,$username,$password);
} catch (PDOException $e) {
	echo "Error: ". $e->getMessage()."<br/>";
	die();
}
?>
