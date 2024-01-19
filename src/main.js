const library = [];

/**
 * Creates a new Book object.
 *
 * @param {string} title - The title of the book.
 * @param {string} writer - The writer of the book.
 * @param {string} author - The author of the book.
 * @param {number} pages - The number of pages in the book.
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 * @return {string} - Returns the book's data/information.
 */

function Book(title, writer, author, pages, status) {

    this.title = title;
    this.writer = writer;
    this.author = author;
    this.pages = pages;
    this.status = status;
    
    this.info = () => {
        const read = this.status.includes('r') ? 'read' : 'not read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    }
}

/**
 * Adds a book to the library.
 * 
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 */

let addBook = (title, writer, author, pages, status) => {
    const newBook = new Book(title, writer, author, pages, status);
    library.push(newBook);
}