// controllers/bookController.js
const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb'); // Correct import

const getBooks = async (req, res) => {
    const { UserId } = req.query;
    try {
        const db = getDB();
        const booksCollection = db.collection('Books');

        // Fetch books for the specific UserId
        const books = await booksCollection.find({ UserId }).toArray();
        res.status(200).json(books);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

const createBook = async (req, res) => {
    const { bookName, series, favorite, seriesName, genre, author, status, type, rating, description, image, UserId } = req.body;

    try {
        const db = getDB(); // Use getDB to get the database instance
        const booksCollection = db.collection('Books');

        const newBook = {
            bookName,
            series,
            favorite,
            seriesName,
            genre,
            author,
            status,
            type,
            rating,
            description,
            image,
            UserId 
        };
        await booksCollection.insertOne(newBook);
        res.status(201).json({ message: 'Book added successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to add book' });
    }
};

// Add the updateBook controller
const updateBook = async (req, res) => {
    const { bookId, bookName, series, favorite, seriesName, genre, author, status, type, rating, description, image, UserId } = req.body;

    try {
        const db = getDB();
        const booksCollection = db.collection('Books');

        // Update the book with the given bookId
        const result = await booksCollection.updateOne(
            { _id: new ObjectId(bookId) }, 
            {
                $set: {
                    bookName,
                    series,
                    favorite,
                    seriesName,
                    genre,
                    author,
                    status,
                    type,
                    rating,
                    description,
                    image,
                    UserId
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update book' });
    }
};

module.exports = { getBooks, createBook, updateBook };
