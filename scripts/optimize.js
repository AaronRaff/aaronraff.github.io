const sharp = require(`sharp`);
const glob = require(`glob`);
const fs = require(`fs-extra`);

const matches = glob.sync(`src/images/*.{png,jpg,jpeg}`);
const QUALITY = 70;

Promise.all(
  matches.map(async (match) => {
    const stream = sharp(match);
    const optimizedName = match.replace(
      /(\..+)$/,
      (m, ext) => `-optimized${ext}`
    );

    await stream.jpeg({ quality: QUALITY }).toFile(optimizedName);
    return fs.rename(optimizedName, match);
  })
);
