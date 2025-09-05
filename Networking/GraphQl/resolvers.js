// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const data = {
    authors: [
      {
        id: "1",
        name: "J.K. Rowling",
        bookIds: ["101", "102"]
      },
      {
        id: "2",
        name: "George R.R. Martin",
        bookIds: ["103"]
      },
      {
        id: "3",
        name: "J.R.R. Tolkien",
        bookIds: ["104", "105"]
      }
    ],
    books: [
      {
        id: "101",
        title: "Harry Potter and the Philosopher's Stone",
        publishedYear: 1997,
        authorId: "1"
      },
      {
        id: "102",
        title: "Harry Potter and the Chamber of Secrets",
        publishedYear: 1998,
        authorId: "1"
      },
      {
        id: "103",
        title: "A Game of Thrones",
        publishedYear: 1996,
        authorId: "2"
      },
      {
        id: "104",
        title: "The Hobbit",
        publishedYear: 1937,
        authorId: "3"
      },
      {
        id: "105",
        title: "The Lord of the Rings",
        publishedYear: 1954,
        authorId: "3"
      }
    ]
  };
  

export const resolvers = {
    Book: {
        author: (parent,args,context,info) =>{
            return data.authors.find(authdetail => authdetail.id === parent.authorId);
        }
    },
    Author: {
        books: (parent,args,context,info) => {
            return data.books.filter(book => parent.bookIds.includes(book.id))
        }
    },
    Query:{
        authors: (parent,args,context,info) => {
            return data.authors
        },
        books: (parent,args,context,info) => {
            return data.books
        }
    },
    Mutation:{
        addBook: (parent,args,context,info) => {
            const newRecord = {...args, id: data.books.length+1};
            data.books.push(newRecord);
            return newRecord;
        }
    }
}