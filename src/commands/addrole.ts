import { ColorResolvable, GuildMemberRoleManager, User } from "discord.js";
import { Command } from "../types";

const AddRole: Command = {
  name: 'addrole',
  description: 'add role',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild) {
      const name: string = interaction.options.get('name')?.value as string;
      const to = interaction.options.getMember('to');
      const colorOption = interaction.options.get('color');
      let color: ColorResolvable = '#00ff00';
      let colorFailure = false;

      if (name && to) {
        if (colorOption) {
          if (colorOption.value && (colorOption.value as string).match(/^#(?:[0-9a-f]{3}){1,2}$/i)) {
            color = colorOption.value as ColorResolvable;
          } else {
            colorFailure = true;
          }
        }

        try {
          const role = await interaction.guild.roles.create({
            name,
            color,
            reason: `new role [${name}]`
          });

          (to.roles as GuildMemberRoleManager).add(role.id);

          await interaction.followUp({
            ephemeral: true,
            content: 'success',
          });
        } catch (e) {
          await interaction.followUp({
            ephemeral: true,
            content: 'failed',
          });
        }
      }
    }
  },
  options: [
    {
      name: 'role_name',
      description: 'role name',
      type: 'STRING',
      required: true,
    },
    {
      name: 'target',
      description: 'to',
      type: 'USER',
      required: true,
    },
    {
      name: 'color_hex',
      description: 'role color',
      type: 'STRING',
    }
  ]
};

export default AddRole;