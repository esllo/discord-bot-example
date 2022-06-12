import { ChannelTypes } from "discord.js/typings/enums";
import { createTogetherCode } from "../modules/together";
import { Command } from "../types";

const Youtube: Command = {
  name: 'youtubetest4',
  description: 'youtube together-test',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (!client.together) {
      await interaction.followUp({
        ephemeral: true,
        content: 'load external library failed.'
      });
      return;
    }
    createTogetherCode(client, interaction, 'youtube');

    await interaction.followUp({
      ephemeral: true,
      content: 'queue added'
    });

    return;
  },
  options: [
    {
      name: 'channel',
      description: 'your channel',
      type: 'CHANNEL',
      required: true,
      channelTypes: [ChannelTypes.GUILD_VOICE]
    }
  ]
};

export default Youtube;