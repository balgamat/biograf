# Biograf 🍿
> A dead-simple video player for React

_Because it usually is nearly impossible to style the available players in a way you need, I decided to create my own that has everything you need or may need exactly how you need it._

<img width="810" alt="Preview" src="https://user-images.githubusercontent.com/6381607/79433505-7d928900-7fcd-11ea-8b95-eaea4894ef5b.png">

> In the lower right corner you can see some custom controls added to the video.

##  🎰 Features

#### Universal ControlProps interface 🧮 
All the properties and methods for controlling the video are available to all the children of the player by cloning. Thanks to this, you don't need to pass props that are irrelevant to the player into it (e.g. reaction counts).

#### 🚨 Independent controls 
Thanks to detaching the controls via the interface, you can modify the provided controls and their order however you like. They get lined up with proper padding and margins in the control strip of the video, but you can also use absolute positioning and create whatever other overlays you wish. All components passed as children to the `Controls` component have access to control props (such as play, pause, etc.)

The controls available are:

- ⏯️ play/pause toggle **PlayToggle**
- 🔉 volume control **Volume** (mute/unmute on click, slider appears on hover, then you can control the volume with mouse wheel or by clicking the slider)
- 🖥 fullscreen toggle **FullScreenToggle**
- 🕐 time display (clicking on it you can switch between elapsed/remaining) **Time**
- 🕐 elapsed time (when keeping things simple) **ElapsedTime**
- ☄️ progress bar (with seeking function) **ProgressBar**

## 👨‍💻 Implementation

### Installation
To install, install `biograf` npm package and make sure you have it's peer dependencies:

```yarn add biograf react react-dom framer-motion styled-components```

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
To add some controls you can add them as children to the `Controls` component (note that you can choose whatever order you'd like:
```
import { Player, PlayToggle, Volume, Time, Controls } from 'biograf';

<Player src={[videoURL]} preload="meta" muted>
  <Controls>
    <Time/>
    <PlayToggle/>
    <Volume/>
  </Controls>
</Player>
```

### 🎨 Styling 
As `styled-components` are used, you can change the basic colors by using a theme that defines key `biograf` where you can add these keys to alter the corresponding colors:

- **PrimaryColor**    Color of text.
- **ControlsBackground**    Background color of the control buttons.
- **ControlsBackgroundOnHover**    Background color of the control buttons on hover.

If that is not enough (it might not be), feel free to create your own controls just the way you like 'em.

### Custom controls
To implement your own controls, simply create a component that accepts `controlProps: ControlProps` as its prop. This will get passed to the component via the `Controls` component, you just create the component and pass it as a child to the `Controls`. The interface is defined as following:
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

### Other `<video/>` functions
If you wish e.g. to add more tracks or use something else that is provided by the `<video/>` component but is not supported in this package (yet), you can do so by utilizing `handle` prop:

```
const playerHandle = useRef();

<Player handle={playerHandle}/>
```

Then, you can add subtitles, different audio tracks, etc.

## 🔜 Improvements 

- Seeking via dragging
- Volume via dragging
- Hiding of the controls
- Maybe add a gradient under the control strip?