const videoUrl = [
    './img/video/video1.mp4',
    './img/video/video2.mp4',
    './img/video/video3.mp4',
    './img/video/video4.mp4',
    './img/video/video5.mp4',
    './img/video/video6.mp4',
    './img/video/video7.mp4',
    './img/video/video8.mp4',
    './img/video/video9.mp4',
    './img/video/video10.mp4',
    './img/video/video11.mp4',
    './img/video/video12.mp4'
];

function videosAleatorios(array){
    const randomIndex = Math.floor(Math.random()*array.length);
    return array[randomIndex];
}
function recarregarVideos(){
    const videoElement = document.querySelector('video');
    const videoSource = document.getElementById('video-source');
    const randomVideoUrl = videosAleatorios(videoUrl);

    if(videoElement && videoSource){
        videoSource.src = randomVideoUrl;
        videoElement.load()
    }
}