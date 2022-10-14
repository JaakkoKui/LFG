# LFG (LinkedIn for Gamers)

LFG is a social media made for gamers.

## Vision

### The Idea
The idea is to have a social platform where gamers can bond, compete and find other gamers through video games.

### The Need
The need is for gamers to find people playing similar games to play games with or befriend.


### What has been done?
This vision is currently being realized by the possibilities to:
- Make and use your very own profile and giving others a Nickname to call you by, an email to us to know you by, a password to protect you 
	  and optionally for other users your: age, name and discord.
- Add games and their statistics to your profile including: nickname, hours, rank and server.
- Post your thougts (under 1024 characters) to a common page we call "feed".
- Edit or delete the above mentioned.
- React to posts by either liking, disliking or discussing by comments (under 500 characters).
- View other people's profiles.

### What does this hold in the future?
We would like to continue developing this vision in the near future by:
- Adding "communities" where users can discuss and react within a games own community bringing likeminded people together.
- Making people able to add the important people into an friendlist for easy access to see what your friends are doing.
- Making images and avatars WORK. Giving everyone the ability to customize aspects of their profile to their liking.
- Adding API's for the easy of keeping your hours and games up to date.
- Our mission will be to make LFG more accessible by localization and improvement to our user interface.

## Our technologies used
	
### Front-end
- React using Typescript and supporting libraries:
  - react-dom-router for routing.
  - tailwindcss for a css library
  - Google Icons for some icons.
  - Animate CSS for some css animations.

### Back-end
ASP.NET using .NET Core 3.1 library with the use of C#

### Database
Database was made using mySQL within the metropolia database servers.

### DevOps
DevOps tools used were:
- github (https://github.com/JaakkoKui/LFG)
- Nektion (https://app.nektion.com/Metropolia?3-2283946-0)
- Jenkins for build testing

## Our Team
This project is being made by Team 7:
- Andreas Lang
- Jesper Oja
- Jaakko Kuivasniemi (Scrum Master)
- Antti Aho

*Metropolia University of Applied Sciences*

## How to Start?

### Prerequisites

You need to download **react** with:

#### `npm i react`

You need to download **react-router-dom** with:

#### `npm i react-router-dom`

You **NEED** to be in **Metropolia VPN** in order to access the database.

### Startup

You will need to start the ASP.NET backend **before front-end** by opening the **LFG.sln** and starting the **IIS express**

The start will open a Swagger page into **https://localhost:44372/swagger/index.html** 
**NOTE! Do not close the Swagger window!**

When the backend is running you can start the app by starting the front end with a command. 
**NOTE! you need to be have your Terminal pointer in the LFG project FOLDER!** 

#### `npm start`

Front-end will be serviced from **http://localhost:3000**
