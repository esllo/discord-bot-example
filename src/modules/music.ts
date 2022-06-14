import { AudioPlayerStatus, createAudioPlayer, createAudioResource, entersState, getVoiceConnection, getVoiceConnections, joinVoiceChannel, JoinVoiceChannelOptions, NoSubscriberBehavior, VoiceConnectionStatus } from "@discordjs/voice";
import { CustomClient, MusicData, QueueResult } from "../types";
import playdl from 'play-dl';
import { BaseCommandInteraction, GuildMember } from "discord.js";

export default (() => {
  let disconnectHandler: any = null;

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

  async function addQueue(interaction: BaseCommandInteraction, query: string, repeat?: number): Promise<QueueResult> {
    if (!repeat) {
      repeat = 1;
    } else if (repeat > 10) {
      repeat = 10;
    }
    const info = await playdl.search(query, {
      limit: 1
    });

    if (info.length > 0) {
      const [{ url, title, thumbnails }] = info;
      const member = interaction.member as GuildMember;
      let image = '';
      if (thumbnails.length > 0) {
        image = thumbnails[0].url;
      }
      for (let i = 0; i < repeat; i++) {
        data.queue.push({
          url,
          channelId: member.voice.channel?.id as string,
          guildId: member.guild.id,
          adapterCreator: member.guild.voiceAdapterCreator,
        });
      }
      playNext();

      return {
        result: repeat,
        title,
        url,
        image,
      };

    } else {
      return {
        result: -1
      };
    }
  }

  function playNext() {
    if (data.player && data.player.state.status === AudioPlayerStatus.Idle) {
      playMusic();
    }
  }

  function pauseMusic(): boolean {
    if (data.player && data.player.state.status === AudioPlayerStatus.Playing) {
      data.player.pause();
      return true;
    }
    return false;
  }

  function skipMusic(): boolean {
    if (data.player && data.player.state.status !== AudioPlayerStatus.Idle) {
      data.player.stop();
      playNext();
      return true;
    }
    return false;
  }

  function resumeMusic(): boolean {
    if (data.player && (data.player.state.status === AudioPlayerStatus.Paused || data.player.state.status === AudioPlayerStatus.AutoPaused)) {
      data.player.unpause();
      return true;
    }
    return false;
  }

  async function playMusic() {
    if (disconnectHandler) {
      clearTimeout(disconnectHandler);
      disconnectHandler = null;
    }
    if (data.queue.length > 0) {
      const [track, ...queue] = data.queue;
      data.queue = queue;

      console.log(track);

      data.lastQueue = track;

      const stream = await playdl.stream(track.url);

      data.resource = createAudioResource(stream.stream, {
        inputType: stream.type
      });

      data.stream = stream;

      if (!data.conn || data.conn.state.status === VoiceConnectionStatus.Destroyed || data.conn.state.status === VoiceConnectionStatus.Disconnected || data.connChannelId !== track.channelId) {
        const { url, ...voiceOptions } = track;
        data.conn = joinVoiceChannel({
          ...voiceOptions,
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
        data.player.stop();
        data.player.play(data.resource);
      }
    } else {
      disconnectHandler = setTimeout(() => {
        if (data.lastQueue) {
          destroyConnection(data.lastQueue.guildId);
        }
        disconnectHandler = null;
      }, 5000);
    }
  }

  function destroyConnection(guildId: string): boolean {
    const conn = getVoiceConnection(guildId);
    data.conn = null;
    if (conn) {
      conn.destroy();
      return true;
    }
    return false;
  }

  data.player.on(AudioPlayerStatus.Idle, playNext);

  return (client: CustomClient): void => {
    client.music = {
      addQueue,
      playNext,
      pauseMusic,
      resumeMusic,
      skipMusic,
      destroyConnection,
    };
  };
})();