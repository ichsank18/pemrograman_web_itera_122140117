from abc import ABC, abstractmethod

# Abstract class
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title
        self._available = True

    @abstractmethod
    def display_info(self):
        pass

    @property
    def title(self):
        return self._title

    def is_match(self, keyword):
        return keyword.lower() in self._title.lower() or keyword.lower() in self._item_id.lower()

    def borrow(self):
        if self._available:
            self._available = False
            print(f"{self._title} berhasil dipinjam.")
        else:
            print(f"{self._title} sedang tidak tersedia.")

    def return_item(self):
        self._available = True
        print(f"{self._title} berhasil dikembalikan.")

# Subclass Book
class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author

    def display_info(self):
        print(f"[Book] ID: {self._item_id}, Title: {self._title}, Author: {self.__author}, Available: {self._available}")

# Subclass Magazine
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number

    def display_info(self):
        print(f"[Magazine] ID: {self._item_id}, Title: {self._title}, Issue: {self.__issue_number}, Available: {self._available}")

# Library class
class Library:
    def __init__(self):
        self.__collection = []

    def add_item(self, item):
        self.__collection.append(item)
        print(f"Item '{item.title}' ditambahkan ke perpustakaan.")

    def display_all_items(self):
        if not self.__collection:
            print("Belum ada item di perpustakaan.")
        else:
            print("\nDaftar Koleksi Perpustakaan:")
            for item in self.__collection:
                item.display_info()

    def search_item(self, keyword):
        print(f"\nHasil pencarian untuk: '{keyword}'")
        found = False
        for item in self.__collection:
            if item.is_match(keyword):
                item.display_info()
                found = True
        if not found:
            print("Item tidak ditemukan.")


# Menu interaktif
def main():
    library = Library()
    
    while True:
        print("\n--- Menu Perpustakaan ---")
        print("1. Tambah Item")
        print("2. Tampilkan Semua Item")
        print("3. Cari Item")
        print("4. Keluar")
        pilihan = input("Pilih menu (1/2/3/4): ")

        if pilihan == '1':
            tipe = input("Masukkan tipe item (book/magazine): ").lower()
            item_id = input("ID: ")
            title = input("Judul: ")
            if tipe == "book":
                author = input("Author: ")
                book = Book(item_id, title, author)
                library.add_item(book)
            elif tipe == "magazine":
                issue = input("Issue number: ")
                magazine = Magazine(item_id, title, issue)
                library.add_item(magazine)
            else:
                print("Tipe item tidak dikenal.")

        elif pilihan == '2':
            library.display_all_items()

        elif pilihan == '3':
            keyword = input("Masukkan judul atau ID untuk pencarian: ")
            library.search_item(keyword)

        elif pilihan == '4':
            print("Terima kasih telah menggunakan sistem perpustakaan.")
            break

        else:
            print("Pilihan tidak valid.")

if __name__ == "__main__":
    main()
