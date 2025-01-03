// Import library (module)
import { saveAs } from 'file-saver';

// Abstract Class
class AbstractForm {
    constructor(ownerName, petName, petType, service, date) {
        if (new.target === AbstractForm) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.ownerName = ownerName;
        this.petName = petName;
        this.petType = petType;
        this.service = service;
        this.date = date;
    }

    toJSON() {
        return JSON.stringify({
            ownerName: this.ownerName,
            petName: this.petName,
            petType: this.petType,
            service: this.service,
            date: this.date
        });
    }

    // Abstract method
    calculateCost() {
        throw new Error("Method 'calculateCost()' must be implemented.");
    }
}

// Inheritance and Polymorphism
class ConsultationForm extends AbstractForm {
    constructor(ownerName, petName, petType, service, date) {
        super(ownerName, petName, petType, service, date);
    }

    calculateCost() {
        const serviceCosts = {
            checkup: 100000,
            vaccination: 150000,
            grooming: 75000
        };
        return serviceCosts[this.service] || 0;
    }

    getDetails() {
        return `${this.ownerName} membawa ${this.petName} untuk layanan ${this.service} pada tanggal ${this.date}.`;
    }
}

// Interface Implementation (Simulation using class)
class Printable {
    print() {
        throw new Error("Method 'print()' must be implemented.");
    }
}

class DetailedForm extends ConsultationForm {
    constructor(ownerName, petName, petType, service, date) {
        super(ownerName, petName, petType, service, date);
    }

    print() {
        console.log(this.getDetails());
    }
}

// Overloading (Simulated in JavaScript by optional parameters)
function createForm(ownerName, petName, petType, service, date = new Date().toISOString().split('T')[0]) {
    return new DetailedForm(ownerName, petName, petType, service, date);
}

// Example Dictionary usage
const serviceDescriptions = {
    checkup: "Pemeriksaan kesehatan hewan secara rutin.",
    vaccination: "Pemberian vaksin untuk mencegah penyakit.",
    grooming: "Perawatan seperti mandi dan potong kuku."
};

document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const ownerName = document.getElementById("owner-name").value;
    const petName = document.getElementById("pet-name").value;
    const petType = document.getElementById("pet-type").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;

    if (!ownerName || !petName || !petType || !service || !date) {
        alert("Semua kolom harus diisi!");
        return;
    }

    const form = createForm(ownerName, petName, petType, service, date);

    // Save to Local Storage
    localStorage.setItem("formData", form.toJSON());
    alert("Data berhasil disimpan ke Local Storage!");

    // Print details
    form.print();

    // Save to file
    const blob = new Blob([form.toJSON()], { type: 'application/json' });
    saveAs(blob, 'registration-data.json');
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const downloadButton = document.getElementById("download-button");

    // Fungsi untuk mengunduh data
    function downloadFile(data, filename) {
        const blob = new Blob([data], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    // Event listener untuk tombol unduh
    downloadButton.addEventListener("click", () => {
        const ownerName = document.getElementById("owner-name").value;
        const petName = document.getElementById("pet-name").value;
        const petType = document.getElementById("pet-type").value;
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;

        if (!ownerName || !petName || !petType || !service || !date) {
            alert("Harap isi semua data sebelum mengunduh riwayat!");
            return;
        }

        const fileContent = `
            Riwayat Daftar Konsultasi
            ========================
            Nama Pemilik: ${ownerName}
            Nama Hewan  : ${petName}
            Jenis Hewan : ${petType}
            Layanan     : ${service}
            Tanggal     : ${date}
        `;

        downloadFile(fileContent, "riwayat_konsultasi.txt");
    });
});

// Menambahkan tombol unduh riwayat dan kembali ke menu awal
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("flex", "justify-center", "space-x-4", "mt-4");

// Tombol unduh riwayat
const downloadLink = document.createElement("button");
downloadLink.id = "download-button";
downloadLink.classList.add("bg-blue-600", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-blue-700");
downloadLink.textContent = "Unduh Riwayat";
buttonContainer.appendChild(downloadLink);

// Tombol kembali ke menu awal
const backToFormButton = document.createElement("button");
backToFormButton.classList.add("bg-gray-600", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-gray-700");
backToFormButton.textContent = "Kembali ke Menu Awal";
buttonContainer.appendChild(backToFormButton);

// Menambahkan button container ke successMessage
successMessage.appendChild(buttonContainer);

