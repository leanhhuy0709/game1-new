class Sound {
    private audio: HTMLAudioElement
    private static volume = 0

    public constructor(src: string) {
        this.audio = new Audio(src)
    }

    public play(): void {
        this.audio.volume = Sound.volume
        this.audio.play()
    }

    public pause(): void {
        this.audio.pause()
    }

    public stop(): void {
        this.audio.pause()
        this.audio.currentTime = 0
    }

    public static setVolume(volume: number): void {
        volume /= 100
        if (volume > 1) volume = 1
        else if (volume < 0) volume = 0
        Sound.volume = volume
    }

    public isPlaying(): boolean {
        return !this.audio.paused && !this.audio.ended
    }

    public static getVolume(): number {
        return Sound.volume * 100
    }
}

export default Sound
