# AutoWiz: Premier Car Marketplace

Welcome to AutoWiz, where wheels meet dreams. Our platform is designed for the seamless trading of new and used cars, providing a user-friendly interface for customers and an efficient backend for administrators. Dive into a world where buying and selling cars is not just a transaction, but an experience.

## Overview

Autowiz caters to the needs of two distinct roles: Users who seek to buy or sell cars, and Administrators who manage and oversee the platform's operations.

### User Goals

- **Register & Personalize**: Easy signup and profile customization.
- **Navigate & Interact**: Intuitive UI for effortless exploration.
- **Search & Decide**: Advanced filters and comparison tools to make informed choices.
- **Book & Wishlist**: Schedule test drives and bookmark favorites.

### Admin Goals

- **Ad Management**: Simple creation, editing, and deletion of car listings.
- **Booking Oversight**: Efficient monitoring and management of test drive bookings.

## Technical Stack

- **Frontend**: Crafted with ReactJS, styled with React Bootstrap, and animated with @react-spring/web.
- **Backend**: Powered by NodeJS and Express for robust server-side functionality.
- **Database**: Organized in MongoDB Atlas for scalable data storage.

## Bootstrap Components Used

1. **Button**: For interactive button elements.
2. **List Group (Cards)**: To display car listings in a structured card format.
3. **Navbar**: For a responsive navigation header.
4. **Container**: To control the layout and responsiveness.
5. **ButtonGroup**: To group related buttons together.
6. **Form**: For building the search and filter functionality.
7. **Row & Col**: For responsive grid layouts.
8. **Card**: For individual car details and actions.
9. **Badge**: To display status labels.
10. **Image**: To showcase car images.
11. **Placeholder**: For loading animations.
12. **Icons**: To enhance UI elements.
13. **Modal**: For dialog prompts.
14. **Toast**: For non-intrusive notifications.
15. **Carousel**: For image sliders.
16. **Dropdown**: For additional options and navigation.
17. **Alert**: To notify users of important information.

## Project Structure

AutoWiz boasts a comprehensive and modular project structure that includes:

- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.
- **User Roles**:
  - **User**: Can register, search cars, manage bookings, and more.
  - **Admin**: Manages car listings, oversees bookings, and performs administrative tasks.
- **Pages**: A total of 11 pages, each serving a unique aspect of the car buying and selling process.
- **Session Management**: Secure handling of user sessions.
- **Data Consistency**: Ensures that the data integrity is maintained throughout the application.
- **End-to-End Transactions**: Complete workflows from user registration to final purchase or sale.
- **MVC Architecture**: Implements the Model-View-Controller pattern for organized codebase management.
- **Git Branching Control**: Maintains a structured version control system.
- **Code Documentation**: Thoroughly commented code for better maintainability.

### User Flows (5)

1. **Car Search Flow**: Users can search, filter, and compare cars to find their perfect match.
2. **Booking Flow**: Users can book and manage test drives to experience cars before buying.
3. **Account Management Flow**: Users can register, login, and manage their profiles.
4. **Wishlist Flow**: Users can add cars to their wishlist for future reference.
5. **Transaction Flow**: Users can proceed through the secure transaction process for purchasing.

### Admin Flows (2)

1. **Listing Management Flow**: Admins can add, edit, and delete car listings.
2. **Booking Management Flow**: Admins can view and manage all user bookings.

## Dependencies

- **Libraries**:
  ```bash
  npm add react-bootstrap bootstrap
  npm add react-bootstrap-icons
  npm install --save prop-types
  yarn add @react-spring/web
  npm i react-router-dom
  npm install express mongoose bcrypt cors
