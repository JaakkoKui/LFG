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
- Post your thoughts to a common page we call "feed".
- Edit or delete the above mentioned.
- React to posts by either liking, disliking or discussing by comments.
- View other people's profiles and games within.

### What does this hold in the future?
We would like to continue developing this vision in the near future by
- Adding "communities" where users can discuss and react within a games own community bringing likeminded people together.
- Making people able to add the important people into an friendlist for easy access to see what your friends are doing.

## Our technologies used

### Front-end
Front-end uses Vue 3.0 with Javascript and Typescript and supporting libraries:
- vue-router for routing.
	- Axios for API communications
	- Pinia for better storage.
	- Prettier for better code.
	- Eslint for better Javascript and Typescript.
	- Vite for running the front-end.
    - Tailwindcss for a css library.
    - Google Icons for icons.

### Back-end
ASP.NET using .NET Core 3.1 library with the use of C#

### Testing
Front-end testing is done with Playwright

### API

Our LFG API is served from

`https://localhost:5001/api`

LFG API end-points can be seen from

`https://localhost:5001/api/swagger`

External APIs used are:
- Discord API for oAuth2 authentication flow and getting user data an initial locale.

### Database
Database was made using mySQL within the Metropolia database servers.

### DevOps
DevOps tools used were:
- Github (https://github.com/JaakkoKui/LFG) (private)
- Nektion (https://app.nektion.com/Metropolia?3-2283946-0)
- Jenkins for build testing

## Our Team
This project is being made by Team 7:
- Andreas Lang
- Jesper Oja
- Jaakko Kuivasniemi (Scrum Master)
- Antti Aho

*Metropolia University of Applied Sciences*

## How to Run?

### Prerequisites

- You need the Discord Developer App keys
- You **NEED** to be in **Metropolia VPN** in order to access the database.

### Startup

You will need to start the ASP.NET backend and frontend separately.

You can start backend IIS from the LFG run configuration.

Then you can start front-end with the command

`npm run dev`

The website will be serviced from **https://localhost:5001**

