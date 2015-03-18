# comp20-spring2015-team9

Smart Shopper

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
Five Required Features
  - Server-side data persistence with MySQL
  - Client-side data persistence: store user's shopping list so he/she can leave the webpage and come back to find the cart still there
  - Front-end framework including Bootstrap, React, Backbone.js, AngularJS
  - Reporting of money spent on groceries using charts and graphs: distribution of money spent on different types of goods, money spent over time
  - Email or push notifications about expiring goods (milk, fruit, eggs, etc.)
Extra Features
  - Mobile and web optimized sites
  - Voice recognition - some type of input to start listening, adds to grocery list
    either use average age of products or allow user to input expiration date
5. Data
  - Mock data will be used to store the groceries and their corresponding 
    prices/average dates of expiration/etc.
6. Algorithms
  - We will have a database containing average ages of grocery products and 
      product prices that will be searched whenever a new grocery item is added. 
  - Using a database language that allows for a fast (ie: hashed) searching we 
      will be able to retrieve expiration dates quickly. 
  - If we do not have an expiration date or price we will ask the user if 
      they wish to add one at which point we will take their expiration

7. Mockups

![](/wireframes/wireframe_desktop_1.png)
Main (Desktop) View

![](/wireframes/wireframe_desktop_2.png)
Grocery List (Desktop) View

![](/wireframes/wireframe_mobile.png)
Main (Mobile) View

#Comments by Ming
1. Whoa there!  WAAAAAY too many features.  You will be lucky to finish two of them well.
2. Voice recognition --how the heck will you do this?
3. What APIs will you be using?
4. Overall: 12/15
