document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('puzzle-container');
    const tiles = [];
  
    // Create tiles and add them to the container
    for (let i = 0; i < 15; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.textContent = i + 1;
      tiles.push(tile);
      container.appendChild(tile);
    }
  
    // Add empty tile
    const emptyTile = document.createElement('div');
    emptyTile.classList.add('tile', 'empty');
    tiles.push(emptyTile);
    container.appendChild(emptyTile);
  
    // Shuffle tiles
    function shuffleTiles() {
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
      renderTiles();
    }
  
    // Render tiles in the container
    function renderTiles() {
      container.innerHTML = '';
      tiles.forEach(tile => container.appendChild(tile));
    }
  
    // Check if the puzzle is solved
    function isPuzzleSolved() {
      for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i].textContent !== i + 1 + '') {
          return false;
        }
      }
      return true;
    }
  
    // Swap tiles
    function swapTiles(index1, index2) {
    
    //   tiles[index1].classList.add('empty');
    //   tiles[index2].classList.remove('empty');
    //   renderTiles();
    let temp;
    temp = tiles[index1].textContent
    tiles[index1].textContent = tiles[index2].textContent
    tiles[index2].textContent = temp; 
    if(tiles[index1].classList.contains('empty')){
        tiles[index1].classList.remove('empty');
        tiles[index2].classList.add('empty');
    }else{
        tiles[index2].classList.remove('empty');
        tiles[index1].classList.add('empty');
    }
    renderTiles();

      if (isPuzzleSolved()) {
        alert('Congratulations! You solved the puzzle.');
      }
    }
  
    // Initialize puzzle
    shuffleTiles();
  
    // Add click event listeners to tiles
    tiles.forEach((tile, index) => {
      tile.addEventListener('click', () => {
        const emptyIndex = tiles.findIndex(t => t.classList.contains('empty'));
        const rowDiff = Math.abs(Math.floor(index / 4) - Math.floor(emptyIndex / 4));
        const colDiff = Math.abs(index % 4 - emptyIndex % 4);
        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
          swapTiles(index, emptyIndex);
        }
      });
    });
    document.addEventListener('keydown', function(event) {
        const key = event.key; 
        const emptyIndex = tiles.findIndex(t => t.classList.contains('empty'));
        switch (key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                swapTiles(emptyIndex,(emptyIndex - 1))
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
                swapTiles(emptyIndex,(emptyIndex - 4))
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                swapTiles(emptyIndex,(emptyIndex + 1))
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                swapTiles(emptyIndex,(emptyIndex + 4))
                break;
        }
      });
      
      
  
    // Add event listener to shuffle button
    document.getElementById('shuffle-btn').addEventListener('click', () => {
      shuffleTiles();
    });
  });
  

