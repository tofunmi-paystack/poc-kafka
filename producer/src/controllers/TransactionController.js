const {TransactionService} = require('../services/TransactionService');

/**
 * Transaction Controller.
 */
const TransactionController = {
    /**
     * Handle transaction-update request for the application.
     *
     * @param {object} req
     * @param {object} res
     * @return {Promise<*>}
     */
    async update(req, res) {
        const {transactionId} = req.params;
        const {
            amount,
            currency,
        } = req.body;

        const update = await TransactionService.updateTransaction(
            transactionId,
            {
                amount,
                currency,
            },
        );

        if (!update) {
            return res.status(500)
                .json({
                    message: 'Transaction could not be updated at this moment. Please, try again later.',
                });
        }

        return res.json('Transaction has been updated successfully.');
    },

    /**
     * Handle transaction-cancellation request for the application.
     *
     * @param {object} req
     * @param {object} res
     * @return {Promise<*>}
     */
    async cancel(req, res) {
        const {transactionId} = req.params;

        const cancel = await TransactionService.cancelTransaction(transactionId);

        if (!cancel) {
            return res.status(500)
                .json({
                    message: 'Transaction could not be cancelled at this moment. Please, try again later.',
                });
        }

        return res.json('Transaction has been cancelled successfully.');
    },
};

module.exports = {
    TransactionController,
};