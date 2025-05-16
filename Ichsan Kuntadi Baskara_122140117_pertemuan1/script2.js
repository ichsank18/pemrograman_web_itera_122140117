function hitungKalkulator(angka1, angka2, operasi) {
    let hasil = 0;
    switch (operasi) {
        case "tambah":
            hasil = angka1 + angka2;
            break;
        case "kurang":
            hasil = angka1 - angka2;
            break;
        case "kali":
            hasil = angka1 * angka2;
            break;
        case "bagi":
            if (angka2 === 0) {
                return "Error: Pembagian dengan nol tidak diperbolehkan";
            }
            hasil = angka1 / angka2;
            break;
        case "pangkat":
            hasil = Math.pow(angka1, angka2);
            break;
        case "akar":
            if (angka1 < 0) {
                return "Error: Akar kuadrat dari bilangan negatif tidak diperbolehkan";
            }
            hasil = Math.sqrt(angka1);
            break;
        case "modulus":
            if (angka2 === 0) {
                return "Error: Modulus dengan nol tidak diperbolehkan";
            }
            hasil = angka1 % angka2;
            break;
        default:
            return "Operasi tidak valid";
    }
    return hasil;
}

function tampilkanHasil(angka1, angka2, operasi, simbol) {
    const hasilElement = document.getElementById("hasil-kalkulator");
    if (isNaN(angka1) || isNaN(angka2)) {
        hasilElement.innerHTML = `<p class="text-red-500">Masukkan angka yang valid!</p>`;
    } else {
        const hasil = hitungKalkulator(angka1, angka2, operasi);
        if (typeof hasil === "string") {
            hasilElement.innerHTML = `<p class="text-red-500">${hasil}</p>`;
        } else {
            hasilElement.innerHTML = `<p>Hasil: ${angka1} ${simbol} ${angka2} = ${hasil}</p>`;
        }
    }
}

document.getElementById("btn-tambah").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, "tambah", "+");
});

document.getElementById("btn-kurang").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, "kurang", "-");
});

document.getElementById("btn-kali").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, "kali", "×");
});

document.getElementById("btn-bagi").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, "bagi", "÷");
});

document.getElementById("btn-pangkat").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, "pangkat", "^");
});

document.getElementById("btn-akar").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = 0; // Tidak digunakan untuk akar kuadrat
    tampilkanHasil(angka1, angka2, "akar", "√");
});

document.getElementById("btn-modulus").addEventListener("click", function () {
    const angka1 = parseFloat(document.getElementById("angka1").value);
    const angka2 = parseFloat(document.getElementById("angka2").value);
    tampilkanHasil(angka1, angka2, "modulus", "%");
});