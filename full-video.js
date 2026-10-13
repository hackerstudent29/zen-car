const video = document.getElementById('full-video');
const overlay = document.getElementById('enter-overlay');

overlay.addEventListener('click', () => {
  // Request full screen for maximum immersion
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(err => console.log(err));
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  }

  // Ensure volume is on and high quality
  video.muted = false;
  video.volume = 1.0;

  // Start the video and audio
  video.play().then(() => {
    // Fade out overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 500);
  }).catch(err => {
    console.error("Autoplay prevented or video failed to play:", err);
  });
});

const switcherBtns = document.querySelectorAll('.vid-btn');

switcherBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switcherBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const newSrc = btn.getAttribute('data-vid');
    const source = video.querySelector('source');
    if (source) {
      source.src = newSrc;
      video.load();
      video.play().catch(e => console.error("Video swap play failed", e));
    }
  });
});
