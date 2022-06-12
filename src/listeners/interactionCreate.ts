import { BaseCommandInteraction, Interaction } from "discord.js";
import Commands from "../commands";
import EVENT from "../constants/event";
import { CustomClient } from "../types";

export default (client: CustomClient): void => {
  client.on(EVENT.INTERACTION_CREATE, async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      await handleSlashCommand(client, interaction);
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