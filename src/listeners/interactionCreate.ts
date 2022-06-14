import { BaseCommandInteraction, ButtonInteraction, Interaction } from "discord.js";
import Commands from "../commands";
import EVENT from "../constants/event";
import { ButtonCommand, CommandResult, CustomClient, Nullish } from "../types";

export default (client: CustomClient): void => {
  client.on(EVENT.INTERACTION_CREATE, async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
    } else if (interaction.isButton()) {
      await handleButtonCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (client: CustomClient, interaction: BaseCommandInteraction): Promise<void> => {
  const slashCommand = Commands.find(command => command.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "Command not found" });
    return;
  }

  await interaction.deferReply();

  const result = await slashCommand.execute(client, interaction);
  if (result === true) {
    // success
  }
};

const handleButtonCommand = async (client: CustomClient, interaction: ButtonInteraction): Promise<CommandResult> => {
  const buttonCommand = Commands.find(command => command.customIds && command.customIds.includes(interaction.customId)) as Nullish<ButtonCommand>;
  if (!buttonCommand) {
    interaction.followUp({ content: 'Interaction not found' });
    return;
  }
  const result = await buttonCommand.interaction(client, interaction);

  return;
};