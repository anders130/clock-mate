const { copy } = require('fs-extra');
const fs = require('fs');
const { extname } = require('path');

(async function() {
    try {
        const filterFunc = (src, dest) => {
            return extname(src) != '.js' && extname(src) != '.scss'; // exclude js and scss files
        };
        await copy('./Extension', './compressed/extension', { filter: filterFunc }); // copies directory with subdirectories
        fs.rmSync('./compressed/extension/url.json', { force: true }); // remove url file
        if (!fs.existsSync('./compressed/Gleitzeitkonto-Browser-ZIP')) fs.mkdirSync('./compressed/Gleitzeitkonto-Browser-ZIP'); // create folder
        

        console.log('Copied folder succesfully!');
    }
    catch (e) {
        console.error(e);
    }
})();