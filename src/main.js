/**
 * Creates a new Book object.
 *
 * @param {string} title - The title of the book.
 * @param {string} publisher - The publisher of the book.
 * @param {string} author - The author of the book.
 * @param {number} pages - The number of pages in the book.
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 * @return {string} - Returns the book's data/information.
 */

function Book(title, publisher, author, pages, status) {

    this.title = title;
    this.publisher = publisher;
    this.author = author;
    this.pages = pages;
    this.status = status;
    
    this.info = () => {
        const read = this.status.includes('r') ? 'read' : 'not read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    }
}

const library = [
    new Book('The Great Gatsby', 'Charles Scribners', 'F. Scott Fitzgerald', 180, 'n'),
    new Book('To Kill a Mockingbird', 'Grand Central Publishing', 'Harper Lee', 281, 'r'),
];

let errors = [];

/**
 * Adds a book to the library.
 * 
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 */

let addBook = (title, publisher, author, pages, status) => {
    
    const validate = validateBook(title, publisher, author, pages, status);

    if (!validate) {
        const newBook = new Book(title, publisher, author, pages, status);
        library.push(newBook);
        return;
    };

    return errors;
}

/**
 * Retrieves a list of books.
 *
 * @param {string} option - The ordering filter of the list ('w' for publisher, 'a' for author, 'p' for pages, 's' for status).
 * @return {Array} - Returns an array of books.
 */

let listBooks = (option) => {
    const filterOps = {
        'w': 'publisher',
        'a': 'author',
        'p': 'pages',
        's': 'status',
    };

    const valid = isValid(option);
    
    const filter = valid ? filterOps[option] : false;

    return !filter ? library : sortBooks(filter, option);
}

/**
 * Sorts the library of books based on the given option.
 *
 * @param {string} filter - The atribute to sort.
 * @param {string} option - The sorting option.
 * @return {Array} - The sorted library of books.
 */

let sortBooks = (filter, option) => {
    
    return option === 'p' ?
              library.sort((a, b) => a[filter] - b[filter])
            : library.sort((a, b) => a[filter].localeCompare(b[filter]));
}
