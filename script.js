// ==========================================
// 1. DATA SOURCE (Structured Array Array)
// ==========================================
const propertiesData = [
    {
        id: 1,
        title: "Serene Malibu Villa",
        price: 6400000, // Updated to a TSh equivalent or realistic value
        location: "Dar es salaam, Kimara",
        bedrooms: 5,
        bathrooms: 6,
        type: "house",
        imageUrl: "images/House 1.jpg",
        description: "An architectural masterpiece boasting panoramic ocean vistas, private infinity pool, and cutting-edge home smart automation system."
    },
    {
        id: 3,
        title: "Mountain View Modern House",
        price: 4200000, // Updated to a TSh equivalent or realistic value
        location: "Mwanza,Nyegezi",
        bedrooms: 4,
        bathrooms: 4,
        type: "house",
        imageUrl: "images/House 2.jpg", 
        description: "A gorgeous luxury mountain escape with structural floor heating, standalone hot tub deck, and instantaneous ski-in/ski-out capabilities."
    },
    {
        id: 2,
        title: "Victorious Luxury Apartment",
        price: 2950000, // Updated to a TSh equivalent or realistic value
        location: "Dodoma, Makulu",
        bedrooms: 3,
        bathrooms: 3.5,
        type: "apartment",
        imageUrl: "images/Apart 3.jpg",
        description: "Exquisite high-rise living featuring floor-to-ceiling panoramic glass windows, concierge white-glove service, and steps from Central Park."
    },
     {
        id: 6,
        title: "Eco-Friendly Suburban Apartment",
        price: 950000,// Updated to a TSh equivalent or realistic value
        location: "Dodoma, Chamwino",
        bedrooms: 4,
        bathrooms: 3,
        type: "apartment",
        imageUrl: "images/Apart 4.jpg",
        description: "Beautiful multi-generational energy efficient house with integrated residential solar panels, zero-waste greywater systems, and a massive backyard lawn."
    },
    
    {
        id: 4,
        title: "Urban Skyline Condo",
        price: 850000,// Updated to a TSh equivalent or realistic value
        location: "Mbeya, Tukuyu",
        bedrooms: 4,
        bathrooms: 2,
        type: "condo",
        imageUrl: "images/Kondo 3.jpg",
        description: "Immaculately designed loft living in downtown Chicago featuring exposed industrial brick, luxury quartz finishings, and building gym access."
    },
    {
        id: 5,
        title: "Mlimani Waterfront Studio",
        price: 1250000,// Updated to a TSh equivalent or realistic value
        location: "Dar es salaam, Mbezi",
        bedrooms: 2,
        bathrooms: 2.5,
        type: "condo",
        imageUrl: "images/Kondo 4.jpg",
        description: "Live the tropical luxury lifestyle with private dock access, expansive over-water patio, and curated mid-century modern design elements."
    },
   
];

// ==========================================
// 2. DOM ELEMENTS CACHING
// ==========================================
const propertiesGrid = document.getElementById('propertiesGrid');
const noResults = document.getElementById('noResults');

// Filter Inputs
const searchLocation = document.getElementById('searchLocation');
const filterType = document.getElementById('filterType');
const filterPrice = document.getElementById('filterPrice');

// Modal Elements
const propertyModal = document.getElementById('propertyModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Form Elements
const inquiryForm = document.getElementById('inquiryForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

// Mobile Nav UI Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// ==========================================
// 3. DATA RENDERING INTERFACE
// ==========================================
function renderProperties(properties) {
    propertiesGrid.innerHTML = '';
    
    if (properties.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    noResults.classList.add('hidden');

    properties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.setAttribute('data-id', property.id);
        
        card.innerHTML = `
            <div class="property-img" style="background-image: url('${property.imageUrl}')">
        <span class="property-type-tag">${property.type}</span>
    </div>
    <div class="property-details">
        <p class="property-price">TSh ${property.price.toLocaleString()}</p>
        <h3 class="property-title">${property.title}</h3>
        <p class="property-loc">📍 ${property.location}</p>
        <div class="property-specs">
            <span>🛏️ ${property.bedrooms} Beds</span>
            <span>🛁 ${property.bathrooms} Baths</span>
        </div>
    </div>
        `;
        
        // Modal Trigger Handler bound on runtime generation
        card.addEventListener('click', () => openModal(property));
        propertiesGrid.appendChild(card);
    });
}

// ==========================================
// 4. REAL-TIME MULTI-ARRAY FILTER ENGINE
// ==========================================
function executeFiltering() {
    const textQuery = searchLocation.value.toLowerCase().trim();
    const selectedType = filterType.value;
    const selectedMaxPrice = filterPrice.value;

    const filtered = propertiesData.filter(property => {
        // A: Location string evaluation
        const matchesLocation = property.location.toLowerCase().includes(textQuery) || 
                                property.title.toLowerCase().includes(textQuery);
        
        // B: Category evaluation
        const matchesType = (selectedType === 'all') || (property.type === selectedType);
        
        // C: Numeric range evaluation
        const matchesPrice = (selectedMaxPrice === 'all') || (property.price <= parseInt(selectedMaxPrice));

        return matchesLocation && matchesType && matchesPrice;
    });

    renderProperties(filtered);
}

// Attach Event Observers directly onto Input Elements
searchLocation.addEventListener('input', executeFiltering);
filterType.addEventListener('change', executeFiltering);
filterPrice.addEventListener('change', executeFiltering);

// ==========================================
// 5. DETAIL VIEW MODAL INTERACTIVE CORE
// ==========================================
function openModal(property) {
    modalBody.innerHTML = `
        <div class="modal-hero-img" style="background-image: url('${property.imageUrl}')"></div>
        <div class="modal-body-padding">
            <p class="property-price" style="font-size: 1.8rem;">$${property.price.toLocaleString()}</p>
            <h2 class="property-title" style="font-size: 1.6rem; margin-bottom: 5px;">${property.title}</h2>
            <p class="property-loc" style="font-size: 1rem; margin-bottom: 20px;">📍 ${property.location}</p>
            
            <div class="property-specs" style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
                <span><strong>Type:</strong> ${property.type.toUpperCase()}</span>
                <span>🛏️ ${property.bedrooms} Bedrooms</span>
                <span>🛁 ${property.bathrooms} Bathrooms</span>
            </div>
            
            <p style="color: #555; line-height: 1.7;">${property.description}</p>
        </div>
    `;
    propertyModal.classList.add('active');
    propertyModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    propertyModal.classList.remove('active');
    propertyModal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === propertyModal) closeModal();
});

