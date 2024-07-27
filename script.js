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
}
    
document.getElementById('confirmButton').addEventListener('click', function() {
    // URL do formulário do Google Forms
    const googleFormsUrl = "https://forms.gle/zkY6nFgLTRqcieKT7";

    // Abrir o formulário em uma nova aba
    window.open(googleFormsUrl, '_blank');
});
