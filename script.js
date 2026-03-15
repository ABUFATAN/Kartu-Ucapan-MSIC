const templateCards = document.querySelectorAll('.template-card');
const okButton = document.getElementById('okButton');

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
