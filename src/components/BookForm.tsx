
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { Book } from "@/types/book";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "./StarRating";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  rating: z.number().min(1).max(5),
  notes: z.string(),
  dateAdded: z.string().optional(),
});

interface BookFormProps {
  defaultValues?: Partial<Book>;
  onSubmit: (book: Book) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const BookForm: React.FC<BookFormProps> = ({
  defaultValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues.id || "",
      title: defaultValues.title || "",
      author: defaultValues.author || "",
      rating: defaultValues.rating || 0,
      notes: defaultValues.notes || "",
      dateAdded: defaultValues.dateAdded || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const book: Book = {
      id: values.id || uuidv4(),
      title: values.title,
      author: values.author,
      rating: values.rating,
      notes: values.notes,
      dateAdded: values.dateAdded || new Date().toISOString(),
    };
    onSubmit(book);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter the author's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="p-1">
                  <StarRating 
                    rating={field.value} 
                    editable={true} 
                    onRatingChange={(rating) => field.onChange(rating)} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your thoughts about the book..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="bg-book-purple hover:bg-book-darkPurple">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookForm;
