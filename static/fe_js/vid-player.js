
/* Get our elements */ 


const player       =  document.querySelector('.player');

const video        =  player.querySelector('.viewer');

const progress     =  player.querySelector('.progress');
const progressBar  =  player.querySelector('.progress__filled');

const toggle       =  player.querySelector('.toggle');
const skipButtons  =  player.querySelectorAll('[data-skip]');
const ranges       =  player.querySelectorAll('.player__slider');

const current      =  player.querySelector('.current');
const duration     =  player.querySelector('.duration');
const fullscreen   =  player.querySelector('.fullscreen-btn');




/* Build out functions */ 


// toggle play/pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Detect press of spacebar, toggle play
function detectKeypress(e) {
	if (e.keyCode == 32) {
	  togglePlay();
	} else {
      return;
	}
}

// Update button on play/pause
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Allow for video skipping
function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

// Handle the range of the video
function handleRangeUpdate() {
	video[this.name] = this.value;
}

// Track how far the video has progressed and create css
// variable so that we can visually represent it 
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

// Allow for video scrubbing
function scrub(e) {
 const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
 video.currentTime = scrubTime;
 console.log(currentTime);
}


// Get currnet time of video and append correct amount of 0s
function currentTime() { 
   	var curmins = Math.floor(video.currentTime / 60);
	var cursecs = Math.floor(video.currentTime - curmins * 60);
	var durmins = Math.floor(video.duration / 60);
	var dursecs = Math.floor(video.duration - durmins * 60);
	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	current.innerHTML = curmins+":"+cursecs;
	duration.innerHTML = durmins+":"+dursecs;
}

// Create fullscreen video button
function toggleFullscreen() {
	if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}




/* Hook up the event listeners */ 


// Click events
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', toggleFullscreen);

// Keypress (Play/Pause)
window.addEventListener('keydown', detectKeypress);

// Play/Pause events 
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Do these on time update
video.addEventListener('timeupdate', currentTime);
video.addEventListener('timeupdate', handleProgress);

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Detect how far mouse has moved
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Track scrubbing 
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// Track when mouse is up/down on scrub bar
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

