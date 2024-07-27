<?php
// Criar ou abrir o banco de dados SQLite
$db = new PDO('sqlite:confirmations.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Criar a tabela de confirmações se ela não existir
$query = "CREATE TABLE IF NOT EXISTS confirmations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    attendance TEXT NOT NULL
)";
$db->exec($query);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Conectar ao banco de dados SQLite
    $db = new PDO('sqlite:confirmations.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obter dados JSON enviados pelo fetch API
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar se os dados necessários estão presentes
    if (!empty($data['name']) && !empty($data['attendance'])) {
        $name = htmlspecialchars($data['name']);
        $attendance = htmlspecialchars($data['attendance']);

        // Preparar o comando SQL para inserção
        $stmt = $db->prepare("INSERT INTO confirmations (name, attendance) VALUES (?, ?)");
        $stmt->execute([$name, $attendance]);
        echo 'Resposta registrada!';
    } else {
        echo 'Dados incompletos!';
    }
} else {
    echo 'Método não permitido!';
}

$db = new PDO('sqlite:confirmations.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $db->query("SELECT name, attendance FROM confirmations");
$confirmations = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($confirmations as $confirmation) {
    echo htmlspecialchars($confirmation['name']) . " - " . htmlspecialchars($confirmation['attendance']) . "<br>";
}

?>
