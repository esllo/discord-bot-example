import { GuildMember, MessageActionRow, MessageButton } from "discord.js";
import { ButtonCommand } from "../types";

const Dice: ButtonCommand = {
  name: 'dice',
  customIds: ['dice'],
  description: 'roll the dice!',
  type: 'CHAT_INPUT',
  async execute(client, interaction) {
    if (interaction.guild) {
      const row = new MessageActionRow();
      row.addComponents(
        new MessageButton()
          .setCustomId('dice')
          .setLabel('주사위 굴리기')
          .setStyle('PRIMARY')
      );

      interaction.followUp({
        content: '상호작용 실패가 나와도 정상동작합니다 :)',
        components: [row],
      });
    }
  },
  async interaction(client, interaction) {
    const number = Math.ceil(Math.random() * 6);
    interaction.reply({
      content: `<@${interaction.member?.user.id}> ${number}`,
    });
  }
};

export default Dice;