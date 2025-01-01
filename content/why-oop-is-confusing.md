Title: Why classes and objects are confusing
Date: 2024-12-21
Category: Software
Tags: python, object-oriented-programming, teaching
Slug: why-oop-is-confusing

One reason why Python is such a popular and powerful language is that it
is straightforward to learn.  However, most learners become stuck when
they come across classes and objects: this is usually met as an
intermediate subject several chapters into a book, by which time the
reader will be comfortable with many other aspects of the language and
may even have developed some sophisticated programs using imperative or
procedural styles. They may even be comfortable using 'dot notation', as
is common with libraries such as numpy and pandas.

Although the syntax for creating classes, methods and objects is fairly
straightforward, many learners find the subject confusing. In my
coaching experience, this is because the use of toy examples leave the
reader with very little context or motivation, and many of the examples
can be achieved with a procedural style.

One problem is that the powerful benefits of *object-oriented
programming* come only when working on large projects, and especially as
a contributor within a large team. This essay is an attempt to explore
some of the design principles and techniques that motivate the use of
classes and objects.

<!--
The true power of OOP comes from principles such as **abstraction**,
**encapsulation**, **inheritance** and **polymorphism**.
There are plenty of excellent articles on the Internet that do a much
better job than this post will of explaining these rather scary-sounding
concepts: see for example Baeldung's [Object-Oriented-Programming
Concepts in Java][baeldung-oop].
-->


## Classes play several roles

One confusing aspect about classes and objects is that they play several
distinct, although related, roles.
### Grouping data

Classes can group related variables into a single object:
```python
@dataclass
class Person:
    name: str
    age: int

joanna = Person(name="Joanna", age=31)
```
The advantage is that a single object can be passed around between
functions:
```python
# this
def describe(p: Person):
    print(f"{p.name} is {p.age} years old")

describe(joanna)
```

rather than:
```python
# not this
def describe(name: str, age: int):
    print(f"{name} is {age} years old")

describe("Joanna", 31)
```



<!--
The usual example is something like this:
```python
class Person:
    def __init__(self, name: str, age: int):
        self.name: str = name
        self.age: int = age

    def say_hello(self):
        print(f"{self.name} says hello!")

person = Person(name="Joanna", age=30)
person.say_hello()
```

Since this defines a type, it can be used as the argument or return type
of a function, or even as a parameter to a generic type (although this
might not be covered in a tutorial):
```python
def describe(p: Person) -> str:
    return f"{p.name} is {p.age} years old"

def find_friends(p: Person) -> Iterable[Person]:
    ...  # some database operation
```

When the concept of methods is introduced, these might instead be
refactored:
```python
@dataclass
class Person:
    name: str
    age: int

    def describe(self) -> str: ...
    def find_friends(self) -> Iterable[Person]: ...
```
-->

<!--
### In Java and similar languages

In languages like Java and C++ that distinguish between public and
private members, the student is also introduced to getters and setters,
and is asked to write code like this:
```java
public class Person {
  private String name;
  private int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() {
    return name;
  }

  public void setName(String newName) {
    name = newName;
  }

  // ...other methods
}
```
...including boilerplate code as a matter of 'good practice' or
'convention' without further justification.
-->

### So what is a class?

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

## Mathematics

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


<!--
## So, what can we do?

What can we do as educators to improve the way classes and objects are
introduced?
-->



## Recommended reading

Baeldung's tutorial on [Object-Oriented-Programming Concepts in Java][baeldung-oop]
is a good piece that introduces the ideas of abstraction, encapsulation,
inheritance and polymorphism. It supplements their article on [Java
Classes and Objects][baeldung-classes],
which goes into the mechanics of actually creating a class.

Allen Holub's article [Why getters and setters are evil][evil].

[baeldung-classes]: https://www.baeldung.com/java-classes-objects
[baeldung-oop]: https://www.baeldung.com/java-oop
[evil]: https://www.infoworld.com/article/2073723/why-getter-and-setter-methods-are-evil.html
[python-tutorial]: https://docs.python.org/3/tutorial/classes.html
[wtg]: https://www.dpmms.cam.ac.uk/~wtg10/
[wtg-book]: https://academic.oup.com/book/473
