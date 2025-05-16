# Konstanta
PI = 3.14159

# Fungsi Geometri
def luas_persegi(sisi):
    return sisi * sisi

def keliling_persegi(sisi):
    return 4 * sisi

def luas_persegi_panjang(panjang, lebar):
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    return 2 * (panjang + lebar)

def luas_lingkaran(radius):
    return PI * radius * radius

def keliling_lingkaran(radius):
    return 2 * PI * radius

# Fungsi Konversi Suhu
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def celsius_to_kelvin(celsius):
    return celsius + 273.15
