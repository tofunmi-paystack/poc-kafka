const topics = require('../../config/topics');
const {KafkaService} = require('./KafkaService');

/**
 * Transaction Service.
 */
const TransactionService = {
    /**
     * Send transaction-update request to KAFKA.
     *
     * @param transactionId
     * @param updateParams
     * @return {Promise<boolean>}
     */
    async updateTransaction(transactionId, updateParams) {
        const request = {
            transactionId,
            updateParams
        };

        return KafkaService.produce(topics.updateTransaction, request);
    },

    /**
     * Send transaction-cancellation request to KAFKA.
     *
     * @param transactionId
     * @return {Promise<boolean>}
     */
    async cancelTransaction(transactionId) {
        const request = {
            transactionId,
        };

        return KafkaService.produce(topics.cancelTransaction, request);
    },
}

module.exports = {
    TransactionService,
}
