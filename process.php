<?php

    $to = "katmerayt@yahoo.com";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['name'];
	$subject = $_REQUEST['subject'];
    $headers = "From: $from";
    

    $fields = array();
    $fields{"name"} = "Name";
    $fields{"email"} = "E-mail";
    $fields{"subject"} = "Subject";
    $fields{"message"} = "Message";

    $body = "Here is the message from yourwebsite:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

    $send = mail($to, $subject, $body, $headers);

?>
