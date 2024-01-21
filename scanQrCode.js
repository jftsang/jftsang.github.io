document.addEventListener("DOMContentLoaded", async function () {
  const video = document.getElementById('qr-video');

  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    console.error('getUserMedia is not supported by this browser');
    return;
  }

  try {
    // Assign the stream to the video element
    video.srcObject = await navigator.mediaDevices.getUserMedia({video: true});
    video.play();

    // Start scanning for QR codes
  } catch (error) {
    console.error('Error accessing camera:', error);
  }

  function scanQRCode() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', {willReadFrequently: true});

    // Set canvas size to match video stream
    canvas.width = video.width;
    canvas.height = video.height;

    function scan() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        navigator.mediaDevices.getUserMedia({video: true}).getTracks()[0].stop();
        return code.data;
      }

      // Repeat the scanning process
      requestAnimationFrame(scan);
    }

    // Start the scanning process
    return scan();
  }

  console.log(scanQRCode());

})
;
