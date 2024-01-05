let logRepo = require("../repos/logRepo");

let errorHelpers = {
    logErrorsToConsole: function (err, next) {
        console.error(
            "Log Entry: " + JSON.stringify(errorHelpers.errorBuilder(err))
        );
        console.error("*".repeat(80));
        next(err);
    },

    logErrorsToFile: function (err, req, res, next) {
        let errorObject = errorHelpers.errorBuilder(err);
        errorObject.requestInfo = {
            hostname: req.hostname,
            path: req.path,
            app: req.app,
        };
        logRepo.write(
            errorObject,
            function (data) {
                console.log(data);
            },
            function (err) {
                console.log(err);
            }
        );
        next(err);
    },

    clientErrorHandler: function (err, req, res, next) {
        if (req.xhr) {
            res.status(500).json(errorHelpers.errorBuilder(err));
        } else {
            next(err);
        }
    },

    errorHandler: function (err, res) {
        res.status(500).json(errorHelpers.errorBuilder(err));
    },

    errorBuilder: function (err) {
        return {
            status: 500,
            statusText: "Internal Server Error",
            message: `There was a error fetching pie data: ${err.message}`,
        };
    },
};

module.exports = errorHelpers;
