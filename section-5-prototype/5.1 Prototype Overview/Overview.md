# Prototype

### Motivation
Motivation for using the prototype design pattern

- Complicated objects aren't designed from scratch
  - reiterate existing designs
- an existing (partially or fully constructed) design is a Prototype
- What do we do?
  - We make a copy (clone) the prototype and customize it
    - Requires 'deep copy' support
  - We make the cloning convenient (e.g. via a Factory)

### Prototype
- a partially or fully initialized object that you copy (clone) and make use of