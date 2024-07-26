document.getElementById('confirmButton').addEventListener('click', function() {
    let name = prompt("Por favor, digite seu nome para confirmar a presença:");
    if (name) {
        fetch('confirm.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, attendance: 'confirmed' })
        })
        .then(response => response.text())
        .then(data => {
            alert('Presença confirmada! Obrigado.');
        })
        .catch(error => {
            alert('Houve um erro ao confirmar sua presença. Tente novamente.');
        });
    }
});

document.getElementById('declineButton').addEventListener('click', function() {
    let name = prompt("Por favor, digite seu nome para declinar a presença:");
    if (name) {
        fetch('confirm.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, attendance: 'declined' })
        })
        .then(response => response.text())
        .then(data => {
            alert('Desculpe que você não poderá comparecer. Obrigado.');
        })
        .catch(error => {
            alert('Houve um erro ao registrar sua resposta. Tente novamente.');
        });
    }
});

function addEventToCalendar() {
    var event = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'URL:' + document.location.href,
        'DTSTART:20240824T190000', // Data e hora de início do evento (AAAA/MM/DDTHHMMSS)
        'DTEND:20240824T220000', // Data e hora de fim do evento (AAAA/MM/DDTHHMMSS)
        'SUMMARY:Formatura de Gabriele Martins Gonçalves',
        'DESCRIPTION:Confirme sua presença e ajude o anfitrião a organizar a festa.',
        'LOCATION:Centro Cultural Dr. Genésio Tureck, São Bento do Sul - SC',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    var blob = new Blob([event], {type: 'text/calendar;charset=utf-8'});
    var url = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.style.display = 'none';
    link.download = 'formatura.ics';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    document.getElementById('fetchConfirmations').addEventListener('click', function() {
        fetch('fetchConfirmations.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Isso é só para debug, você pode remover depois
            let resultSection = document.getElementById('resultSection');
            resultSection.innerHTML = '';
            data.forEach(item => {
                let p = document.createElement('p');
                p.textContent = `${item.name} - ${item.attendance}`;
                resultSection.appendChild(p);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar confirmações:', error);
        });
    });
    

};
