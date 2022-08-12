import React,{useState, useRef, useEffect} from 'react';
import {FaDownload, FaWindowClose} from 'react-icons/fa' 

function App() {

	const videoRef = useRef(null);
	const canRef = useRef(null);
	const [pict,setPict] = useState(false);

	const getVideo = () =>{
		navigator.mediaDevices
			.getUserMedia({
				video: {width: 1280, height: 720}
			})
			.then(stream => {
				const video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch(err => {
				console.error(err);
			})
	}

	const takePhoto = () => {

		let video = videoRef.current;
		let photo = canRef.current

		let context = photo.getContext('2d');
		context.drawImage(video,0,0, photo.width, photo.height);

		setPict(true);
	}

	const handleDownload = () => {

		let photo = canRef.current;

		let link = document.createElement('a');
		link.download = 'photo.png';
		link.href = photo.toDataURL();
		link.click();
	}


	useEffect(() => {
		getVideo();
	},[videoRef])

	return (
		<div className='App'>
			<div className='cam'>
				<div className='camera'>
					<video ref={videoRef}></video>
			  	</div>
				<button onClick={takePhoto} className='click'>Click</button>
			</div>
			<div className={'imgview'  + (pict ? ' show': ' noShow')}>
				<div>
					<FaDownload  className='download' onClick={handleDownload}/>
				</div>
				<canvas className='can' ref={canRef}></canvas>
				<div>
					<FaWindowClose onClick={() => {setPict(false)}} className='close' />
				</div>
			</div>
		</div>    
	);	
}

export default App;
