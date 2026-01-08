let currentSlide = 0;

function moveSlide(direction) {
  const slides = document.querySelector('.slides');
  const totalSlides = slides.children.length;
  const slidesToShow = 2;
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentSlide * (100 / slidesToShow)}%)`;
}

function autoSlide() {
  moveSlide(1);
}

setInterval(autoSlide, 5000); // Change slide every 5 seconds