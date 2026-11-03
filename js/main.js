/**
 * STACKLY LEGAL CONSULTING - MAIN APPLICATION SCRIPT
 * Version 2.0 - Production Ready
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStickyHeader();
  initMobileMenu();
  initTimeGreeting();
  initAosAnimations();
  initAccordions();
  initCharCounters();
  initPasswordToggles();
  initPasswordStrength();
  initFormValidations();
  initDashboard();
});

/* ==========================================================================
   1. LOADER INITIALIZATION
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loader-wrapper');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 600);
  };

  // Immediate hide if ready, with safety timeout fallback
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 250));
    setTimeout(hideLoader, 1500); // Fallback timeout
  }
}

/* ==========================================================================
   2. STICKY HEADER & ACTIVE NAV
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Highlight active nav item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-btn');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!hamburger || !overlay) return;

  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll', isOpen);
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close when clicking overlay or any link inside
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ==========================================================================
   4. DYNAMIC TIME-OF-DAY GREETING
   ========================================================================== */
function initTimeGreeting() {
  const greetingElements = document.querySelectorAll('.time-greeting');
  if (!greetingElements.length) return;

  const hours = new Date().getHours();
  let greeting = 'Good day';
  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
  } else if (hours >= 17 && hours < 22) {
    greeting = 'Good evening';
  } else {
    greeting = 'Good evening';
  }

  greetingElements.forEach(el => {
    const customSuffix = el.getAttribute('data-suffix') || '';
    el.textContent = `${greeting}${customSuffix ? ', ' + customSuffix : ''}`;
  });
}

/* ==========================================================================
   5. AOS SCROLL ANIMATION OBSERVER
   ========================================================================== */
function initAosAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  if (!animatedElements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animatedElements.forEach(el => el.classList.add('aos-animate'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. ACCORDIONS (FAQ)
   ========================================================================== */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    const items = acc.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      if (!header || !content) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        // close others in same accordion
        items.forEach(other => {
          other.classList.remove('active');
          const otherContent = other.querySelector('.accordion-content');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
}

/* ==========================================================================
   7. CHARACTER COUNTER (Textarea)
   ========================================================================== */
function initCharCounters() {
  const textareas = document.querySelectorAll('textarea[data-counter]');
  textareas.forEach(textarea => {
    const counterId = textarea.getAttribute('data-counter');
    const counterDisplay = document.getElementById(counterId);
    if (!counterDisplay) return;

    const maxLength = textarea.getAttribute('maxlength') || 500;
    const updateCount = () => {
      const current = textarea.value.length;
      counterDisplay.textContent = `${current} / ${maxLength} characters`;
    };

    textarea.addEventListener('input', updateCount);
    updateCount();
  });
}

/* ==========================================================================
   8. PASSWORD TOGGLES & STRENGTH METER
   ========================================================================== */
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      btn.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
      btn.innerHTML = isPass ? `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
      ` : `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      `;
    });
  });
}

function initPasswordStrength() {
  const passInput = document.getElementById('registerPassword');
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  if (!passInput || !bar || !text) return;

  passInput.addEventListener('input', () => {
    const val = passInput.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    let fillWidth = '0%';
    let fillColor = '#ef4444';
    let statusText = 'Very Weak';

    if (val.length === 0) {
      fillWidth = '0%';
      statusText = '';
    } else if (score <= 2) {
      fillWidth = '25%';
      fillColor = '#ef4444';
      statusText = 'Weak - Must include upper, lower, number & special char';
    } else if (score === 3) {
      fillWidth = '50%';
      fillColor = '#f59e0b';
      statusText = 'Fair - Almost secure';
    } else if (score === 4) {
      fillWidth = '75%';
      fillColor = '#3b82f6';
      statusText = 'Good - Strong password';
    } else if (score === 5) {
      fillWidth = '100%';
      fillColor = '#10b981';
      statusText = 'Excellent - Production Grade';
    }

    bar.style.width = fillWidth;
    bar.style.backgroundColor = fillColor;
    text.textContent = statusText;
    text.style.color = fillColor;
  });
}

/* ==========================================================================
   9. STRICT FORM VALIDATIONS
   ========================================================================== */
