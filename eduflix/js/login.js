const usuarios = [
    {
        email: 'ricardo@eduflix.com',
        senha: 'eduflix2024'
    },
    {
        email: 'aluno@eduflix.com',
        senha: 'aluno123'
    },
    {
        email: 'admin',
        senha: 'admin'
    }
];

function inicializarLogin() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    carregarEmailSalvo();
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const tipo = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = tipo;
            
            const icon = togglePassword.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    emailInput.addEventListener('blur', function() {
        validarEmail();
    });
    
    passwordInput.addEventListener('blur', function() {
        validarSenha();
    });
    
    emailInput.addEventListener('input', function() {
        if (emailError.classList.contains('show')) {
            validarEmail();
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordError.classList.contains('show')) {
            validarSenha();
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailValido = validarEmail();
        const senhaValida = validarSenha();
        
        if (!emailValido || !senhaValida) {
            return;
        }
        
        realizarLogin();
    });
    
    const googleBtn = document.querySelector('.btn--google');
    const githubBtn = document.querySelector('.btn--github');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            mostrarNotificacao('Login com Google em breve! 🔐', 'info');
        });
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            mostrarNotificacao('Login com GitHub em breve! 🔐', 'info');
        });
    }
    
    function validarEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            mostrarErro(emailError, 'Email é obrigatório');
            return false;
        }
        
        if (email !== 'admin' && !emailRegex.test(email)) {
            mostrarErro(emailError, 'Email inválido');
            return false;
        }
        
        esconderErro(emailError);
        return true;
    }
    
    function validarSenha() {
        const senha = passwordInput.value;
        
        if (!senha) {
            mostrarErro(passwordError, 'Senha é obrigatória');
            return false;
        }
        
        if (senha.length < 3) {
            mostrarErro(passwordError, 'Senha muito curta');
            return false;
        }
        
        esconderErro(passwordError);
        return true;
    }
    
    function mostrarErro(elemento, mensagem) {
        elemento.textContent = mensagem;
        elemento.classList.add('show');
        const input = elemento.previousElementSibling;
        if (input && input.classList) {
            input.classList.add('error');
        }
    }
    
    function esconderErro(elemento) {
        elemento.classList.remove('show');
        const input = elemento.previousElementSibling;
        if (input && input.classList) {
            input.classList.remove('error');
        }
    }
    
    function realizarLogin() {
        const email = emailInput.value.trim();
        const senha = passwordInput.value;
        const lembrar = document.getElementById('remember').checked;
        
        setarCarregamento(true);
        
        setTimeout(function() {
            const usuario = usuarios.find(function(u) {
                return u.email === email && u.senha === senha;
            });
            
            if (usuario) {
                if (lembrar) {
                    localStorage.setItem('eduflix_email', email);
                } else {
                    localStorage.removeItem('eduflix_email');
                }
                
                localStorage.setItem('eduflix_logado', 'true');
                
                mostrarNotificacao('Login realizado com sucesso! 🎉', 'success');
                
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                setarCarregamento(false);
                mostrarNotificacao('Email ou senha incorretos', 'error');
                mostrarErro(passwordError, 'Credenciais inválidas');
            }
        }, 800);
    }
    
    function setarCarregamento(carregando) {
        submitBtn.classList.toggle('loading', carregando);
        submitBtn.disabled = carregando;
        
        const inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = carregando;
        }
    }
    
    function carregarEmailSalvo() {
        const emailSalvo = localStorage.getItem('eduflix_email');
        
        if (emailSalvo) {
            emailInput.value = emailSalvo;
            document.getElementById('remember').checked = true;
        }
    }
    
    function mostrarNotificacao(mensagem, tipo) {
        const notificacaoExistente = document.querySelector('.notification');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }
        
        const cores = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            info: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
        };
        
        const notificacao = document.createElement('div');
        notificacao.className = 'notification';
        notificacao.textContent = mensagem;
        notificacao.style.cssText = 
            'position: fixed;' +
            'bottom: 2rem;' +
            'right: 2rem;' +
            'background: ' + cores[tipo] + ';' +
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

const estiloNotificacao = document.createElement('style');
estiloNotificacao.textContent = 
    '.form-input.error { border-color: #ef4444; }' +
    '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }' +
    '@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
document.head.appendChild(estiloNotificacao);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarLogin);
} else {
    inicializarLogin();
}
