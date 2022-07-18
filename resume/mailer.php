<?php
// echo 'hello world';

use PHPMailer\PHPMailer\PHPMailer;

require_once 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = 'smtp.gmail.com';
$mail->Port = '465';
$mail->isHTML();
$mail->Username = 'adam.m.leis@gmail.com';
$mail->Password = 'p@$$G00gl3';
$mail->setFrom('theodoreleis@gmail.com');
$mail->Subject = 'Testington';
$mail->Body = 'This is a test email from your son, Theo!';
$mail->send();