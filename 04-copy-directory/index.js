const fs = require("fs"), path = require("path");
const dirNameCopyFiles = "files", dirNamePasteFiles = "files-copy";
const pathCopyFiles = path.resolve(__dirname, dirNameCopyFiles);
const pathPasteFiles = path.resolve(__dirname, dirNamePasteFiles);

fs.readdir(pathCopyFiles, (error, files) => copyDir(files));

function copyDir(files) {
    fs.stat(pathPasteFiles, (error) => {
        if (error) fs.mkdir(pathPasteFiles, (error) => {
            clearDir(files, function () { copy(files); })
        });
        else clearDir(files, function () { copy(files); });
    });
}

function clearDir(files, callback) {
    fs.readdir(pathPasteFiles, (error, files) => {
        for (const file of files) {
            fs.unlink(path.join(pathPasteFiles, file), (err) => {
                if (err) throw err;
            });
        }
        callback(files);
    });
}

function copy(files) {
    for (const file of files) {
        const filePath = path.join(pathCopyFiles, file);
        const filePathToPaste = path.join(pathPasteFiles, file);
        fs.copyFile(filePath, filePathToPaste, (error) => {});
    }
}
