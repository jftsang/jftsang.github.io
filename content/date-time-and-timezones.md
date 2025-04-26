Title: Date, time and timezones
Date: 2025-04-27
Category: Physics
Tags: data, math, physics
Slug: date-time-and-timezones

*Time* is taken to be a primitive concept that cannot be defined in
terms of other phenomena, but can be characterised as a parameter of a
system that allows the system to change.

In closed systems, time is measured relative to some event within that
system, such as the time elapsed since the start of an experiment.  In
such systems, time can be unambiguously specified as a single real
number (or sometimes an integer, in discrete-time models).

Things are more complicated when it is necessary to describe times "in
the real world", where there are a number of closely related but
confusing concepts.

Under a non-relativistic model of physics, all observers have a common
notion of time: in particular, instantaneous events may be totally
ordered along a timeline, and all observers can agree whether event A
happened before, after or simultaneously with event B. However,
observers might report different *numerical* values of a time, depending
on how they measure it: in particular, depending on their timezone and
the accuracy of their clocks. The synchronisation of different clocks is
a difficult but important problem in distributed systems.


## Absolute time, relative time, and time of day

The English word *time* may refer to:
* an *absolute position* on the timeline ("when did something happen?"),
* the *interval* (or *timedelta*) between two positions on the timeline
  ("how much time passed?"), or
* the *time of day*, or the interval relative to the local midnight
  ("what is *the* time?").

Intervals of time are measured in units such as seconds (see below).

One may convert between absolute times and timedeltas by specifying a
position on the timeline as an *epoch*, relative to which all other
times are measured. The epoch may be chosen to be the time of a
significant event, or an arbitrary point.

Since local midnight depends on the locale of the observer, a "time" in
the third sense can be converted into an absolute time only by
additionally specifying a *date* as well as a *timezone* - often
implicitly.


## Units of timedeltas

The basic unit of a timedelta is the second, also the millisecond,
microsecond, *etc.*, defined in terms of the (constant) frequency of a
certain atomic oscillator. The *minute*, the *hour* and the *day) are
defined as 60 seconds, 60 minutes and 24 hours respectively.

The *month* and the *year* are not precise units of timedeltas, since
they vary in length. They are however used informally.

### Astronomical days

Although the day is based on the rotation of the Earth and the relative
position of the Sun, the 24-hour day is distinguished from:

* the *solar day*, the time between two successive maxima of the
  Sun's position in the sky, and
* the *sidereal day*, the time taken for the earth to complete a
  rotation on its axis.

The solar day is longer than 24 hours by a few seconds. The sidereal day
is about 4 minutes shorter than 24 hours; this difference is due to the
orbit of the Earth around the Sun.


## *The* time of day: solar time, civil time and timezones

Traditional measurements of time are based on the position of the Sun
and the other stars in the sky. These are the *solar time* and *sidereal
time* respectively. For example, noon is defined to be the time at which
the Sun is at its highest position, and midnight is defined to be twelve
hours after that.

Since the position of the Sun in the sky depends on geographical
location as well as the time of year, solar time is an impractical
measurement of time. Thus the development of *civil time* and of
*timezones*: that in a given region (such as a country or province), all
clocks should report the same value of time. The development of
timezones is based on political considerations rather than reflecting
astronomical phenomena: for example, the People's Republic of China uses
a single timezone despite its geographical span; and most Western
European countries use the same timezone.

All timezones are specified relative to *Coordinated Universal Time* (or
*UTC*), which is based on the time at Greenwich, London.


## Computers and distributed systems

Future post...
