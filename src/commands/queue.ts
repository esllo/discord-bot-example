import { MessageEmbed } from "discord.js";
import { Command } from "../types";

const Queue: Command = {
  name: 'queue',
  description: 'show queue list',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild, client.music) {
      const { queue } = client.music.data;
      const embed = new MessageEmbed();
      embed.setTitle(`Playlist | ${queue.length}`);
      if (queue.length > 0) {
        queue.forEach(({ title, time }) => {
          embed.addField(title, time);
        });
      } else {
        embed.setDescription('no musics');
      }
      await interaction.followUp({
        ephemeral: true,
        embeds: [embed]
      });
      return;
    }
    await interaction.followUp({
      ephemeral: true,
      content: 'something went wrong'
    });
  }
};

export default Queue;