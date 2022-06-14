import { AudioPlayer, AudioResource, VoiceConnection } from "@discordjs/voice";
import { DiscordTogether } from "discord-together";
import { BaseCommandInteraction, ButtonInteraction, ChatInputApplicationCommandData, Client, InternalDiscordGatewayAdapterCreator } from "discord.js";

export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;

export interface CustomClient extends Client {
  together?: DiscordTogether;
  music?: Music;
}

export interface Music {
  data: MusicData;
  addQueue(interaction: BaseCommandInteraction, query: string, repeat?: number): Promise<QueueResult>;
  playNext(): void;
  pauseMusic(): boolean;
  resumeMusic(): bolean;
  skipMusic(): boolean;
  destroyConnection(guildId: string): boolean;
}

export interface Command extends ChatInputApplicationCommandData {
  customIds?: string[];
  execute: (client: CustomClient, interaction: BaseCommandInteraction) => Promise<CommandResult>;
}

export interface ButtonCommand extends Command {
  interaction: (client: CustomClient, interaction: ButtonInteraction) => Promise<CommandResult>;
}

export type CommandResult = string | boolean | undefined | void;

export interface Translation {
  [key: string]: any;
}

export interface MusicData {
  client: Nullable<CustomClient>;
  conn: Nullable<VoiceConnection>;
  connChannelId: string;
  player: AudioPlayer;
  resource: Nullable<AudioResource>;
  stream: YouTubeStream;
  queue: MusicQueue[];
  lastQueue?: MusicQueue;
}

export interface MusicQueue {
  url: string;
  title: string;
  channelId: string;
  guildId: string;
  adapterCreator: InternalDiscordGatewayAdapterCreator;
}

export interface QueueResult {
  result: number;
  title?: string;
  url?: string;
  image?: string;
}