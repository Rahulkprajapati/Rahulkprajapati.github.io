const fs = require('fs');
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf:', Object.keys(pdf));

try {
    const dataBuffer = fs.readFileSync('Rahul_Prajapati.pdf');
    // Try calling it if it's a function, or check if it has a default export
    if (typeof pdf === 'function') {
        pdf(dataBuffer).then(function (data) {
            console.log(data.text);
        });
    } else if (pdf.default && typeof pdf.default === 'function') {
        pdf.default(dataBuffer).then(function (data) {
            console.log(data.text);
        });
    } else {
        console.log('Could not find entry point');
    }
} catch (e) {
    console.error(e);
}
