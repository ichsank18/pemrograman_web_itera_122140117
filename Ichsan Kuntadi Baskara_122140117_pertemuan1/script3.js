function validasiForm(event) {
    event.preventDefault(); // Mencegah form submit

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    document.getElementById("error-nama").textContent = "";
    document.getElementById("error-email").textContent = "";
    document.getElementById("error-password").textContent = "";

    if (nama.length <= 3) {
        document.getElementById("error-nama").textContent = "Nama harus lebih dari 3 karakter.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("error-email").textContent = "Email tidak valid.";
        return;
    }

    if (password.length < 8) {
        document.getElementById("error-password").textContent = "Password harus minimal 8 karakter.";
        return;
    }

    alert("Form berhasil divalidasi dan siap disubmit!");
}

document.getElementById("form-validasi").addEventListener("submit", validasiForm);