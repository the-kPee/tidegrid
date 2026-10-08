;(function(){
function getPieceCells(piece) {
  const cells = [];
  piece.forEach((row, r) => row.forEach((v, c) => { if (v) cells.push([r, c]); }));
  return cells;
}

function canPlace(board, piece, row, col) {
  return getPieceCells(piece).every(([dr, dc]) => {
    const r = row + dr, c = col + dc;
    return r >= 0 && r < 9 && c >= 0 && c < 9 && board[r][c] === 0;
  });
}

function placePiece(board, piece, row, col) {
  const next = board.map(r => r.slice());
  for (const [dr, dc] of getPieceCells(piece)) next[row + dr][col + dc] = 1;
  return next;
}

function clearCompleted(board) {
  const rowSet = new Set(), colSet = new Set(), boxSet = new Set();
  for (let r = 0; r < 9; r++) if (board[r].every(Boolean)) rowSet.add(r);
  for (let c = 0; c < 9; c++) if (board.every(row => row[c])) colSet.add(c);
  for (let br = 0; br < 3; br++) for (let bc = 0; bc < 3; bc++) {
    let full = true;
    for (let r = br * 3; r < br * 3 + 3; r++)
      for (let c = bc * 3; c < bc * 3 + 3; c++) if (!board[r][c]) full = false;
    if (full) boxSet.add(`${br},${bc}`);
  }
  const cleared = [];
  const next = board.map(r => r.slice());
  for (const r of rowSet) for (let c = 0; c < 9; c++) { next[r][c] = 0; cleared.push([r,c]); }
  for (const c of colSet) for (let r = 0; r < 9; r++) { next[r][c] = 0; cleared.push([r,c]); }
  for (const key of boxSet) {
    const [br, bc] = key.split(',').map(Number);
    for (let r = br*3; r < br*3+3; r++) for (let c = bc*3; c < bc*3+3; c++) { next[r][c] = 0; cleared.push([r,c]); }
  }
  const unique = new Set(cleared.map(([r,c]) => `${r},${c}`));
  return { board: next, cleared: [...unique].map(s => s.split(',').map(Number)), count: rowSet.size + colSet.size + boxSet.size };
}

const SHAPES = [
  [[1]], [[1,1]], [[1],[1]], [[1,1,1]], [[1],[1],[1]],
  [[1,1],[1,1]], [[1,1,1],[1,0,0]], [[1,0],[1,1],[1,0]],
  [[1,1,1],[0,1,0]], [[1,1,0],[0,1,1]], [[1,0,0],[1,1,1]],
  [[1,1,1],[1,1,1]], [[1],[1],[1],[1]], [[1,1,1,1]]
];
function rng(seed) { let t=seed>>>0; return () => { t += 0x6D2B79F5; let x=t; x=Math.imul(x^(x>>>15),x|1); x^=x+Math.imul(x^(x>>>7),x|61); return ((x^(x>>>14))>>>0)/4294967296; }; }
function createGame(seed = Date.now()) {
  const random = rng(seed);
  const board = Array.from({length:9}, () => Array(9).fill(0));
  for (let i=0; i<11; i++) {
    const r=Math.floor(random()*9), c=Math.floor(random()*9);
    if (random()<.45) board[r][c]=1;
  }
  let salt = 0;
  const pieces = Array.from({length:3}, () => {
    const pieceRng = rng((seed + (++salt * 2654435761)) >>> 0);
    return SHAPES[Math.floor(pieceRng()*SHAPES.length)].map(r=>r.slice());
  });
  return { board, pieces, score:0, best:0, combo:0, moves:0, seed };
}
function dealPieces(seed=Date.now()) {
  const random=rng(seed);
  return Array.from({length:3},()=>SHAPES[Math.floor(random()*SHAPES.length)].map(r=>r.slice()));
}
function anyPlacement(board,piece) {
  for(let r=0;r<9;r++) for(let c=0;c<9;c++) if(canPlace(board,piece,r,c)) return true;
  return false;
}
const api = { createGame, placePiece, clearCompleted, canPlace, getPieceCells, dealPieces, anyPlacement };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.TIDEGRID_CORE = api;
})();
