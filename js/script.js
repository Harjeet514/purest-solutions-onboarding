/* =====================================================
   Purest Solutions — Onboarding (3 splash screens)
   =====================================================
   Notes for devs:
   - Vanilla JS, no dependencies. Swap for your framework's
     carousel/stepper component if the app already uses one
     (e.g. a React onboarding library) rather than porting
     this logic directly.
   - Sign Up button currently just logs to console — wire it
     to your actual signup route/flow.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('track');
  const dots = Array.from(document.querySelectorAll('.dot'));
  const totalSlides = dots.length;
  let currentSlide = 0;

  // Moves the track to show `index` and updates which dot is active.
  function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // Clicking a dot jumps straight to that slide.
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goToSlide(Number(dot.dataset.index));
    });
  });

  // --- Swipe support (touch) ---
  // Tracks the horizontal distance of a touch gesture and
  // advances/goes back a slide if the swipe was long enough.
  let touchStartX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    const SWIPE_THRESHOLD = 50; // px — ignore small accidental drags

    if (delta > SWIPE_THRESHOLD) {
      goToSlide(currentSlide - 1); // swiped right -> previous slide
    } else if (delta < -SWIPE_THRESHOLD) {
      goToSlide(currentSlide + 1); // swiped left -> next slide
    }
  });

  // Sign Up button on the final slide -> starts the skin profile flow
  const signupBtn = document.querySelector('.signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      window.location.href = 'skin-profile.html';
    });
  }

  // ---------------------------------------------------
  // Skin Profile screen (skin-profile.html only —
  // these elements don't exist on other pages, so each
  // block checks the element exists before wiring it up)
  // ---------------------------------------------------

  // Age slider: update the "23 years" label live as it's dragged
  const ageSlider = document.getElementById('ageRange');
  const ageValue = document.getElementById('ageValue');
  if (ageSlider && ageValue) {
    ageSlider.addEventListener('input', () => {
      ageValue.textContent = `${ageSlider.value} years`;
    });
  }

  // Form submit: prevent the default page reload, show the
  // photo/selfie choice modal instead
  const profileForm = document.getElementById('profileForm');
  const photoModal = document.getElementById('photoModal');
  if (profileForm && photoModal) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: send form data to your backend/state here before
      // showing the modal, e.g. saveProfileData(new FormData(profileForm))
      photoModal.hidden = false;
    });

    // Modal choice: "Take a selfie" -> selfie-instructions.html
    const selfieOption = document.getElementById('selfieOption');
    if (selfieOption) {
      selfieOption.addEventListener('click', () => {
        window.location.href = 'selfie-instructions.html';
      });
    }

    // Modal choice: "Upload your photo" -> photo-instructions.html
    const uploadOption = document.getElementById('uploadOption');
    if (uploadOption) {
      uploadOption.addEventListener('click', () => {
        window.location.href = 'photo-instructions.html';
      });
    }

    // Close modal if the dark overlay (outside the box) is clicked
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        photoModal.hidden = true;
      }
    });
  }

  // ---------------------------------------------------
  // Instructions screens — "Upload a photo" / "Take a selfie"
  // buttons at the bottom. Placeholder actions for now.
  // ---------------------------------------------------
  const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
  if (uploadPhotoBtn) {
    uploadPhotoBtn.addEventListener('click', () => {
      // TODO: trigger real file picker / camera roll access
      alert('Opening photo upload');
    });
  }

  const takeSelfieBtn = document.getElementById('takeSelfieBtn');
  if (takeSelfieBtn) {
    takeSelfieBtn.addEventListener('click', () => {
      window.location.href = 'face-scan.html';
    });
  }

  // ---------------------------------------------------
  // Face Scan screen (face-scan.html) — 3-state flow:
  // 1. Positioning guide (status chips) -> tap to capture
  // 2. Review captured photo -> Retake or Continue
  // 3. Analyzing -> progress bar -> next screen
  // ---------------------------------------------------
  const scanTitle = document.getElementById('scanTitle');
  const statusRow = document.getElementById('statusRow');
  const reviewActions = document.getElementById('reviewActions');
  const analyzingPanel = document.getElementById('analyzingPanel');
  const captureHint = document.getElementById('captureHint');
  const faceMesh = document.getElementById('faceMesh');
  const progressFill = document.getElementById('progressFill');

  if (captureHint) {
    // State 1 -> State 2: capture the photo, show review actions
    captureHint.addEventListener('click', () => {
      statusRow.hidden = true;
      captureHint.hidden = true;
      reviewActions.hidden = false;
      scanTitle.textContent = 'Click your photo';
    });

    // State 2: Retake -> back to State 1
    document.getElementById('retakeBtn').addEventListener('click', () => {
      reviewActions.hidden = true;
      statusRow.hidden = false;
      captureHint.hidden = false;
    });

    // State 2 -> State 3: Continue -> start analyzing
    document.getElementById('continueBtn').addEventListener('click', () => {
      reviewActions.hidden = true;
      analyzingPanel.hidden = false;
      faceMesh.classList.add('visible');
      scanTitle.textContent = 'Analyzing your face';
      runAnalyzingProgress();
    });

    // Cancel during analyzing -> back to State 1
    document.getElementById('cancelBtn').addEventListener('click', () => {
      analyzingPanel.hidden = true;
      faceMesh.classList.remove('visible');
      statusRow.hidden = false;
      captureHint.hidden = false;
      progressFill.style.width = '0%';
      scanTitle.textContent = 'Click your photo';
    });
  }

  // Simulates an analysis progress bar filling over ~2.5s, then
  // moves to the next screen. Replace with real progress from your
  // actual AI scan API call.
  function runAnalyzingProgress() {
    let pct = 0;
    progressFill.style.width = '0%';
    const interval = setInterval(() => {
      pct += 4;
      progressFill.style.width = `${Math.min(pct, 100)}%`;
      if (pct >= 100) {
        clearInterval(interval);
        window.location.href = 'skin-results.html';
      }
    }, 100);
  }

  // ---------------------------------------------------
  // Skin Results screen (skin-results.html) — tapping a
  // concern icon switches which markers show on the photo
  // and which icon is highlighted as active.
  // ---------------------------------------------------
  const concernItems = document.querySelectorAll('.concern-item');
  const markers = document.querySelectorAll('.marker');

  if (concernItems.length) {
    concernItems.forEach((item) => {
      item.addEventListener('click', () => {
        const selected = item.dataset.concern;

        // Update active state on the icon row
        concernItems.forEach((i) => i.classList.toggle('active', i === item));

        // Scroll the selected concern into the leading visible
        // position — matches the behavior seen in the Figma
        // screenshots, where the active concern's icon always
        // appears first/leftmost in the row.
        item.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });

        // Show only the markers matching the selected concern
        markers.forEach((marker) => {
          marker.hidden = marker.dataset.concern !== selected;
        });
      });
    });

    // "See full report" / "Recommended products"
    const fullReportBtn = document.getElementById('fullReportBtn');
    if (fullReportBtn) {
      fullReportBtn.addEventListener('click', () => {
        window.location.href = 'full-skin-report.html';
      });
    }

    const recommendedBtn = document.getElementById('recommendedBtn');
    if (recommendedBtn) {
      recommendedBtn.addEventListener('click', () => {
        window.location.href = 'recommended-products.html';
      });
    }
  }

  // ---------------------------------------------------
  // Full Skin Report screen (full-skin-report.html) —
  // draws the "Skin matrix" radar chart from confirmed
  // concern scores. Data-driven so new concerns can be
  // added to this array as their scores get confirmed.
  // ---------------------------------------------------
  const radarChart = document.getElementById('radarChart');
  if (radarChart) {
    const concernData = [
      { label: 'Radiance', score: 84 },
      { label: 'Redness', score: 88 },
      { label: 'Hydration', score: 64 },
      { label: 'Oiliness', score: 85 },
      { label: 'Dark Circles', score: 80 },
      { label: 'Pores', score: 68 },
      { label: 'Wrinkles', score: 87 },
      { label: 'Eyebags', score: 88 },
    ];

    buildRadarChart(radarChart, concernData);
  }

  function buildRadarChart(svg, data) {
    const size = 220;
    const center = size / 2;
    const maxRadius = 78;
    const axisCount = data.length;
    const svgNS = 'http://www.w3.org/2000/svg';

    // Point on the chart for a given axis index and value (0-100),
    // starting at 12 o'clock and going clockwise — standard
    // radar/spider chart layout.
    function pointFor(index, value) {
      const angle = (Math.PI * 2 * index) / axisCount - Math.PI / 2;
      const r = (value / 100) * maxRadius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle),
      };
    }

    // Background rings (25/50/75/100%) give the chart a visual
    // scale to read values against.
    [0.25, 0.5, 0.75, 1].forEach((frac) => {
      const ring = document.createElementNS(svgNS, 'circle');
      ring.setAttribute('cx', center);
      ring.setAttribute('cy', center);
      ring.setAttribute('r', maxRadius * frac);
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', '#eee');
      ring.setAttribute('stroke-width', '1');
      svg.appendChild(ring);
    });

    // Axis lines + labels
    data.forEach((item, i) => {
      const outer = pointFor(i, 100);
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', center);
      line.setAttribute('y1', center);
      line.setAttribute('x2', outer.x);
      line.setAttribute('y2', outer.y);
      line.setAttribute('stroke', '#eee');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      const labelPoint = pointFor(i, 118);
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', labelPoint.x);
      text.setAttribute('y', labelPoint.y);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-size', '9');
      text.setAttribute('fill', '#777');
      text.textContent = item.label;
      svg.appendChild(text);
    });

    // Data polygon — the actual shape representing the scores
    const points = data
      .map((item, i) => {
        const p = pointFor(i, item.score);
        return `${p.x},${p.y}`;
      })
      .join(' ');

    const polygon = document.createElementNS(svgNS, 'polygon');
    polygon.setAttribute('points', points);
    polygon.setAttribute('fill', 'rgba(47,155,201,0.25)');
    polygon.setAttribute('stroke', '#2f9bc9');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);

    // Center score bubble — shows the overall Skin Health score
    const centerCircle = document.createElementNS(svgNS, 'circle');
    centerCircle.setAttribute('cx', center);
    centerCircle.setAttribute('cy', center);
    centerCircle.setAttribute('r', 16);
    centerCircle.setAttribute('fill', '#3a4a5c');
    svg.appendChild(centerCircle);

    const centerText = document.createElementNS(svgNS, 'text');
    centerText.setAttribute('x', center);
    centerText.setAttribute('y', center);
    centerText.setAttribute('text-anchor', 'middle');
    centerText.setAttribute('dominant-baseline', 'middle');
    centerText.setAttribute('font-size', '13');
    centerText.setAttribute('font-weight', '700');
    centerText.setAttribute('fill', '#fff');
    centerText.textContent = '71'; // TODO: pull from real Skin Health score
    svg.appendChild(centerText);
  }

  const compareBtn = document.getElementById('compareBtn');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      window.location.href = 'compare-results.html';
    });
  }

  // ---------------------------------------------------
  // Compare Results screen (compare-results.html) —
  // switching filter pills updates the Recent/Previous
  // slider values and insight text.
  //
  // NOTE: only "Overall" uses values matching the source
  // screenshot. Redness/Hydration/Dark Circles reuse each
  // concern's real *current* score for "Recent", but there's
  // no actual historical scan data yet, so "Previous" is an
  // illustrative placeholder — replace once real scan history
  // is available.
  // ---------------------------------------------------
  const compareFilters = document.getElementById('compareFilters');
  if (compareFilters) {
    const filterData = {
      overall: { recent: 78, previous: 25 },
      // Confirmed from a follow-up screenshot: for Redness, both
      // Recent and Previous sit in the "Good" range already (not a
      // bad→good swing like Overall) — values are approximate reads
      // from the chart, not exact confirmed numbers.
      redness: { recent: 88, previous: 82 },
      hydration: { recent: 64, previous: 30 },
      'dark-circles': { recent: 80, previous: 35 },
    };

    const recentDot = document.getElementById('recentDot');
    const previousDot = document.getElementById('previousDot');
    const pills = compareFilters.querySelectorAll('.filter-pill');

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.toggle('active', p === pill));

        const key = pill.dataset.filter;
        const values = filterData[key];
        if (values) {
          recentDot.style.left = `${values.recent}%`;
          recentDot.textContent = values.recent;
          previousDot.style.left = `${values.previous}%`;
          previousDot.textContent = values.previous;
        }
      });
    });
  }

  // Note: previewImagesLink now navigates via a real href to
  // preview-images.html — no JS handler needed.

  // ---------------------------------------------------
  // Previous Results date picker (previous-results-list.html)
  // ---------------------------------------------------
  const dateRows = document.querySelectorAll('.date-row');
  if (dateRows.length) {
    dateRows.forEach((row) => {
      row.addEventListener('click', () => {
        // TODO: pass the selected date back to compare-results.html
        // (e.g. via a query param or shared state) so the "Previous
        // result" section updates to reflect the chosen scan.
        window.location.href = 'compare-results.html';
      });
    });
  }

  // ---------------------------------------------------
  // Recommended Products screen (recommended-products.html)
  // ---------------------------------------------------
  const cartBtns = document.querySelectorAll('.cart-btn');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = btn.dataset.product;
      // TODO: replace with real add-to-cart logic (update cart
      // state, show a toast/confirmation, etc.)
      alert(`Added to cart: ${product}`);
    });
  });

  // ---------------------------------------------------
  // Product Details screen (product-details.html)
  // ---------------------------------------------------
  const pdTabs = document.getElementById('pdTabs');
  if (pdTabs) {
    const tabButtons = pdTabs.querySelectorAll('.pd-tab');
    const panels = document.querySelectorAll('.pd-tab-panel');

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => b.classList.toggle('active', b === btn));
        const target = btn.dataset.tab;
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.panel !== target;
        });
      });
    });

    // Shipping accordion — only one section open at a time
    const accordionHeaders = document.querySelectorAll('.pd-accordion-header');
    accordionHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const key = header.dataset.accordion;
        const body = document.querySelector(`[data-body="${key}"]`);
        const caret = header.querySelector('.pd-accordion-caret');
        const isOpen = !body.hidden;

        document.querySelectorAll('.pd-accordion-body').forEach((b) => { b.hidden = true; });
        document.querySelectorAll('.pd-accordion-caret').forEach((c) => { c.textContent = '▸'; });

        if (!isOpen) {
          body.hidden = false;
          caret.textContent = '▾';
        }
      });
    });

    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        const isActive = favoriteBtn.classList.toggle('active');
        favoriteBtn.textContent = isActive ? '♥' : '♡';
      });
    }
  }

  // ---------------------------------------------------
  // Reviews & Rating screen (reviews-rating.html)
  // ---------------------------------------------------
  const rrFilterRow = document.querySelector('.rr-filter-row');
  if (rrFilterRow) {
    const filterPills = rrFilterRow.querySelectorAll('.filter-pill');
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.toggle('active', p === pill));
        // TODO: filter the .rr-review list by rating/recency —
        // currently only updates the active pill styling
      });
    });
  }

  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      // TODO: load/reveal additional reviews
      alert('Loading more reviews');
    });
  }

  // ---------------------------------------------------
  // Write a Review screen (write-review.html)
  // ---------------------------------------------------
  const starRating = document.getElementById('starRating');
  if (starRating) {
    const starBtns = starRating.querySelectorAll('.star-btn');
    const ratingValue = document.getElementById('ratingValue');

    starBtns.forEach((star) => {
      star.addEventListener('click', () => {
        const value = Number(star.dataset.value);
        ratingValue.value = value;
        starBtns.forEach((s) => {
          const filled = Number(s.dataset.value) <= value;
          s.classList.toggle('filled', filled);
          s.textContent = filled ? '★' : '☆';
        });
      });
    });

    const reviewText = document.getElementById('reviewText');
    const charCount = document.getElementById('charCount');
    reviewText.addEventListener('input', () => {
      charCount.textContent = `${reviewText.value.length}/150`;
    });

    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: send the review data to your backend
      alert('Review submitted — thank you!');
    });
  }

});
