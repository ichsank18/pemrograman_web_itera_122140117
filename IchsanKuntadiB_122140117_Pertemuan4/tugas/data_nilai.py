mahasiswa = [
    {"nama": "Ichsan", "nim": "122140117", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Kuntadi", "nim": "222140117", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
    {"nama": "Baskara", "nim": "322140117", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Abdullah", "nim": "422140117", "nilai_uts": 90, "nilai_uas": 92, "nilai_tugas": 88},
    {"nama": "Luqman", "nim": "522140117", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
]

# Hitung nilai akhir dan grade
for m in mahasiswa:
    nilai_akhir = 0.3 * m["nilai_uts"] + 0.4 * m["nilai_uas"] + 0.3 * m["nilai_tugas"]
    m["nilai_akhir"] = nilai_akhir
    if nilai_akhir >= 80:
        m["grade"] = "A"
    elif nilai_akhir >= 70:
        m["grade"] = "B"
    elif nilai_akhir >= 60:
        m["grade"] = "C"
    elif nilai_akhir >= 50:
        m["grade"] = "D"
    else:
        m["grade"] = "E"

# Tampilkan tabel
print("\nData Mahasiswa:")
print("="*57)
print(f"{'Nama':<10} {'NIM':<10} {'UTS':<5} {'UAS':<5} {'Tugas':<7} {'Akhir':<7} {'Grade':<5}")
print("="*57)
for m in mahasiswa:
    print(f"{m['nama']:<10} {m['nim']:<10} {m['nilai_uts']:<5} {m['nilai_uas']:<5} {m['nilai_tugas']:<7} {m['nilai_akhir']:<7.2f} {m['grade']:<5}")

# Cari mahasiswa dengan nilai tertinggi dan terendah
nilai_tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
nilai_terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])

print("\nMahasiswa dengan Nilai Tertinggi:")
print(f"{nilai_tertinggi['nama']} ({nilai_tertinggi['nim']}) - {nilai_tertinggi['nilai_akhir']:.2f}")

print("\nMahasiswa dengan Nilai Terendah:")
print(f"{nilai_terendah['nama']} ({nilai_terendah['nim']}) - {nilai_terendah['nilai_akhir']:.2f}")
