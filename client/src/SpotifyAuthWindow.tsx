import React, {Component} from 'react';
import ReactDOM from "react-dom";

export default class SpotifyAuthWindow extends Component {

    private externalWindow: Window | null;
    private containerEl: HTMLDivElement;
    private SCOPE_LIST = "streaming, user-read-email, user-read-private";

    constructor(props: any) {
        super(props);
        this.containerEl = document.createElement('div');
        this.externalWindow = null;
    }

    public componentDidMount(): void {

        this.externalWindow = window.open("https://accounts.spotify.com/authorize?" +
            "client_id=c464bae3a4554957b52b780c7843a70e" + 
            "&response_type=token" +
            "&redirect_uri=" + "http://localhost:8080/songplayer" +
            "&show_dialog=true" +
            "&scope="+this.SCOPE_LIST, '', "width=600, height=500");
    }


    public render() {

        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}
