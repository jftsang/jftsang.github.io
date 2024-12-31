Title: Category theoretic ideas in data engineering systems design
Date: 2024-09-22
Category: Software
Tags: data, math, software-engineering
Slug: category-theory-and-data-engineering

I have been reading – at a very shallow level – about category theory
([wiki](https://en.wikipedia.org/wiki/Category_theory)), and thinking
about its applicability to software and system design for data
engineering. This post is a loose collection of thoughts on the subject,
and a manifesto for employing a more rigorous language when building
such systems.

Although category theory is regarded as a very abstract area of maths –
it generalises concrete concepts from other fields, such as algebra and
topology, into a common language – it has some practical applications.
In maths, it has been used to discover "structure-preserving"
correspondences between these different areas, and, for example, can be
used to produce a proof of a result in analysis or topology by showing
that that theorem is equivalent to a simpler statement in algebra.

More recently, ideas from category theory have made their way into
programming and software engineering: higher-order functions (hofs) like
`map` and monadic patterns like `Maybe` (a.k.a. `Optional`, `Option`)
were once the marks of purely functional languages like Haskell, but
have found their way into mainstream languages and are now routinely
used by developers... even if they don't know that that's what they're
doing.

For a systematic introduction to category theory, consult [Julia
Goedecke's lecture
notes](https://www.julia-goedecke.de/pdf/CategoryTheoryNotes.pdf) or
Emily Rhiel's _Category Theory in Context_
([web](https://math.jhu.edu/~eriehl/))
([pdf](https://emilyriehl.github.io/files/context.pdf)).

I am neither a category theorist nor a computer scientist, so please
excuse the inaccuracies in that which follows – or better yet, [send me
corrections](mailto:j_dot_m_dot_f_dot_tsang_at_cantab_dot_net).


<a id="motivation"></a>
## Information flow

The fundamental problem of data engineering is that:

<div style="width:100%; display: flex; justify-content: center; margin-top: 1.5rem; margin-bottom: 1.5rem;">
<div>
The way that data is ingested<br>
is not the way that data is stored.<br>
The way that data is stored<br>
is not the way that data is exported.
</div></div>

More prosaically, the purpose of data engineering – and perhaps of all
software engineering – is the transmission and transformation of
information, from "sources" (e.g. lab collections) to "sinks" (e.g.
reports, dashboards). The particulars of the transformations depend
strongly on the nature of the data and the desired output, but they can
be broken into individual operations that can be placed into one of
three classes:

1. Transforming the data into another, informationally equivalent, format.
2. Enriching the data with additional information.
3. Discarding irrelevant information from the data.

Examples:

1. JSON serialization or deserialization of an object:
   `Employee.serialize: Employee -> Dict[str, Any]`
2. Querying a database for information about a given ID:
   `Employee.find_by_id: int -> Employee`
3. Calculating the mean, or other aggregate statistic, of a collection
   of data: `Collection[float] -> float`

Data pipelines – compositions of transformations – are usually
represented as directed acyclic graphs
([wiki](https://en.wikipedia.org/wiki/Directed_acyclic_graph)), with
nodes representing transformations and arrows representing data flow;
beginning with "source nodes" that represent the input data.  This DAG
representation focuses on the operations and the order in which they are
performed.

An alternative representation is to focus on the *format*, or *type* of
data as it progresses through a pipeline. Let these types form the nodes
of a graph; the transformations between types are now arrows. (The
resulting graph is still directed but not necessarily acyclic.)

Under this formats-first picture, it is much easier to consider *all
possible transformations* that can be applied to obtain one data type
from another, rather than only those that are actually used within a
particular pipeline. Draw the arrows and choose the appropriate paths.

Moreover, it encourages a style in which arrows are by default "pure
functions", making the system's behaviour easier to understand.
Operations such as insertions, updates, deletions, or writing to an
external resource may be managed using monads<small>... which I would
explain if only I understood them... but instead I refer you to [Dag
Brattli's tutorial about functional programming in
Python](https://github.com/dbrattli/OSlash/wiki/Functors,-Applicatives,-And-Monads-In-Pictures#monads)</small>.

But there are more practical benefits in a system design methodology
that focuses on data formats and transformations. At a tactical level, a
well-hinted, strongly-typed codebase is easier to analyze and refactor
as a static type checker such as mypy or pyre can look for
inconsistencies across the codebase. At a systems level, we can be more
confident that data, no matter how it is transformed, possibly by many
components or over a distributed system, is always in one of a small
number of formats, ensuring interoperability and substitutability
between components.

Defocusing from the implementation details of any particular arrow,
prescribing only its inputs and outputs, also brings several advantages.
The most practical is that it enforces a "behaviour-driven design".  The
developers responsible for the implementation details need only worry
that their behaviour conforms to this specification, allowing them to
work independently.


## An example

Audio data can be in any of several formats, but essentially they all
consist of a stream of numbers that prescribe the waveform of the audio
(essentially, `List[float]`, but the data may be stored in a compressed
form). Individual formats (such as MP3) may additionally contain
additional metadata, such as key-value tags (`Mapping[str, str]`), but
these are ignored by operations on the audio.

In this example we have "concrete types" `WAV` and `MP3` that contain
the information of an abstract type `Waveform` (which is isomorphic to
`List[float]`).  An "audio format" might be defined to be a type that
has a `toWaveform` methodm, or in other words a "projection map". The
projection map `WAV -> Waveform` is particularly simple: "read the bytes
of the WAV file"; whereas the projection `MP3 -> Waveform` is something
like "decompress the file".

The type `MP3` may be regarded as a pair `(Waveform, Mapping[str, str])`.


## Closing thoughts

My (short) experience of the data engineering world has been that much
focus is given to the details of particular frameworks and technologies.
These are important for building scalable systems, but this
specialisation risks losing the big picture. This "discipline" should
develop a more abstract language in order to produce reusable,
generalisable solutions to common problems.

Not having such a language leads to becoming tightly coupled to a
particular framework or cloud provider, reducing interoperability. This
has real economic implications: vendor lock-in is a serious issue for
cloud services customers, and a reason for the growth of oligopolies,
reducing quality for all.

Maths, and particularly category theory, might help to provide such a
language. Thinking about data engineering as the manipulation and
transformation of information through a pipeline, there are very natural
meanings to terms like *homomorphism* ("information-preserving") and
*quotient* ("information-discarding").

I don't have the theoretical background to make these definitions
rigorous and to develop a "general algebra of data engineering", but
it's a good start to look out for these patterns.
