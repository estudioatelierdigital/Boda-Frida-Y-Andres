/* 
  ========================================================================
  INSTRUCCIONES DE EDICIÓN RÁPIDA (JAVASCRIPT):
  - Fecha del evento: Modifica la constante 'eventDate' (formato ISO o compatible con Date).
  - Música de fondo: Controla la reproducción automática o manual con el botón flotante.
  - Formulario RSVP: Edita el número de WhatsApp ('whatsappNumber') para cambiar el destino de los mensajes.
  ========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. CONTROL DE APERTURA DEL SOBRE Y MÚSICA
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelopeContainer = document.getElementById('envelope-container');
    const openInvitationBtn = document.getElementById('open-invitation-btn');
    const mainContent = document.getElementById('main-content');
    const audioControl = document.getElementById('audio-control');
    const bgMusic = document.getElementById('bg-music');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const audioIcon = document.getElementById('audio-icon');

    let isPlaying = false;

    openInvitationBtn.addEventListener('click', () => {
        // Activar la animación de apertura del sobre
        envelopeContainer.classList.add('opening');
        mainContent.classList.remove('blurred');
        audioControl.classList.remove('hidden');

        // Reproducir música de fondo
        bgMusic.play().then(() => {
            isPlaying = true;
            audioIcon.className = "fa-solid fa-volume-high";
        }).catch(error => {
            console.log("Reproducción automática bloqueada por el navegador:", error);
            isPlaying = false;
            audioIcon.className = "fa-solid fa-volume-xmark";
        });

        // Ocultar por completo la capa del sobre después de que termine la animación (800ms)
        setTimeout(() => {
            envelopeOverlay.classList.add('hidden');
        }, 800);
    });

    // Control de reproducción manual flotante
    audioToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            audioIcon.className = "fa-solid fa-volume-xmark";
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
                audioIcon.className = "fa-solid fa-volume-high";
            }).catch(err => {
                console.log("Error al reproducir audio:", err);
            });
        }
    });


    // 2. CUENTA REGRESIVA DINÁMICA
    // Fecha de la boda: 16 de abril de 2027 a las 17:30 hrs
    const eventDate = new Date('2027-04-16T17:30:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            // Si la fecha ya pasó
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


    // 3. ENVÍO DE FORMULARIO RSVP POR WHATSAPP
    const rsvpForm = document.getElementById('rsvp-form');
    const whatsappNumber = "2211869156"; // Número oficial proporcionado en el brief

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guest-name').value.trim();
        const guestAttendance = document.getElementById('guest-attendance').value;
        const guestMessage = document.getElementById('guest-message').value.trim();

        // Construir mensaje estructurado para WhatsApp
        let message = `¡Hola! Confirmo los datos de asistencia para la boda de Frida & Andrés:\n\n`;
        message += `👤 *Nombre:* ${guestName}\n`;
        message += `✉️ *Respuesta:* ${guestAttendance}\n`;
        if (guestMessage) {
            message += `💬 *Mensaje:* ${guestMessage}\n`;
        }

        // Codificar URL para WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/52${whatsappNumber}?text=${encodedMessage}`;

        // Redirigir a WhatsApp
        window.open(whatsappURL, '_blank');
    });

});