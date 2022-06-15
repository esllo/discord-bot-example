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

        if (client.music) {
          const { result, title, url, image } = await client.music.addQueue(interaction, query, repeat);

          let messageEmbed = new MessageEmbed();
          if (result > 0) {
            messageEmbed.setTitle(title || '');
            messageEmbed.setURL(url || '');
            messageEmbed.setDescription('Successfully queue added!');
            if (repeat > 10) {
              messageEmbed.addField('warn', 'Maximum queue repeat count is 10');
            }
            if (image) {
              messageEmbed.setImage(image);
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