<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!empty($data['name']) && !empty($data['attendance'])) {
        $name = htmlspecialchars($data['name']);
        $attendance = htmlspecialchars($data['attendance']);
        file_put_contents('confirmations.txt', $name . " - " . $attendance . PHP_EOL, FILE_APPEND);
        echo 'Resposta registrada!';
    } else {
        echo 'Dados incompletos!';
    }
} else {
    echo 'Método não permitido!';
}
?>
