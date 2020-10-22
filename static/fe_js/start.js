anime.timeline({loop: 1})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.login',
    opacity: 1,
    duration: 900,
    easing: "easeOutExpo",
    delay: 1000
  });