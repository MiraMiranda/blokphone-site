// Checkout Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const modal = document.getElementById('successModal');
    
    // Payment method toggle
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'creditCard') {
                creditCardDetails.classList.add('active');
                creditCardDetails.style.display = 'block';
            } else {
                creditCardDetails.classList.remove('active');
                creditCardDetails.style.display = 'none';
            }
        });
    });
    
    // Initialize with credit card selected
    creditCardDetails.classList.add('active');
    creditCardDetails.style.display = 'block';
    
    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showSuccessModal();
        }
    });
    
    // Input formatting
    setupInputFormatting();
    
    // CEP lookup simulation
    setupCepLookup();
});

function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    const termsCheckbox = document.getElementById('terms');
    let isValid = true;
    
    // Check required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#22c55e';
        }
    });
    
    // Check terms acceptance
    if (!termsCheckbox.checked) {
        alert('Você deve aceitar os termos e condições para continuar.');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    // Validate CPF (basic check)
    const cpf = document.getElementById('cpf');
    if (cpf.value && cpf.value.replace(/\D/g, '').length !== 11) {
        cpf.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('phone');
    if (phone.value && phone.value.replace(/\D/g, '').length < 10) {
        phone.style.borderColor = '#ef4444';
        isValid = false;
    }
    
    // Validate credit card if selected
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
    if (selectedPayment && selectedPayment.value === 'creditCard') {
        const cardNumber = document.getElementById('cardNumber');
        const cardName = document.getElementById('cardName');
        const cardExpiry = document.getElementById('cardExpiry');
        const cardCvv = document.getElementById('cardCvv');
        
        if (!cardNumber.value || cardNumber.value.replace(/\D/g, '').length < 13) {
            cardNumber.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (!cardName.value.trim()) {
            cardName.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (!cardExpiry.value || !cardExpiry.value.match(/^\d{2}\/\d{2}$/)) {
            cardExpiry.style.borderColor = '#ef4444';
            isValid = false;
        }
        
        if (!cardCvv.value || cardCvv.value.length < 3) {
            cardCvv.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
    
    return isValid;
}

function setupInputFormatting() {
    // CPF formatting
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    
    // Phone formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });
    
    // CEP formatting
    const cepInput = document.getElementById('zipCode');
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    });
    
    // Card expiry formatting
    const cardExpiryInput = document.getElementById('cardExpiry');
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '$1/$2');
        e.target.value = value;
    });
    
    // CVV formatting
    const cardCvvInput = document.getElementById('cardCvv');
    cardCvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
}

function setupCepLookup() {
    const cepInput = document.getElementById('zipCode');
    const streetInput = document.getElementById('street');
    const neighborhoodInput = document.getElementById('neighborhood');
    const cityInput = document.getElementById('city');
    const stateSelect = document.getElementById('state');
    
    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            // Simulate CEP lookup (in a real application, you would call a CEP API)
            setTimeout(() => {
                // Mock data for demonstration
                const mockAddresses = {
                    '01310100': {
                        street: 'Avenida Paulista',
                        neighborhood: 'Bela Vista',
                        city: 'São Paulo',
                        state: 'SP'
                    },
                    '20040020': {
                        street: 'Rua da Assembleia',
                        neighborhood: 'Centro',
                        city: 'Rio de Janeiro',
                        state: 'RJ'
                    }
                };
                
                const address = mockAddresses[cep];
                if (address) {
                    streetInput.value = address.street;
                    neighborhoodInput.value = address.neighborhood;
                    cityInput.value = address.city;
                    stateSelect.value = address.state;
                    
                    // Focus on number field
                    document.getElementById('number').focus();
                }
            }, 500);
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const orderNumber = 'BLOK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const email = document.getElementById('email').value;
    
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('confirmEmail').textContent = email;
    
    modal.classList.add('active');
    
    // Simulate order processing
    const submitButton = document.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="button-text">Processando...</span> <span class="button-icon">⏳</span>';
    
    setTimeout(() => {
        modal.style.display = 'flex';
        submitButton.disabled = false;
        submitButton.innerHTML = '<span class="button-text">Finalizar Compra</span> <span class="button-icon">🔒</span>';
    }, 1000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(239, 68, 68)') {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    // Phone validation
    if (field.id === 'phone' && value) {
        const phoneDigits = value.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    // CPF validation
    if (field.id === 'cpf' && value) {
        const cpfDigits = value.replace(/\D/g, '');
        if (cpfDigits.length !== 11) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    field.style.borderColor = '#22c55e';
    return true;
}

