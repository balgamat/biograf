# Video Player 🍿

> Because it would be nearly impossible to style the available players in a way we need, I decided to create our own that has everything we need or may need exactly how we need it.

<img width="810" alt="Snímek obrazovky 2020-04-16 v 10 31 30" src="https://user-images.githubusercontent.com/6381607/79433505-7d928900-7fcd-11ea-8b95-eaea4894ef5b.png">

## Features 🎰 

#### Universal ControlProps interface 🧮 
All the properties and methods for controlling the video are available to all the children of the player by cloning. Thanks to this, you don't need to pass props that are irrelevant to the player into it (e.g. reaction counts).

#### Independent controls 🔛 
Thanks to detaching the controls via the interface, you can modify the provided controls and their order however you like. They get lined up with proper padding and margins in the control strip of the video, but you can also use absolute positioning and create whatever other overlays you wish. All components passed as children have access to control props (such as play, pause, etc.)

The controls available are:

- ⏯️ play/pause toggle
- 🔉 volume control (mute/unmute on click, slider appears on hover, then you can control the volume with mouse wheel or by clicking the slider)
- 💻 fullscreen toggle
- 🕐 time display (clicking on it you can switch between elapsed/remaining)
- 📊 progress bar (with seeking function)

## Implementation

### Get Started
Implementing video has never been simpler:
```
<Player src={[videoURL]}/>
```
and voilà!

However, this would be really simple player. To make it more interesting, you can use standard HTML5 video props like e.g.:
```
<Player src={[videoURL]} preload="meta" autoplay muted/>
```
To add some controls you can add them as children to the player (note that you can choose whatever order you'd like:
```
import { PlayToggle } from '@VideoPlayer/Controls/PlayToggle';
import { Volume } from '@VideoPlayer/Controls/Volume';
import { Time } from '@VideoPlayer/Controls/Time';

<Player src={[videoURL]} preload="meta" autoplay muted>
  <Time/>
  <PlayToggle/>
  <Volume/>
</Player>
```

### Your own controls
To implement your own controls, simply create component that accepts `controlProps: ControlProps` as its prop. This will get passed to the component via the player itself, you just create the component and pass it as a child to the Player. The interface is defined as following:
```
interface ControlProps {
  duration: number; // in seconds
  elapsed: number; // in seconds
  fullscreen: boolean;
  isPlaying: boolean; 
  muted: boolean;
  progress: number; // 0-1
  volume: number; // 0-1

  mute(mute: boolean): void;
  seek(progress: number): void;
  setVolume(volume: number): void;
  toggleFullscreen(): void;
  togglePlay(): void;
}
```

For example you can use seek, duration and progress props to create "+15s skip" Netflix like button.

## 🔜 Improvements 

- Seeking via dragging
- Volume via dragging
- Hiding of the controls
- Maybe add a gradient under the control strip?