
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { useBooks } from "@/context/BookContext";
import BookCard from "@/components/BookCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookForm from "@/components/BookForm";
import { Book } from "@/types/book";

const BooksPage: React.FC = () => {
  const { books, addBook } = useBooks();
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const handleAddBook = (book: Book) => {
    addBook(book);
    setIsAddBookOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-book-dark">My Books</h1>
          <p className="text-gray-500 mt-1">
            {books.length} {books.length === 1 ? "book" : "books"} in your collection
          </p>
        </div>
        <Button 
          onClick={() => setIsAddBookOpen(true)} 
          className="bg-book-purple hover:bg-book-darkPurple"
        >
          <Plus size={16} className="mr-1" /> Add Book
        </Button>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-700 mb-2">Your book collection is empty</h2>
          <p className="text-gray-500 mb-6">
            Start tracking your reading journey by adding your first book.
          </p>
          <Button 
            onClick={() => setIsAddBookOpen(true)} 
            className="bg-book-purple hover:bg-book-darkPurple"
          >
            <Plus size={16} className="mr-1" /> Add Your First Book
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <BookForm 
            onSubmit={handleAddBook} 
            onCancel={() => setIsAddBookOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BooksPage;
