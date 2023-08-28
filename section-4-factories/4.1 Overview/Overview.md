# Factory

- Object creation logic becomes too convoluted
- Initializer is not descriptive
  - Name is always __init__
  - Cannot overload with same sets of arguments with different names
  - Can turn into "optional parameter hell"
- Wholesale object creation (non-piecewise, unlike Builder) can be outsourced to
  - A separate method (Factory Mthod)
  - That may exist in a separate class (Factory)
  - Can create hierarchy of factories with Apstract Factory

## Definition
- A component responsible solely for the wholesale (not piecewise) creation of objects