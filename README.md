# KnowYourMusic :musical_note:

![Image Logo](public/images/logo.png)

## Introduction

KnowYourMusic was built as a portfolio project for the end of Year 1 at Holberton School. KnowYourMusic is a memory game that determines how well you know your music! Log in with your Spotify account, and guess which song a certain line comes from. This project was built within 2 weeks, and taught me more about creating full-stack applications (more to come :smirk:).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


### Installing

    $ git clone https://github.com/ethanpasta/KnowYourMusic
    $ cd KnowYourMusic
    $ npm install

## Configuration

- Add your MusixMatch API key in [routes/game.js](routes/game.js)
- Add your Spotify API key and secret key in [routes/index.js](routes/index.js)

## Deployment

To run locally, enter `npm start` and open your browser on `localhost:4000` (or the port logged in the console)

## Contributing

Feel free to reach out if you would like to contribute!

## Authors

* **Eitan Mayer** - [LinkedIn](https://www.linkedin.com/in/ethan-mayer/) [Twitter](https://twitter.com/eitanmayer57)