function initFormValidations() {
  // Alphabet only constraint for Name fields
  const alphaInputs = document.querySelectorAll('input[data-alpha-only="true"]');
  alphaInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    });
  });

  // Digits only for phone fields
  const phoneInputs = document.querySelectorAll('input[data-phone="true"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstErrorField = null;

      const nameField = contactForm.querySelector('#contactName');
      const emailField = contactForm.querySelector('#contactEmail');
      const phoneField = contactForm.querySelector('#contactPhone');
      const subjectField = contactForm.querySelector('#contactSubject');
      const successAlert = document.getElementById('contactSuccessAlert');

      // Reset states
      [nameField, emailField, phoneField, subjectField].forEach(f => f && f.classList.remove('is-invalid'));

      // Validate Name (Alphabets only)
      if (!nameField.value.trim() || !/^[A-Za-z\s]+$/.test(nameField.value.trim())) {
        nameField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = nameField;
      }

      // Validate Email
      if (!emailField.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        emailField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = emailField;
      }

      // Validate Phone (Exactly 10 digits)
      if (!phoneField.value.trim() || !/^\d{10}$/.test(phoneField.value.trim())) {
        phoneField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = phoneField;
      }

      // Validate Subject
      if (!subjectField.value.trim()) {
        subjectField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = subjectField;
      }

      if (!isValid) {
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Success
      if (successAlert) {
        successAlert.style.display = 'block';
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }

  // Sign In Form
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstErrorField = null;

      const emailField = document.getElementById('loginEmail');
      const passField = document.getElementById('loginPassword');
      const roleField = document.getElementById('loginRole');

      [emailField, passField, roleField].forEach(f => f && f.classList.remove('is-invalid'));

      if (!emailField.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        emailField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = emailField;
      }

      if (!passField.value || passField.value.length < 6) {
        passField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = passField;
      }

      if (!roleField.value) {
        roleField.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = roleField;
      }

      if (!isValid) {
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Save user session to localStorage
      const userSession = {
        email: emailField.value.trim(),
        role: roleField.value,
        name: emailField.value.split('@')[0].replace(/[._]/g, ' '),
        loginTimestamp: new Date().toISOString(),
        isLoggedIn: true
      };
      localStorage.setItem('currentUser', JSON.stringify(userSession));
      localStorage.setItem('role', roleField.value);

      window.location.href = 'dashboard.html';
    });
  }

  // Sign Up / Register Form
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstErrorField = null;

      const firstName = document.getElementById('regFirstName');
      const lastName = document.getElementById('regLastName');
      const email = document.getElementById('regEmail');
      const phone = document.getElementById('regPhone');
      const pass = document.getElementById('registerPassword');
      const confirmPass = document.getElementById('regConfirmPassword');
      const role = document.getElementById('regRole');
      const termsCheck = document.getElementById('regTerms');
      const successBanner = document.getElementById('regSuccessBanner');

      [firstName, lastName, email, phone, pass, confirmPass, role, termsCheck].forEach(f => {
        if (f) f.classList.remove('is-invalid');
      });

      if (!firstName.value.trim() || !/^[A-Za-z\s]+$/.test(firstName.value.trim())) {
        firstName.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = firstName;
      }

      if (!lastName.value.trim() || !/^[A-Za-z\s]+$/.test(lastName.value.trim())) {
        lastName.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = lastName;
      }

      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = email;
      }

      if (!phone.value.trim() || !/^\d{10}$/.test(phone.value.trim())) {
        phone.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = phone;
      }

      // Password requirement (upper, lower, digit, special, min 8)
      const passVal = pass.value;
      const passStrong = passVal.length >= 8 && /[A-Z]/.test(passVal) && /[a-z]/.test(passVal) && /[0-9]/.test(passVal) && /[^A-Za-z0-9]/.test(passVal);
      if (!passStrong) {
        pass.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = pass;
      }

      if (confirmPass.value !== passVal || !confirmPass.value) {
        confirmPass.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = confirmPass;
      }

      if (!role.value) {
        role.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = role;
      }

      if (!termsCheck.checked) {
        termsCheck.classList.add('is-invalid');
        isValid = false;
        if (!firstErrorField) firstErrorField = termsCheck;
      }

      if (!isValid) {
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Save user to localStorage.users array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        name: `${firstName.value.trim()} ${lastName.value.trim()}`,
        email: email.value.trim(),
        role: role.value,
        phone: phone.value.trim(),
        createdAt: new Date().toISOString()
      };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.scrollIntoView({ behavior: 'smooth' });
      }

      setTimeout(() => {
        window.location.href = 'sign-in.html';
      }, 1500);
    });
  }
}

