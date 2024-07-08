const video = document.getElementById('targetVideo')
const emotion = document.getElementById('emotion')
const emoji = document.getElementById('emoji')

const url = 'http://localhost:9000/events/add';
let json_data = {
    "event_type": 0,
    "event_date": "",
    "event_location": "起居室",
    "event_desc": "",
    "oldperson_id": 1001
}


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

            // json_data.event_desc = "情绪 : " + emotion.innerText;
            // json_data.event_date = String(formatDate(new Date()));
            // const token = localStorage.getItem('token')
            // console.log("请求: ",token);
            // console.log(json_data)
            // axios.put(url, json_data, {
            //     headers: {
            //         'Authorization': token
            //     }
            // });
        }

        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})


video.addEventListener('play', () => {
    setInterval(async () => {
        json_data.event_desc = "情绪 : " + emotion.innerText;
        json_data.event_date = String(formatDate(new Date()));
        const token = localStorage.getItem('token')
        axios.put(url, json_data, {
            headers: {
                'Authorization': token
            }
        });
    }, 2000)
})


function formatDate(date) {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);  // 月份从0开始，需要加1
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}