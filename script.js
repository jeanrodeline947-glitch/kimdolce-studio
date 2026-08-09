async function sendMessage() {
  const input = document.getElementById("message");
  const responseBox = document.getElementById("response");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: input.value
    })
  });

  const data = await response.json();
  responseBox.innerText = data.reply;
}
