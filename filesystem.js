const path = require("path");
const fs = require("fs");
const os = require("os");

/*

console.log("This is a console log from my server.js file");

console.log("Hello Wold");

// Base file name
console.log(path.basename(__filename));

// Directory name
console.log(path.dirname(__filename));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));
// Get property from path object
console.log(path.parse(__filename).base);

// Concatenate paths
console.log(path.join(__dirname, "test", "hello.html"));

*/

const folderExists = (folder, create = false) => {
  const folderExists = fs.existsSync(path.join(__dirname, folder));
  if (!folderExists && create) {
    createFolder(folder);
  }
  return folderExists;
};

const fileExists = (folder, file) => {
  return fs.existsSync(path.join(__dirname, folder, file));
};

const createFolder = (folder) => {
  fs.mkdir(path.join(__dirname, folder), {}, (err) => {
    if (err) throw err;
    console.log(`Folder ${folder} created...`);
  });
};

const createFile = ({ folder, file, data = "" }) => {
  if (!folderExists(folder, true));
  fs.writeFileSync(path.join(__dirname, folder, file), data, (err) => {
    if (err) throw err;
    console.log(`File ${file} created...`);
  });
};

const appendFile = ({ folder, file, data }) => {
  fs.appendFile(path.join(__dirname, folder, file), data, (err) => {
    if (err) throw err;
    console.log(`File ${file} written to...`);
  });
};

const readFile = (folder, file) => {
  fs.readFile(path.join(__dirname, folder, file), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
};

const renameFile = ({ folder, oldFile, newFile }) => {
  fs.rename(
    path.join(__dirname, folder, oldFile),
    path.join(__dirname, folder, newFile),
    (err) => {
      if (err) throw err;
      console.log(`File ${oldFile} renamed to ${newFile}`);
    }
  );
};

const createHtmlFile = (folder, title) => {
  const content = `<html lang='en'><head><meta charset='UTF-8' /><meta http-equiv='X-UA-Compatible' content='IE=edge' /><meta name='viewport' content='width=device-width, initial-scale=1.0' /><link rel='stylesheet' href='./style.css' /><title>${title}</title></head><body><h1>${title}</h1></body></html>`;
  createFile({ folder: folder, file: "index.html", data: content });
};

const createCssFile = (folder, color) => {
  const content = `body { background-color: ${color};}`;
  createFile({ folder: folder, file: "style.css", data: content });
};

const removeFolders = (folder = "client") => {
  try {
    fs.rm(path.join(__dirname, folder), { recursive: true });

    console.log(`${folder} is deleted!`);
  } catch (err) {
    console.error(`Error while deleting ${folder}.`);
  }
};

removeFolders();

const createFolders = () => {
  const folderStructure = [
    "client",
    "client/contact",
    "client/about",
    "client/blog",
  ];

  folderStructure.forEach((value) => {
    folderExists(value, true);
  });
};

createFolders();

const createFiles = () => {
  const fileStructure = [
    {
      folder: "client",
      title: "Home",
      color: "#808080",
    },
    {
      folder: "client/contact",
      title: "Contact",
      color: "#ff0000",
    },
    {
      folder: "client/about",
      title: "About",
      color: "#00ff00",
    },
    {
      folder: "client/blog",
      title: "Blog",
      color: "#0000ff",
    },
  ];

  fileStructure.forEach((value) => {
    if (!fileExists(value.folder, "style.css")) {
      createCssFile(value.folder, value.color);
    }
    if (!fileExists(value.folder, "index.html")) {
      createHtmlFile(value.folder, value.title);
    }
    if (value.folder === "client" && !fileExists(value.folder, "info.txt")) {
      const content = `This is being run on a ${os.platform} computer!`;
      createFile({ folder: value.folder, file: "info.txt", data: content });
    }
  });
};

createFiles();
