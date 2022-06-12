import { Command } from "../types";

const Pause: Command = {
  name: 'pause',
  description: 'pause current music',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild && client.music) {
      const result = client.music.pauseMusic();
      if (result) {
        await interaction.followUp({
          ephemeral: true,
          content: 'paused'
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

export default Pause;