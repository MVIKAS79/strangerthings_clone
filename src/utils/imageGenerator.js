// Generate character card images dynamically
const characterColors = {
  'mike.png': { primary: '#FF6B6B', secondary: '#FFE66D', name: 'Mike' },
  'eleven.png': { primary: '#4ECDC4', secondary: '#95E1D3', name: 'El' },
  'dustin.png': { primary: '#95E1D3', secondary: '#F38181', name: 'Dust' },
  'lucas.png': { primary: '#AA96DA', secondary: '#FCBAD3', name: 'Lucas' },
  'will.png': { primary: '#FFFFD2', secondary: '#FFB4D5', name: 'Will' },
  'nancy.png': { primary: '#A8D8EA', secondary: '#AA96DA', name: 'Nancy' },
  'jonathan.png': { primary: '#FF7675', secondary: '#FD79A8', name: 'Jon' },
  'karen.png': { primary: '#FDCB6E', secondary: '#6C5CE7', name: 'Karen' },
  'hopper.png': { primary: '#1E90FF', secondary: '#FFD700', name: 'Hopper' },
  'max.png': { primary: '#FF6348', secondary: '#FFD93D', name: 'Max' },
  'steve.png': { primary: '#A29BFE', secondary: '#6C5CE7', name: 'Steve' },
  'robin.png': { primary: '#FF7675', secondary: '#A29BFE', name: 'Robin' },
  'demogorgon.png': { primary: '#2D3436', secondary: '#636E72', name: 'Demo' },
  'mindflayer.png': { primary: '#1B1B1B', secondary: '#2D3436', name: 'MF' },
  'brenner.png': { primary: '#636E72', secondary: '#2D3436', name: 'Dr.B' }
};

export function createCharacterImage(filename) {
  const config = characterColors[filename];
  if (!config) return null;

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 400, 400);
  gradient.addColorStop(0, config.primary);
  gradient.addColorStop(1, config.secondary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);

  // Add pattern
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#000';
  for (let i = 0; i < 20; i++) {
    ctx.fillRect(Math.random() * 400, Math.random() * 400, 20, 20);
  }
  ctx.globalAlpha = 1;

  // Add text
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(config.name, 200, 150);

  // Add border
  ctx.strokeStyle = '#ff006e';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 400, 400);

  return canvas.toDataURL();
}
