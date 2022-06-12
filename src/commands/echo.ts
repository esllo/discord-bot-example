import { Command } from "../types";

const Echo: Command = {
  name: 'echo',
  description: 'Return text',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    console.log(interaction.options.get('select'));
    await interaction.channel?.send(
      `your select : 
        name: ${interaction.options.getUser('name')}
        select: ${interaction.options.get('select') || 'none'}
      `
    );
    await interaction.followUp({
      ephemeral: true,
      content: 'hi',
    });
  },
  options: [
    {
      name: 'name',
      description: 'your name',
      type: "USER",
      required: true,
    },
    {
      name: 'select',
      description: 'your select',
      choices: [
        {
          name: 'hi',
          value: 'a'
        },
        {
          name: 'bye',
          value: 'b'
        }
      ],
      type: "STRING"
    }
  ]
};

export default Echo;