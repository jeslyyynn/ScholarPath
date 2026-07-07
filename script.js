const toggleButton = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.site-nav');
const iconMap = {
  'shield-check': '<path d="M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7l7-4Z"></path><path d="m9.5 12 1.5 1.5 3.5-3.5"></path>',
  'external-link': '<path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M21 14v6H3V3h6"></path>',
  'message-circle': '<path d="M7.9 18.1 4 20l1.9-3.9A8 8 0 1 1 7.9 18.1Z"></path>',
  'target': '<circle cx="12" cy="12" r="8"></circle><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M2 12h4"></path><path d="M18 12h4"></path>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path>',
  'lightbulb': '<path d="M9 18h6"></path><path d="M10 14.5a4.5 4.5 0 1 1 4 0"></path><path d="M10 14.5V12"></path><path d="M14 14.5V12"></path><path d="M12 3a2 2 0 0 0-2 2"></path>',
  'graduation-cap': '<path d="M12 3 2 7l10 4 10-4-10-4Z"></path><path d="M4 10v4a2 2 0 0 0 1 1.7"></path><path d="M20 10v4a2 2 0 0 1-1 1.7"></path><path d="M12 17v4"></path>',
  'briefcase-business': '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><path d="M3 11h18"></path>',
  'clipboard-check': '<path d="M9 4h6"></path><path d="M8 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"></path><path d="m9 13 2 2 4-4"></path>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path><path d="M22 21v-2a4 4 0 0 0-3-3.9"></path><path d="M16 3.1a4 4 0 0 1 0 7.8"></path>',
  'trophy': '<path d="M8 4h8"></path><path d="M10 4v2a2 2 0 0 0 4 0V4"></path><path d="M7 8v2a5 5 0 0 0 10 0V8"></path><path d="M8 14h8"></path><path d="M12 14v4"></path><path d="M9 20h6"></path>',
  'heart-handshake': '<path d="M14 19a2 2 0 0 1-2 2 2 2 0 0 1-2-2"></path><path d="M8 11.5V8a2 2 0 0 1 4 0v1"></path><path d="M16 11.5V8a2 2 0 0 0-4 0v1"></path><path d="M6 16.5c0-2.5 2-4.5 4-4.5"></path><path d="M18 16.5c0-2.5-2-4.5-4-4.5"></path><path d="M12 20a4 4 0 0 0 4-4"></path>',
  'wallet-cards': '<path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path><path d="M3 10h20"></path><path d="M16 14h.01"></path>',
  'trending-up': '<path d="M3 17 9 11l4 4 8-8"></path><path d="M14 7h7v7"></path>',
  'check': '<path d="M20 6 9 17l-5-5"></path>'
};

function createIcon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = iconMap[name] || iconMap.check;
  return svg;
}

const iconTargets = document.querySelectorAll('[data-icon]');
iconTargets.forEach((element) => {
  const iconName = element.getAttribute('data-icon');
  if (iconName) {
    element.replaceChildren(createIcon(iconName));
  }
});

if (toggleButton && navMenu) {
  toggleButton.addEventListener('click', () => {
    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('open');
    }
    if (toggleButton) {
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
});

document.querySelectorAll('.chip-button[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const card = trigger.closest('.tip-card');
    const wasOpen = card ? card.classList.contains('open') : false;

    document.querySelectorAll('.tip-card.open').forEach((openCard) => {
      openCard.classList.remove('open');
      const openTrigger = openCard.querySelector('.accordion-trigger');
      if (openTrigger) {
        openTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    if (card && !wasOpen) {
      card.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

const checklistItems = document.querySelectorAll('.check-item');
const checklistProgress = document.querySelector('.checklist-progress');

checklistItems.forEach((item) => {
  item.addEventListener('click', () => {
    const isChecked = item.getAttribute('aria-checked') === 'true';
    item.setAttribute('aria-checked', String(!isChecked));
    item.classList.toggle('is-checked', !isChecked);

    if (checklistProgress) {
      const checkedCount = document.querySelectorAll('.check-item[aria-checked="true"]').length;
      checklistProgress.textContent = `${checkedCount} of ${checklistItems.length} prepared`;
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const activeLink = document.querySelector(`.site-nav a[href="${currentPage}"]`);
if (activeLink) {
  document.querySelectorAll('.site-nav a.active').forEach((link) => link.classList.remove('active'));
  activeLink.classList.add('active');
}

/* Chat opens in a new tab; no overlay logic required */
