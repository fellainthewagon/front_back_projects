import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const DispalayBooks = ({ loading, data, selectBook }) => {
  if (loading) return <p>Loading...</p>;
  return data.books.map((book) => {
    return (
      <li key={book.id} onClick={() => selectBook(book.id)}>
        {book.name}
      </li>
    );
  });
};

function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, data } = useQuery(getBooksQuery);
  const selectBook = (id) => setSelected(id);

  return (
    <div>
      <ul id="book-list">
        <DispalayBooks loading={loading} data={data} selectBook={selectBook} />
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
