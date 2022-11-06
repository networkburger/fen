module.exports = {
  FENexpand,
  FENencode,
};

function FENexpand(fen) {
  const b = new Array(8).fill("");
  const fenre =
    /([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+)\/([rnbqkpRNBQKP\d]+) ([wb])/gm;
  const m = fenre.exec(fen);
  for (let file = 1; file <= 8; ++file) {
    for (let c = 0; c < m[file].length; ++c) {
      const piece = m[file][c];
      const spaces = parseInt(piece);
      if (Number.isNaN(spaces)) {
        b[file - 1] += piece;
      } else {
        for (let s = 0; s < spaces; ++s) {
          b[file - 1] += " ";
        }
      }
    }
  }
  return b;
}

function FENencode(b, mover = "w") {
  let bb = b.join("/");
  let gap;
  while ((gap = /\s+/g.exec(bb)) !== null) {
    bb =
      bb.slice(0, gap.index) +
      gap[0].length +
      bb.slice(gap.index + gap[0].length, bb.length);
  }

  return bb + " " + mover;
}
