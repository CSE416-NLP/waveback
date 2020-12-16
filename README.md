# waveback

*waveback* is a simple to use, yet powerful playlist creation tool that enables 
you to relive the sounds of the past in a unique way.

To try out Waveback, first npm install in both the root and client directories, and then go back to the root to run npm start.


Harness the power of nostalgia to dynamically generate playlists based on dates, 
locations and genres of your choice! waveback users are able to create/login to 
accounts and create/listen to playlists all inside the applicaiton. Playlists are 
saved to an online database (MongoDB) and are only accessable to users with 
explicit permissions. Outside of adding and removing songs from playlists, 
waveback allows users to shuffle, loop, and sort playlists by various criteria.

Key features:
- Listen to a huge collection of songs from the past
- Playlist generation based on date/location/genre parameters
- Secure account system
- Share playlists with friends or community
- Discover new (old) music from the community
- Fork playlists for your own purposes 
- And more!

waveback was created using the MERN stack, that is 
[MongoDB](https://www.mongodb.com/), 
[Express](https://www.express.com/), 
[React](https://reactjs.org/), and 
[Node.JS](https://nodejs.org/en/). 
For styling, 
[Semantic UI React](https://react.semantic-ui.com/) 
and simple CSS were used. In order to play music, waveback connects with the 
[Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/) 
through the help of the 
[react-spotify-web-playback](https://github.com/gilbarbara/react-spotify-web-playback) 
library.

## Developers
- [Tian Brown](https://github.com/TLeonBrown)
- [Nathaniel Wine](https://github.com/NathanWine)  
- [Peter Zeng](https://github.com/peterzenger)
