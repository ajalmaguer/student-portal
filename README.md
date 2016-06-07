# I Wanna Roomie - My First Angular App

This is my final project for GA's [Web Development Immersive](https://generalassemb.ly/education/web-development-immersive) Program and it is my first full MEAN Stack (mongo, express, angular, node) app. It's basically an AirBnB clone. 

See demo here: (http://iwannaroomie.herokuapp.com/#/)[http://iwannaroomie.herokuapp.com/#/]

My goal in this class was to figure out how to implement user features rather than trying to figure out how to create good UX and then implement them. Also, the idea to clone AirBnB came from my friend who asked me for a better way to find roommates within her grad school program. So an airbnb clone seemed appropriate.

This is a full-fledged single page app with a Restful API in the backend and Angular JS making all the updates on the client side. Since this was a learning experience. I also learned how to use Angular 1 components and it's component router rather than using the ui-router, since I built practice apps using the ui-router in class. Thanks to my instructor Hannah Howard for teaching me the basics of Angular 1 components and component router!

## Overview

This app uses the following technologies


**Token-based authentication**
**Backend**

- Only serves JSON, is a restful api
- Except for the home directory, which serves you the single page app.

![img-1](readme-imgs/img-1.png)

**Front End**

- Uses Angular 1.5 Components
- Uses Angular Component Router (instead of ui-router)
  - ngComponentRouter
  - wapweb.componentRouterActive
  - Custom directive that works with component router. Tells you which route is “active” for the navbar


- Materialize CSS Framework
  - http://materializecss.com/ - basic materialize
  - ui.materialize - custom materialize directives that initialize materialize forms correctly.
  - Thanks to materialize css framerwork, I only had to create minimal CSS! This is what my css looks like.




![img-2](readme-imgs/img-17.png)

**Models**
- Listings
  - This is the main model. It contains all the information of each listing.
  - It also references users that have favorited it.

![img-4](readme-imgs/img-4.png)

- Users
  - References all the listings that the user creates.

![img-5](readme-imgs/img-5.png)



## Pivotal Tracker

The project's user stories are documented and managed on pivotal tracker. See the project here: https://www.pivotaltracker.com/n/projects/1594103



## Installation Instructions
1. Clone the repo from your terminal `git clone https://github.com/ajalmaguer/student-portal.git`

2. Go into the directory and perform the following:

   a. Install the npm packages `npm install`

   b. Create .env file in the directory and create the following variables (p.s. you need mongo installed on your computer):

   ```shell
         LOCAL_DB=<the name of your mongodb database here>
         SAFE_TITLE=<your safe title here>
         TOKEN_SECRET=<your token secret here>
   ```

   c. Run nodemon: `nodemon`

   d. Connect to server from the browser. I.e. go to `localhost:3000`





## How does the Component Router Work?

Everything goes inside of the `<app></app>` component (instead of within ` <ui-view></ui-view>` with ui-router)

![img-2](readme-imgs/img-2.png)

So in when I created the main app module: 

1. I injected ngComponentRouter (which must be included in the index.html page) 
2. I set the "root route" to the app component with `.value(...)` 
3. And then I defined the app component `.component(...)`. 

![img-3](readme-imgs/img-3.png)
Notice the app component has a very simple template: The `<navbar>` component and `<ng-outlet></ng-outlet>` which is where every other part of the app will be rendered.

Every route must have three things: 

- **path**: the relative url path
  - If you are going to have sub routes, use the "…" after a plath, like in **listings** and **users** in the figure above. Warning: all routes must terminate somewhere, you can't use "…" if you're not going to have sub routes
- **name:** 
  - These are shortcuts you can use to to navigate throughout your site rather than having to figure out the actual urls.
- **component**: 
  - The specified component will be rendered in the `<ng-outlet></ng-outlet>` of the **app** component in the example above.
- **useAsDefault:** (optional)
  - This sets the default route for this component.

So at the home screen (www.ajbnb.com/#/), this is what’s being rendered in the body:

```html
<app>
     <navbar></navbar>
     <ng-outlet>
		<home></home>
     <ng-outlet>
</app>`
```

And at listings (www.ajbnb.com/#/listings), this is what’s being rendered in the body:
```html
<app>
     <navbar></navbar>
     <ng-outlet>
         <listings>
               <ng-outlet>
                 	<!-- other components go here, depending on what subroute of listings you're on. -->
                 	<!--  The listings component has its own set of sub routes, defined by $routeConfig  -->
               </ng-outlet>
          </listings>
     <ng-outlet>
</app>
```

And this is what the **listings component** looks like:![img-7](readme-imgs/img-7.png)

Notice it has it's own set of sub routes.



Using components makes it really easy to organize features by components and it greatly reduced the number of files I had to include on the `index.html` page. ![img-6](readme-imgs/img-6.png)

User authentication and signin/signup were not made with components (because I did not write that from scratch—thanks WDI teachers!), so it took 8 lines to include all those files. However, the three main components for this app—home, listings, and users—only need to be included once. Each JS file references their respective files. For example, the `listings.js` looks like this:
 ![img-8](readme-imgs/img-8.png)



##Reusing listingCard Component

Components don't have to be tied to routes when using the component router. You can reuse components wherever you want.

For example, when showing all the listings in the `listingsList.html` template each card is repeated in one line: 
![img-9](readme-imgs/img-9.png)

And that same component was used twice on the `usersShow.html` template (my profile page):
![img-10](readme-imgs/img-10.png)





## Creating/ Editing a Listing

The major issue with using Materialize and Angular is that Materialize forms require initialization (boo!).

- Real solution: create a custom directive
- Hack: run Materialize initializations within $timoueout

Updating the grammar!

Updating the listing model

##Liking / Disliking a listing

###Liking
**1. Frontend:**
`ng-click="$ctrl.likeListing($ctrl.listing._id)"`
![img-18](readme-imgs/img-18.png)
In the cardController, check if the listing is already liked then send request.

Check if listing is already liked and send request
![img-20](readme-imgs/img-20.png)

**2. Backend:** 
push my _id (from the token) into the listing.favUsers array
![img-16](readme-imgs/img-16.png)

**3. Frontend:** 
Update the listing object. (note: this listing doesn’t exist within an array of listings because each listing is wrapped within a listingCard component)
![img-19](readme-imgs/img-19.png)

###Disliking:
**1. Frontend:** 
Basically same request as *like* but to different endpoint
![img-21](readme-imgs/img-21.png)

**2. Backend:** 
Splice the listing from the array
![img-22](readme-imgs/img-22.png)

**3. Front end:** update the listing.

###amILiked()
checks if user’s _id (in the token) is in the listing.favUsers array
![img-23](readme-imgs/img-23.png)

amILiked() also used to show correct icon
![img-24](readme-imgs/img-24.png)

##Next Steps
Add the following features:
- User Chat
- An actual map
- Job Posts



## Acknowledgements

Thanks to AirBnb for providing a great UX example to learn from!

Thanks to my WDI Class for being great peers! 

Thanks to my WDI teachers (Kedar, Mike, Hannah) for teaching me everything that I know about web development, which made this project possible! 
