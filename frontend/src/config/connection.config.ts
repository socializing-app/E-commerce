export const localhostURL: string = "http://localhost:3001";
export const remoteURL: string = "";
export const developmentMode: string = "DEVELOPMENT";

export const getCurrentURL = () => {
    if ( developmentMode === "DEVELOPMENT" ) {
        return localhostURL;
    }
}