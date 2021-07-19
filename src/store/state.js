import mode from "./mdeType"

export default {
    isFullScreen: false,
    isShowMiniPlayer: false,
    isShowListPlayer: false,
    isPlaying: false,
    modeType: mode.loop,
    songs: [],
    currentSong: {},
    currentIndex: 0,
    currentLyric: {},
    curTime: 0,
    favoriteList: [],
    historyList: [],
}