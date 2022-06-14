import { getVoiceConnection } from "@discordjs/voice";
import { Command } from "../types";

const Leave: Command = {
  name: 'leave',
  description: 'leave voice channel',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild && client.music) {
      const conn = getVoiceConnection(interaction.guild.id);
      if (conn) {
        conn.destroy();
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