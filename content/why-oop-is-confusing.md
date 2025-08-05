Title: Why learners find classes and objects confusing
Date: 2025-08-05
Category: Software
Tags: python, object-oriented-programming, teaching
Slug: why-oop-is-confusing

One reason why Python is such a popular and powerful language is that it
is straightforward to learn and make good progress. Learners can quickly
become comfortable with many aspects of the language, such as control
flow and functions.

The first obstacle that many learners come across is when they come
across classes and objects. This is usually met as an intermediate
subject several chapters into a book, by which time they may already
have *used* objects, if they have been using libraries such as pandas.

Learners often find classes and objects difficult because introductory
courses usually introduce them using toy examples that do not motivate
their use: often the same effect can be achieved using dictionaries (for
fields) and functions (for methods). The true utility of classes comes
when working on a complex project where modularity and abstraction are
useful for simplifying problems.


## Classes play several roles

### Grouping data

Classes and objects can be used to group related variables into a
"compound" object:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

joanna = Person(name="Joanna", age=32)
```
The `dataclass` feature (introduced in Python 3.7 and now standard)
provides a shortcut for constructing many such classes (*inter alia*,
creating the `__init__` method automatically):
```python
@dataclass
class Person:
    name: str
    age: int
```

**Grouping data:**
One advantage is that a single argument can be passed around between
functions:
```python
# this
def describe(p: Person):
    print(f"{p.name} is {p.age} years old")

describe(joanna)
```
This is neater than:
```python
# not this
def describe(name: str, age: int):
    print(f"{name} is {age} years old")

describe("Joanna", 32)
```
If we desire to start modelling new attributes of people and including
them when printing descriptions, we simply need to update the `Person`
class and the *body* of the `describe` function, rather than the
*signature* of the `describe` function.

**Alternative: a dictionary:**
A similar effect might be achieved by using a dictionary:
```python
joanna = {"name": "Joanna", "age": 32}

def describe(p: dict):
    print(f"{p["name"]} is {p["age"]} years old")
```


## So what is a class?

> Classes provide a means of bundling data and functionality together.
> Creating a new class creates a new type of object, allowing new
> instances of that type to be made. Each class instance can have
> attributes attached to it for maintaining its state. Class instances
> can also have methods (defined by its class) for modifying its state.
> <small>[*From the Python Tutorial on classes.*][python-tutorial]</small>

In other words, a class is a compound data type that contains multiple
fields or attributes <small>*(which are roughly synonymous, although
there is a slight difference in Python)*</small>, as well as associated
methods and functions.

## An object *is* what it *does*

In [*Mathematics: A Very Short Introduction*][wtg-book],
mathematician [Timothy Gowers][wtg] writes:
> A mathematical object is what it *does*. <small>*(p. 18)*</small> ...
> If one learns to think abstractly, then many philosophical
> difficulties disappear.

This comes in the context of discussions over the nature of mathematical
objects. Although philosophers have debated the 'intensive' properties
of mathematical objects (['Do real numbers exist if you aren't able to
construct them?'](https://en.wikipedia.org/wiki/Constructivism_(philosophy_of_mathematics)))
and mathematicians have attempted to formalise concepts in terms of
logic and set theory (['How do you define the real numbers in terms of
sets?'](https://en.wikipedia.org/wiki/Construction_of_the_real_numbers));
Gowers, like most other mathematicians, takes the more practical view
that most interesting questions about mathematical operations &mdash;
such as how to do arithmetic, solve equations and perform analytical
operations like taking limits &mdash; are about their 'extensive'
properties


## Recommended reading

Baeldung's tutorial on [Object-Oriented-Programming Concepts in
Java][baeldung-oop] is a good piece that introduces the ideas of
*abstraction*, *encapsulation*, *inheritance* and *polymorphism*. These
design principles apply just as much to Python programming. The syntax
in Java is a little different, but the examples there should be
reasonably comprehensible; see their article on [Java Classes and
Objects][baeldung-classes] for details.

<!--
Allen Holub's article [Why getters and setters are evil][evil].
-->

[baeldung-classes]: https://www.baeldung.com/java-classes-objects
[baeldung-oop]: https://www.baeldung.com/java-oop
[evil]: https://www.infoworld.com/article/2073723/why-getter-and-setter-methods-are-evil.html
[python-tutorial]: https://docs.python.org/3/tutorial/classes.html
[wtg]: https://www.dpmms.cam.ac.uk/~wtg10/
[wtg-book]: https://academic.oup.com/book/473
