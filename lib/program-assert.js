module.exports = {
    notError: function (err) {
        if (err) {
            console.error(err.message || err);
            process.abort();
        }
    },

    existSharedCollection: function (data) {
        if (data.error || data.shared_collection.length == 0) {
            console.error('There is no shared collection with the specified name.');
            data.error && console.error('Error: ' + data.error);
            process.abort();
        }
    }
};