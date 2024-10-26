document.addEventListener("DOMContentLoaded", () => {
    let videos = document.getElementsByTagName("video");
    console.log("videos :", videos);

    for (let i = 0; i < videos.length; i++) {
        let video = videos[i];
        console.log("videos 1 :", videos[i]);
        video.muted = true;

        video.addEventListener("mouseover", () => {
            video.play();
            video.setAttribute('controls', 'controls');
        });

        video.addEventListener("mouseout", () => {
            video.pause();
            video.removeAttribute('controls');
        });
    }
});

// naviagte to video add page
async function navtoaddpg() {
    window.location.href = "addVideo.html"
}

async function addVideo(event) {
    event.preventDefault();

    let videoForm = document.getElementById('videoForm');
    let data = new FormData(videoForm);

    let title = data.get('title');
    // let video = data.get('video');

    let video = document.getElementById("videoInput");
    console.log("video :", video);

    if (video.files && video.files[0]) {
        const file = video.files[0];  // Get the selected file

        console.log("file_type :", file.type);

        const allowed_file_types = ['video/mp4', 'viodeo/3gp', 'video/avi', 'video/ogg', 'video/webm'];
        if (!allowed_file_types.includes(file.type)) {
            alert("Please select a valid video file (MP4, WebM, Ogg ..")
            return;
        }

        const reader = new FileReader();

        // When the file is successfully read, this event is triggered
        reader.onload = async function (event) {
            const base64String = event.target.result;  // Base64-encoded string

            console.log("video base64:", base64String);

            const videoElement = document.createElement('video');
            videoElement.src = base64String;

            // Wait for the video metadata to load (duration, videoWidth, videoHeight)

            videoElement.onloadedmetadata = async function () {

                const durationInSeconds = videoElement.duration;  // Video duration in seconds
                const width = videoElement.videoWidth;   // Video width (resolution)
                const height = videoElement.videoHeight; // Video height (resolution)

                function formatDuration(durationInSeconds) {
                    const date = new Date(durationInSeconds * 1000); // Convert seconds to milliseconds
                    const minutes = date.getUTCMinutes(); // Get minutes
                    const seconds = date.getUTCSeconds(); // Get seconds
                
                    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format as MM:SS
                }

                let duration = formatDuration(durationInSeconds);
                let quality = `${height}p`;
                

                console.log("Video duration (seconds):", duration);
                console.log("Video resolution (width x height):", width, "x", height);
                console.log("quality :",quality);


                let data = {
                    title,
                    video: base64String,
                    duration,
                    quality
                }
            
          

            
            let json_data = JSON.stringify(data);
            let response = await fetch("http://localhost:3002/videos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json_data

            })
            try {
                if (response.ok) {
                    console.log(response);
                    let parsed_response = await response.text();
                    console.log("parsed_response :", parsed_response);
                    alert(parsed_response);
                    window.location.href = 'index.html';
                }
                else {
                    let parsed_response = await response.text();
                    console.log("parsed_response :", parsed_response);
                    alert(parsed_response)
                }
            }
            catch (error) {
                console.log("error :", error);
            }

        };
        };

        // Read the file as a data URL (Base64-encoded string)
        reader.readAsDataURL(file);
    }
    else {
        alert("please select a video");
    }
}

async function getAllVideos() {

    let response = await fetch("http://localhost:3002/videos", {
        method: "GET",
    });

    try {
        if (response.ok) {
            console.log(response);
            let parsed_response = await response.json();
            let datas = parsed_response.data;
            if (datas) {
                let videoss = document.getElementById('videoss');

                let content = '';

                for (let i = 0; i < datas.length; i++) {
                    content = content + `
                     <div class="box">
                    <video width="100%" controls muted>
                    <source
                        src="${datas[i].video}"
                        type="video/mp4">
                    Your browser does not support the video tag.
                    </video>
                    <div class="info">
                    <span>${datas[i].duration}</span>
                    <span>${datas[i].quality}</span>
                    </div>
                    <div class="title">${datas[i].title}</div>
                    </div>
                    `
                }

                videoss.innerHTML = content;


            }
        }
        else {
            let parsed_response = await response.json();
            console.log("message :", parsed_response.message);

        }
    }
    catch (error) {
        console.log("error :", error);
    }

}




