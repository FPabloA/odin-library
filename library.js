const sidebar = document.querySelector("#page-sidebar");
const contentWrapper = document.getElementById("content-wrapper");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const numPagesInput = document.getElementById("book-numpages");
const readInput = document.getElementById("book-readstatus");
let bookList = [];

function Book (title, author, numPages, haveRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.uid = crypto.randomUUID();
    this.toggleRead = function() {
        this.haveRead = !this.haveRead;
        const cardStatus = document.getElementById(this.uid + "-status");
        if (this.haveRead) {
            cardStatus.innerHTML = "Have read this book";
        }
        else {
            cardStatus.innerHTML = "Have not read this book";
        }
    };
    this.removeCard = function() {
        // document.getElementById(this.uid).remove();
        // // thisCard.remove();
        bookList = bookList.filter(item => item != this)
        displayCards();
    }
}

function addBookToLibrary() {
    const newBook = new Book(titleInput.value, authorInput.value, numPagesInput.value, readInput.checked);
    bookList.push(newBook)

    titleInput.value = "";
    authorInput.value = "";
    numPagesInput.value = 1;
    readInput.checked = false;
    displayCards();
    hideSidebar();
}

function showSidebar() {
    sidebar.style.display = "block";
}

function hideSidebar() {
    sidebar.style.display = "none";
}

function displayCards() {
    while(contentWrapper.lastChild.id != "add-btn"){
        contentWrapper.removeChild(contentWrapper.lastChild);
    }
    
    bookList.forEach(function(entry) {
        const newCard = document.createElement("div");
        newCard.className = "card-wrapper"
        newCard.id = entry.uid;

        const newCardTitle = document.createElement("div");
        newCardTitle.className = "card-title";
        newCardTitle.innerHTML = entry.title;

        const newCardAuthor = document.createElement("div");
        newCardAuthor.className = "card-author";
        newCardAuthor.innerHTML = entry.author;

        const newCardNumPages = document.createElement("div");
        newCardNumPages.className = "card-numpages";
        newCardNumPages.innerHTML = entry.numPages + " pages";

        const newCardReadStatus = document.createElement("div");
        newCardReadStatus.id = entry.uid + "-status"
        newCardReadStatus.className = "card-readstatus";
        if (entry.haveRead) {
            newCardReadStatus.innerHTML = "Have read this book";
        }
        else {
            newCardReadStatus.innerHTML = "Have not read this book";
        }

        const newCardBtnRow = document.createElement("div");
        newCardBtnRow.className = "card-btn-row";

        const newCardStatusBtn = document.createElement("button");
        newCardStatusBtn.className = "card-btn";
        newCardStatusBtn.innerHTML = "Change Read Status";
        newCardStatusBtn.onclick = function(){
            entry.toggleRead();
        };
        newCardBtnRow.appendChild(newCardStatusBtn);

        const newCardRemoveBtn = document.createElement("button");
        newCardRemoveBtn.className = "card-btn";
        newCardRemoveBtn.innerHTML = "X";
        newCardRemoveBtn.onclick = function(){
            entry.removeCard();
        };
        newCardBtnRow.appendChild(newCardRemoveBtn);

        newCard.appendChild(newCardTitle);
        newCard.appendChild(newCardAuthor);
        newCard.appendChild(newCardNumPages);
        newCard.appendChild(newCardReadStatus);
        newCard.appendChild(newCardBtnRow);

        contentWrapper.appendChild(newCard);
    })
}
