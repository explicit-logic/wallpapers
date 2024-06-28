
let imageIndex = localStorage.getItem('background') ? Number(localStorage.getItem('background')) : 0;

function importAll(r) {
  return r.keys().reverse().map(r);
}

const images = importAll(require.context('./photos', true, /\.(png|jpe?g)$/i));

document.documentElement.style.backgroundRepeat = "no-repeat";
document.documentElement.style.backgroundPosition = "center";
document.documentElement.style.backgroundAttachment = "fixed";
document.documentElement.style.backgroundSize = "cover";
document.documentElement.style.height = "100%";
document.documentElement.style.overflow = "hidden";

function applyBackgroundImage(url) {
  document.documentElement.style.backgroundImage = `url('${url}')`;
}

function preloadImage(url) {
  var img=new Image();
  img.src=url;
}

function applyCurrentImage() {
  const url = images[imageIndex];

  const nextUrl = images[imageIndex + 1] ?? images[0];
  preloadImage(nextUrl);

  applyBackgroundImage(url);
}

applyCurrentImage();

function nextImage() {
  nextIndex();

  applyCurrentImage();
}

function nextIndex() {
  if (imageIndex < images.length - 1) {
    imageIndex += 1;
  } else {
    imageIndex = 0;
  }

  localStorage.setItem('background', imageIndex);
}

async function downloadImage() {
  const imageSrc = images[imageIndex];
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = Date.now();
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const nextButton = document.getElementById('next-button');
const downloadButton = document.getElementById('download-button');

downloadButton.addEventListener("click", downloadImage);
nextButton.addEventListener("click", nextImage);