// ==========================================
// 6. RIGOROUS VALIDATION AND UTILITIES
// ==========================================
function showInlineError(inputElement, errorElement, text) {
    errorElement.textContent = text;
    inputElement.style.borderColor = 'var(--error-color)';
}

function resetInlineError(inputElement, errorElement) {
    errorElement.textContent = '';
    inputElement.style.borderColor = '#ccc';
}

inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isFormValid = true;
// --- Validation Ruleset A: Full Name Validation (Characters Only) ---
    const nameVal = fullName.value.trim();
    const nameError = document.getElementById('nameError');
    // Regex allows upper and lowercase letters, and spaces between names
    const nameRegex = /^[a-zA-Z\s]+$/; 

    if (nameVal === "") {
        showInlineError(fullName, nameError, "Full Name is required.");
        isFormValid = false;
    } else if (nameVal.length < 3) {
        showInlineError(fullName, nameError, "Name must be at least 3 characters long.");
        isFormValid = false;
    } else if (!nameRegex.test(nameVal)) {
        showInlineError(fullName, nameError, "Name can only contain alphabet characters and spaces.");
        isFormValid = false;
    } else {
        resetInlineError(fullName, nameError);
    }

    // --- Validation Ruleset B: RFC-Compliant Email Structure Regex ---
    const emailVal = email.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailVal === "") {
        showInlineError(email, emailError, "Email address is required.");
        isFormValid = false;
    } else if (!emailRegex.test(emailVal)) {
        showInlineError(email, emailError, "Please input a valid email address.");
        isFormValid = false;
    } else {
        resetInlineError(email, emailError);
    }

    // --- Validation Ruleset C: Flexible Telephone Digit Structure Regex ---
    // Evaluates normal variations including regional codes, spaces, dashes, or parentheses
    const phoneVal = phone.value.trim();
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    if (phoneVal === "") {
        showInlineError(phone, phoneError, "Phone number is required.");
        isFormValid = false;
    } else if (!phoneRegex.test(phoneVal)) {
        showInlineError(phone, phoneError, "Invalid number. Use pattern: +255 000 000 000 or 0 000 000 0000");
        isFormValid = false;
    } else {
        resetInlineError(phone, phoneError);
    }

    // --- Validation Ruleset D: Generic Textarea Alphabets-Only Validation ---
    // --- Validation Ruleset D: Textarea Alphabets & Special Characters Validation ---
    const msgVal = message.value.trim();
    const messageError = document.getElementById('messageError');
    
    // Regex allows letters, spaces, line breaks (\n), and standard special characters: . , ? ! ' - ( )
    const allowedRegex = /^[a-zA-Z\s\n.,?!'\-()]+$/;

    if (msgVal === "") {
        showInlineError(message, messageError, "Please enter a descriptive message detailing your intent.");
        isFormValid = false;
    } else if (!allowedRegex.test(msgVal)) {
        showInlineError(message, messageError, "Message contains invalid characters. Only letters, spaces, and basic punctuation (. , ? ! ' -) are allowed.");
        isFormValid = false;
    } else {
        resetInlineError(message, messageError);
    }

    // --- Success Handler Block ---
    if (isFormValid) {
        formSuccess.classList.remove('hidden');
        inquiryForm.reset();
        
        // Hide success alert dynamically after an elapsed threshold
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 5000);
    }
});

// ==========================================
// 7. RESPONSIVE MENU SYSTEM & ENTRY
// ==========================================
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Execution Runtime Init Execution Hook
document.addEventListener('DOMContentLoaded', () => {
    renderProperties(propertiesData);
});