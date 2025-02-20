document.addEventListener("DOMContentLoaded", function() {
    // Fungsi untuk memunculkan section dengan transisi
    function showSection(section) {
        section.classList.add("visible");
    }

    // Fungsi untuk menyembunyikan section
    function hideSection(section) {
        section.classList.remove("visible");
    }

    // Fungsi Memunculkan kelas Active di link aside
    function showActive(asideLink) {
        asideLink.classList.add("Active");
    }

    // Fungsi Menghilangkan kelas Active di link aside
    function hideActive(asideLink) {
        asideLink.classList.remove("Active");
    }

    // Memunculkan section pertama saat halaman pertama kali dibuka
    const firstSection = document.getElementById('Home');
    showSection(firstSection);

    // Intersection Observer API untuk mendeteksi saat section terlihat di viewport
    const sections = document.querySelectorAll('.section');
    const asideLinks = document.querySelectorAll('aside a'); // Ambil semua link dalam aside
    const observerOptions = {
        threshold: 0.9,
    };


    let lastVisibleSection = firstSection;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
  
                if (lastVisibleSection && lastVisibleSection !== entry.target) {
                    hideSection(lastVisibleSection);
                }


                showSection(entry.target);


                asideLinks.forEach(link => hideActive(link));


                const targetLink = document.querySelector(`aside a[data-target="${entry.target.id}"]`);
                if (targetLink) {
                    showActive(targetLink);
                }

  
                lastVisibleSection = entry.target;
            }
        });
    }, observerOptions);


    sections.forEach(section => {
        observer.observe(section);
    });
});



// Fungsi untuk menampilkan dan menyembunyikan splash screen
function showSplashScreen() {
    document.getElementById('splash-screen').classList.remove('hidden');
}

function hideSplashScreen() {
    document.getElementById('splash-screen').classList.add('hidden');
}

// Event listener untuk link di aside
document.querySelectorAll('aside a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Mencegah aksi default link

        // Tampilkan splash screen
        showSplashScreen();

        // Scroll ke section setelah sedikit delay
        const targetSection = document.querySelector(this.getAttribute('href'));
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Sembunyikan splash screen setelah scroll selesai
            setTimeout(hideSplashScreen, 1000); // Durasi animasi
        }, 500); // Delay untuk efek splash
    });
});