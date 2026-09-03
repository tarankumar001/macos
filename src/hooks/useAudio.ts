export interface HTMLAudioState {
  volume: number;
  playing: boolean;
}

export interface HTMLAudioProps {
  src: string;
  autoReplay?: boolean;
}

export function useAudio(props: HTMLAudioProps) {
  const ref = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<HTMLAudioState>({
    volume: 1,
    playing: false
  });

  // Initialize audio element only once
  useEffect(() => {
    if (!ref.current) {
      ref.current = new Audio(props.src);
    }
    return () => {
      // Cleanup: pause audio when component unmounts
      if (ref.current) {
        ref.current.pause();
      }
    };
  }, []);

  const controls = {
    play: (): Promise<void> | void => {
      const el = ref.current;
      if (el) {
        setState((prevState) => ({ ...prevState, playing: true }));
        return el.play();
      }
    },

    pause: (): Promise<void> | void => {
      const el = ref.current;
      if (el) {
        setState((prevState) => ({ ...prevState, playing: false }));
        return el.pause();
      }
    },

    toggle: (): Promise<void> | void => {
      const el = ref.current;
      if (el) {
        const promise = state.playing ? el.pause() : el.play();
        setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
        return promise;
      }
    },

    volume: (value: number): void => {
      const el = ref.current;
      if (el) {
        value = Math.min(1, Math.max(0, value));
        el.volume = value;
        setState((prevState) => ({ ...prevState, volume: value }));
      }
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handler = () => {
      if (props.autoReplay) controls.play();
    };

    el.addEventListener("ended", handler);
    return () => {
      el.removeEventListener("ended", handler);
    };
  }, [props.autoReplay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Update audio source if it changes
    if (el.src !== props.src) {
      el.src = props.src;
    }

    setState({
      volume: el.volume,
      playing: !el.paused
    });
  }, [props.src]);

  return [ref.current as HTMLAudioElement, state, controls, ref] as const;
}
