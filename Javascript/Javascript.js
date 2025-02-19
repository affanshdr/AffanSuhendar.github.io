document.addEventListener("DOMContentLoaded", function() {
    
    // Fungsi untuk memunculkan section dengan transisi
    function showSection(section) {
        section.classList.add("visible");
    }

    // Fungsi untuk menyembunyikan section
    function hideSection(section) {
        section.classList.remove("visible");
    }

    // Fungsi Memunculkan kelas Active
    function showActive(aside) {
        aside.classList.add("Active")
    }

    // Fungsi Menghilangkan kelas Active
    function hideSection(aside) {
        aside.classList.remove("Active")
    }

    // Memunculkan section pertama saat halaman pertama kali dibuka
    const firstSection = document.getElementById('Home');
    showSection(firstSection);

    // Intersection Observer API untuk mendeteksi saat section terlihat di viewport
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.3,
    };

    // Menyimpan section yang terakhir terlihat
    let lastVisibleSection = firstSection;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'visible' dari section yang sebelumnya terlihat
                if (lastVisibleSection && lastVisibleSection !== entry.target) {
                    hideSection(lastVisibleSection);
                }
                
                // Menampilkan section saat ini
                showSection(entry.target);

                // Set section saat ini sebagai lastVisibleSection
                lastVisibleSection = entry.target;
            }
        });
    }, observerOptions);

    // Terapkan observer ke semua section
    sections.forEach(section => {
        observer.observe(section);
    });
});
