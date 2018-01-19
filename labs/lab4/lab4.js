import fs from 'fs';
import zlib from 'zlib';
export class lab4 {

  syncFileRead(sample) {
    var data = fs.readFileSync('sample.txt');
    return data;
  }


  asyncFileRead(sample, callback) {
    fs.readFile('sample.txt', function(err, data) {
      if(err) return console.error(err);
      return callback(data.toString()
      );});
  }

  compressFileStream(input, output) {
  // Compress the file input.txt to input.txt.gz
    return fs.createReadStream(input)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(output));
  }

  decompressFileStream(input, output) {
    // Decompress the file input.txt.gz to input.txt
    return fs.createReadStream(input)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(output));
  }

  listDirectoryContents(filename, callback) {
    fs.readdir(filename, function(err, files) {
      if(err) {
        return console.error(err);
      }
      return callback(files);
    });
  }

}
