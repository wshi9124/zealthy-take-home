# zealthy-take-home

FE technologies- Next.js, Typescript, Tailwind css,
Backend technologies- Ruby on Rails, Postgresql

Setup:
Cd into frontend
npm install
npm run dev

Cd into backend
bundle install
rails db:create
rails db migrate
rails s

Note admin has to first configure a order for the components first before users can onboard 
or use rails db:seed to seed inital configuration

Schema:

<img width="400" alt="Screenshot 2024-12-10 at 12 39 57 PM" src="https://github.com/user-attachments/assets/173b75c3-a2c7-4928-b9a4-5a9d07555750">

Features:

Login/ sign up
When logging in, the backend will first check if the user exists and if not it will make a account for them.

Has validations to make sure email adresses is unique

Passwords are encrypted using Bcrypt

<img width="400" alt="Screenshot 2024-12-10 at 12 58 13 PM" src="https://github.com/user-attachments/assets/2ec61f20-1867-4919-82f8-debbc66d8a7d">

Data Page

Basic page that fetches all the users and their info 

<img width="400" alt="Screenshot 2024-12-10 at 1 01 00 PM" src="https://github.com/user-attachments/assets/108f36fe-6f0c-4cb6-a806-d5ae2509d636">

Admin Page

Able to change the order of components 

Will make sure that there are at least one component in each page

<img width="400" alt="Screenshot 2024-12-10 at 1 03 31 PM" src="https://github.com/user-attachments/assets/47fc0c27-ddb1-4510-91c4-5b6af1181ee0">

Sign Up 

Will show the form based on admin configurations

Will make sure all fields are filled out before user can continue

If the form is already filled out and the page is empty, it will automatically go to the next page

<img width="500" alt="Screenshot 2024-12-10 at 1 10 07 PM" src="https://github.com/user-attachments/assets/39ed5833-9683-4a72-8f5b-e06507c271e6">

<img width="500" alt="Screenshot 2024-12-10 at 1 13 50 PM" src="https://github.com/user-attachments/assets/0f0cf976-787a-4ab9-b13b-888196c3f597">

fixing edge cases
made it so that if a component renders users have to move on to fill out form completely before moving on to next step
made it so that if form has no componenents it moves to the next page
