# nail-carte

A carte for Nail Salon.

https://distracted-hugle-ae38eb.netlify.com

Currently just prototype, will change how nailists work on the earth.

# Setup

```
yarn install
yarn start
```

If you have FSWatch errors in Linux, run the following commands:

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

# Coding Rules

## /src/components

JSX components.

### /src/components/App.tsx

Responsible for App State.

Write async actions here.

### /src/components/**/*.tsx

JSX container. Responsible for User Interface.

Rules:

- Keep reusablility.
- Do not have state, just function (Stateless Functional Component).
- Do not connect to Redux state.

### /src/components/material-ui

Extends Material UI presentational components.

Rules:

- Keep reusablility.
- Do not have state, just function (Stateless Functional Component).

## /src/entities

Domain specific entities.

Rules:

- Define type, do not use `any` type.

## /src/services

Communication for outside.

For example,

- Local Storage
- Web API
- Notification

## /**/*/__tests__

Test code. Write `__tests__` directory next to the product code.
