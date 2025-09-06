// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Fonction pour copier le code sponsor
function copyCode() {
    const code = 'HEPAISS10';
    navigator.clipboard.writeText(code).then(() => {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.textContent = 'Code copié !';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc2626;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        alert('Code sponsor: HEPAISS10');
    });
}

// Gestion du formulaire de contact
document.getElementById('rdvForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validation basique
    if (!data.nom || !data.email || !data.type) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Simuler l'envoi du formulaire
    showNotification('Demande envoyée ! Nate vous contactera bientôt.', 'success');
    
    // Réinitialiser le formulaire
    this.reset();
    
    // Dans un vrai projet, vous enverriez les données à un serveur
    console.log('Données du formulaire:', data);
});

// Fonction pour afficher les notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#dc2626' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Animation d'apparition des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.recette-card, .transformation-card, .achievement');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CORRECTION : Supprimer l'effet de parallaxe qui causait des problèmes
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Gestion des modales pour les recettes (simulation)
document.querySelectorAll('.recette-card .btn-outline').forEach(btn => {
    btn.addEventListener('click', function() {
        const recetteTitle = this.closest('.recette-card').querySelector('h3').textContent;
        showRecetteModal(recetteTitle);
    });
});

function showRecetteModal(title) {
    // Créer une modale simple
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: #1a1a1a;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            border: 2px solid #dc2626;
            animation: slideIn 0.3s ease;
        ">
            <h3 style="color: white; margin-bottom: 1rem;">${title}</h3>
            <p style="color: #666; margin-bottom: 1.5rem;">
                Cette recette sera bientôt disponible ! 
                Suivez @nate__coaching sur Instagram pour plus de contenu.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button onclick="this.closest('.modal').remove()" style="
                    background: #dc2626;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                ">Fermer</button>
                <a href="https://instagram.com/nate__coaching" target="_blank" style="
                    background: transparent;
                    color: #dc2626;
                    border: 2px solid #dc2626;
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                ">Voir Instagram</a>
            </div>
        </div>
    `;
    
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    // Fermer la modale en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Ajouter les styles d'animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialiser les compteurs quand ils sont visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observer la section des achievements pour les compteurs
const achievementsSection = document.querySelector('.achievements');
if (achievementsSection) {
    counterObserver.observe(achievementsSection);
}

// CORRECTION : Assurer que toutes les sections sont visibles
document.addEventListener('DOMContentLoaded', () => {
    // Forcer la visibilité de toutes les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.position = 'relative';
        section.style.zIndex = '10';
    });
    
    // Vérifier que la section présentation est visible
    const presentationSection = document.getElementById('presentation');
    if (presentationSection) {
        presentationSection.style.display = 'block';
        presentationSection.style.visibility = 'visible';
        presentationSection.style.opacity = '1';
    }
});

console.log('Site Nate Coaching chargé avec succès ! 💪');