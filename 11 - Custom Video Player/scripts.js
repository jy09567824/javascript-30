const video = document.querySelector('.viewer')
console.dir(video)

// 監聽畫面與按鈕的點擊播放暫停事件，並播放或暫停影片，同時改變按鈕圖示
const icon = document.querySelector('[title="Toggle Play"]')

video.addEventListener('click', clickVideo)
icon.addEventListener('click',clickVideo)

function clickVideo() {
    if (video.paused === true) {
        video.play()
        icon.innerHTML = '►'
    } else {
        video.pause()
        icon.innerHTML = '❚❚'
    }
}

// // 監聽音量捲軸的 input (type = range) 捲動與點擊
// const volume = document.querySelector('[name="volume"]')
// volume.addEventListener('input', moveVolume)
// function moveVolume() {
//     // 取得目前捲軸的音量值 0~1
//     const scrubVolume = this.value
//     video.volume = scrubVolume
// }

// // 監聽速度捲軸的 input (type = range)
// const playbackRate = document.querySelector('[name="playbackRate"]')
// console.log(playbackRate)
// playbackRate.addEventListener('input',changeSpeed)

// function changeSpeed() {
//     const scrubSpeed = this.value
//     video.playbackRate = scrubSpeed
// }

// 速度＆音量捲軸方法二
const ranges = document.querySelectorAll('.player__slider')
// ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate))

function handleRangeUpdate() {
    video[this.name] = this.value
  }

// 監聽影片目前時間，根據目前時間改變影片進度條寬度
video.addEventListener('timeupdate',updateHandler)

function updateHandler(e) {
    console.log(e)
    // console.log(e.target.currentTime)
    // 改變 CSS 調整時間軸寬度
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

// 監聽時間軸點擊、拖曳事件，並改變量表位置
// 點擊
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
progress.addEventListener('click',changeProgress)
function changeProgress(e) {
    // 取得現在時間軸的值，值為目前點擊位置所佔百分比
    const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration
    video.currentTime =  scrubTime
}

// 拖曳
let keydown = false
progress.addEventListener('mousedown', () => keydown = true)
progress.addEventListener('mouseup', () => keydown = false)
progress.addEventListener('mousemove', function(e) {
    if (keydown === true) {
        changeProgress(e)
    }
})


// 監聽快轉按鈕的點擊事件
const skips = document.querySelectorAll('.player__button')
skips.forEach( skip => skip.addEventListener('click', skipTime))

function skipTime(e) {
    console.log(video.currentTime, e.target.dataset.skip)
    video.currentTime = video.currentTime + parseInt(e.target.dataset.skip)
}




