# colors-lamp
This repository exists solely for the sake of an assignment, and will be
deleted when it is no longer necessary. Please do not assume this is a
legitimate application designed for legitimate use cases.

## Setup
You will need a system with the following:
1. Ubuntu Linux
2. Apache
3. MySQL
4. PHP

Preferably, this will all be hosted on a remote server. This is not strictly
necessary, however.

On your system, please create a mySQL database as follows:
1. Create a database titled "COP4331"
    - You may use whichever name you want if you update the LAMPAPI files to
      match.
2. Create a table titled "Users"
3. Create a table titled "Colors"

You should also create a mySQL user who can access and update this database.
You may either:
- Insert those credentials directly into the LAMPAPI files.
- Create environment variables and use PHP's getenv() method.
- Any other suitable method you can think of.

Finally, ensure that the URL in `html/js/code.js` accurately reflects the
location of your endpoints. An example URL is provided, but you will need to
change it to fit your server.

## Files

This project's files should be placed in `var/www/html`. For the sake of
clarity, the contents of your server's `html` folder should be identical to
the contents of this project's identically named folder. At this point, you
may make any necessary changes as described in **Setup**.

## What does it do?
This is a simple application that allows you to log in, add colors, and then
search for those colors. Colors are stored uniquely for each individual.
