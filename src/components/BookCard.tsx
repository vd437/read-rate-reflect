
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "@/types/book";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className }) => {
  const truncateNotes = (notes: string, maxLength: number = 30) => {
    if (notes.length <= maxLength) return notes;
    return `${notes.substring(0, maxLength)}...`;
  };

  return (
    <Link to={`/books/${book.id}`}>
      <Card className={cn("h-full hover:shadow-md transition-shadow cursor-pointer", className)}>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold line-clamp-2 text-book-dark mb-1">{book.title}</h3>
          <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
          <div className="mb-3">
            <StarRating rating={book.rating} />
          </div>
          {book.notes && (
            <p className="text-sm text-gray-600 italic line-clamp-2">{truncateNotes(book.notes)}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
