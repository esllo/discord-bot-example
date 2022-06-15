import { Command } from "../types";

const Clear: Command = {
  name: 'clear',
  description: 'clear all queue',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    let count = 0;
    if (interaction.guild && client.music) {
      count = client.music.data.queue.length;
      client.music.data.queue = [];
    }
    await interaction.followUp({
      embeds: [
        {
          title: 'Successfully queue cleared.',
          description: `${count} queue removed.`
        }
      ]
    });
  }
};

export default Clear;