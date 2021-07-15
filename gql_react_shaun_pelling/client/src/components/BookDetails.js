import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails(props) {
  const displayBookDetails = (loading, data) => {
    if (loading) return <p>Loading...</p>;
    if (data.book) {
      return (
        <div>
          <h4>{data.book.name}</h4>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by the author</p>
          <ul className="other-books">
            {data.book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No data to display</div>;
    }
  };

  const { loading, data } = useQuery(getBookQuery, {
    variables: {
      id: props.bookId,
    },
  });

  return (
    <div id="book-details">
      <p>Output book details here</p>
      {displayBookDetails(loading, data)}
    </div>
  );
}

export default BookDetails;
