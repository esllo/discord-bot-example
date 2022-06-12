import { Client } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";
import Commands from "../commands";
import EVENT from "../constants/event";
import translate from "../translate";

function setDefaultPresence(client: Client) {
  if (client.user) {
    client.user.setPresence({
      activities: [
        {
          name: '즐거워',
          type: ActivityTypes.PLAYING,
        },
      ],
    });
  }
}

export default (client: Client): void => {
  client.on(EVENT.READY, async () => {
    if (!client.user || !client.application) {
      console.log(translate('error.auth_not_found'));
      return;
    }

    await client.application.commands.set(Commands);

    setDefaultPresence(client);

    console.log(`[${client.user.tag}]${client.user.username} is online`);
  });
};