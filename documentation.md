# Documentation

Public part  | Private part
------------ | -------------
Home page | Home page
Register page | Gallery
Login page | Photo info
empty | Blog
empty | Article info
empty | Events
empty | Create article
empty | Create photo
empty | Profile
empty | Logout


### Description:

For back-end I used FireBase. It's provides a real-time database and back-end as a service. 
The service provides application developers an API that allows application data to be synchronized across clients and stored on Firebase's cloud.
If you want to access the private part, you should register and login. In the private part you can see all photos, articles, events and if the logged user created them,
you can delete it. If anybody else created them, you can like/dislike photo, enroll/unenroll for event and etc.
In the create page, you can choose what you want to create - article or photo. There are some validations, but please try
to insert correct data.
In the profile page you can see your info and the most liked photos (top 3) owned by you, if there are any.


### Project structure:

In the source folder I splited the structure to components/interfaces/services(in different folders). You can find FireBase connection data in environment.ts.

### Project setup:
First of all - don't forget to "npm install" all dependencies when you download the project. After that, you can run the project with "ng serve --open" and make sure port 4200 is free. If you run already something on that port, you can add "--port 4300" to run it to another port.

#####  Hope you enjoy the project
