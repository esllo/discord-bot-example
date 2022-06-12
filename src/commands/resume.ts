import { Command } from "../types";

const Resume: Command = {
  name: 'resume',
  description: 'resume current music',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild && client.music) {
      const result = client.music.resumeMusic();
      if (result) {
        await interaction.followUp({
          ephemeral: true,
          content: 'resumed'
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

export default Resume;