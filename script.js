async function sendMessage() {

    const input = document.getElementById("message");
    const messages = document.getElementById("response");

    const userMessage = input.value.trim();

    if (!userMessage) return;

    messages.innerHTML += `
        <div class="user-message">
            ${userMessage}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        const data = await response.json();

        messages.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;

    } catch (error) {

        messages.innerHTML += `
            <div class="bot-message">
                Désolé, une erreur est survenue.
            </div>
        `;

    }

          }
