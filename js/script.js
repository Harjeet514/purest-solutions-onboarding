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

  // Sign Up button on the final slide.
  const signupBtn = document.querySelector('.signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      // TODO: replace with real navigation to your sign-up screen
      alert('Navigating to Sign Up screen');
    });
  }

});
