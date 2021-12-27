const {Kafka} = require('kafkajs');
const kafkaConfig = require('../../config/kafka');
const handlers = require('../../config/handlers');
const {TransactionController} = require('../controllers/TransactionController')

const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
});

const controllers = {
    TransactionController,
}

/**
 *  Handles all Kafka requests for the application.
 *
 * @type {{consume(string, Object): Promise<boolean>}}
 */
const KafkaService = {
    /**
     * Consume from topics.
     */
    async consume() {
        const consumer = kafka.consumer({
            groupId: kafkaConfig.groupId,
        });

        await consumer.connect();
        await consumer.subscribe({topic: /poc.transaction.*/i});
        await consumer.run({
            eachMessage: KafkaService.handleRequest,
        });
    },

    async handleRequest({topic, message}) {
        const handler = handlers[topic];
        let request = message.value.toString();

        if (!handler) {
            console.log(`Topic '${topic}' does not have a registered handler.`);
            return;
        }

        if (request) {
            request = JSON.parse(request);
        }

        const [ controller, method ] = handler.split('.');

        return controllers[controller][method](request);
    },
};

module.exports = {
    KafkaService,
};
