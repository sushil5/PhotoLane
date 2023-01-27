const album = ({ get, post }: any) => {
    getAlbums: (url: string) => get(url);
    getAlbumPhotos: (url: string) => get(url)
}

export default album