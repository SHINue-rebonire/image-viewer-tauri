import {useRef, useState} from 'react';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Image Capture App</h1>
      <div>
        <button onClick={startCamera}>VideoCapture</button>
        <button onClick={captureImage} disabled={!isCapturing}>Run</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <video ref={videoRef} autoPlay style={{ display: isCapturing ? 'block' : 'none' }} />
        <canvas ref={canvasRef} style={{ border: '1px solid black', display: isCapturing ? 'block' : 'none' }} />
      </div>
    </div>
  );
}

export default App;
