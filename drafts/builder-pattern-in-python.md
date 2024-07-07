Title: Object creation patterns in Python: Builders
Date: 2024-05-23
Category: Python
Tags: python, object-oriented-programming, design-patterns
Slug: builder-pattern-in-python

In the previous post, we talked about
[static factory methods in Python](static-factory-methods-in-python),
which facilitate the creation of an object without directly using the 
class' `__init__()` method: allowing the class to provide callers with
higher-level interfaces to instantiate an object, especially when the
caller should defer to the class (including possibly an abstract class)
to implement the details of object creation.

The builder pattern is also an object creation pattern, and is useful 
when the information needed to create an object needs to be passed
around.


## A trivial example

Consider the following dataclass:
```python
@dataclass
class Employee:
    name: str
    job_title: str
    salary: int
```
The basic way to create an instance of `Employee` is to use the
initializer:
```python
emp = Employee(name="Bob", job_title="Software engineer", salary=50000)
```


## A proper example

---

## One more detail: chaining setters

In some languages, such as Java, it is common for
setter methods in builder classes to return the builder itself:
```java
public class SandwichBuilder {
  public SandwichBuilder setBreadType(BreadType bt) {
    this.breadType = bt;
    return this;  // <--
  }
  
  public SandwichBuilder addFilling(Food filling) {
    this.fillings.push(filling);
    return this;  // <--
  }
}
```
This allows us to chain calls, allowing an object to be constructed in
a single statement:
```java
Sandwich s = (new SandwichBuilder())
             .setBreadType(BreadType.BROWN)
             .addFilling(bacon)
             .addFilling(lettuce)
             .addFilling(tomato)
             .build();
```
Since this object is created and returned in a single expression, the
above can be used in a lambda expression. 

Other than this convenience, the same benefits of the builder pattern
can be obtained with using setters on multiple statements. 
