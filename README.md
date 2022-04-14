# Patient Tracker App

## About and Usage

A basic patient record keeping application that offers the following features:
- UI for displaying a list of registered patients
- When a patient is selected from the list, the patient details are displayed
- The ability to register new patients
- The ability to add a new entry for an individual patient

## Technical Overview

- REST API is used for communication with the server
- Initial data set is derived from data files
- New data is persisted in server memory and will be lost after server reboot
- Project uses typescript to enforce data types
- Forms were made using Formik library
- Statement management is accomplished using useReducer and useState hooks and Context API

## Requirements

Make sure to use Node version 16.  If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

## Installation

1. Clone the repo by running 
```sh
git clone git@github.com:tranhuy/PatientTracker.git
```
2. Launch code editor in the app subdirectory

3. Install npm packages by running
```sh
npm install
```

4. Start the app by running
```sh
npm start
```

## Achknowledgements
[fullstack-hy](https://github.com/fullstack-hy2020) - for providing the base frontend code