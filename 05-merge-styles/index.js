const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => { if (err) throw err; });

fs.readdir( path.join(__dirname, '.\\styles'), { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else {
        files.forEach((file) => {
            if (path.extname(file.name) === '.css' && file.isFile() === true) {
                fs.readFile(path.join(__dirname, '.\\styles', file.name), 'utf-8', (err, data) => {
                    if (err) throw err;
                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (err) => { if (err) throw err; });
                });
            }
        });
    }
});
