
import React from "react";
import { Link } from "react-router-dom";
import { Book, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
      <BookOpen size={80} className="text-book-purple mb-6" />
      <h1 className="text-4xl font-bold text-book-dark mb-4">Welcome to My Reading Tracker</h1>
      <p className="text-xl text-gray-600 mb-8">
        Your personal space to track, rate, and reflect on the books you read.
      </p>
      <div className="space-y-4">
        <Link to="/books">
          <Button className="bg-book-purple hover:bg-book-darkPurple text-white px-8 py-6 text-lg">
            <BookOpen className="mr-2" /> View My Books
          </Button>
        </Link>
        <div className="text-gray-500 mt-10">
          <p>Keep track of your reading journey, rate books, and write personal notes.</p>
          <p className="mt-2">All your data is stored locally on your device.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
