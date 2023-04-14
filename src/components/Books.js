import {useState, useEffect} from 'react'

function Books(){
    const [books, setBooks] = useState([])
    useEffect(()=>{
        fetch('http://localhost:9292/books')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[])

    const [newBook, setNewBook] = useState({
        id:'',
        title: '',
        author:'',
        category:'',
        borrower_id:''
    }); 

   const handleInputChange = (event)=>{
    setNewBook({
        ...newBook,
        [event.target.name]: event.target.value,
    });
   }

   

   const handleAddBook = () => {
    setBooks([...books, newBook]);
    setNewBook({
      id:'',
      title: '',
      author: '',
      category: '',
      borrowerId: '',
    });
  };

  const editBook = (id, title, author, category, borrowerId) => {
    const updatedBooks = [...books];
    updatedBooks[id] = { id, title, author, category, borrowerId };
    setBooks(updatedBooks);
  };


  const deleteBook = (id) => {
    const updatedBooks = [...books];
    updatedBooks.splice(id, 1);
    setBooks(updatedBooks);
  }

    return(
        <>
        <div>
          <h2>Books</h2>
          <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Borrower ID</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, id) =>
                <tr key={id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.borrower_id}</td>
                </tr>
                )}
            </tbody>
          </table>

    <div>
        <h3>Add Book</h3>
        <div>
        <label htmlFor="title">Title:</label>
          <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" name="category" value={newBook.category} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="borrowerId">Borrower ID:</label>
          <input type="text" name="borrowerId" value={newBook.borrower_id} onChange={handleInputChange} />
        </div>
        <button onClick={handleAddBook}>Add Book</button>
        <button onClick={() => editBook(id, books.title, books.author, books.category, books.borrower_Id)}>Edit</button>
        <button onClick={() => deleteBook(id)}>Delete</button>
        </div>
    </div> 

        </>
    )}

export default Books