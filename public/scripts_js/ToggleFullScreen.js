export default function ToggleFullscreen(isFullscreen) {
  if (!isFullscreen) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

function openFullscreen() {
  const doc = document.documentElement;

  if (doc.requestFullscreen) {
    doc.requestFullscreen();
  } else if (doc.webkitRequestFullscreen) {
    doc.webkitRequestFullscreen(); // Safari
  } else if (doc.msRequestFullscreen) {
    doc.msRequestFullscreen(); // IE11
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen(); // Safari
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen(); // IE11
  }
}
