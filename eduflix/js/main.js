function inicializarApp() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const carousels = document.querySelectorAll('.carousel');
    
    verificarAutenticacao();
    configurarHeaderScroll();
    configurarMenuMobile();
    configurarCarroseis();
    configurarContadores();
    configurarBotoesHero();
    configurarParticulas();
    configurarAnimacoes();
    
    function verificarAutenticacao() {
        const usuarioLogado = localStorage.getItem('eduflix_logado');
        const btnAuth = document.getElementById('btnAuth');
        const authText = document.getElementById('authText');
        const authIcon = btnAuth.querySelector('i');
        
        if (usuarioLogado === 'true') {
            authText.textContent = 'Sair';
            authIcon.className = 'fas fa-sign-out-alt';
            
            btnAuth.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('eduflix_logado');
                mostrarNotificacao('Até logo! 👋');
                setTimeout(function() {
                    window.location.href = 'login.html';
                }, 800);
            });
        }
    }
    
    function configurarHeaderScroll() {
        window.addEventListener('scroll', function() {
            const scrollAtual = window.pageYOffset;
            
            if (scrollAtual > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    function configurarMenuMobile() {
        if (!menuToggle || !nav) return;
        
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        const links = nav.querySelectorAll('.nav__link');
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    function configurarCarroseis() {
        for (let i = 0; i < carousels.length; i++) {
            const carousel = carousels[i];
            const track = carousel.querySelector('.carousel__track');
            const prevBtn = carousel.querySelector('.carousel__btn--prev');
            const nextBtn = carousel.querySelector('.carousel__btn--next');
            
            if (!track) continue;
            
            const scrollAmount = 320;
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
            
            track.addEventListener('scroll', function() {
                const maxScroll = track.scrollWidth - track.clientWidth;
                
                if (prevBtn) {
                    prevBtn.style.opacity = track.scrollLeft <= 0 ? '0' : '1';
                    prevBtn.style.pointerEvents = track.scrollLeft <= 0 ? 'none' : 'auto';
                }
                
                if (nextBtn) {
                    nextBtn.style.opacity = track.scrollLeft >= maxScroll ? '0' : '1';
                    nextBtn.style.pointerEvents = track.scrollLeft >= maxScroll ? 'none' : 'auto';
                }
            });
            
            track.dispatchEvent(new Event('scroll'));
        }
    }
    
    function configurarContadores() {
        const stats = document.querySelectorAll('.stat__number');
        let animado = false;
        
        function animarContador(elemento) {
            const alvo = parseInt(elemento.dataset.count);
            const duracao = 2000;
            const incremento = alvo / (duracao / 16);
            let atual = 0;
            
            function atualizarContador() {
                atual += incremento;
                
                if (atual < alvo) {
                    elemento.textContent = Math.floor(atual).toLocaleString('pt-BR');
                    requestAnimationFrame(atualizarContador);
                } else {
                    elemento.textContent = alvo.toLocaleString('pt-BR');
                }
            }
            
            atualizarContador();
        }
        
        function verificarVisibilidade() {
            if (animado) return;
            
            for (let i = 0; i < stats.length; i++) {
                const rect = stats[i].getBoundingClientRect();
                const visivel = rect.top < window.innerHeight && rect.bottom >= 0;
                
                if (visivel) {
                    animado = true;
                    for (let j = 0; j < stats.length; j++) {
                        animarContador(stats[j]);
                    }
                    break;
                }
            }
        }
        
        window.addEventListener('scroll', verificarVisibilidade);
        verificarVisibilidade();
    }
    
    function configurarBotoesHero() {
        const btnAssistir = document.getElementById('btnAssistir');
        const btnInfo = document.getElementById('btnInfo');
        
        if (btnAssistir) {
            btnAssistir.addEventListener('click', function() {
                mostrarNotificacao('Em breve! Curso em preparação 🚀');
            });
        }
        
        if (btnInfo) {
            btnInfo.addEventListener('click', function() {
                mostrarNotificacao('Mais informações em breve! 📚');
            });
        }
    }
    
    function configurarParticulas() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = Math.random() > 0.5 
                ? 'rgba(139, 92, 246, 0.3)' 
                : 'rgba(16, 185, 129, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = 'float ' + (3 + Math.random() * 4) + 's ease-in-out infinite';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    function configurarAnimacoes() {
        const secoes = document.querySelectorAll('.section');
        
        function verificarVisibilidade() {
            for (let i = 0; i < secoes.length; i++) {
                const rect = secoes[i].getBoundingClientRect();
                const visivel = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
                
                if (visivel) {
                    secoes[i].style.opacity = '1';
                    secoes[i].style.transform = 'translateY(0)';
                }
            }
        }
        
        for (let i = 0; i < secoes.length; i++) {
            secoes[i].style.opacity = '0';
            secoes[i].style.transform = 'translateY(50px)';
            secoes[i].style.transition = 'all 0.6s ease-out';
        }
        
        window.addEventListener('scroll', verificarVisibilidade);
        verificarVisibilidade();
    }
    
    function mostrarNotificacao(mensagem) {
        const notificacaoExistente = document.querySelector('.notification');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }
        
        const notificacao = document.createElement('div');
        notificacao.className = 'notification';
        notificacao.textContent = mensagem;
        notificacao.style.cssText = 
            'position: fixed;' +
            'bottom: 2rem;' +
            'right: 2rem;' +
            'background: linear-gradient(135deg, #8b5cf6, #10b981);' +
            'color: white;' +
            'padding: 1rem 1.5rem;' +
            'border-radius: 0.75rem;' +
            'box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);' +
            'z-index: 9999;' +
            'animation: slideIn 0.3s ease-out;' +
            'font-weight: 600;';
        
        document.body.appendChild(notificacao);
        
        setTimeout(function() {
            notificacao.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(function() {
                notificacao.remove();
            }, 300);
        }, 3000);
    }
}

const estilos = document.createElement('style');
estilos.textContent = 
    '@keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } }' +
    '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }' +
    '@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
document.head.appendChild(estilos);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarApp);
} else {
    inicializarApp();
}
