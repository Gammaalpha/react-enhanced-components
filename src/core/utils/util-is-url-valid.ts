export const isURLValid = (url: string) => {
    // debugger;
    const regex = /^http([s]?):\/\/.*/;
    return regex.test(url)
}