# Desciptions

**Actor** is a powerful, Open-source technical service designed to mock APIs, making it an essential tool for developers and testers. It allows you to simulate API responses without the need for a real backend server, enabling you to test your applications efficiently and effectively. With **Actor**, you can create and manage mock endpoints, customize responses, and mimic various scenarios to validate your application's behavior under different conditions.


<br />

# Installation Guidelines

To get started with the project, follow these steps:

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version >= 18)
- npm (Node Package Manager)

## Clone the Repository

Clone the project repository to your local machine using Git:

```bash
git clone https://github.com/suraj-singh-in/Actor.git
cd actor
```

## Install Dependencies

Navigate to the project directory and install the required dependencies for both the server and client applications and if you want to run both server and client concurrently then install project level dependencies also:

```bash
# Inside main project directory
cd actor
npm i

# Inside client directory
cd client
npm i

# Inside server directory
cd server
npm i
```

## Generate private and public key IMPORTANT

In root of the project run:

```bash
node generateKeypair.js
```

This will generate pair of keys move them to /actor/server/config
This step is required of authorization.

## Running the Application
You can now start the development server for both the server and client applications simultaneously:

```bash
npm run start:dev
```

## Create your first user

```bash
curl --location 'http://localhost:8080/auth/signup' \
--header 'Content-Type: application/json' \
--data '{
    "userName": "root",
    "name": "root",
    "password": "root",
    "roleList": [
        "ADMIN"
    ]
}'

# you can change userName, name and passowrd
```


<br />

# Features
Actor is a mocking service, currently you can

1. Onboard a project and add users to viewer list
2. create different projects (aka. Theaters) 
3. You can onboard multiple APIs (aka. Acts) in a projects
4. An API can have multiple possible responses (aka. Verses) but can have only on active verse
5. User in viewer list can clone the Theater which they are part of and then make changes to them to do develpment without disturbing the origial mock

<br />

# Future Plan

1. Supporing HTML/XML responses
2. Supporting PUT/DELETE/PATCH
4. Add support for Redirect, proxy pass
5. Analytics
6. Merging Cloned Theater to Original One.
7. User Authroriztion
8. ... Feel free to drop more feature in issues section

<br />

# Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background or identity. 

## Our Standards

- Respect and consideration towards others.
- Openness to collaboration and constructive feedback.
- Showing empathy and kindness to fellow contributors.

## Unacceptable Behavior

The following behaviors are considered unacceptable within our community:

- Harassment, discrimination, or intimidation in any form.
- Disrespectful or offensive language or behavior.
- Any form of violence, threats, or personal attacks.

## Reporting Guidelines

If you witness or experience any behavior that violates this code of conduct, please report it to the project maintainers at [suraj.singh.in.delhi@gmail.com](mailto:suraj.singh.in.delhi@gmail.com). All reports will be handled with confidentiality and will be addressed promptly.

## Enforcement

Project maintainers have the right and responsibility to remove, edit, or reject any contributions that do not align with this code of conduct. 

Thank you for helping us make our community a safe and welcoming space for everyone.


<br />

# Contributing Guidelines

We welcome contributions from everyone! Before getting started, please take a moment to review the following guidelines:

## How to Contribute

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request with a clear title and description.

## Code Reviews
All contributions require review by project maintainers. We appreciate your patience during the review process and welcome feedback.

## Reporting Issues
If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.


