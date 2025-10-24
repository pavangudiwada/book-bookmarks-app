import { saveDB, getDB, insertDB } from "./db.js";

export const newBookmark = async (title, link) => {
    const newBookmark = {
        "title": title,
        "link": link,
        "id": Date.now()
    }

    await insertDB(newBookmark)

    return newBookmark
}

export const getBookmarks = async () => {
    const { bookmarks } = await getDB()
    return bookmarks
}

export const findBookmark = async (filter) => {
    const { bookmarks } = await getDB()
    return bookmarks.filter(bookmark => bookmark.title.toLowerCase().includes(filter.toLowerCase()))
}


export const removeBookmark = async (id) => {
    const { bookmarks } = await getDB()
    const match = bookmarks.find(bookmark => bookmark.id === id)

    if (match) {
        const newBookmarks = bookmarks.filter(bookmark => bookmark.id !== id)
        await saveDB({ bookmarks: newBookmarks })
        return "Bookmark Deleted"
    }

    return "Bookmark not found"
}

export const removeAllBookmarks = () => saveDB({ notes: [] })