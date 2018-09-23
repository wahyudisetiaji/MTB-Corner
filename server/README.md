# MTB-Corner
Simple Blog with article about MTB

### [API](https://mtbcorner.wahyudisetiaji.xyz/)

## List API
----

**List of users routes :**

Route | HTTP | Description | Attributes
------|------|-------------|-----------
/users | GET | Find user by ID | id user
/users/login | POST | Login a User | email, password
/users/register | POST | Register a User | name, email, password



**List of articles routes :**

Route | HTTP | Description | Attributes
------|------|-------------|-----------
/articles | GET | Find all Article | -
/articles/myarticle | GET | Find all My Article | token
/articles/category/:category| GET | Find article by Category | category
/articles/create | POST | Create Article | articleTitle, image, article, category, token
/articles/delete/:id | DELETE | Delete Article | id article, token
/articles/update/:id | PUT | Update Article | id article, articleTitle, image, article, category, token
/articles/comment/:id | PUT | Create Comment | id article, comment, date, viewer
/articles/comment/delete/:id | PUT | Delete Comment | id article, id comment

