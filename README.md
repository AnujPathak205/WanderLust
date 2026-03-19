# WanderLust

[LiveDemo](https://wanderlust-egud.onrender.com/listings)


WanderLust is a full-stack travel listing platform built with Node.js, Express, MongoDB, and EJS. Users can explore, create, and manage listings with images, maps, authentication, and responsive UI, offering a seamless booking-style experience.

## Features 
- 🔐 User Authentication (Login / Signup / Logout)
- 🏡 Create, Edit & Delete Listings
- ⭐ Create, Delete Reviews
- 🖼️ Image Upload using Cloudinary
- 📍 Location-based Listings with Map Integration
- 🔎 Search Listings by Title
- 🏷️ Category-based Filtering
- 💬 Flash Messages & Error Handling
- 📱 Responsive Design (Bootstrap)

## Teck Stack
- *Frontend:* EJS, Bootstrap
- *Backend:* Node.js, Express.js
- *Database:* MongoDB Atlas
- *Authentication:* Passport.js
- *Image Storage:* Cloudinary
- *Session Store:* connect-mongo

## Installation/Setup
Follow these steps to run WanderLust locally
### 1. Clone the repository
```bash
git clone https://github.com/AnujPathak205/WanderLust.git
cd "Wander Lust"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
- Create a .env file in the root directory
- Add the following variables
```.env
CLOUD_NAME=<Your cloud name on cloudinary>
CLOUD_API_KEY=<Your cloud api key on cloudinary>
CLOUD_API_SECRET=<Your cloud api secret on cloudinary>
ATLASDB_URL=<Your MongoDB Connection String>
SECRET=<Your Session Secret>
```
### 4. Run the app locally
```bash
node app.js
```
- Or, if using nodemon for development
```bash
nodemon app.js
```
### 5. Open in browser
- Visit http://localhost:8080/listing to access the app

## Usage
Usage 🚀
- Signup or login
- Create new listings with images and location
- Browse listings by category (Rooms, Flats, Mountains, Castles, etc.)
- Click a listing to view details
- Add reviews on a listing
- Search listings using keywords

## Folder structure
```
WanderLust/
|── models/
│── routes/
│── controllers/
│── views/
│── public/
│── utils/
│── app.js
│── package.json
```

## Author

**Anuj Pathak**
### Email
anujpathakanuj371@gmail.com
### LinkedIn
https://www.linkedin.com/in/anuj-pathak-22876835b/
### GitHub
https://github.com/AnujPathak205/

## Support
If you like this project, consider giving it a ⭐ on GitHub!

