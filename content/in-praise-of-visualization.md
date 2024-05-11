Title: In Praise of Visualization
Date: 2024-05-11
Category: Software
Tags: simulation, physics, project-management

A little investment into building a GUI for live visualizations and
control provides huge improvements in iteration speed.

I recently came across the excellent video [Coding Adventure: Simulating Fluids](https://www.youtube.com/watch?v=rSKMYc1CQHE)
wonderfully explained by [Sebastian Lague](https://github.com/SebLague).
The video walks through the steps to build a simple smoothed particle
hydrodynamics simulation from nothing, in C#.

It brings back some sweet memories to my days as a research student
doing discrete particle model simulations using [MercuryDPM](https://www.mercurydpm.org/)
and there are many practical lessons that I wish I had known when I
first started. The one that stuck out the most was actually one that
Lague glossed over: the power of visualisation and the massive returns
that even a simple user interface gives.

The most dull and most frustrating aspect of my computational work was
undoubtedly the parameter studies to tune parameters such as time step
or particle stiffness. Poorly-chosen values do not *immediately*
cause problems; your simulation will crank along seemingly fine for
several minutes before blowing up, or having `nan`s everywhere).

I didn't have a good visualization system at the time (MercuryDPM does
provide options for loading results into visualization software, but it
isn't live) and this hugely slowed down my iteration cycles. Neither did
I have a GUI for modifying parameters. So, my iterations were
rate-limited by my ability to load files into gnuplot or investigate
them manually.

I'm now mostly not working on simulations, instead working almost
full-time in data engineering. The lesson around visualization is the
same, though: even a simple GUI can give a lot of insight and control
over what is otherwise a black box system, allowing faster iterations.

Visualization systems, like other pieces of "infrastructure" such as
testing frameworks, do not *per se* produce results, and so are often
overlooked or disincentivised in environments that prioritize rolling
out a product or result (proverbially, "moving fast and breaking
things"), especially research environments. I have been guilty of this
myself, but Sebastian's video clearly demonstrates that introducing even
a small amount of interactivity can be very powerful when guiding one
towards building reliable software and choosing sensible parameters. I
wish I had been a stronger advocate of this as a junior researcher or
engineer.

Perhaps building a GUI is easiest in a language like C# or JavaScript.
<small>(I have no experience with the former.)</small> I have yet to
find a GUI framework in Python that isn't either overly restrictive or
horribly low-level. Jupyter notebooks offer some hope in this area, but
I might look into PyGame.
