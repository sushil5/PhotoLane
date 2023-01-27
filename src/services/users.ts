const users = ({ get, post }: any) => {
    const getUsers = (url: string) => { get(url) };


    return { getUsers }
}

export default users;