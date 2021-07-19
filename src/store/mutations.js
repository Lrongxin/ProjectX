import {
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_LIST_PLAYER,
    SET_SONG_DETAIL,
    SET_SONG_LYRIC,
    SET_DEL_SONG,
    SET_CURRENT_INDEX,
    SET_CURRENT_TIME,
    SET_FAVORITE_SONG,
    SET_FAVORITE_LIST,
    SET_HISTORY_LIST,
    SET_HISTORY_SONG
} from "./mutations-type"
export default {
    [SET_FULL_SCREEN](state, flag) {
        state.isFullScreen = flag
        if (flag) {
            state.isShowMiniPlayer = false
            state.isShowListPlayer = false
        }
    },
    [SET_MINI_PLAYER](state, flag) {
        state.isShowMiniPlayer = flag
        if (flag) {
            state.isFullScreen = false
            state.isShowListPlayer = false
        }
    },
    [SET_LIST_PLAYER](state, flag) {
        state.isShowListPlayer = flag
        if (flag) {
            state.isFullScreen = false
            state.isShowMiniPlayer = true
        }
    },
    [SET_IS_PLAYING](state, flag) {
        state.isPlaying = flag
    },
    [SET_MODE_TYPE](state, flag) {
        state.modeType = flag
    },
    [SET_SONG_DETAIL](state, list) {
        state.songs = list
    },
    [SET_SONG_LYRIC](state, lyric) {
        state.currentLyric = lyric
    },
    [SET_DEL_SONG](state, index) {
        if (index !== undefined) {
            state.songs.splice(index, 1)
        } else {
            state.songs = []
        }
        if (index < state.currentIndex) {
            state.currentIndex = state.currentIndex - 1
        }
        if (state.songs.length === 0) {
            state.isFullScreen = false
            state.isShowMiniPlayer = false
            state.isShowListPlayer = false
        }
    },
    [SET_CURRENT_INDEX](state, index) {
        if (index < 0) {
            index = state.songs.length - 1
        } else if (index > state.songs.length - 1) {
            index = 0
        }
        state.currentIndex = index
    },
    [SET_CURRENT_TIME](state, time) {
        state.curTime = time
    },
    [SET_FAVORITE_SONG](state, song) {
        let result = state.favoriteList.find(function (currentValue) {
            return currentValue.id === song.id
        })
        if (result === undefined) {
            state.favoriteList.push(song)
        }
    },
    [SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    },
    [SET_HISTORY_SONG](state, song) {
        let result = state.historyList.find(function (currentValue) {
            return currentValue.id === song.id
        })
        if (result === undefined) {
            if (state.historyList.length > 30) {
                state.historyList.splice(0, 1)
            }
            state.historyList.push(song)
        }
    },
    [SET_HISTORY_LIST](state, list) {
        state.historyList = list
    },
}