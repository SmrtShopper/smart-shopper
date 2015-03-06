# comp20-spring2015-team9
1. Title: Smart Shopper

2. Problem Statement: 
- Grocery lists should be more than just todo lists. By making a dynamic grocery 
list that is both mobile and desktop facing, it is possible to create a new user 
experience where grocery lists aid in reminding about foods that are expiring (like milk), 
reveal nutrition facts about and prices of food, or even enable group sharing for a family 
or group of friends. 

3. Solution: 
- We are going to create a product which implements a 
number of features to improve the efficiency and utility of grocery lists.  
A more full-featured grocery list will make the experience of shopping regularly 
much simpler and more enjoyable (and less prone to error with forgetting about items expiring).

4. Features: 
- Persistent storage of a person’s data
- Mobile and web optimized sites
- Voice recognition - some type of input to start listening, adds to grocery list
- Email notifications about expiring goods (milk, fruit, eggs, etc.)
either use average age of products or allow user to input expiration date
- Reporting of money spent on groceries using charts and graphs
- Distribution of money spent on different types of goods
- Money spent over time
Pick Five:
- Server-side data persistence (e.g., with PostgreSQL, MongoDB, MySQL)
- Client-side data persistence with either local storage or web SQL
- Front-end framework including Bootstrap, React, Backbone.js, AngularJS
- Reporting with charts and graphs
- Send emails, SMSes, or push notifications
5. Data
- Mock data will be used to store the groceries and their corresponding 
  prices/average dates of expiration/etc.
6. Algorithms
- We will have a database containing average ages of grocery products and 
product prices that will be searched whenever a new grocery item is added. 
Using a database language that allows for a fast (ie: hashed) searching we 
will be able to retrieve expiration dates quickly. 
- If we do not have an expiration date or price we will ask the user if 
they wish to add one at which point we will take their expiration

7. Mockups


