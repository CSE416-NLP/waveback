const SPOTIFY_AUTH_TOKEN = "spotifyAuthToken";
const SPOTIFY_ACCESS = "spotifyAccess";
const SPOTIFY_TOKEN_EXPIRATION_TIME = "spotifyTokenExpirationTime";

export function getSpotifyAccess() {
    if (localStorage.getItem(SPOTIFY_ACCESS) === null) {
        return null;
    } else {
        switch (localStorage.getItem(SPOTIFY_ACCESS)) {
            case ("not_requested"):
                return "not_requested";
            case ("denied"):
                return "denied";
            case ("allowed"):
                return "allowed";
            case ("no_premium"):
                return "no_premium";
            default:
                return null;
        }
    }
}

export function setSpotifyAccess(access) {
    localStorage.setItem(SPOTIFY_ACCESS, access);
}

export function getSpotifyAccessToken() {
    return localStorage.getItem(SPOTIFY_AUTH_TOKEN);
}

export function setSpotifyAccessToken(token) {
    localStorage.setItem(SPOTIFY_AUTH_TOKEN, token);
}

export function setSpotifyTokenExpirationTime(time) {
    const now = new Date();
    const expirationTime = now.getTime() + Number(time) * 1000;
    localStorage.setItem(SPOTIFY_TOKEN_EXPIRATION_TIME, expirationTime + "");
}

export function getSpotifyTokenExpirationTime() {
    return Number(localStorage.getItem(SPOTIFY_TOKEN_EXPIRATION_TIME));
}