const {TransactionService} = require('../services/TransactionService');

/**
 * Transaction Controller.
 */
const TransactionController = {
    async update(request) {
        console.log({request});
    },

    async cancel(request) {
        console.log({request});
    },
};

module.exports = {
    TransactionController,
};