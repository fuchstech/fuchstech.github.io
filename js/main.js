/* Ana JavaScript Dosyası */

// DOM yüklendikten sonra çalıştır
document.addEventListener('DOMContentLoaded', function() {
    // AOS (Animate On Scroll) kütüphanesini başlat
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Scroll to top butonu 
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar scroll efekti
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobil menu düğmesi işlevselliği
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Bağlantılar için smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Mobil menüyü kapat
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Header height offset
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form gönderimi
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form gönderimi Formspree tarafından işlenecek,
            // bu nedenle burada form gönderimini engellemiyoruz
            // Formspree başarılı/başarısız sayfaya yönlendirecek
            
            // Form gönderiminden sonra sayfa değiştirmeden önce 'Gönderiliyor...' mesajı göster
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerText;
                submitButton.innerText = 'Gönderiliyor...';
                submitButton.disabled = true;
                
                // 3 saniye sonra butonu sıfırla (form gönderimini engellemeyeceğiz)
                setTimeout(() => {
                    submitButton.innerText = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    // Sayfa içi navigasyon linki aktifleştirme
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${current}`) {
                navItem.classList.add('active');
            }
        });
    });

    // Typing effect için
    function setupTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            // Animasyonu sıfırla
            element.style.animation = 'none';
            void element.offsetWidth; // Reflow
            const text = element.textContent;
            const duration = text.length * 0.1; // Uzunluğa göre süre hesaplama
            element.style.animation = `typing ${duration}s steps(${text.length}, end), blink-caret .75s step-end infinite`;
        });
    }
    
    // Typing efektini başlat
    setupTypingEffect();
    
    // Sayfa yüklendiğinde skill barlarını animasyona sokma
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.style.width;
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.transition = 'width 1s ease-in-out';
                level.style.width = width;
            }, 500);
        });
    }
    
    // Skill bar animasyonlarını başlat
    animateSkillBars();

    // 3D kart efekti için proje kartlarına event listener ekle
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Kart üzerindeki fare pozisyonunu hesapla
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // X pozisyonu
            const y = e.clientY - rect.top;  // Y pozisyonu
            
            // Hareket açısı hesaplama
            const xRotation = ((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((x - rect.width / 2) / rect.width) * -10;
            
            // 3D efektini uygula
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Kart üzerinden çıkınca normal haline dön
            this.style.transform = 'translateY(-10px)';
        });
    });
});

// Proje detay modal fonksiyonları
function setupProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-button');
    
    // Her "Detayları Gör" butonuna tıklandığında
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            
            // Proje ID'sine göre içerik belirle
            let content = '';
            
            switch(projectId) {
                case 'asifin':
                    content = `
                        <h2>AsiFin - Finansal Strateji Platformu</h2>
                        <div class="modal-image" style="background-color: #1a73e8; height: 200px; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; margin-bottom: 20px;">AsiFin Görseli</div>
                        <p>AsiFin, finansal stratejilerin test edilmesini sağlayan web tabanlı bir SaaS girişimidir. Teknofest Deneyap Girişim Programı'nda "En İyi Girişim" ödülünü kazanmıştır.</p>
                        
                        <h3>Proje Detayları</h3>
                        <p>Bu projede kullanılan temel teknolojiler:</p>
                        <ul>
                            <li>Python backend ile finansal algoritmaların geliştirilmesi</li>
                            <li>Django web framework ile kullanıcı arayüzü</li>
                            <li>JavaScript ile interaktif grafiklerin oluşturulması</li>
                            <li>Finansal veri analizi için özel algoritmalar</li>
                        </ul>
                        
                        <h3>Benim Rolüm</h3>
                        <p>Bu projede Django ve Finans Yazılımı Geliştirici olarak görev aldım. Sorumluluklarım:</p>
                        <ul>
                            <li>Backtest algoritmaları geliştirme</li>
                            <li>Finansal verileri analiz etme</li>
                            <li>Dashboard ve kullanıcı arayüzü tasarımı</li>
                            <li>Gerçek zamanlı veri işleme sistemleri</li>
                        </ul>
                    `;
                    break;
                case 'sorucan':
                    content = `
                        <h2>SoruCan - LLM Projesi</h2>
                        <div class="modal-image" style="background-color: #1a73e8; height: 200px; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; margin-bottom: 20px;">SoruCan Görseli</div>
                        <p>SoruCan, Büyük Dil Modeli kullanan akıllı bir soru-cevap platformudur. GSB - Uluslarası Gençlik Bilgilendirme Servisi Hackathonu'nda birincilik ödülü kazanmıştır.</p>
                        
                        <h3>Proje Detayları</h3>
                        <p>Bu projede kullanılan temel teknolojiler:</p>
                        <ul>
                            <li>LLM (Large Language Model) entegrasyonu</li>
                            <li>Doğal dil işleme</li>
                            <li>Django web framework</li>
                            <li>Semantik arama algoritmaları</li>
                        </ul>
                        
                        <h3>Benim Rolüm</h3>
                        <p>Projede LLM ve Django Geliştirici olarak çalıştım ve şu sorumluluklarım vardı:</p>
                        <ul>
                            <li>LLM API entegrasyonu</li>
                            <li>Prompt mühendisliği</li>
                            <li>Backend sistemlerin geliştirilmesi</li>
                            <li>Kullanıcı deneyimi optimizasyonu</li>
                        </ul>
                    `;
                    break;
                case 'asimed':
                    content = `
                        <h2>Asimed - Sağlık Teknolojisi Çözümü</h2>
                        <div class="modal-image" style="background-color: #1a73e8; height: 200px; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; margin-bottom: 20px;">Asimed Görseli</div>
                        <p>Asimed, yapay zeka destekli ön teşhis, online anamnez, doktor destek ekranları ve tedavi takibini birleştiren yenilikçi bir sağlık teknolojisi çözümüdür. Bulutklinik 23' Hackathon'unda birincilik ödülü kazanmıştır.</p>
                        
                        <h3>Proje Detayları</h3>
                        <p>Bu projede kullanılan temel teknolojiler:</p>
                        <ul>
                            <li>Tıbbi görüntü işleme algoritmaları</li>
                            <li>Yapay zeka destekli tanı sistemleri</li>
                            <li>Hasta veri analizi</li>
                            <li>Web tabanlı doktor-hasta platformu</li>
                        </ul>
                        
                        <h3>Benim Rolüm</h3>
                        <p>Bu projede Görüntü İşleme ve AI Geliştirici olarak görev aldım. Sorumluluklarım:</p>
                        <ul>
                            <li>Medikal görüntüleri işleme algoritmaları geliştirme</li>
                            <li>AI tabanlı ön tanı sistemleri oluşturma</li>
                            <li>Veri analizi ve görselleştirme</li>
                            <li>Model eğitimi ve optimizasyonu</li>
                        </ul>
                    `;
                    break;
                case 'submarine':
                    content = `
                        <h2>Otonom Sualtı Aracı</h2>
                        <div class="modal-image" style="background-color: #1a73e8; height: 200px; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; margin-bottom: 20px;">Sualtı Aracı Görseli</div>
                        <p>Teknofest ve RoboNation Robosub yarışmaları için geliştirilen otonom sualtı aracı projesi.</p>
                        
                        <h3>Proje Detayları</h3>
                        <p>Bu projede kullanılan temel teknolojiler:</p>
                        <ul>
                            <li>Robot Operating System (ROS)</li>
                            <li>Görüntü işleme algoritmaları</li>
                            <li>Sualtı sensör füzyonu</li>
                            <li>Elektronik devre tasarımı</li>
                            <li>Gömülü sistem programlama</li>
                        </ul>
                        
                        <h3>Benim Rolüm</h3>
                        <p>Bu projede Elektronik ve Gömülü Sistem geliştirici olarak görev aldım. Sorumluluklarım:</p>
                        <ul>
                            <li>ROS tabanlı kontrol sistemleri geliştirme</li>
                            <li>Sensör entegrasyonu ve veri füzyonu</li>
                            <li>Elektronik devre tasarımı ve üretimi</li>
                            <li>Gömülü sistem yazılımı kodlama</li>
                            <li>Navigasyon algoritmalarının oluşturulması</li>
                        </ul>
                    `;
                    break;
                default:
                    content = '<p>Proje detayları mevcut değil.</p>';
            }
            
            // Modal içeriğini güncelle ve göster
            modalContent.innerHTML = content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Scroll'u devre dışı bırak
            
            // Modal fade-in animasyonu
            modal.classList.add('modal-fade-in');
        });
    });
    
    // Modal'ı kapatma (X butonuna tıklama)
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Scroll'u tekrar etkinleştir
        });
    }
    
    // Modal dışına tıklayınca da kapat
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Sayfa yüklendiğinde proje modallarını ayarla
document.addEventListener('DOMContentLoaded', setupProjectModals);
