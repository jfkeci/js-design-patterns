# Singleton Overview

- A component which is instantiated only once

## Motivation
- For some components it only makes sense to have one in the system
  - Database repo
  - Object factory
- e.g. the constructor call is expensive
  - we want initialization to only happen once
  - we provide everyoone with the same instance
- Want to prevent anyone creating additional copies
