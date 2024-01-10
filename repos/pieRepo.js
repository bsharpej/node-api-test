const fs = require("fs");

const PIE_DATA = "./assets/pies.json";

const pieRepo = {
    get: function (resolve, reject) {
        fs.readFile(PIE_DATA, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function (id, resolve, reject) {
        fs.readFile(PIE_DATA, function (err, data) {
            if (err) {
                reject(err);
            } else {
                const pie = JSON.parse(data).find((p) => p.id == id);
                resolve(pie);
            }
        });
    },
    search: function (searchObject, resolve, reject) {
        fs.readFile(PIE_DATA, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let pies = JSON.parse(data);
                if (searchObject) {
                    pies = pies.filter(
                        (p) =>
                            (searchObject.id
                                ? p.id == searchObject.id
                                : true) &&
                            (searchObject.name
                                ? p.name
                                      .toLowerCase()
                                      .indexOf(
                                          searchObject.name.toLowerCase()
                                      ) >= 0
                                : true)
                    );
                    resolve(pies);
                }
            }
        });
    },
    insert: function (newData, resolve, reject) {
        fs.readFile(PIE_DATA, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let pies = JSON.parse(data);
                pies.push(newData);
                fs.writeFile(PIE_DATA, JSON.stringify(pies), function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newData);
                    }
                });
            }
        });
    },
    update: function (newData, id, resolve, reject) {
        fs.readFile(PIE_DATA, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let pies = JSON.parse(data);
                let pie = pies.find((p) => p.id == id);
                if (pie) {
                    Object.assign(pie, newData);
                    fs.writeFile(
                        PIE_DATA,
                        JSON.stringify(pies),
                        function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(newData);
                            }
                        }
                    );
                }
            }
        });
    },
    delete: function (id, resolve, reject) {
        fs.readFile(PIE_DATA, function (err, data) {
            if (err) {
                reject(err);
            } else {
                let pies = JSON.parse(data);
                let index = pies.findIndex((p) => p.id == id);
                if (index != -1) {
                    pies.splice(index, 1);
                    fs.writeFile(
                        PIE_DATA,
                        JSON.stringify(pies),
                        function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(index);
                            }
                        }
                    );
                }
            }
        });
    },
};

module.exports = pieRepo;
