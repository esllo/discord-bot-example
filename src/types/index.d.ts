import { AudioPlayer, AudioResource, VoiceConnection } from "@discordjs/voice";
import { DiscordTogether } from "discord-together";
import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export type Nullable<T> = T | null;
export type Nullish<T> = T | null | undefined;

export interface CustomClient extends Client {
  together?: DiscordTogether;
  music?: any;
}

export interface Command extends ChatInputApplicationCommandData {
  execute: (client: CustomClient, interaction: BaseCommandInteraction) => Promise<CommandResult>;
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
  queue: any[];
}

export interface QueueResult {
  result: number;
  title?: string;
  url?: string;
}