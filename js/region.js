function getRegionFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('region');
}

document.addEventListener('DOMContentLoaded', () => {
  const regionName = getRegionFromURL();
  const regionTitle = document.getElementById('region-title');
  const artifactList = document.getElementById('artifact-list');

  if (!regionName) {
    regionTitle.textContent = 'Регион не указан';
    return;
  }

  regionTitle.textContent = `Регион: ${regionName}`;

  fetch('js/data.json')
    .then(res => res.json())
    .then(data => {
      const artifacts = data.artifacts.filter(item => item.region === regionName);

      if (artifacts.length === 0) {
        artifactList.innerHTML = '<p>Артефакты не найдены.</p>';
        return;
      }

      artifacts.forEach(artifact => {
        const block = document.createElement('div');
        block.className = 'artifact';

        block.innerHTML = `
          <h3>${artifact.title}</h3>
          <p>${artifact.description}</p>
          <img src="${artifact.image}" alt="${artifact.title}" />
          ${artifact.model ? `<model-viewer class="artifact-model" src="${artifact.model}" alt="3D модель ${artifact.title}" auto-rotate camera-controls></model-viewer>` : ''}
        `;

        artifactList.appendChild(block);
      });
    });
});
