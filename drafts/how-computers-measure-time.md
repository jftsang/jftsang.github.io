Title: How computers measure time
Date: 2025-04-27
Category: Software
Tags: data, math, physics
Slug: how-computers-measure-time

## How computers measure time

In most modern systems, time is stored as an `int64` number of
nanoseconds since some epoch, although it may also be presented as a
`float64` number of seconds. Python's `time` library offers both.

Most systems offer two clocks. One is persistent, continuing to count
when the system is powered down: this allows the computer to give an
absolute time since some epoch. This is usually the Unix Epoch, or just
*Epoch* (capitalized), defined as 00:00:00 midnight at 1 January 1970
UTC.

