/* Sections: Book section, Form section, Errors section, List section, Init */

/* --- Variables --- */

const updateBtn = document.querySelector('#updateButton');
const addBookBtn = document.querySelector('#addBookButton');

const modalForm = document.querySelector('#openModalForm');
const bookForm = document.querySelector('#bookForm');
const closeModalBtn = document.querySelector('#closeModalForm');

const container = document.querySelector('#container');
const errorHelper = document.querySelector('#errorHelper');

const bookModal = document.querySelector('#bookModalView');
const bookTitleV = document.querySelector('#bookViewTitle');
const bookInfoV = document.querySelector('#bookViewInfo');
const bookDescV = document.querySelector('#bookViewDescription');
const closeBookV = document.querySelector('#closeModalView');
const editBookV = document.querySelector('#editModalView');
const deleteBook = document.querySelector('#deleteBook');

let isOpenModal = false;
let errors = [];
let library = [
    new Book('The Great Gatsby', 'Charles Scribner`s', 'F. Scott Fitzgerald', 180, 'n'),
    new Book('Ao Kill a Mockingbird', 'Grand Central Publishing', 'Harper Lee', 281, 'r'),
];

/* --- Listeners --- */

updateBtn.addEventListener('click', () => {
    fillPageBooks();
})

addBookBtn.addEventListener('click', () => {
    openModalForm();
});

closeModalBtn.addEventListener('click', () => {
    closeModalForm();
});

container.addEventListener('click', () => {
    fillPageBooks();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitBook();
});

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

/* --- Form section --- */

/**
 * Adds a book to the library.
 * 
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 */
const addBook = (title, publisher, author, pages, status, description = "") => {
    
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

/**
 * Opens the form modal by removing the 'hidden' class.
 *
 */
const openModalForm = () => {

    if (isOpenModal){
        closeModalForm();
        return;
    }


    container.classList.add('hidden');
    updateBtn.classList.add('hidden');
    addBookBtn.classList.add('hidden');

    modalForm.classList.remove('hidden');
    isOpenModal = true;
}

const closeModalForm = () => {

    container.classList.remove('hidden');
    updateBtn.classList.remove('hidden');
    addBookBtn.classList.remove('hidden');

    modalForm.classList.add('hidden');
    isOpenModal = false;
}

/**
 * Submits a book by retrieving input values from the document, 
 * adding the book using the addBook function, and updating the page 
 * with the book list if successful.
 *
 * @return {boolean} true and refresh the list if the book is successfully added, false otherwise.
 */
const submitBook = () => {
    const { value: title } = document.querySelector('#title');
    const { value: publisher } = document.querySelector('#publisher');
    const { value: author } = document.querySelector('#author');
    const { value: pages } = document.querySelector('#pages');
    const { value: status } = document.querySelector('#status');
    const { value: description } = document.querySelector('#description');

    const put = addBook(title, publisher, author, pages, status, description);
    
    if (put) {
        closeModalForm();
        fillPageBooks();
        resetForm();
    }
}

const resetForm = () => {
    document.querySelector('#title').value = '';
    document.querySelector('#publisher').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#status').value = 'n';
    document.querySelector('#description').value = '';
}


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

    if (status !== 'r' && status !== 'n')
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
            errorHelper.textContent = "";
            errorHelper.textContent += `${error}\n`;
        });
        return true;
    }
    return false;
}

/* --- List section --- */

/**
 * Update the page's list of books.
 * 
 * @function listBooks - Retrieves the list of books.
 */
const fillPageBooks = () => {

    let books = library;

    let hasErrors = checkErrors();

    if (hasErrors)
    {errors = []; return;}

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
    });
};

/* --- Init --- */

onload = () => {
    fillPageBooks();
}