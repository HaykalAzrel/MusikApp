export const trackTitleFilter = (title: string, search: string) => {
    return title.toLowerCase().includes(search.toLowerCase())
}