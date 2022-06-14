import { GuildMember, MessageEmbed } from "discord.js";
import { Command } from "../types";

const Play: Command = {
  name: 'play',
  description: 'play music from youtube',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    const member = interaction.member as GuildMember;
    const queryOption = interaction.options.get('query');
    const repeatOption = interaction.options.get('repeat');
    if (interaction.guild && member.voice && member.voice.channel) {
      let repeat = 1;
      if (repeatOption && repeatOption.value) {
        repeat = repeatOption.value as number;
      }
      if (queryOption && queryOption.value) {
        let query = queryOption.value as string;
        if (query.includes('watch?v=')) {
          let temp = query.split('watch?v=', 2);
          if (temp.length === 2) {
            query = temp[1].split('&')[0];
          }
        }

        if (client.music) {
          const { result, title, url } = await client.music.addQueue(interaction, query, repeat);

          let messageEmbed = new MessageEmbed();
          if (result > 0) {
            messageEmbed.setTitle('Successfully queue added!');
            messageEmbed.setURL(url);
            messageEmbed.addField('Song title', title);
            if (repeat > 10) {
              messageEmbed.setDescription('Maximum queue repeat count is 10');
            }
          }
          await interaction.followUp({
            ephemeral: true,
            embeds: [
              messageEmbed
            ]
          });
          return;
        }

      }
    }
    await interaction.followUp({
      ephemeral: true,
      content: 'something went wrong :('
    });
  },
  options: [
    {
      name: 'query',
      description: 'youtube query',
      type: 'STRING',
      required: true
    },
    {
      name: 'repeat',
      description: 'repeat count',
      type: 'INTEGER',
    }
  ]
};

export default Play;