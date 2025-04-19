/* Projeler JavaScript - Filtreleme ve İnteraktif Görünüm */

document.addEventListener('DOMContentLoaded', function() {
    // Proje filtre butonlarını seç
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Tüm filtre butonlarına tıklama olayı ekle
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Aktif buton sınıfını değiştir
                document.querySelector('.filter-btn.active').classList.remove('active');
                this.classList.add('active');
                
                // Seçilen filtreyi al
                const filter = this.getAttribute('data-filter');
                
                // Projeleri filtrele
                filterProjects(filter);
            });
        });
    }
    
    // Projeleri filtreleme fonksiyonu
    function filterProjects(filter) {
        // Her proje kartı için döngü yap
        projectCards.forEach(card => {
            // Kartın kategorisini al
            const categories = card.getAttribute('data-category');
            
            // Filtreleme mantığı: "all" ise hepsini göster, değilse kategoride varsa göster
            if (filter === 'all' || categories.includes(filter)) {
                showProjectWithAnimation(card);
            } else {
                hideProjectWithAnimation(card);
            }
        });
    }
    
    // Proje kartını animasyonla gösterme fonksiyonu
    function showProjectWithAnimation(card) {
        // Önce görünmez yap
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.display = 'block';
        
        // Reflow için timeout
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 10);
    }
    
    // Proje kartını animasyonla gizleme fonksiyonu
    function hideProjectWithAnimation(card) {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        // Animasyon tamamlandıktan sonra display: none yap
        setTimeout(() => {
            card.style.display = 'none';
        }, 500);
    }
    
    // 3D kart efekti
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Kart üzerindeki fare pozisyonunu hesapla
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // X pozisyonu
            const y = e.clientY - rect.top;  // Y pozisyonu
            
            // Hareket açısı hesaplama (merkeze göre)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // X ve Y eksenlerindeki açıyı belirle (merkeze olan uzaklığa göre)
            const rotateY = ((x - centerX) / centerX) * 10; // -10 ile 10 derece arası
            const rotateX = -((y - centerY) / centerY) * 10; // -10 ile 10 derece arası
            
            // Transform stilini uygula
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
            this.style.transition = 'none'; // Direkt hareket için transition'ı kaldır
            
            // Kart içindeki tag'ler için de ayrı bir efekt uygula
            const tags = this.querySelectorAll('.tech-tag');
            tags.forEach((tag, index) => {
                tag.style.transform = `translateZ(${20 + index * 5}px)`;
            });
            
            // Kart başlığı için de ayrı bir efekt
            const title = this.querySelector('.project-title');
            if (title) {
                title.style.transform = 'translateZ(30px)';
                title.style.textShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            }
        });
        
        // Karttan çıkınca normal haline döndür
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            
            // İç elementleri de normal haline döndür
            const tags = this.querySelectorAll('.tech-tag');
            tags.forEach(tag => {
                tag.style.transform = 'translateZ(0)';
            });
            
            const title = this.querySelector('.project-title');
            if (title) {
                title.style.transform = 'translateZ(0)';
                title.style.textShadow = 'none';
            }
        });
        
        // Tıklama hareketi için efekt
        card.addEventListener('mousedown', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(5px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
    
    // Göz izleme efekti - Belirli bir element fare hareketini takip etsin
    const projectSection = document.querySelector('.projects');
    
    if (projectSection) {
        projectSection.addEventListener('mousemove', function(e) {
            const badges = document.querySelectorAll('.award-badge');
            
            badges.forEach(badge => {
                const rect = projectSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Fare konumuna göre hafif bir dönme efekti ekle
                const rotateX = (y / rect.height - 0.5) * 10;
                const rotateY = (x / rect.width - 0.5) * -10;
                
                badge.style.transform = `rotate(3deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
        
        // Mouse çıktığında normal pozisyona dön
        projectSection.addEventListener('mouseleave', function() {
            const badges = document.querySelectorAll('.award-badge');
            
            badges.forEach(badge => {
                badge.style.transform = 'rotate(3deg)';
            });
        });
    }
});
