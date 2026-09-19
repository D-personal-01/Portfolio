document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.section').forEach((section) => observer.observe(section));

const gallery = document.querySelector('.certificate-gallery');
if (gallery) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  gallery.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      gallery.scrollLeft += event.deltaY;
    }
  }, { passive: false });

  gallery.addEventListener('pointerdown', (event) => {
    isDown = true;
    startX = event.clientX;
    startScroll = gallery.scrollLeft;
    gallery.classList.add('is-dragging');
    gallery.setPointerCapture(event.pointerId);
  });
  gallery.addEventListener('pointermove', (event) => {
    if (isDown) gallery.scrollLeft = startScroll - (event.clientX - startX);
  });
  ['pointerup', 'pointercancel'].forEach((name) => gallery.addEventListener(name, () => {
    isDown = false;
    gallery.classList.remove('is-dragging');
  }));
}
