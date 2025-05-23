document.addEventListener('DOMContentLoaded', () => {
  fetch('js/data.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('artifact-cards');
      data.artifacts.forEach(artifact => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <img src="${artifact.image}" alt="${artifact.title}" />
          <h3>${artifact.title}</h3>
          <p>${artifact.description}</p>
          <small>Регион: ${artifact.region}</small>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Ошибка при загрузке артефактов:', err);
    });
});

function openRegion(regionName) {
  const encoded = encodeURIComponent(regionName);
  window.location.href = `region.html?region=${encoded}`;
}