/* Yetenekler Grafiği JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Radar grafiği için Canvas'ı seçme
    const ctx = document.getElementById('skillsRadarChart');
    
    // Canvas elementi varsa grafiği oluştur
    if (ctx) {
        const skillsRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Python', 'Linux', 'ROS', 'Makine Öğrenmesi', 'Görüntü İşleme', 'C++', 'Web Geliştirme', 'Gömülü Sistemler'],
                datasets: [{
                    label: 'Yetenek Seviyesi',
                    data: [95, 90, 85, 80, 85, 70, 75, 80],
                    backgroundColor: 'rgba(26, 115, 232, 0.2)',
                    borderColor: 'rgba(26, 115, 232, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(26, 115, 232, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(26, 115, 232, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                            },
                            color: '#333'
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#767676',
                            showLabelBackdrop: false,
                            font: {
                                size: 10
                            },
                            stepSize: 20,
                            max: 100,
                            min: 0
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            size: 14,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        bodyFont: {
                            size: 14,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        callbacks: {
                            label: function(context) {
                                let value = context.raw;
                                let skill = context.label;
                                let level = '';
                                
                                // Seviye belirleme
                                if (value >= 90) {
                                    level = 'İleri Seviye';
                                } else if (value >= 70) {
                                    level = 'Orta-İleri Seviye';
                                } else if (value >= 50) {
                                    level = 'Orta Seviye';
                                } else {
                                    level = 'Temel Seviye';
                                }
                                
                                return `${skill}: ${value}/100 (${level})`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });

        // Grafik animasyonu
        function animateChart() {
            // Önce grafik verilerini sıfırla
            skillsRadarChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0];
            skillsRadarChart.update();
            
            // Sonra animasyon ile gerçek değerlere getir
            setTimeout(() => {
                skillsRadarChart.data.datasets[0].data = [95, 90, 85, 80, 85, 70, 75, 80];
                skillsRadarChart.update();
            }, 500);
        }
        
        // Grafiğin görünür olduğunu kontrol etmek için Intersection Observer kullan
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element görünür olduğunda grafiği canlandır
                    animateChart();
                    // Bir kez çalıştıktan sonra observer'ı kaldır
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); // Element %30 görünür olduğunda tetikle
        
        // Canvas'ı izle
        observer.observe(ctx);
    }
});
