
import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "../types/book";
import { bookService } from "../services/bookService";
import { toast } from "@/components/ui/use-toast";

interface BookContextType {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  getBook: (id: string) => Book | undefined;
  statistics: {
    totalBooks: number;
    averageRating: number;
    favoriteAuthor: string;
    favoriteAuthorCount: number;
  };
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [statistics, setStatistics] = useState({
    totalBooks: 0,
    averageRating: 0,
    favoriteAuthor: "No books yet",
    favoriteAuthorCount: 0
  });

  useEffect(() => {
    // Load books from localStorage when component mounts
    const loadedBooks = bookService.getBooks();
    setBooks(loadedBooks);
    updateStatistics(loadedBooks);
  }, []);

  const updateStatistics = (currentBooks: Book[]) => {
    setStatistics(bookService.getStatistics());
  };

  const addBook = (book: Book) => {
    const newBooks = [...books, book];
    setBooks(newBooks);
    bookService.saveBook(book);
    updateStatistics(newBooks);
    toast({
      title: "Book Added",
      description: `"${book.title}" has been added to your collection.`,
    });
  };

  const updateBook = (book: Book) => {
    const newBooks = books.map(b => b.id === book.id ? book : b);
    setBooks(newBooks);
    bookService.saveBook(book);
    updateStatistics(newBooks);
    toast({
      title: "Book Updated",
      description: `"${book.title}" has been updated.`,
    });
  };

  const deleteBook = (id: string) => {
    const bookToDelete = books.find(b => b.id === id);
    const newBooks = books.filter(book => book.id !== id);
    setBooks(newBooks);
    bookService.deleteBook(id);
    updateStatistics(newBooks);
    if (bookToDelete) {
      toast({
        title: "Book Removed",
        description: `"${bookToDelete.title}" has been removed from your collection.`,
      });
    }
  };

  const getBook = (id: string) => {
    return books.find(book => book.id === id);
  };

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBook,
    statistics
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

export default BookContext;
