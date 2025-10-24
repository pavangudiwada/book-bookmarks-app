import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { findBookmark, getBookmarks, newBookmark, removeBookmark } from './bookmarks.js'


yargs(hideBin(process.argv))
    .command('new <title> <link>', 'Create new bookmark', yargs => {
        return yargs
            .positional('title', {
                describe: 'The Title and Link you want to create a bookmark for',
                type: 'string'
            })
            .positional('link', {
                describe: 'The link you want to bookmark',
                type: 'string'
            })
    }, async (argv) => {
        console.log(await newBookmark(argv.title, argv.link))
    }
    )
    .command('get', 'Get all bookmarks', {}, async (argv) => {

        console.log(await getBookmarks())

    })
    .command('find <filter>', "Find a bookmark", () => { }, async (argv) => {
        console.log(await findBookmark(argv.filter))
    })
    .command('delete <id>', "Delete a bookmark using it's ID", () => { }, async (argv) => {
        console.log(await removeBookmark(argv.id))

    })
    .command('clean', "Delete all Bookmarks", () => { }, (argv) => {
        console.log('All bookmarks deleted')
    })
    .demandCommand(1)
    .parse()