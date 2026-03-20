const templateCards = document.querySelectorAll('.template-card');
const okButton = document.getElementById('okButton');
const assetImages = document.querySelectorAll('img[data-candidates]');

async function resolveAsset(img) {
  const candidates = (img.dataset.candidates || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    // eslint-disable-next-line no-await-in-loop
    const exists = await new Promise((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve(true);
      probe.onerror = () => resolve(false);
      probe.src = candidate;
    });

    if (exists) {
      img.src = candidate;
      img.classList.remove('asset-missing');
      return;
    }
  }

  img.classList.add('asset-missing');
  img.alt = `${img.alt} (asset belum ditemukan)`;
}

assetImages.forEach((img) => {
  resolveAsset(img);
});

for (const card of templateCards) {
  card.addEventListener('click', () => {
    for (const item of templateCards) {
      item.classList.remove('selected');
    }
    card.classList.add('selected');
  });
}

okButton.addEventListener('click', () => {
  const selectedIndex = [...templateCards].findIndex((card) => card.classList.contains('selected')) + 1;
  console.log(`Template kartu terpilih: ${selectedIndex}`);
});
