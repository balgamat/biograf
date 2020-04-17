import "fullscreen-polyfill";
import React, {
  FC,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { Controls } from "./Controls";

export type MandatoryAttributes<T> = Record<string, any> & T;
export type PlayerProps = MandatoryAttributes<{
  src?: string;
  handle?: RefObject<any>;
}>;

export interface ControlProps {
  duration: number;
  elapsed: number;
  fullscreen: boolean;
  isPlaying: boolean;
  muted: boolean;
  progress: number;
  volume: number;

  mute(mute: boolean): void;
  seek(progress: number): void;
  setVolume(volume: number): void;
  toggleFullscreen(): void;
  togglePlay(): void;
}

export type ControlComponent<T extends keyof ControlProps> = FC<{
  controlProps?: MandatoryAttributes<Pick<ControlProps, T>>;
}>;

export const Player: FC<PlayerProps> = ({ children, src, handle, ...rest }) => {
  const playback = handle || useRef<any>();
  const container = useRef<any>();

  const [duration, saveDuration] = useState(0);
  const [elapsed, saveElapsed] = useState(0);
  const [muted, saveMuted] = useState(false);
  const [volume, saveVolume] = useState(100);
  const [isPlaying, setPlaying] = useState(false);
  const [fullscreen, saveFullScreen] = useState(false);
  const mute = (mute: boolean) => {
    if (playback?.current) {
      playback.current.muted = mute;
    }
  };
  const progress = elapsed / duration || 0;
  const seek = (progress: number) => {
    if (playback?.current) {
      playback.current.currentTime = Math.max(
        0,
        Math.min(progress * duration, duration)
      );
    }
  };
  const setVolume = (volume: number) => {
    if (playback?.current) {
      playback.current.volume = Math.max(0, Math.min(1, volume));
    }
  };
  const toggleFullscreen = () =>
    fullscreen
      ? document.exitFullscreen()
      : container?.current?.requestFullscreen();
  const togglePlay = () => playback?.current?.[isPlaying ? "pause" : "play"]();

  const controlProps: ControlProps = {
    duration,
    elapsed,
    fullscreen,
    isPlaying,
    mute,
    muted,
    progress,
    seek,
    setVolume,
    toggleFullscreen,
    togglePlay,
    volume
  };

  useEffect(() => {
    const setPause = () => setPlaying(false);
    const setPlay = () => setPlaying(true);
    const updateDuration = () => saveDuration(playback?.current?.duration);
    const updateFullscreen = () => saveFullScreen(!!document.fullscreenElement);
    const updateTime = () => saveElapsed(playback?.current?.currentTime);
    const updateVolume = () => {
      saveMuted(playback?.current?.muted);
      saveVolume(playback?.current?.volume);
    };

    container?.current?.addEventListener("fullscreenchange", updateFullscreen);
    playback?.current?.addEventListener("durationchange", updateDuration);
    playback?.current?.addEventListener("pause", setPause);
    playback?.current?.addEventListener("play", setPlay);
    playback?.current?.addEventListener("timeupdate", updateTime);
    playback?.current?.addEventListener("volumechange", updateVolume);

    return () => {
      container?.current?.removeEventListener(
        "fullscreenchange",
        updateFullscreen
      );
      playback?.current?.removeEventListener("durationchange", updateDuration);
      playback?.current?.removeEventListener("pause", setPause);
      playback?.current?.removeEventListener("play", setPlay);
      playback?.current?.removeEventListener("timeupdate", updateTime);
      playback?.current?.removeEventListener("volumechange", updateVolume);
    };
  }, [playback, container]);

  return (
    <Container ref={container}>
      <video
        ref={playback}
        preload="auto"
        width="100%"
        height="100%"
        src={src}
        {...rest}
      />
      {React.Children.map(children, child =>
        React.cloneElement(
          child as ReactElement,
          (child as ReactElement)?.type === Controls ? { controlProps } : {}
        )
      )}
    </Container>
  );
};

export const Container = styled.div`
  background: black;
  height: 100%;
  position: relative;
  width: 100%;
`;
