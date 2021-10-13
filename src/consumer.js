require('dotenv').config();
const amqp = require('amqplib');
const Listener = require('./listener');
const MailSender = require('./MailSender');
const SongsService = require('./SongsService');

const init = async () => {
  const songsService = new SongsService();
  const mailSernder = new MailSender();
  const listener = new Listener(songsService, mailSernder);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:songs', {
    durable: true,
  });

  channel.consume('export:songs', listener.listen, { noAck: true });
};

init();
