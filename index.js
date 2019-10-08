navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        const frogjaw = document.querySelector('.frogfg')
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += (array[i]);
            }

            var average = values / length;

            console.log(Math.round(average));
            frogjaw.style.transform = `translateY(${Math.round(average) * 0.75}px)`

            
            // colorPids(average);
        }
    })
    .catch(function(err) {
        /* handle the error */
    });
