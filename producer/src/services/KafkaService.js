const {Kafka} = require('kafkajs');
const kafkaConfig = require('../../config/kafka');

const kafka = new Kafka({
    clientId: kafkaConfig.clientId,
    brokers: kafkaConfig.brokers,
});

/**
 *  Handles all Kafka requests for the application.
 *
 * @type {{produce: ((function(*, *=): Promise<void>)|*)}}
 */
const KafkaService = {
    /**
     * Produce to topic.
     *
     * @param {string} topic
     * @param {object} request
     * @return {Promise<boolean>}
     */
    async produce(topic, request) {
        const producer = kafka.producer();
        let sent;

        try {
            await producer.connect();
            await producer.send({
                topic,
                messages: [
                    {value: JSON.stringify(request)},
                ],
            });

            sent = true;
        } catch (e) {
            console.error(e);

            sent = false;
        }

        // silently try to disconnect producer.
        try {
            await producer.disconnect();
        } catch (e) {
            console.error(e);
        }

        return sent;
    },
};

module.exports = {
    KafkaService,
};
