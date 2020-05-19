const sharp = require(`sharp`);
const glob = require(`glob`);
const fs = require(`fs-extra`);

const matches = glob.sync(`src/images/*.{png,jpg,jpeg}`);
const MAX_WIDTH = 1800;
const QUALITY = 50;

Promise.all(
  matches.map(async (match) => {
    const stream = sharp(match);
    const optimizedName = match.replace(
      /(\..+)$/,
      (m, ext) => `-optimized${ext}`
    );

    await stream
      .resize(MAX_WIDTH)
      .jpeg({ quality: QUALITY })
      .toFile(optimizedName);

    console.log("here");
    return fs.rename(optimizedName, match);
  })
);
