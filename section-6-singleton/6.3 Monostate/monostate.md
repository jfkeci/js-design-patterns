# Monostate

The Monostate (or Borg) pattern is a design pattern that ensures all instances of a particular class share the same state. 
While in the Singleton pattern only one instance of a class can exist, in the Monostate pattern multiple instances can exist but they all share the same internal state.

In other words, if you modify one instance, all instances are modified. 
This is achieved by storing state in a shared location (like a static field in the class), rather than in individual object instances.
