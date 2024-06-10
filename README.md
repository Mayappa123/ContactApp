# ContactApp_Using_ReactJS

Simple app to display contact information of users. App also provide feature to **ADD**,**UPDATE** and **DELETE** contacts. This app was too simple to integrate any heavy state management tool like `redux-toolkit` or use `context API` to manage state. Also all the apps features can be added into one single file so there was no need to integrate `react-router-dom`.

## Installation

- Clone the repository

```bash
git clone https://github.com/Dhareppahalli310807/ContactApp_Using_ReactJS.git
```

- Navigate to the project directory

```bash
cd project
```

- Install dependencies

```bash
npm install
```

## To Test Application

----run below command
npm run dev

----open http://localhost:5173/

## Folder Structure

project/
│
├── src/
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── public/
│ ├── index.html
│
├── package.json
├── README.md
└── ...

## Usage

- The contacts are loaded initially from the API.
- You can add user to the contact list by using the form.
- Each contact has a update and delete icon.
- When clicked on update icon, following things happen:
  - All the user details get filled in the add form.
  - Add form is changed to Update form.
  - Submitting the form will update the user details.
  - Toast is shown when contact gets updated.
- When clicked on delete icon, the contact gets removed from the contact list.

> [!important] Data Changes
>
> - The fetched data is not changed when we add, update or delete contact.
> - The local state is used to render the contacts and change it based on the operations.
> - If we refresh we will get the original data.
