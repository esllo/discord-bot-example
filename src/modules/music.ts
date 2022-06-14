import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel, NoSubscriberBehavior, VoiceConnectionStatus } from "@discordjs/voice";
import { CustomClient, MusicData } from "../types";
import playdl from 'play-dl';
import { BaseCommandInteraction, GuildMember } from "discord.js";

export default (() => {
  const data: MusicData = {
    client: null,
    conn: null,
    connChannelId: '',
    player: createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      }
    }),
    resource: null,
    stream: null,
    queue: [],
  };

  async function addQueue(interaction: BaseCommandInteraction, query: string) {
    const info = await playdl.search(query, {
      limit: 1
    });

    if (info.length > 0) {
      const [{ url }] = info;
      const member = interaction.member as GuildMember;
      data.queue.push({
        url,
        channelId: member.voice.channel?.id,
        guildId: member.guild.id,
        adapterCreator: member.guild.voiceAdapterCreator,
      });
    }

    playNext();
  }

  function playNext() {
    if (data.player && data.player.state.status === AudioPlayerStatus.Idle) {
      playMusic();
    }
  }

  function pauseMusic() {
    if (data.player && data.player.state.status === AudioPlayerStatus.Playing) {
      data.player.pause();
      return true;
    }
    return false;
  }

  function skipMusic() {
    if (data.player && data.player.state.status !== AudioPlayerStatus.Idle) {
      data.player.stop();
      playNext();
      return true;
    }
    return false;
  }

  function resumeMusic() {
    if (data.player && (data.player.state.status === AudioPlayerStatus.Paused || data.player.state.status === AudioPlayerStatus.AutoPaused)) {
      data.player.unpause();
      return true;
    }
    return false;
  }

  async function playMusic() {
    if (data.queue.length > 0) {
      const [track, ...queue] = data.queue;
      data.queue = queue;

      const stream = await playdl.stream(track.url);

      data.resource = createAudioResource(stream.stream, {
        inputType: stream.type
      });

      data.stream = stream;

      if (!data.conn || data.connChannelId !== track.channelId) {
        data.conn = joinVoiceChannel({
          ...track,
          selfDeaf: true,
          selfMute: false,
        });

        data.conn.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
          try {
            if (data.conn) {
              await Promise.race([
                entersState(data.conn, VoiceConnectionStatus.Signalling, 5000),
                entersState(data.conn, VoiceConnectionStatus.Connecting, 5000)
              ]);
            } else {
              data.conn = null;
            }
          } catch (e) {
            data.conn?.destroy();
            data.conn = null;
          }
        });

        data.connChannelId = track.channelId;

        data.conn.subscribe(data.player);
      }

      if (data.player) {
        data.player.play(data.resource);
      }
    }
  }

  data.player.on(AudioPlayerStatus.Idle, playNext);

  return (client: CustomClient): void => {
    client.music = {
      addQueue,
      playNext,
      pauseMusic,
      resumeMusic,
      skipMusic,
    };
  };
})();