# Employee-Site
## Source code for our FTC Employee Site


### **Table of Contents**

1. [Introduction](#intro)
2. [Site Structure](#siteStruct)
3. [API instructions](#api)
4. [Tips](#tips)
5. [General Guides](#general)
6. [Troubleshooting](#troubleshooting)




##  <a name="intro"></a>I. Introduction
Welcome! If you are reading this, you've found the GitHub repository for the FTC Employee
site. This README will walk you through several of the core features
of the site, as well as information on the backend structure. 

If you make changes to the site, be sure to thoroughly test before deploying them to live server.
The website is currently running on a Windows server located at ftcemp.byui.edu
You can use RDP to remote into the server environment from an FTC computer. 

Server login information: 

computer: ftcemp

User: BYUI\\{your BYUI username}

## <a name="siteStruct"></a>II. Site Structure  
### Overview
This site is built on the Node.js platform, and hosted by an IIS server module. 
As such, the entire backend is written in JavaScript using the Express framework. The site was built using 
an MVC architecture (for information on what MVC is, checkout this video -> https://www.youtube.com/watch?v=1IsL6g2ixak). 
This means that you should be able to modify the back-end without damaging the front-end, and vice versa.


For the front-end, we have used the [EJS](http://ejs.co/) templating engine.

Our website is hooked up to a MYSQL database running on the same ftcemp.byui.edu server.

### Database
Our MYSQL database consists of 5 tables. You can find database login information stored
on the webserver in the connectionString.js file. For security purposes, detailed
information regarding the database access and structure will not be given here.

Instead, this section is merely to remind you that the vast majority of pages rely on
information retrieved from the database in order to display properly. Before making any 
changes to the backend, especially the model, it is vital that you have a good understanding
of the database structure.

To learn more about how to access the database from Node.js, please see these [docs](https://www.npmjs.com/package/mysql). 
Additionally, all of the database queries currently listed in the site make use of the SQL template strings library.
This module helps to simplify creating dynamic database queries. You can find the SQL Template Strings docs [here](https://www.npmjs.com/package/sql-template-strings)

### Model
The files making up the model of this site can be found in the modules folder. 
Each model function has been separated into its own JS module to increase ease of use. 
The majority of the these modules communicate with the database in some way, and therefore 
it is advised that you examine the database structure before attempting to modify any of the model
components. For clarity, each module has been sorted into a folder relating to their
purpose. Although a module could theoretically be called by any controller, with the exception
of common modules, most are only used by the correspondingly named controller. For example, modules
located in the admin folder are generally only called by the adminTools controller. 

### Controller
The controllers for the site are located in the routes folder. Each controller file exports
a router object that defines url endpoints users can access. These endpoints handle submitted data, 
pass it to the appropriate model function to be processed. Some of these endpoints
return webpages, while many return json data that can be used to modify or update
elements on a webpage. 

### Views
Views can be found in the views folder. These are EJS templates (Basically HTML with embedded JavaScript to make it dynamic). 
Data from the model is often passed to these pages through the controller. See the EJS docs for information on how
to do this. Several of these views make use of partials, aka small external files that need to be repeated. For instance, 
the navbar element is written in its own file, and simply included in every webpage. Using partial views makes it easy
to update common elements accross the site, and should be used when feasible. 

### Public
This directory contains files that are available for public access. This can include things like images, css, and js files
that are included on webpages. 

## <a name="api"></a>III. API Instructions 
This website makes uses of RESTful endpoints to create an API shell. Although not a true REST API, there are RESTful
endpoints that provide access to data. To access the majority of these endpoints, you will need to be logged in. 

Endpoints are organized into several categories: 
* Admin Tools
* Employee Tools
* User Tools
* Common API Tools

For a full description of the API, please see this [reference](https://swaggerhub.com/apis/ftcemployees/FTCemp/1.0.0). 
To edit that API reference, login to Swaggerhub with the FTC GitHub account. 

## <a name="tips"></a> IV. Tips  

Coming soon

## <a name="general"></a> V. General Guides  

### Setting up the Development Environment
#### First Steps
If you wish to use a JetBrains IDE, follow this guide: 
http://byu-idaho.screenstepslive.com/s/16915/m/66775/l/751715-setting-up-a-jetbrains-ide-license
First make sure you have both git and node installed on your system. You may also
want to install nodemon global using npm install -g nodemon.

You are free to use whichever IDE or text editor you wish, however, the FTC
does have an Academic License for the JetBrains Suite of IDEs. For more information on
how to access this subscription, see [this article](http://byu-idaho.screenstepslive.com/s/16915/m/66775/l/751715)   
#### Clone the project
Go to the ftcemployees GitHub account and clone the Employee-Site repository. 
When you have the project cloned, checkout a new git branch to work on. You should
never work directly on the Master branch. 

#### Configure Modules
Open a terminal in the project root directory and run npm install to install the necessary
node packages. Please note that the connectionString.js file is not saved in GitHub. This file
contains the login configuration for the database. As such, you will not be able to use any database
resources until you create a connectionString.js file in the modules folder. 

## <a name="troubleshooting"></a> VI. Troubleshooting 

Coming Soon
