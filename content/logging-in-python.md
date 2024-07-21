Title: Logging in Python
Date: 2024-07-07
Category: Python
Tags: python, backend
Slug: logging-in-python

Having reliable, detailed but searchable logs is an essential part of
any application, especially of long-running services that need to be
debugged and monitored for uptime and stability. As one of the oldest
modules in the Python standard library, the `logging` module provides a
very powerful set of tools for logging, but its design and behaviour
also shows its age.

While the basics are covered in the [official
tutorial](https://docs.python.org/3/howto/logging.html) and full details
are given in the [reference
docs](https://docs.python.org/3/library/logging.html), this article
collects together the most commonly seen concepts from different parts
of the docs.


## Why use `logging`?

Although it takes some setup (which will be covered below), It is
strongly preferable to use the features of `logging`, rather than
`print()`, for diagnostics and debugging.

### Diagnostic messages vs. machine-readable output

The `logging` module allows one to define different handlers for
different types of messages. Besides (or instead of) printing the
message to `stdout,` it may be helpful to print messages to `stderr`, or
to do something else with them like submitting them to a database.
Urgent, critical messages may need to be emailed or sent as push
notifications.  Diagnostic, human-readable messages (which aren't
necessarily *error* messages) should generally be separated from
machine-readable output.

### Thread-safety

Loggers are thread-safe. Concurrent threads logging to the same file do
not interfere with each other; whenever a thread attempts to write to a
log file, that thread has exclusive ownership of that file while it is
writing.

By contrast, the `print()` function or writing to a stream with
`f.write()` are not thread safe, so that messages from two threads may
interfere with each other. For example, it is not guaranteed that each
message is printed on its own line.
```
message frommessage from thread 2
 thread 1
```


## Loggers, handlers, filters and formatters

Logging functionality is provided by four main classes. From [the
docs](https://docs.python.org/3/library/logging.html#logger-objects):

> * [Loggers](https://docs.python.org/3/library/logging.html#logger-objects)
>   expose the interface that application code directly uses.
> * [Handlers](https://docs.python.org/3/library/logging.html#handler-objects)
>   send the [log records](https://docs.python.org/3/library/logging.html#logrecord-objects)
>   (created by loggers) to the appropriate destination.
> * [Filters](https://docs.python.org/3/library/logging.html#filter-objects)
>   provide a finer grained facility for determining which log records to
>   output.
> * [Formatters](https://docs.python.org/3/library/logging.html#formatter-objects) specify the layout of log records in the final output.

The logic and the relationship between these classes is summarised in
the flowchart from the
[tutorial](https://docs.python.org/3/howto/logging.html#logging-flow):
![[content/images/python-logging-flowchart.png]]

For a basic setup it is only necessary to configure a logger; but
configuring handlers and formatters can make your logs more informative.

### `Logger` objects

Do not instantiate `Logger` directly.
```python
# Not like this!
logger = logging.Logger(...)
```
Instead, create them using the factory function `logging.getLogger()`, providing a name for the logger:
```python
# Like this
logger = logging.getLogger("example_app")
```
Doing so allows the `logging` module to keep track of all the loggers
that are in use, as well as to return the same instance if the same name
is used across different modules.

### Configuring the logger

One the logger instance has been created, you can add handlers to it:

```python
import logging

logger = logging.getLogger("example_app")
logger.setLevel(logging.INFO)
handler = logging.FileHandler("example_app.log")
logger.addHandler(handler)

# usage
logger.info("hello")
```

### The root logger and why not to use it

If no logger is configured, or if you use one of the module-level
functions such as  `logging.info()` as opposed to `logger.info()`, then
the default behaviour is to use the "root logger". This is a `Logger`
that is available globally. You can also obtain it with
`logging.getLogger()`, providing no argument.

**Although the root logger can be used without any setup, it is usually
a good idea to configure your own loggers.** By using different loggers,
the logging output of different components of a program can be
configured independently of each other.

For example, if you are developing a library, let's say `libfoo`, that
is intended for use in other applications, you can create your own
logger:
```python
# libfoo.py
import logging
logger = logging.getLogger("libfoo")
# then configure your logger
# and then
logger.info("logfoo is doing stuff")
```

And then a client of your code can both set up their own logging and
modify your code's behaviour:
```python
# client.py
import logging
import libfoo

logger = logging.getLogger("client")
libfoo.logger.setLevel(logging.WARNING)  # suppress INFO messages
```

### `Handler` objects

There are many subclasses of `Handler`, providing different options for what to do with log messages. The two most common are `StreamHandler(stream)`, which writes to a stream such as `sys.stderr`, and `FileHandler(filename)`, which appends messages to a file.

Other `Handler` classes are provided in the `logging.handlers` module ([doc](https://docs.python.org/3/library/logging.handlers.html)), and some useful ones include:
* `RotatingFileHandler` , which writes to successive files (`app.log.1`, `app.log.2`, _etc._) keeping each file below a maximum size;
* `SocketHandler`, which emits messages as TCP packets;
* `HTTPHandler`, which emits messages as `GET` or `POST` requests to a webserver; and
* `SMTPHandler`, which sends email.

Choose the handlers that are suitable for your architecture. Since each handler can be configured separately, one might for example configure a `SMTPHandler` to only report important messages such as `ERROR` and `EXCEPTION`, while `StreamHandler` and `FileHandler` to contain `DEBUG` messages.

### Formatters and Filters
Formatters and filters give further control over how messages are processed. Filters are associated with both loggers and handlers and can be configured differently for different handlers, so that different handlers may choose to emit different messages.

A handler may have a formatter; if no formatter is defined then the default behaviour is print just the message by itself. However, formatters can be configured to show various pieces of metadata about each log message ([doc](https://docs.python.org/3/library/logging.html#logrecord-attributes)).

It is a good idea to include timestamps as well as information about what emitted the message. This is done by passing arguments to `Formatter`.

Example:
```python
import logging

logger = logging.getLogger("example")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
logger.addHandler(handler)
formatter = logging.Formatter(
  "%(asctime)s %(levelname)s %(filename)s:%(lineno)s %(message)s",
  datefmt="%Y-%m-%d %H:%M:%S"
)
handler.setFormatter(formatter)

logger.info("Hello, world")
```
prints:
```
2024-07-14 17:21:20,988 INFO foo.py:12 Hello, world
```

## Logging levels

There are five predefined logging levels: `DEBUG`, `INFO`, `WARNING`,
`ERROR` and `CRITICAL` . These are to be used for messages of increasing
seriousness. Each logger or filter must be set to a level, and ignores
messages that are lower than that level. The default logging level is
`WARNING`.


## Some good practices

* As mentioned above: Use `logging` where possible instead of `print`,
  so that diagnostic messages are separated from output that needs to be
  machine-readable.

* Don't use the root logger, always configure a custom logger. This
  makes it possible to configure separate logging behaviour between
  different modules or libraries.

* At a minimum, log messages should contain a timestamp. Otherwise, in a
  log file it will not be possible to discern whether a log message was
  triggered by a recent event.

* It is also a good idea to include a reference to whatever caused the
  log message to be emitted. Including the filename, line number and
  name of the function in the formatter is a good first start.
  However, this may not be fully informative if the log message is
  inside a function that is called from many sites.

* Logging the arguments passed to the function can also be helpful.
  But this must be done with care, if the arguments passed are complex
  objects with many fields, or if they contain sensitive information.

* I like to invent "sentinel" words (my term, I can't remember if there
  is an official term for this) that are specific to the particular
  feature being logged about. By using a word that won't be used
  anywhere else, it makes it easier to search for that word in the logs
  using `grep`. For example, I used the French word "telecharger"
  instead of "download".

* The `funcy` library provides a number of function decorators or
  context managers that help with logging calls to and returns from
  functions, which are particularly valuable when profiling code.


### stderr or stdout?

The default behaviour of `StreamHandler` is to write log messages to
`stderr` rather than `stdout`.

When writing shell utilities, writing diagnostic messages to `stderr`
instead of `stdout` is useful if the program needs to produce
machine-readable output, for example, to pipe into another process.
Separating diagnostic messages into a separate stream will allow those
messages to be more meaningful, detailed and human-readable, while
keeping the output in a standard format. This also avoids accidentally
piping such messages into the other program, which can have unexpected
(or even dangerous) results.

On the other hand, for long-running services such as web apps, [The
Twelve-Factor App](https://12factor.net/logs) recommends writing all
messages to `stdout`, using a single stream. This stream can then be
directed either to a regular file or to an external service which can
then provide further services, such as searching, trend analysis or
forwarding high-level messages.

The appropriate choice therefore depends on what the program output is
used for. In either case, using the `logging` module and the
`StreamHandler` class provides an abstraction that sidesteps this
question for the code that actually emits the log message.


## Copy-and-paste example

```python
# logger.py
import logging

def configure_logger() -> logging.Logger:
    """This stuff goes into its own function in order not to pollute the
    module-level namespace; but since this is in its own module that
    doesn't matter too much.
    """
    logger = logging.getLogger("my_app")
    handler = logging.StreamHandler()
    logger.addHandler(handler)
    formatter = logging.Formatter(
      "%(asctime)s %(levelname)s %(filename)s:%(lineno)s %(message)s",
      datefmt="%Y-%m-%d %H:%M:%S"
    )
    handler.setFormatter(formatter)

    return logger

# This gets initialized only once, even if this module is imported
# multiple times.
logger: logging.Logger = configure_logger()

# Allow logger to be imported from other modules
__all__ = ["logger"]
```

And then, in another module in the same package:
```python
# code.py
from .logger import logger

logger.info("Hello")
```