/* ==========================================================================
   10. DASHBOARD PORTAL LOGIC
   ========================================================================== */
function initDashboard() {
  const dashContainer = document.querySelector('.dashboard-layout');
  if (!dashContainer) return;

  // Verify authentication
  const sessionStr = localStorage.getItem('currentUser');
  if (!sessionStr) {
    // Demo seed fallback if testing directly
    const demoUser = {
      name: 'Alexander Wright',
      email: 'a.wright@firmchambers.com',
      role: 'Managing Partner',
      loginTimestamp: new Date().toISOString(),
      isLoggedIn: true
    };
    localStorage.setItem('currentUser', JSON.stringify(demoUser));
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userRole = currentUser.role || 'Managing Partner';
  const userName = currentUser.name || 'Counsel';

  // Update DOM elements
  const nameEl = document.getElementById('dashUserName');
  const roleEl = document.getElementById('dashUserRole');
  const avatarEl = document.getElementById('dashUserAvatar');

  if (nameEl) nameEl.textContent = userName;
  if (roleEl) roleEl.textContent = userRole;
  if (avatarEl) {
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    avatarEl.textContent = initials || 'SC';
  }

  // Dynamic role-based statistics adaptation
  const roleKpis = {
    'Managing Partner': { kpi1: '48', kpi2: '99.4%', kpi3: '164 hrs', kpi4: '$1.42M' },
    'Corporate Counsel': { kpi1: '14', kpi2: '98.8%', kpi3: '86 hrs', kpi4: '$450K' },
    'Enterprise Client': { kpi1: '6', kpi2: '100%', kpi3: '22 hrs', kpi4: '$180K' },
    'Legal Associate': { kpi1: '28', kpi2: '97.5%', kpi3: '142 hrs', kpi4: '$290K' }
  };

  const currentKpi = roleKpis[userRole] || roleKpis['Managing Partner'];
  const kpi1El = document.getElementById('kpiVal1');
  const kpi2El = document.getElementById('kpiVal2');
  const kpi3El = document.getElementById('kpiVal3');
  const kpi4El = document.getElementById('kpiVal4');

  if (kpi1El) kpi1El.textContent = currentKpi.kpi1;
  if (kpi2El) kpi2El.textContent = currentKpi.kpi2;
  if (kpi3El) kpi3El.textContent = currentKpi.kpi3;
  if (kpi4El) kpi4El.textContent = currentKpi.kpi4;

  // Sidebar toggle for mobile/collapse
  const sidebar = document.querySelector('.dash-sidebar');
  const sidebarToggle = document.getElementById('sidebarToggleBtn');
  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Sign out handler
  const signOutBtn = document.getElementById('dashSignOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('role');
      window.location.href = 'sign-in.html';
    });
  }

  // Legal Matters Table Search & Filter
  const tableSearch = document.getElementById('tableSearchInput');
  const statusFilter = document.getElementById('tableStatusFilter');
  const tableRows = document.querySelectorAll('.custom-table tbody tr');

  function filterTable() {
    const query = tableSearch ? tableSearch.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value.toLowerCase() : 'all';

    tableRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowStatus = (row.getAttribute('data-status') || '').toLowerCase();

      const matchesQuery = !query || text.includes(query);
      const matchesStatus = status === 'all' || rowStatus === status;

      row.style.display = matchesQuery && matchesStatus ? '' : 'none';
    });
  }

  if (tableSearch) tableSearch.addEventListener('input', filterTable);
  if (statusFilter) statusFilter.addEventListener('change', filterTable);
}

