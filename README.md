# nail-carte

A carte for Nail Salon.

https://distracted-hugle-ae38eb.netlify.com

Currently just prototype, will change how nailists work on the earth.

# Coding Rules

## /src/components

JSX components.

### /src/components/**/*Container.tsx

Responsible for Connecting React component to Redux state.
They can be entry points of Router.

Rules:

- Do not write too much JSX.
- Use Redux's `connect`.

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

## /src/reducers

Redux reducers.

## /src/actions

Redux actions.

## /src/actions

Redux actions.

## /src/services

Communication for outside.

For example,

- Local Storage
- Web API
- Notification

## /**/*/__tests__

Test code. Write `__tests__` directory next to the product code.
