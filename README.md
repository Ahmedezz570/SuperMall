🛍️ SuperMall - React Native E-Commerce App

Supermall is a complete E-commerce project developed using:
- **React Router** for page navigation 🚀.
- **Firebase** for managing Authentication 🔐 and storing data in Firestore 🔥.
- **Cloudinary API** for image uploading and storing URLs in Firestore 🖼️.

## Key Features:

- **Authentication**:
  - User sign-up and login ✨.
  - Storing user data in Firestore 🗂️.

- **Firestore**:
  - Managing Collections:
    - Users 👤
    - Products 🛍️
    - Reviews (as a Subcollection within each Product)📝
    - Cart (as a Subcollection within each User) 🛒
    - Favourite (as a Subcollection within each User) 💖

- **Custom Dashboards**:
  - User Page 👨‍💻.
  - Admin Page 👩‍💻.

- **Full Design**:
  - The entire app is custom-designed, including:
    - Navigation system using **Bottom Tabs** 📱.

- **Image Upload**:
  - Uploading images using Cloudinary API 🌥️.
  - Storing image URLs in Firestore and linking them to products 🖼️.

## Tools and Technologies Used:

-Expo Router  
- Firebase Authentication 🔐
- Firebase Firestore 🔥
- Cloudinary API 🌐


## Additional Notes:

- Everything in the app is built and designed from scratch 🏗️.
- The database is structured to support future expansion, with the use of Subcollections for cart and favourite items within each user 🌱.

## How to Run the Project Locally 📥

Follow these steps to clone the repository and run the project on your local machine:

1. **Clone the repository**:
   Open your terminal and run the following command to clone the repo:
   ```bash
   git clone https://github.com/your-username/supermall.git

2. **Navigate to the project directory**:
  ```bash 
  cd supermall

3. **Install dependencies: Make sure you have Node.js and npm installed. Then, run the following command to install all the necessary dependencies**:

  ```bash
   npm install

4. **Install Expo CLI: If you don’t have Expo CLI installed, you can install it globally by running**:

  ```bash 
   npm install -g expo-cli

5. **Start the Expo project: Run the following command to start the project**:
   ```bash 
   expo start

