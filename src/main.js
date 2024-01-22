/* --- Book section --- */

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
function Book(title, publisher, author, pages, status, description = "") {

    this.title = title;
    this.publisher = publisher;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.description = description;

    this.info = () => {
        const read = this.status.includes('r') ? 'read' : 'not read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    }
};

const library = [
    new Book('The Great Gatsby', 'Charles Scribner`s', 'F. Scott Fitzgerald', 180, 'n'),
    new Book('Ao Kill a Mockingbird', 'Grand Central Publishing', 'Harper Lee', 281, 'r'),
];

let errors = [];

const addBookBtn = document.querySelector('#addBookButton');

// Calls addBook modal
addBookBtn.addEventListener('click', () => {
    modalAddBook();
});

/**
 * Adds a book to the library.
 * 
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 */
let addBook = (title, publisher, author, pages, status, description = "") => {
    
    errors = [];

    const valid = validateBook(title, publisher, author, pages, status, description);

    if (valid === true) {
        const newBook = new Book(title, publisher, author, pages, status, description);
        library.push(newBook);
        return true;
    }

    checkErrors();
    return false;
};

const modalAddBook = () => {

    let modal = document.querySelector('#modalAddBook');
    modal.classList.remove('hidden');
    
} // todo

/* --- List section --- */

const container = document.querySelector('#container');

// Update list button
container.addEventListener('click', () => {
    fillPageBooks('t');
});

/**
 * Retrieves a list of books.
 *
 * @param {string} option - The ordering filter of the list ('w' for publisher, 'a' for author, 'p' for pages, 's' for status).
 * @return {Array} - Returns an array of books.
 */
const listBooks = (option) => {
    
    errors = [];

    const filters = {
        't': 'title',
        'w': 'publisher',
        'a': 'author',
        'p': 'pages',
        's': 'status',
    }
    
    const selectedFilter = option === 'd' ? filters[option] : false;

    return !selectedFilter ? library : sortBooks(selectedFilter, option);
};

/**
 * Sorts the library of books based on the given option.
 *
 * @param {string} filter - The atribute to sort.
 * @param {string} option - The sorting option.
 * @return {Array} - The sorted library of books.
 */
const sortBooks = (filter, option) => {
    
    if (option === 'p')
        return library.sort((a, b) => a[filter] - b[filter]);
    
    return library.sort((a, b) => a[filter].localeCompare(b[filter]));
};


/**
 * Update the page's list of books.
 * 
 * @param {string} option - The ordering filter of the list.
 * @function listBooks - Retrieves the list of books.
 */
let fillPageBooks = (option) => {
    
    let books = listBooks(option);

    let hasErrors = checkErrors();

    if (hasErrors)
        return;

    
    container.innerHTML = '';

    books.forEach((book) => {

        let bookDiv = document.createElement('a');
        bookDiv.classList.add('rounded', 'bg-gray-100', 'p-5', 'm-5', 'shadow-lg', 'hover:bg-blue-400');

        let titleElement = document.createElement('h2');
        titleElement.classList.add('font-bold', 'text-xl');
        titleElement.textContent = book.title;

        let authorElement = document.createElement('p');
        authorElement.textContent = book.author;

        let infoElement = document.createElement('p');
        infoElement.classList.add('mt-2');
        infoElement.textContent = book.info();

        bookDiv.appendChild(titleElement);
        bookDiv.appendChild(authorElement);
        bookDiv.appendChild(infoElement);

        container.appendChild(bookDiv);
    })
};


/* --- Errors section --- */

/**
 * Validates the book information.
 *
 * @return {Array} - If the data is invalid.
 * @return {true} - If the data is valid
 */
const validateBook = (title, publisher, author, pages, status, description = "") => {
    let valid = true;

    if (/[^a-zA-Z.' ]/.test(title))
        {errors.push("Invalid characters in title."); valid = false;}

    if (/[^a-zA-Z.' ]/.test(publisher))
        {errors.push("Invalid characters in publisher."); valid = false;}

    if (/[^a-zA-Z.' ]/.test(author))
        {errors.push("Invalid characters in author."); valid = false;}

    if (isNaN(pages) || pages <= 0)
        {errors.push("Invalid number of pages."); valid = false;}

    if (status !== 'r' || status !== 'n')
        {errors.push("Invalid characters in status."); valid = false;}

    if (/[^a-zA-Z.' ]/.test(description))
        {errors.push("Invalid characters in description."); valid = false;}

    if (description.length > 100)
        {errors.push("Too many characters in description."); valid = false;}

    return valid ? true : errors;
};



/**
 * Check if there are errors in the array display them if any.
 *
 * @return {boolean} - True if there are errors.
 */
let checkErrors = () => {
    if (errors.length > 0) {
        errors.forEach((error) => {
            let errorHelper = document.querySelector('#errorHelper');
            errorHelper.textContent = "";
            errorHelper.textContent += `${error}\n`;
        });
        return true;
    }
    return false;
}


/* --- Init --- */

onload = () => {
    fillPageBooks();
}