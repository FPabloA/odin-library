function Book (title, author, numPages, haveRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.uid = crypto.randomUUID();
    this.info = function() {
        if (this.haveRead) {
            console.log(this.title + " by " + this.author + ", " + this.numPages + ", have read");
        }
        else {
            console.log(this.title + " by " + this.author + ", " + this.numPages + ", not read yet");
        }
        
    }
}

function addBookToLibrary() {
    
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 295, true);