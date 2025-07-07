document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = "";
    messageDiv.className = "";

    // Validate on client (optional, server will also validate)
    if (name.length < 2 || name.length > 32 || !/^[A-Za-z ]+$/.test(name)) {
      messageDiv.textContent = "Name must be 2-32 English letters.";
      messageDiv.className = "error";
      return;
    }
    if (!/^((\+380|0)\d{9})$/.test(phone)) {
      messageDiv.textContent = "Phone must be a valid Ukrainian number.";
      messageDiv.className = "error";
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      messageDiv.textContent = "Email is not valid.";
      messageDiv.className = "error";
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);

      const response = await fetch(
        "https://naturalhealth.asia/restapi/?apikey=hd63s9wju23q97sfo8213ihaflw9u903",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok || data.error) {
        // Error from server
        let errorMsg = "";
        if (data.error) {
          if (typeof data.error === "string") errorMsg = data.error;
          else if (typeof data.error === "object") {
            errorMsg = Object.values(data.error).join(" ");
          }
        } else {
          errorMsg = "Unknown error.";
        }
        messageDiv.textContent = errorMsg;
        messageDiv.className = "error";
      } else {
        messageDiv.textContent = "Form submitted successfully!";
        messageDiv.className = "success";
        document.getElementById("contactForm").reset();
      }
    } catch (err) {
      messageDiv.textContent = "Network or server error.";
      messageDiv.className = "error";
    }
  });
