// Gerenciador de Senhas para o Modelo de Valuation - Paes Consultoria

// Função para inicializar o gerenciador de senhas
document.addEventListener('DOMContentLoaded', function() {
    // Configurar manipuladores de eventos para o modal de alteração de senha
    setupPasswordModalEvents();
});

// Configurar eventos do modal de alteração de senha
function setupPasswordModalEvents() {
    // Botão para abrir o modal
    const changePasswordLink = document.getElementById('change-password-link');
    if (changePasswordLink) {
        changePasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            openPasswordModal();
        });
    }
    
    // Botões para fechar o modal
    const closePasswordModal = document.getElementById('close-password-modal');
    if (closePasswordModal) {
        closePasswordModal.addEventListener('click', function() {
            closeModal();
        });
    }
    
    const cancelPasswordChange = document.getElementById('cancel-password-change');
    if (cancelPasswordChange) {
        cancelPasswordChange.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Formulário de alteração de senha
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePasswordChange();
        });
    }
    
    // Fechar modal ao clicar fora dele
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeModal();
        });
    }
}

// Abrir o modal de alteração de senha
function openPasswordModal() {
    const modal = document.getElementById('change-password-modal');
    if (modal) {
        // Limpar campos do formulário
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
        
        // Exibir o modal
        modal.style.display = 'block';
        modal.classList.add('fade-in');
    }
}

// Fechar o modal
function closeModal() {
    const modal = document.getElementById('change-password-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Manipular a alteração de senha
function handlePasswordChange() {
    // Obter valores dos campos
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Validar senha atual
    if (!validateCurrentPassword(currentPassword)) {
        showPasswordError('A senha atual está incorreta.');
        return;
    }
    
    // Validar nova senha
    if (!validateNewPassword(newPassword)) {
        showPasswordError('A nova senha deve ter pelo menos 6 caracteres.');
        return;
    }
    
    // Verificar se as senhas coincidem
    if (newPassword !== confirmPassword) {
        showPasswordError('As senhas não coincidem.');
        return;
    }
    
    // Salvar nova senha
    saveNewPassword(newPassword);
    
    // Fechar modal e mostrar mensagem de sucesso
    closeModal();
    showPasswordSuccess('Senha alterada com sucesso!');
}

// Validar senha atual
function validateCurrentPassword(password) {
    // Obter usuário atual
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return false;
    }
    
    // Verificar se a senha está correta
    // Em um ambiente real, isso seria feito com hash seguro
    return currentUser.password === password;
}

// Validar nova senha
function validateNewPassword(password) {
    // Verificar comprimento mínimo
    return password.length >= 6;
}

// Salvar nova senha
function saveNewPassword(password) {
    // Obter usuário atual
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return;
    }
    
    // Atualizar senha
    currentUser.password = password;
    
    // Salvar no localStorage
    // Em um ambiente real, isso seria feito com hash seguro e armazenamento no servidor
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Obter usuário atual
function getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
        return null;
    }
    
    try {
        return JSON.parse(userJson);
    } catch (e) {
        console.error('Erro ao analisar dados do usuário:', e);
        return null;
    }
}

// Mostrar mensagem de erro
function showPasswordError(message) {
    // Verificar se já existe uma mensagem de erro
    let errorElement = document.querySelector('.password-error');
    
    // Se não existir, criar uma nova
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'password-error alert alert-danger';
        
        // Inserir antes do primeiro campo do formulário
        const formGroup = document.querySelector('#change-password-form .form-group');
        if (formGroup) {
            formGroup.parentNode.insertBefore(errorElement, formGroup);
        }
    }
    
    // Definir a mensagem
    errorElement.textContent = message;
}

// Mostrar mensagem de sucesso
function showPasswordSuccess(message) {
    // Criar elemento de alerta
    const successElement = document.createElement('div');
    successElement.className = 'alert alert-success';
    successElement.style.position = 'fixed';
    successElement.style.top = '20px';
    successElement.style.left = '50%';
    successElement.style.transform = 'translateX(-50%)';
    successElement.style.padding = '10px 20px';
    successElement.style.borderRadius = '4px';
    successElement.style.backgroundColor = '#4CAF50';
    successElement.style.color = 'white';
    successElement.style.zIndex = '9999';
    successElement.textContent = message;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(successElement);
    
    // Remover após alguns segundos
    setTimeout(function() {
        if (successElement.parentNode) {
            successElement.parentNode.removeChild(successElement);
        }
    }, 3000);
}

// Modificar a função de login existente para armazenar as credenciais
// Esta função é chamada pelo arquivo main.js
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validar credenciais (simplificado para o protótipo)
    if (username && password) {
        // Armazenar usuário atual
        const user = {
            username: username,
            password: password,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Mostrar conteúdo principal
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Modificar a função de verificação de login existente
// Esta função é chamada pelo arquivo main.js
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Verificar se o usuário atual existe
        const currentUser = getCurrentUser();
        if (currentUser) {
            // Mostrar conteúdo principal
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        } else {
            // Limpar estado de login se não houver usuário
            localStorage.removeItem('isLoggedIn');
        }
    }
}

// Modificar a função de logout existente
// Esta função é chamada pelo arquivo main.js
function handleLogout(e) {
    e.preventDefault();
    
    // Limpar dados de login
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    
    // Voltar para a tela de login
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

// Sobrescrever as funções de login no objeto window para que o main.js use estas versões
window.handleLogin = handleLogin;
window.checkLoginStatus = checkLoginStatus;
window.handleLogout = handleLogout;
