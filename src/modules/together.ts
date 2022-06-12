import { DiscordTogether } from "discord-together";
import { BaseCommandInteraction } from "discord.js";
import { CustomClient } from "../types";

export default (client: CustomClient): void => {
  client.together = new DiscordTogether(client);
};

export function createTogetherCode(client: CustomClient, interaction: BaseCommandInteraction, type: string) {
  const option = interaction.options.get('channel', true);
  if (option.channel) {
    const channelId = option.channel.id;
    client.together.createTogetherCode(channelId, type).then(async (invite: { code: string; }) => {
      return interaction.channel?.send(`${invite.code}`);
    });
  }

}