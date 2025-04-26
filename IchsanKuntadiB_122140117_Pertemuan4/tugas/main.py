# Import seluruh modul
import math_operations

print("=== Geometri ===")
# Persegi
sisi = 4
print(f"Luas Persegi (sisi={sisi}): {math_operations.luas_persegi(sisi)}")
print(f"Keliling Persegi (sisi={sisi}): {math_operations.keliling_persegi(sisi)}")

# Persegi Panjang
panjang, lebar = 5, 3
print(f"Luas Persegi Panjang (p={panjang}, l={lebar}): {math_operations.luas_persegi_panjang(panjang, lebar)}")
print(f"Keliling Persegi Panjang (p={panjang}, l={lebar}): {math_operations.keliling_persegi_panjang(panjang, lebar)}")

# Lingkaran
radius = 7
print(f"Luas Lingkaran (r={radius}): {math_operations.luas_lingkaran(radius):.2f}")
print(f"Keliling Lingkaran (r={radius}): {math_operations.keliling_lingkaran(radius):.2f}")

print("\n=== Konversi Suhu ===")
celsius = 25
print(f"{celsius}°C ke Fahrenheit: {math_operations.celsius_to_fahrenheit(celsius):.2f}°F")
print(f"{celsius}°C ke Kelvin: {math_operations.celsius_to_kelvin(celsius):.2f}K")
