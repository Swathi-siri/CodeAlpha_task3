const bookForm = document.getElementById("bookForm");
const booksContainer = document.getElementById("booksContainer");
const searchInput = document.getElementById("searchInput");

let books = [];

// Add Book Form Submit Event
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();

  if (!title || !author || !category) {
    alert("Please fill in all fields!");
    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    category,
    borrowed: false,
    history: []
  };

  books.push(newBook);
  bookForm.reset();
  displayBooks();
});

// Display Books
function displayBooks(filteredBooks = books) {
  booksContainer.innerHTML = "";

  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = "<p>No books available.</p>";
    return;
  }

  filteredBooks.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Status:</strong> ${book.borrowed ? "Borrowed" : "Available"}</p>

      <button class="borrow-btn" onclick="toggleBorrow(${book.id})">
        ${book.borrowed ? "Return Book" : "Borrow Book"}
      </button>

      <div class="history">
        <h4>Borrow History:</h4>
        <ul>
          ${book.history.map(entry => `<li>${entry}</li>`).join("")}
        </ul>
      </div>
    `;

    booksContainer.appendChild(bookCard);
  });
}

// Toggle Borrow Status
function toggleBorrow(bookId) {
  const book = books.find(b => b.id === bookId);

  if (!book) return;

  if (!book.borrowed) {
    const borrower = prompt("Enter borrower's name:");
    if (!borrower) return;
    const date = new Date().toLocaleString();
    book.history.push(`Borrowed by ${borrower} on ${date}`);
    book.borrowed = true;
  } else {
    const date = new Date().toLocaleString();
    book.history.push(`Returned on ${date}`);
    book.borrowed = false;
  }

  displayBooks();
}

// Search Function
function searchBooks() {
  const query = searchInput.value.toLowerCase();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query)
  );

  displayBooks(filteredBooks);
}
