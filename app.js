const categorySelect = document.getElementById('categorySelect');
const jokeBtn = document.getElementById('jokeBtn');
const jokeText = document.getElementById('jokeText');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');

const API_URL = 'https://v2.jokeapi.dev/joke/';

async function fetchJoke() {
  const category = categorySelect.value;
  const url = category === 'Any' ? `${API_URL}Any?type=single` : `${API_URL}${category}?type=single`;

  jokeBtn.disabled = true;
  jokeBtn.textContent = 'Loading...';
  jokeText.textContent = 'Fetching a joke...';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.type === 'single') {
      jokeText.textContent = data.joke;
    } else if (data.type === 'twopart') {
      jokeText.textContent = `${data.setup} ${data.delivery}`;
    } else {
      jokeText.textContent = 'No joke found. Try another category.';
    }
  } catch (error) {
    jokeText.textContent = 'Something went wrong while fetching the joke. Please try again.';
    console.error(error);
  } finally {
    jokeBtn.disabled = false;
    jokeBtn.textContent = 'Get a joke';
  }
}

async function copyJoke() {
  const text = jokeText.textContent.trim();
  if (!text || text.includes('Fetching') || text.includes('No joke') || text.includes('Something went wrong')) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1200);
  } catch (error) {
    console.error('Copy failed', error);
  }
}

async function shareJoke() {
  const text = jokeText.textContent.trim();
  if (!text || text.includes('Fetching') || text.includes('No joke') || text.includes('Something went wrong')) {
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Random Joke',
        text,
      });
    } catch (error) {
      console.error('Share cancelled or failed', error);
    }
  } else {
    await navigator.clipboard.writeText(text);
    shareBtn.textContent = 'Copied for sharing';
    setTimeout(() => {
      shareBtn.textContent = 'Share';
    }, 1200);
  }
}

jokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);
shareBtn.addEventListener('click', shareJoke);

fetchJoke();
