/**
 * Hold Kafka configuration variables.
 *
 * @type {{brokers: (string[]|*[]), clientId: (string|string), groupId: (string|string)}}
 */
module.exports = {
    brokers: process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : [],
    clientId: process.env.KAFKA_CLIENT_ID || 'producer-app',
    groupId: process.env.KAFKA_GROUP_ID || 'producer-group',
}
