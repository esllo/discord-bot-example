import { Intents, Client } from 'discord.js';
import music from './modules/music';
import together from './modules/together';
import listeners from './listeners';

const BOT_TOKEN = "";

const intents = new Intents(0b111111111111111);
const client = new Client({ intents });

together(client);
music(client);
listeners(client);

client.login(BOT_TOKEN);
