import { Client } from 'discord.js';
import interactionCreate from './interactionCreate';
import messageCreate from './messageCreate';
import ready from './ready';

const listeners = (client: Client): void => {
  ready(client);
  interactionCreate(client);
  messageCreate(client);
};

export default listeners;