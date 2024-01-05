let fs = require("fs");

const FILE_NAME = "./logs/log.txt";

let logRepo = {
    write: function (data, resolve, reject) {
        let toWrite = "*".repeat(80) + "\r\n";
        toWrite += "Data: " + new Date().toLocaleDateString() + "\r\n";
        toWrite += "Time: " + new Date().toLocaleTimeString() + "\r\n";
        toWrite += "Exception Info: " + JSON.stringify(data) + "\r\n";
        toWrite += "*".repeat(80) + "\r\n";

        fs.writeFile(FILE_NAME, toWrite, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    },
};

module.exports = logRepo;
