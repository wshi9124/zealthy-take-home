# zealthy-take-home

FE technologies- next.js, typescript, tailwind css,
Backend technologies- Ruby on Rails

setup:
cd into frontend
npm install
npm run dev

cd into backend
bundle install
rails s

\*\*\*\* Note admin has to first configure a order for the components first before users can onboard

Features:
Has validations to make sure email adresses is unique
Passwords are encrypt using Bcrypt
Login validates email is a email, if not it will throw a error message

When a user first enters the site, the Rails backend will check if there is a session. If there is, it will automatically log the user in.

Login/ sign up
Backend will check if the user exists first and if not it will make a account for them

Home route is protected

Has validations that there will be at least one component on each page

fixing edge cases
made it so that if a component renders users have to move on to fill out form completely before moving on to next step
made it so that if form has no componenents it moves to the next page
