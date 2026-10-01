/**
 * ============================================================================
 * BIRTHDAY WEBSITE INTERACTIVE LOGIC (app.js - MINIMAL PALETTE EDITION)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let activeFilter = "all";
  let activeDept = null;
  let searchQuery = "";

  // Custom Palette for Confetti
  const PALETTE_CONFETTI_COLORS = [
    "#EA5E86", // Baby Shower
    "#EF6545", // Canned Tomato
    "#F49625", // Iced Tang
    "#57B1A8", // Bahamas Beach
    "#037F71", // Bali Pool
    "#AECFD0", // Dip at Twilight
    "#FFD094", // Beach Umbrella
    "#F9D4F8", // Baby Lavender
    "#FCC4C0", // Shortcake
    "#DDF2B8"  // Mint No Chip
  ];

  // DOM Elements
  const confettiCannonBtn = document.getElementById("confetti-cannon-btn");
  const toastTriggerBtn = document.getElementById("toast-trigger-btn");
  const grandToastBtn = document.getElementById("grand-toast-btn");
  const dockToastBtn = document.getElementById("dock-toast-btn");
  const dockTopBtn = document.getElementById("dock-top-btn");

  const pillarsGrid = document.getElementById("pillars-grid");
  const greetingsGrid = document.getElementById("greetings-grid");
  const filterTabs = document.querySelectorAll(".filter-tab");
  const searchInput = document.getElementById("greetings-search");
  const clearSearchBtn = document.getElementById("clear-search");
  const showingCount = document.getElementById("current-count");

  const spheresCluster = document.getElementById("spheres-cluster");
  const sphereLabel = document.getElementById("sphere-label");
  const sphereText = document.getElementById("sphere-text");

  const milestonesGrid = document.getElementById("milestones-grid");
  const addWishForm = document.getElementById("add-wish-form");
  const liveNotesWall = document.getElementById("live-notes-wall");

  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");

  // ==========================================================================
  // 1. CONFETTI GENERATOR (Minimal & Elegant with Exact Palette)
  // ==========================================================================
  function launchPaletteConfetti(opts = {}) {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: PALETTE_CONFETTI_COLORS,
        disableForReducedMotion: true,
        ...opts
      });
    }
  }

  function launchGrandCelebration() {
    if (typeof confetti !== "function") return;

    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      colors: PALETTE_CONFETTI_COLORS
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.1 });
  }

  if (confettiCannonBtn) confettiCannonBtn.addEventListener("click", () => launchPaletteConfetti());
  if (toastTriggerBtn) toastTriggerBtn.addEventListener("click", () => launchGrandCelebration());
  if (grandToastBtn) grandToastBtn.addEventListener("click", () => launchGrandCelebration());
  if (dockToastBtn) dockToastBtn.addEventListener("click", () => launchGrandCelebration());
  if (dockTopBtn) dockTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // ==========================================================================
  // 2. RENDER LEADERSHIP PILLARS
  // ==========================================================================
  function renderPillars() {
    if (!pillarsGrid || typeof awardsData === "undefined") return;
    pillarsGrid.innerHTML = awardsData.map(item => `
      <div class="pillar-card">
        <div class="pillar-top">
          <span class="pillar-code">${item.code}</span>
          <span class="pillar-tag" style="background-color: ${item.color};">${item.tag}</span>
        </div>
        <h3 class="pillar-title">${item.title}</h3>
        <p class="pillar-desc">${item.desc}</p>
      </div>
    `).join("");
  }

  // ==========================================================================
  // 3. RENDER 22 GREETINGS WITH SEARCH & FILTER
  // ==========================================================================
  function renderGreetings() {
    if (!greetingsGrid || typeof greetingsData === "undefined") return;

    const filtered = greetingsData.filter(item => {
      const matchFilter = activeFilter === "all" || item.category === activeFilter;
      const matchDept = !activeDept || item.dept === activeDept;
      const matchSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery) ||
        item.role.toLowerCase().includes(searchQuery) ||
        item.dept.toLowerCase().includes(searchQuery) ||
        item.message.toLowerCase().includes(searchQuery) ||
        item.quote.toLowerCase().includes(searchQuery);

      return matchFilter && matchDept && matchSearch;
    });

    if (showingCount) {
      showingCount.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      greetingsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-weight: 600;">No greetings matched your criteria.</p>
        </div>
      `;
      return;
    }

    greetingsGrid.innerHTML = filtered.map(item => `
      <div class="greeting-card" data-id="${item.id}" onclick="window.openGreetingModal(${item.id})">
        <div class="card-top">
          <div class="card-monogram" style="background-color: ${item.color};">
            ${item.initials}
          </div>
          <div class="card-meta">
            <h4 class="card-name">${item.name}</h4>
            <div class="card-role">${item.role} &bull; ${item.dept}</div>
          </div>
        </div>

        <div class="card-quote-box">
          <p class="card-quote">“${item.quote}”</p>
        </div>

        <p class="card-message-snippet">${item.message}</p>

        <div class="card-bottom" onclick="event.stopPropagation()">
          <span class="card-stamp">${item.stamp}</span>
          <button class="card-like-btn" onclick="window.likeGreeting(event, ${item.id})">
            Like (<span id="heart-count-${item.id}">${item.hearts}</span>)
          </button>
        </div>
      </div>
    `).join("");
  }

  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filterType = tab.getAttribute("data-filter");
      const deptType = tab.getAttribute("data-dept");

      if (filterType) {
        activeFilter = filterType;
        activeDept = null;
      } else if (deptType) {
        activeFilter = "all";
        activeDept = deptType;
      }

      renderGreetings();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        if (searchQuery) {
          clearSearchBtn.classList.remove("hidden");
        } else {
          clearSearchBtn.classList.add("hidden");
        }
      }
      renderGreetings();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      clearSearchBtn.classList.add("hidden");
      renderGreetings();
    });
  }

  // Like Action
  window.likeGreeting = (e, id) => {
    e.stopPropagation();
    const item = greetingsData.find(g => g.id === id);
    if (!item) return;

    item.hearts += 1;
    const countEl = document.getElementById(`heart-count-${id}`);
    if (countEl) countEl.textContent = item.hearts;

    const modalCountEl = document.getElementById("modal-like-count");
    if (modalCountEl && modalOverlay && !modalOverlay.classList.contains("hidden")) {
      modalCountEl.textContent = item.hearts;
    }

    launchPaletteConfetti({
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      particleCount: 20
    });
  };

  // ==========================================================================
  // 4. DETAIL MODAL
  // ==========================================================================
  window.openGreetingModal = (id) => {
    const item = greetingsData.find(g => g.id === id);
    if (!item) return;

    document.getElementById("modal-monogram").textContent = item.initials;
    document.getElementById("modal-monogram").style.backgroundColor = item.color;
    document.getElementById("modal-name").textContent = item.name;
    document.getElementById("modal-role").textContent = `${item.role} • ${item.dept}`;
    document.getElementById("modal-quote").textContent = `“${item.quote}”`;
    document.getElementById("modal-message").textContent = item.message;
    document.getElementById("modal-stamp").textContent = item.stamp;
    document.getElementById("modal-like-count").textContent = item.hearts;

    const likeBtn = document.getElementById("modal-like-btn");
    likeBtn.onclick = (e) => window.likeGreeting(e, id);

    modalOverlay.classList.remove("hidden");
  };

  if (modalClose) {
    modalClose.addEventListener("click", () => modalOverlay.classList.add("hidden"));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.add("hidden");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && !modalOverlay.classList.contains("hidden")) {
      modalOverlay.classList.add("hidden");
    }
  });

  // ==========================================================================
  // 5. INTERACTIVE PALETTE SPHERES
  // ==========================================================================
  function renderSpheres() {
    if (!spheresCluster || typeof paletteSpheres === "undefined") return;

    spheresCluster.innerHTML = paletteSpheres.map((item, idx) => `
      <div class="palette-circle" 
           style="background-color: ${item.hex};" 
           onclick="window.selectSphere(${idx})" 
           title="${item.name}">
      </div>
    `).join("");
  }

  window.selectSphere = (idx) => {
    const item = paletteSpheres[idx];
    if (!item) return;

    if (sphereLabel) sphereLabel.textContent = `${item.name} (${item.hex})`;
    if (sphereText) sphereText.textContent = item.text;

    launchPaletteConfetti({
      colors: [item.hex, "#422F0E", "#FAF6EE"],
      particleCount: 25
    });
  };

  // ==========================================================================
  // 6. MILESTONES ARCHIVE
  // ==========================================================================
  function renderMilestones() {
    if (!milestonesGrid || typeof milestoneNotes === "undefined") return;

    milestonesGrid.innerHTML = milestoneNotes.map(item => `
      <div class="milestone-item" style="border-top: 3px solid ${item.accent};">
        <span class="milestone-code">${item.code}</span>
        <h4 class="milestone-title">${item.title}</h4>
        <div class="milestone-subtitle">${item.subtitle}</div>
        <p class="milestone-caption">${item.caption}</p>
      </div>
    `).join("");
  }

  // ==========================================================================
  // 7. GUESTBOOK / LIVE NOTES
  // ==========================================================================
  if (addWishForm) {
    addWishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("wish-name");
      const colorInput = document.getElementById("wish-color");
      const msgInput = document.getElementById("wish-message");

      const name = nameInput.value.trim();
      const color = colorInput.value;
      const msg = msgInput.value.trim();

      if (!name || !msg) return;

      const card = document.createElement("div");
      card.className = "live-note-card";
      card.style.borderLeftColor = color;
      card.innerHTML = `
        <div class="note-header">
          <span class="note-author">${name}</span>
          <span class="note-time">Just now</span>
        </div>
        <p class="note-body">“${msg}”</p>
      `;

      if (liveNotesWall) {
        liveNotesWall.prepend(card);
      }

      launchPaletteConfetti({ colors: [color, "#422F0E"] });

      nameInput.value = "";
      msgInput.value = "";
    });
  }

  // Default initial note
  if (liveNotesWall) {
    const defaultNote = document.createElement("div");
    defaultNote.className = "live-note-card";
    defaultNote.style.borderLeftColor = "#57B1A8";
    defaultNote.innerHTML = `
      <div class="note-header">
        <span class="note-author">The Collective Team</span>
        <span class="note-time">Today</span>
      </div>
      <p class="note-body">“Thank you for being the calm compass and driving force behind all 22 of us.”</p>
    `;
    liveNotesWall.appendChild(defaultNote);
  }

  // Initial renders
  renderPillars();
  renderGreetings();
  renderSpheres();
  renderMilestones();
});
