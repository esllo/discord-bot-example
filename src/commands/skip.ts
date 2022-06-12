import { Command } from "../types";

const Skip: Command = {
  name: 'skip',
  description: 'skip current music',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild && client.music) {
      const result = client.music.skipMusic();
      if (result) {
        await interaction.followUp({
          ephemeral: true,
          content: 'skipped'
        });
        return;
      }
    }

    await interaction.followUp({
      ephemeral: true,
      content: 'no music'
    });
  }
};

export default Skip;