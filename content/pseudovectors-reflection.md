Title: Pseudovectors and transformations
Date: 2025-09-25
Category: Physics
Tags: math, teaching
Slug: pseudovectors-reflection

Here are some notes for my Fluid Dynamics II students about vectors, pseudovectors and how they transform under reflections.

Let `n` be a unit vector and consider the reflection `R` in the plane perpendicular to `n`.

Quantities such as the position `r` and velocity `v` are regular vectors and transform in the obvious way under the reflection. Specifically, we write

    r = rn + rp
    v = vn + vp

where `rn` is the component of `r` parallel to `n`, `rp` is the perpendicular component; and similar for `vn` and `vp`. Then under the transformation `R` we have

    r' = R r = -rn + rp
    v' = R v = -vn + vp


However, now consider the angular momentum per unit mass `am = r * v`, using `*` to denote the cross product. Or indeed the angular velocity, which is the above divided by `|r|^2`.

We can expand out `am` explicitly in terms of `rn`, etc.:

    am = (rn + rp) * (vn + vp)
       = rn * vn + rp * vp + rn * vp + rp * vn
       = 0       + rp * vp + (rn * vp + rp * vn)
       =           amn     + amp

Here, the term `amn = rp * vp` is parallel to `n` since it is the cross product of two vectors that are perpendicular to `n`. And the term `amp = rn * vp + rp * vn` is perpendicular to `n` since each product involves a vector that is parallel to `n`.

When `r` and `v` are transformed, then `am` transforms as:

    am' = r' * v'
        = (R r) * (R v)
        = (-rn + rp) * (-vn * vp)
        = ...
        = rp * vp - (rn * vp + rp * vn) 
        = amn     - amp
        = amn'    + amp'

Thus the component of `am` that is parallel to `n` stays the same, while the component of `am` that is perpendicular to `n` is flipped. Thus the components of `am` transform in the opposite direction to how those of `r` and `v` transform – for it is a *pseudovector*.

In summary, under a reflection in a plane perpendicular to `n`...

```text
    of a vector...
        the component parallel      to n is flipped
                      perpendicular      stays the same
    of a pseudovector...
        the component parallel      to n stays the same
                      perpendicular      is flipped
```


(If you don't believe me, take a screw and a screwdriver and hold it up against a mirror.)
