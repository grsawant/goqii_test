<?php
include_once("db.php");

class User {
      public $id;
      public $name;
      public $email;
      public $password;
      public $dob;
}
//$contacts = $pdo->query( "SELECT * FROM User ORDER BY id DESC")->fetchAll(PDO::FETCH_CLASS, 'User');
//print_r($contacts);

header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
	    $stmt = $pdo->prepare("SELECT id,name,AES_DECRYPT(email,'user_email') as email,password,dob FROM User WHERE id=?");
	    $stmt->execute([$id]);
            $data = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($data);
        } else {
            $stmt = $pdo->query("SELECT id,name,AES_DECRYPT(email,'user_email') as email,password,dob FROM User");
            $users = $stmt->fetchAll(PDO::FETCH_CLASS);
            echo json_encode($users);
        }
        break;

    case 'POST':
        $name = $input['name'];
        $email = $input['email'];
        $dob = $input['dob'];
	$password = $input['password'];
	$stmt = $pdo->prepare("INSERT INTO User (name, email, dob,password) VALUES (?, AES_ENCRYPT(?,'user_email'), ?,SHA2(?,256))");
	$stmt->execute([$name,$email,$dob,$password]);
        echo json_encode(["message" => "User added successfully"]);
        break;

    case 'PUT':
        $id = $_GET['id'];
        $name = $input['name'];
        $email = $input['email'];
        $dob = $input['dob'];
        $password = $input['password'];
        $stmt = $pdo->prepare("UPDATE User SET name=?, email=AES_ENCRYPT(?,'user_email'), dob=? WHERE id=?");
	$stmt->execute([$name,$email,$dob,$id]);
        echo json_encode(["message" => "User updated successfully"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM User WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "User deleted successfully"]);
        break;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$pdo = null;
?>
