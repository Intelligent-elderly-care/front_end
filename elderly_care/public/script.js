const video = document.getElementById('targetVideo')
const emotion = document.getElementById('emotion')
const emoji = document.getElementById('emoji')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
    navigator.mediaDevices.getUserMedia({video: {} }).then( stream => {
        console.log(stream);
        video.srcObject = stream;
    }).catch( err => {
        console.error(err);
    })
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.height, height: video.width }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        
        if(detections.length != 0){
            let list = detections[0].expressions
            const keys = Object.keys(list)
            let max = 0
            let index = 0
            for(let i = 0; i < keys.length; i++){
                if(list[keys[i]] > max){
                    max = list[keys[i]];
                    index = i
                }
            }
            switch(keys[index]) {
                case 'happy': emotion.innerText = '开心';emoji.innerText = '😀';break;
                case 'angry': emotion.innerText = '愤怒';emoji.innerText = '😠';break;
                case 'disgusted': emotion.innerText = '厌恶';emoji.innerText = '😒';break;
                case 'neutral': emotion.innerText = '自然';emoji.innerText = '😐️';break;
                case 'sad': emotion.innerText = '伤心';emoji.innerText = '😢';break;
                case 'surprised': emotion.innerText = '惊讶';emoji.innerText = '😲';break;
            }
        }

        // angry
        // : 
        // 0.020949309691786766
        // disgusted
        // : 
        // 0.000001723231548567128
        // fearful
        // : 
        // 0.000009854610652837437
        // happy
        // : 
        // 0.0015824062284082174
        // neutral
        // : 
        // 0.9730788469314575
        // sad
        // : 
        // 0.00007813621050445363
        // surprised
        // : 
        // 0.004299736116081476

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})