require('dotenv').config();

const {KafkaService} = require('./src/services/KafkaService');

KafkaService.consume().catch(e => console.error(e));
