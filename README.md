# Real Estate Ecommerce Application

The Real Estate E-Commerce platform offers three views: Landlord, Renter, and Admin. Each view provides specific functionalities tailored to different user roles. Landlords can manage properties, renters can explore and interact with listings, and admins can oversee the system's operation and user activities. The platform includes multi-role authentication to ensure secure access based on user roles.

<h2>Features</h2>
<h4>Landlord View:</h4>

- Property Management: CRUD operations for managing property listings, including creating, updating, and deleting properties.
- Notifications: Recieve tour notifications from renter.
- Property Tours: Schedule property tours for potential renters to visit and explore listings.
  
<h4>Renter View:</h4>

- Property Listings: Browse available properties with detailed information, images, and amenities.
- Schedule Tours: sent tour request to visit properties.
- Reviews and Ratings: Submit reviews and ratings for properties and landlords.
- Report : submit report on properties or landloards.
- wishlist : Add and delete items from his wishlist.
  

<h4>Admin View:</h4>

- User Management: Manage users and there reviews.
- Property types Mangemnt: Crud operations for manage Categories.
- Report Management: take actions on the reports that submitted by renters
- Property Approval : accept or reject (add , edit) properties requests

<h2>Technologies Used</h2>
<h4>Backend:</h4>

Laravel: PHP framework for making APIs.
<h4>Database:</h4>

MySQL: Relational database management system.
<h4>Frontend:</h4>
React Framework for frontend development 


<h2>ERD</h2>

![Screenshot (344)](https://github.com/MohamedAbotalb/Real_Estate_Ecommerce/assets/92125041/9642c67e-920a-40b8-bb68-58daf2bf4043)

## Installation

<h4>Server Side:</h4>

```
git clone https://github.com/yourusername/e-commerce-platform](https://github.com/dohaseif2/Real_Estate_Ecommerce.git <br>
cd Real_Estate_Ecommerce
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

```

<h4>Server Side:</h4>

```
npm i 
npm start

```


