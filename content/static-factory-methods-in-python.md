Title: Object creation patterns in Python: Static factory methods 
Date: 2024-05-19
Category: Python
Tags: python, design-patterns
Slug: static-factory-methods-in-python

The basic way to create and initialize an object in Python is using the
default constructor, defined as the `__init__()` method:
```python
class MyClass:
    def __init__(self, x: float) -> None:
        self.x: float = x
        print(f"created an object with x = {x}")

        
obj = MyClass(5)
```
Usually, initial values of instance variables are specified using
arguments to `__init__()`, and assigned to the variables. The body of 
`__init__()` may also contain other steps, such as precomputing other
other variables based on these instance attributes, or, as in this
example, logging the creation of an object. <small>*(Resource allocation such as
opening files should generally *not* be done in an initializer, but in
a [context manager](https://docs.python.org/3/reference/datamodel.html#context-managers),
so that client code doesn't have to take care of deallocation.)*</small>


## Dataclasses and kwargs

When a class has many instance variables, it is common to **use keyword 
arguments when initializing them**, which makes the meaning of each
argument more explicit and allows arguments to be reordered later.
Furthermore, such classes are often good candidates for making into
[**dataclasses**](https://docs.python.org/3/library/dataclasses.html), 
since the `@dataclass` decorator automatically creates an `__init__()` 
method with the necessary arguments and that assigns them to the 
instance variables:
```python
@dataclass
class Person:
    # types are not enforced at runtime, but are checked by type 
    # checkers
    name: str
    age: int
    
    # More complex types, including recursive types, are allowed. Use
    # `field`
    occupation: Optional[str] = field(default=None)
    best_friend: "Person" = field(default=None)
    
    # an __init___ method is automatically generated, but you can still
    # create a __post_init__ method for additional behaviour like
    # logging
    
    def __post_init__(self):
        print(f"Created new Person: {self}")
    
    
# Use kwargs when creating instances
p = Person(name="Sir Robin", age=32, occupation="knight")
```
As well as automatically providing the `__init__()` method, dataclasses
also automatically provide methods such as `__repr__()` and `__eq__()`,
further reducing the amount of boilerplate code and allowing you to
use a more declarative style of programming that focuses on the
structure of the class (and makes it easier to add or remove fields
witout needing to worry about updating all these methods).

While using dataclasses takes care of some frustrations of working with
complex objects, there are nonetheless some limitations of creating 
objects using the simple initializer form `Person(...)`. To avert them,
various *object creation patterns* have been created over the years.

The rest of this post will discuss the **static factory methods 
pattern**, which allows you to provide multiple, distinct ways to 
instantiate a class without having a complicated `__init__()` method. In 
a future post I shall discuss the **builder pattern**, which lets you 
gradually build up a complex object by passing around the information
needed to create it rather than requiring all the information in one go.


## The static factory method

**Goal:** Provide multiple, distinct ways of instantiating a class.

*Explicit is better than implicit.* <small>[*The Zen of Python*](https://en.wikipedia.org/wiki/Zen_of_Python)</small>

In many cases you want to provide multiple ways to obtain instances of
a class. To do that, you can provide *static factory methods* in your 
class: these are class methods that create and return instances.
<small>*(The name comes from Java, which does not distinguish between
class methods and static methods.)*</small>

A classic example is a `Point2D` class that represents a point in the
plane. It is desired to be able to create instances of `Point2D` by
specifying either the point's Cartesian coordinates or its polar
coordinates. To achieve this, we define static factory methods
`from_cartesians()` and `from_polars()` that return instances of
`Point2D`:

```python
@dataclass
class Point2D:
    x: float
    y: float
    
    # __init__(self, x, y) is automatically generated
    
    @classmethod
    def from_cartesians(cls, x: float, y: float) -> "Point2D":
        return cls(x=x, y=y)
    
    @classmethod
    def from_polars(cls, r: float, theta: float) -> "Point2D":
        if r < 0:
            raise ValueError("Radial coordinate must be nonnegative")
        return cls(x=r * math.cos(theta), y=r * math.sin(theta))
```
Although the `__init__()` method (automatically created by `@dataclass`)
already gives us a way of instantiating a `Point2D` through its
Cartesian coordinates, we nonetheless provide a `from_cartesians()`
method. This has two 

Static factory methods are a common pattern in object oriented
languages. Python doesn't have method overloading (unlike C/++ and
Java) and so it is not possible to define multiple `__init__()` methods
with different signatures. But even in languages like Java it is often
recommended to use static factory methods instead of overloaded
constructors, for the expressiveness: indeed, this is the first item in 
Joshua Bloch's [*Effective Java*](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/).

## Abstract classes

The real power of static factory methods comes when working with
abstract classes. While (by definition) you cannot directly instantiate 
an abstract class, you can emulate such an instantiation providing a 
static factory method on the abstract class that chooses an appropriate 
subclass and produces an instance of that class.


## Conclusion

All that said, a class that has very different behaviours depending on
how it is initialized may be too complicated and may be a candidate for
refactoring into smaller classes each with fewer responsibilities.
