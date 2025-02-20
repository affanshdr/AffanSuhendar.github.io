document.addEventListener("DOMContentLoaded", function() {
    function showSection(section) {
        section.classList.add("visible");
    }

    function hideSection(section) {
        section.classList.remove("visible");
    }

    function showActive(asideLink) {
        asideLink.classList.add("Active");
    }

    function hideActive(asideLink) {
        asideLink.classList.remove("Active");
    }

    const firstSection = document.getElementById('Home');
    showSection(firstSection);


    const sections = document.querySelectorAll('.section');
    const asideLinks = document.querySelectorAll('aside a');  
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


