import React from 'react'
import './style.scss'
import ReactPlayer from "react-player";
// import YouTubePlayer from 'react-player/lib/players/YouTube'

function VideoPlayer(props) {
    return (
			<React.Fragment>
				{/* <YouTubePlayer
					url={props.videoURL}
				/> */}
				{ props.videoURL ?
					<React.Fragment>
						<h2 className="pb-3">What Our Students Say</h2>
						<ReactPlayer
							url={props.videoURL}
							width={props.width}
							height={props.height}
						/>
					</React.Fragment> 
					: null
				}

			</React.Fragment>
    )
}

export default VideoPlayer
