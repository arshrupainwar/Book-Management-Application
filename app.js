class Book
{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class GUI
{
  static addBookToList(book)
  {
    const tbody = document.querySelector("#book-list");
    const row =  document.createElement("tr"); //<tr></tr>
    row.innerHTML=` <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
    tbody.appendChild(row);
  }

  static clearAllFileds()
  {
    document.querySelector("#title").value="";
    document.querySelector("#author").value="";
    document.querySelector("#isbn").value="";
  }

  static showAlert(msg,className)
  {
    const div = document.createElement("div");
    div.className=`alert alert-${className}`;
    div.appendChild(document. createTextNode(msg));
    //console.log(div);
     
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div,form);
    setTimeout(function(){
      document.querySelector(".alert").remove();
    },5000);
  }

  static displayBook()
  {
  //   const storebooks = 
  //   [{
  //   title:"Book-one",
  //   author:"John doe",
  //   isbn:"1234"
  //   },{
  //   title:"Book-two",
  //   author:"Jane doe",
  //   isbn:"123"
  //  }]

  //const books = storebooks;
  const books = Store.getBook();
  books.forEach(kitab => GUI.addBookToList(kitab))
  }

  static deleteBook(e)
  {
    if(e.target.classList.contains("delete"))
     e.target.parentElement.parentElement.remove();
  }
}

class Store
{
  static addBook(book)
  {
    const books = Store.getBook(); // here books is the name of array
    books.push(book); // here book is the object passed in the function
    localStorage.setItem("key1",JSON.stringify(books));
  }

  static getBook()
  {
    let books;
    if(localStorage.getItem("key1") === null)
      books = [];
    else
      books = JSON.parse(localStorage.getItem("key1"));

      return books;
  }

  static removeBook(isbn)
  {
    const delete_books = Store.getBook();
    delete_books.forEach((Book,index) =>
    {
      if(delete_books.isbn === isbn);
        delete_books.splice(index ,1);   

    });
    localStorage.setItem("key1",JSON.stringify(delete_books));
  }
}

//for delete button 
document.querySelector("#book-list").addEventListener("click", (e) =>
{
  GUI.deleteBook(e)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  GUI.showAlert("Book Deleted Successfully","success");
});

//for deault addtion of books
document.addEventListener("DOMContentLoaded",()=>{
  GUI.displayBook();
})

//for addbook button
document.querySelector("#book-form").addEventListener("submit",(e) =>
{
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
 
  if(title=="" || author=="" || isbn=="")
  {
    GUI.showAlert("Please Fill Some Values","danger");
    return;
  }

  else
  {
    const book = new Book(title,author,isbn);
    Store.addBook(book);
    GUI.addBookToList(book);
    GUI.clearAllFileds();
    GUI.showAlert("Book Added Successfully","success");
  
  }
  
});


