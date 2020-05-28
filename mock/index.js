const factoryCommon = require('./factory-common');
const factory = require('./factory');
const factoryAll = require('./factory-all');

const mock = (app) => {
    app.use('/factory-all', factoryAll);
    app.use('/factory-common', factoryCommon);
    app.use('/factory', factory);
};
module.exports = mock;
