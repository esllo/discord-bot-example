import { Message } from "discord.js";
import EVENT from "../constants/event";
import { CustomClient } from "../types";

export default (client: CustomClient): void => {
  client.on(EVENT.MESSAGE_CREATE, async (message: Message) => {
    if (message.content) {
      if (message.content === '말치는') {
        message.reply('천재!');
      }
    }
  });
};