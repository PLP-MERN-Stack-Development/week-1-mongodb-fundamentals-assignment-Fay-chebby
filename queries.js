//TASK 1
// I created it locally on the MongoDB Compass, the used the terminal to run the script
// TASK 2
// Question 1
db.books.find();
//Question 2
db.books.find({ author: "Herman Melville" });
//Question 3
db.books.find({ published_year: { $gt: 1851 } });
//question4
db.books.find({ genre: "Fantasy" });
//Question 5
db.books.find({ in_stock: false });

// TASK3
//Question 1
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 },
});
//Question 2
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 },
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1,
  }
);
//Question 3
db.books.find({}, { _id: 0, title: 1, price: 1 }).sort({ price: 1 });
db.books.find({}, { _id: 0, title: 1, price: 1 }).sort({ price: -1 });

//Question 4
//Page 1 (skip 0, limit 5)
db.books
  .find({}, { _id: 0, title: 1, price: 1 })
  .sort({ price: 1 })
  .skip(0)
  .limit(5);
// Page 2 (skip 5, limit 5)
db.books
  .find({}, { _id: 0, title: 1, price: 1 })
  .sort({ price: 1 })
  .skip(5)
  .limit(5);

//Page 3 (skip 10, limit 5)
db.books
  .find({}, { _id: 0, title: 1, price: 1 })
  .sort({ price: 1 })
  .skip(10)
  .limit(5);

//Task 4
//Question 1
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      totalBooks: { $sum: 1 },
    },
  },
  {
    $sort: { averagePrice: -1 },
  },
]);

// Question 2
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
    },
  },
  {
    $sort: { bookCount: -1 },
  },
  {
    $limit: 1,
  },
]);
// Question 3
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          {
            $toString: {
              $subtract: ["$published_year", { $mod: ["$published_year", 10] }],
            },
          },
          "s",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 },
    },
  },
  {
    $sort: { _id: 1 },
  },
]);

//TASK 5
//Question1
db.books.createIndex({ title: 1 });

db.books.find({ title: "1984" });
//Question 2
db.books.createIndex({ author: 1, published_year: -1 });
db.books.find({ author: "George Orwell" }).sort({ published_year: -1 });

//Question 3
db.books.find({ title: "1984" }).explain("executionStats");
