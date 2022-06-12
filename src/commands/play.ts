import { GuildMember } from "discord.js";
import { Command } from "../types";

const Play: Command = {
  name: 'play',
  description: 'play music from youtube',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    const member = interaction.member as GuildMember;
    const queryOption = interaction.options.get('query');
    if (interaction.guild && member.voice && member.voice.channel) {
      if (queryOption && queryOption.value) {
        let query = queryOption.value as string;
        if (query.includes('watch?v=')) {
          let temp = query.split('watch?v=', 2);
          if (temp.length === 2) {
            query = temp[1].split('&')[0];
          }
        }

        if (client.music) {
          client.music.addQueue(interaction, query);
          client.music.playNext();
        }

      }
    }
    await interaction.followUp({
      ephemeral: true,
      content: 'please wait'
    });
  },
  options: [
    {
      name: 'query',
      description: 'youtube query',
      type: 'STRING',
      required: true
    }
  ]
};

export default Play;