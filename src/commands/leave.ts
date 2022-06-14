import { Command } from "../types";

const Leave: Command = {
  name: 'leave',
  description: 'leave voice channel',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild && client.music) {
      const destroy = client.music.destroyConnection(interaction.guild.id);
      if (destroy) {
        await interaction.followUp({
          ephemeral: true,
          content: 'channel leaved'
        });
        return;
      }
    }

    await interaction.followUp({
      ephemeral: true,
      content: 'not in voice channel'
    });
  }
};

export default Leave;