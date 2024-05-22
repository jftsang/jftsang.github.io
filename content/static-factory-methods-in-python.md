Title: Object creation patterns in Python: Static factory methods
Date: 2024-05-21
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
example, logging the creation of an object. <small>*(Resource allocation
such as opening files should generally *not* be done in an initializer,
but in a [context
manager](https://docs.python.org/3/reference/datamodel.html#context-managers),
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
further reducing the amount of boilerplate code and allowing you to use
a more declarative style of programming that focuses on the structure of
the class (and makes it easier to add or remove fields witout needing to
worry about updating all these methods).

While using dataclasses makes it easy to create an initializer even for
objects with many fields, there are nonetheless some limitations of
creating objects using the basic syntax `Person(...)`. To provide more
expressive ways to create objects, various *object creation patterns* 
have been developed over the years, and are now standard fare in large
projects, including the standard library itself.

The rest of this post will discuss the **static factory methods
pattern**, which allows you to provide multiple, distinct ways to
instantiate a class without having a complicated `__init__()` method. In
a future post I shall discuss the **builder pattern**, which lets you
gradually build up a complex object by passing around the information
needed to create it rather than requiring all the information in one go.


## The static factory method

**Goal:** Provide multiple, distinct ways of instantiating a class.

*Explicit is better than implicit.* <small>[*The Zen of Python*](https://en.wikipedia.org/wiki/Zen_of_Python)</small>

In many cases you want to provide multiple ways to obtain instances of a
class. To do that, you can provide *static factory methods* in your
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
import math


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

    
p: Point2D = Point2D.from_polars(r=4, theta=0.5 * math.pi)
```

Although the `__init__()` method (automatically created by `@dataclass`)
already gives us a way of instantiating a `Point2D` through its
Cartesian coordinates, we nonetheless provide a `from_cartesians()`
method. There are two major benefits to using this method oer the basic
initializer:

* It is more explicit about what the input numbers mean.
* If it is desired to store the polar coordinates, rather than the
  Cartesian coordinates, as fields, the class methods can be updated
  without affecting client code; whereas instantiations with `Point2D(...)`
  would need to be updated. (This is referred to as "invariance under 
  refactoring" and allows developers to work on different parts of a
  codebase without hugely affecting each other.)

For contrast, this is what the class might look like if we wanted to
allow the user to specify either Cartesian or polar coordinates when
creating a `Point2D`, all in the `__init__()` method:
```python
@dataclass(init=False)  # we provide our own __init__() method
class Point2D:
    x: float
    y: float

    def __init__(
        self, 
        x: Optional[float] = None, 
        y: Optional[float] = None, 
        r: Optional[float] = None, 
        theta: Optional[float] = None
    ):
        using_cartesians = x is not None and y is not None
        using_polars = r is not None and theta is not None
        if using_cartesians and not using_polars:
            self.x, self.y = x, y
            return
        if using_polars and not using_cartesians:
            if r < 0:
              raise ValueError("Radial coordinate must be nonnegative")
            self.x = r * math.cos(theta)
            self.y = r * math.sin(theta)
            return
        
        raise ValueError("Either specify x and y or specify r and theta, but not both.")


p: Point2D = Point2D(r=4, theta=0.5 * math.pi)
```
This is clearly more complex and less expressive.

Static factory methods are a common pattern in object oriented
languages. Python doesn't have method overloading (unlike C/++ and
Java) and so it is not possible to define multiple `__init__()` methods
with different signatures. But even in languages like Java it is often
recommended to use static factory methods instead of overloaded
constructors, for the expressiveness. <small>*(Indeed, this is the
very first item in Joshua Bloch's [*Effective Java*](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/).)*</small>


## Abstract base classes

The real power of static factory methods comes when working with
abstract classes. While (by definition) you cannot directly instantiate
an abstract class, you can emulate such an instantiation providing a
static factory method on the abstract base class that chooses an
appropriate subclass and produces an instance of that class.

A typical use case is to provide the user with a simplified interface
while internally having several underlying implementations. Consider the
following interface, which declares a single method for calculating the
integral of a function between two points:
```python
import abc


class Integrator(abc.ABC):
    @abc.abstractmethod
    def integrate(self, f: Callable[[float], float], a: float, b: float) -> float:
        """Calculate the integral of the function f between a and b.""" 
        raise NotImplementedError
```
The subclasses implement different methods of integration:
```python
class EulerIntegrator(Integrator):
    def __init__(self, n: int = 10):
        self.n = n
        
    def integrate(self, f, a, b):
        # Even for such an inaccurate scheme, this is a terrible 
        # implementation! It is horrendously inefficient and doesn't
        # properly handle floating point errors. This is just for
        # illustration purposes.
        dx = (b - a) / self.n
        x = a
        s = 0
        while x < b:
            s += f(x) * dx
            x += dx
        return s
    
class AdamsBashforthIntegrator(Integrator): ...  # similarly
class TrapeziumIntegrator(Integrator): ...  # similarly
class RK4Integrator(Integrator): ...  # similarly
```
The appropriate choice of integration method depends on the function.
For example, the Adams&ndash;Bashorth integrator has a lower order of 
accuracy than RK4, but performs better against stiff equations.

While the client may wish to choose an integrator for themself, as the
developer of the `Integrator` class one may wish to provide the user a
shortcut for common cases without requiring them to know the details of
the particular implementation. To achieve this, the `Integrator` class
could provide a static factory method that returns an appropriate
instance:
```python
class Integrator(abc.ABC):
    @classmethod
    def create(cls, stiff: bool = False) -> "Integrator":
        if stiff:
            return AdamsBashforthIntegrator(...)  # with suitable params
        else:
              return RK4Integrator(...)  # ditto
```
with example usage:
```python
integrator = Integrator.create(stiff=True)
print(integrator.integrate(lambda x: x ** 2, 1, 2))
```

Other numerical operations that can be calculated using different
algorithms are similarly candidates for such a structure.


## Caveat and conclusion

The examples above are smallish classes that nonetheless benefit from
having multiple ways to create them. With that said, a class that has
very different behaviours depending on how it is initialized may be too
complicated, and be a candidate for refactoring into smaller classes
each with fewer responsibilities.

As mentioned above, the static factory method pattern is commonly used
not only in Python but also in other languages. The benefits are the
same: using static factory methods (a) allows the user to more
explicitly state how an object should be produced from input data
(`Point2D.from_cartesians(3, 4)` versus `Point2D(3, 4)`), and (b) allows
the class to rework what data it stores internally or which
implementation of an abstract class to provide.
