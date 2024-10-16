'use strict';

module.exports = {
  up: (models, mongoose) => {
      return models.genres.insertMany([
        {
          _id : "66fa2429678866dd87355a34",
          genre : "Drama"
        },
        {
          _id : "66fa25e5678866dd87355a35",
          genre : "Action"
        },
        {
          _id : "66fa260c678866dd87355a36",
          genre : "Thriller"
        },
        {
          _id : "66fa263c678866dd87355a37",
          genre : "Comedy"
        },
        {
          _id : "66fa2657678866dd87355a38",
          genre : "Family"
        },
        {
          _id : "66fa266d678866dd87355a39",
          genre : "Horror"
        },
        {
          _id : "66fa268a678866dd87355a3b",
          genre : "Adventure"
        },
        {
          _id : "66fa26a0678866dd87355a3c",
          genre : "Crime"
        },
        {
          _id : "66fa26be678866dd87355a3d",
          genre : "Period"
        },
        {
          _id : "66fa26d2678866dd87355a3e",
          genre : "Romantic"
        },
        {
          _id : "66fa26eb678866dd87355a3f",
          genre : "Sports"
        },
        {
          _id : "66fa2bd3678866dd87355a4b",
          genre : "Suspense"
        },
        {
          _id : "66fa27da678866dd87355a40",
          genre : "Animation"
        },
        {
          _id : "66fa27f6678866dd87355a41",
          genre : "Bibilography"
        },
        {
          _id : "66fa280f678866dd87355a43",
          genre : "Fantasy"
        },
        {
          _id : "66fa2822678866dd87355a44",
          genre : "Musical"
        },
        {
          _id : "66fa2834678866dd87355a45",
          genre : "Mystery"
        },
        {
          _id : "66fa2842678866dd87355a46",
          genre : "Sci-fi"
        },
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return models.Test.bulkWrite([
        {
          deleteOne: {
            filter: {
              name: 'first test'
            }
          }
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    */
  }
};
