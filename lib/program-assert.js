module.exports = {
    notError: function (err) {
        if (err) {
            console.error(err.message || err);
            process.abort();
        }
    },

    existSharedCollection: function (data) {
        //TODO: Dejar una sola opción cuando esté estable la API v2.
        var collection = data.shared_collections ||
            data.shared_collection ||
            data.cross_shared_collections ||
            data.cross_shared_collection;

        if (data.error || !collection || collection.length == 0) {
            console.error('There is no shared collection with the specified name.');
            data.error && console.error('Error: ' + data.error);
            process.abort();
        }

        return collection[0];
    },

    existSharedCollections: function (data) {
        //TODO: Dejar una sola opción cuando esté estable la API v2.
        var collections = data.shared_collections ||
            data.shared_collection ||
            data.cross_shared_collections ||
            data.cross_shared_collection;

        if (data.error || !collections || collections.length == 0) {
            console.error('There is no shared collections.');
            data.error && console.error('Error: ' + data.error);
            process.abort();
        }

        return collections;
    }
};