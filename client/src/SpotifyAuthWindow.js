import { Component } from 'react';
import ReactDOM from "react-dom";

const SCOPE_LIST = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";

export default class SpotifyAuthWindow extends Component {
    constructor(props) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    componentDidMount() {
        this.externalWindow = window.open("https://accounts.spotify.com/authorize?" +
            "client_id=b4c5578a147f4a56bb4fce7a42e507e7" +
            "&response_type=token" +
            "&redirect_uri=http://localhost:8080/redirect" +
            "&show_dialog=true" +
            "&scope=" + SCOPE_LIST, '', "align-content = center, width=800, height=950");
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}