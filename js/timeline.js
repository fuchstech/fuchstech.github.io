/* Zaman Çizelgesi JavaScript - İnteraktif Zaman Çizelgesi */

document.addEventListener('DOMContentLoaded', function() {
    // Timeline elementlerini seç
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    // Timeline görünürlüğü için Intersection Observer oluştur
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Element görünür olduğunda animasyon sınıfı ekle
                entry.target.classList.add('fade-in');
                
                // Timeline nokta animasyonu için özel gecikme ekle
                const dot = entry.target.querySelector('.timeline-dot');
                if (dot) {
                    // Gecikme hesapla (indeks * 200ms)
                    const delay = index * 0.2;
                    dot.style.setProperty('--delay', `${delay}s`);
                    dot.classList.add('scale-up');
                }
                
                // İçerik animasyonu
                const content = entry.target.querySelector('.timeline-content');
                if (content) {
                    content.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
                    content.style.transitionDelay = `${index * 0.2 + 0.3}s`;
                    
                    // Tek ve çift elementler için farklı giriş animasyonları
                    if (index % 2 === 0) {
                        content.classList.add('fade-right');
                    } else {
                        content.classList.add('fade-left');
                    }
                }
                
                // Bir kez çalıştıktan sonra observer'ı kaldır
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Element %20 görünür olduğunda tetikle
    
    // Timeline elementlerini izle
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Timeline hover efektleri
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Hover edilen elementin içerik kutusu
            const content = this.querySelector('.timeline-content');
            const dot = this.querySelector('.timeline-dot');
            
            if (content) {
                content.style.transform = 'translateY(-10px)';
                content.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            }
            
            if (dot) {
                dot.style.transform = 'scale(1.2)';
                dot.style.boxShadow = '0 0 0 8px rgba(26, 115, 232, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Normal haline döndür
            const content = this.querySelector('.timeline-content');
            const dot = this.querySelector('.timeline-dot');
            
            if (content) {
                content.style.transform = 'translateY(0)';
                content.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
            
            if (dot) {
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = '0 0 0 4px rgba(26, 115, 232, 0.3)';
            }
        });
    });
    
    // Timeline çizgisi animasyonu
    const timelineSection = document.querySelector('.experience');
    const timelineLine = document.querySelector('.timeline-line');
    
    if (timelineSection && timelineLine) {
        // Timeline çizgisini başlangıçta görünmez yap
        timelineLine.style.height = '0';
        
        // Timeline bölümü görünürlüğü için observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Section görünür olduğunda timeline çizgisini animasyonla göster
                    setTimeout(() => {
                        timelineLine.style.transition = 'height 1.5s ease-out';
                        timelineLine.style.height = '100%';
                    }, 300);
                    
                    // Bir kez çalıştıktan sonra observer'ı kaldır
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Timeline section'ını izle
        sectionObserver.observe(timelineSection);
    }
    
    // Timeline tarih vurgulama efekti
    const timelineDates = document.querySelectorAll('.timeline-date');
    
    timelineDates.forEach(date => {
        date.addEventListener('mouseenter', function() {
            this.style.color = '#0d5bbc';
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '0 2px 5px rgba(26, 115, 232, 0.3)';
        });
        
        date.addEventListener('mouseleave', function() {
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    });
    
    // Mobil görünüm için timeline düzenlemeleri
    function adjustTimelineMobile() {
        if (window.innerWidth <= 992) {
            // Mobil görünüm için timeline düzenlemesi
            timelineItems.forEach(item => {
                item.style.width = 'calc(100% - 50px)';
                item.style.marginLeft = '50px';
            });
            
            if (timelineLine) {
                timelineLine.style.left = '0';
            }
            
            timelineDots.forEach(dot => {
                dot.style.left = '-40px';
                dot.style.right = 'auto';
            });
        } else {
            // Desktop görünüm için timeline düzenlemesi
            timelineItems.forEach((item, index) => {
                if (index % 2 === 0) {
                    item.style.width = 'calc(50% - 30px)';
                    item.style.marginLeft = 'auto';
                    item.style.marginRight = '0';
                } else {
                    item.style.width = 'calc(50% - 30px)';
                    item.style.marginLeft = '0';
                    item.style.marginRight = 'auto';
                }
            });
            
            if (timelineLine) {
                timelineLine.style.left = '50%';
            }
            
            timelineDots.forEach((dot, index) => {
                if (index % 2 === 0) {
                    dot.style.left = '-40px';
                    dot.style.right = 'auto';
                } else {
                    dot.style.left = 'auto';
                    dot.style.right = '-40px';
                }
            });
        }
    }
    
    // Sayfa yüklendiğinde ve boyutu değiştiğinde timeline düzenlemesini güncelle
    adjustTimelineMobile();
    window.addEventListener('resize', adjustTimelineMobile);
});
