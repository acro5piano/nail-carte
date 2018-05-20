# nail-carte

A carte for Nail Salon.

https://distracted-hugle-ae38eb.netlify.com

Currently just prototype, will change how nailists work on the earth.

# Coding Rules

## /src/components

JSX components.

### /src/components/pages

Entry point of Router.
Responsible for page elements.

Rules:

- Do not concern about app state.

### /src/components/containers

Connect app state to component.

Rules:

- Use Redux's `connect`.

### /src/components/projects

Project specific presentational components.

Rules:

- Keep reusablility.
- Do not have state, just function (Stateless Functional Component).

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
