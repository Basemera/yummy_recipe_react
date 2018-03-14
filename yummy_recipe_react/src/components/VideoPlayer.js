import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

class VideoPlayer extends Component {
    
    render() {
        return (
            <Video autoPlay loop muted
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                poster="http://sourceposter.jpg"
                onCanPlayThrough={() => {
                    // Do stuff
                }}>
                <source src="http://sourcefile.webm" type="video/webm" />
                <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
            </Video>
        );
    }
  }
export default VideoPlayer;

