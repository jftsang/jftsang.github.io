Title: Historical and philosophical contexts of the calculus of variations
Date: 2023-12-19
Category: Teaching
Tags: physics, teaching
Slug: calculus-of-variations-history


## What is a variational principle?

A variational principle is a mathematical or physical law expressed in terms of maximising or minimising a certain quantity. The simplest example was known to ancient Egyptian builders and surveyers: a taut rope stretched between two points takes the shape that minimises its length. This is in fact a straight line on the plane, although Ptolemy (2nd century AD) observed that one must correct for 'deviations from a straight course'. (Which is not to say that he had the concepts of geodesics or Riemannian metrics.) Note, however, that these two statements have different statuses: the variational statement 'a taut rope stretched between two points takes the shape that minimises its length' by itself makes no assertions about straight or curved lines.

These are other examples of variational statements:

-   _The geodesic problem:_ The shortest length between two points on a sphere can be found by stretching a taut rope around the sphere through those two points.
-   _The catenary problem:_ A hanging chain takes a shape that minimises its potential energy.
-   _The isoperimetric problem (Dido's problem):_ For a given perimeter, the area enclosed by that perimeter is maximised by taking as round and convex a shape as possible --- namely, a circle.
-   _Bubble shape:_ A pressurised container, such as a soap film or balloon, takes a shape that minimises its surface energy. For bubbles, that's a sphere.
-   _Temperature distribution:_ If the surface of a body is kept at a time-independent temperature, then the temperature distribution within the body takes minimal gradient. In particular, if the surface is at constant temperature, then the temperature is constant throughout the body In modern notation, if $T$ solves $\nabla^2T = 0$ then $T$ minimises $\iiint |\nabla T|^2 \mathrm{d}V$, which is solved by constant $T$ if the boundary conditions are homogeneous.

## What is the calculus of variations?

To convert these variational statements into mathematical statements (usually differential equations), the calculus of variations was gradually developed throughout the 17th and 18th centuries. Leibniz, Huygens and Johann Bernoulli solved the catenary problem in 1691, while Newton solved the brachistochrone problem and the minimal resistance problem _possibly_ using variational methods \[[ref]As with much of Newton’s other works, the publications used geometric arguments, and did not reveal his actual heuristics.[/ref]\]; but it was Euler and his student Lagrange who presented the general calculus of variations as it is usually taught today. In the late 1890s, Weierstrass placed the calculus of variations onto the theoretical foundations of analysis; further work by the likes of Hilbert and Noether in the 20th century saw the topic become part of a wider interest into boundary value problems, motivated by developments in quantum mechanics.

Using the calculus of variations, it can be shown that a variational statement such as 'a hanging chain minimises its potential energy' is _mathematically_ equivalent to reasoning 'from first principles', using force-balance arguments on infinitesimal line elements. (Likewise with the surface shape of a balloon.) But although the two formulations predict the same results, they are dissimilar in their starting points. The force-balance approach looks at individual elements of the chain and constructs a differential equation describing their shape. On the other hand, the variational approach makes a statement about the overall shape of the chain, as a whole: in particular, it makes no postulates about the existence of infinitesimal elements. Such variational descriptions ('the solution minimises a particular quantity') are attractive in their simplicity, even though they do not give the solutions themselves without the heavy machinery of the calculus of variations.

## Optics and Fermat's principle

A particular variational principle with a long history comes from optics. In his study of geometric optics, Euclid made the assertion that light travels in straight lines, based on the observation that one needs a direct line of sight to see an object. The path of light therefore obeys the **shortest path principle**, like a taut piece of string. Hero of Alexandria (c. 10--70 CE) studied the reflection of images off mirrors, making the observation that the angle of reflection is equal to the angle of incidence, and showed that this was also consistent with the shortest path principle.

Centuries later, in the 980s the Islamic mathematician Ibn Sahl described _on an empirical basis_ the law of refraction (Snell's law) governing the angles at which light moving from one material to another is refracted. The indices of refraction of various materials were known to mediaeval Muslim scientists; it was not until the 1600s that European scientists such as Snellius claimed the discovery of this law of refraction.

The fact that refracting light does not travel in a straight line contradicts the shortest path principle. In a 1662 letter, Pierre de Fermat instead proposed a _principle of minimal time_, suggesting (on no experimental or theoretical basis) that the refractive index of a material is related to the finite speed of light in that material, with light being slower in denser materials.

There was no doubt that Fermat's principle was consistent with experiment, but it prompts two natural questions: _why?_ and _how?_. Fermat was criticised by the prevalent Cartesian school on these two grounds. Firstly, the assumptions that the speed of light is finite and different in different materials was unjustified. (Early experimental evidence for this was not available until 1676. That said, Fermat's claim was no more unjustified than René Descartes' very popular claims that light travelled at infinite speed, and was faster in denser material.) But a more fundamental criticism of the principle of minimal time was that it is _teleological_: why does light 'choose' to take a time-minimising path, and how does it 'know' how to find the correct path in advance? Why should it 'choose' to minimise travel time and not some other quantity such as distance? Claude Clerselier, a Cartesian critic of Fermat, wrote:

> The principle which you take as the basis for your proof, namely that Nature always acts by using the simplest and shortest paths, is merely a moral, and not a physical one. It is not, and cannot be, the cause of any effect in Nature.

In other words, despite the empirical support for Fermat's principle, it was not accepted as an _explanation_ of Snell's law, merely an elegant expression. We can now justify Fermat's principle and Snell's law from more fundamental ideas about light's wavelike properties, but that knowledge would not come for another two centuries.

## Particle mechanics and the principle of least action

The discomfort felt from using a mathematically simple, yet apparently teleological, variational principle is most obvious from the principle of least action. The principle of least action states that a conservative system (such as a particle in a potential) evolves in such a way that a certain quantity $S$, 'the action', is minimised. The action is the integral over time of a quantity $L$ called the Lagrangian.

Newton's _Principia_ was published in in 1687. Despite some initial controversy of their own, Newton's ideas had become accepted by the time of Maupertuis and Euler. Newton's formulation of particle mechanics, including the law of motion $F = ma$ and the inverse square law for gravitation, gives a mathematical foundation for Kepler's (empirical) laws of planetary motion.

An important development came in the 1740s with the development of the principle of least action by Pierre Louis Maupertuis and Leonhard Euler. Maupertuis defined action $S$ as an 'amount of motion': for a single particle, action is momentum mv multiplied by the distance s travelled; for constant speed, $s = vt$, so the action is $S = mv^2t$. In the absence of a potential, this matches our modern definition of action, up to a factor of 2. (Maupertuis referred to the quantity $mv^2$ as the _vis viva_, or 'living force', of the particle.) Studying the velocities of two colliding bodies before and after collision, Maupertuis showed that the law of conservation of momentum (by now well-established) is equivalent to the statement that the final velocities are such that the action of this process is minimised.

Euler is generally credited with inventing the calculus of variations in an early form, applying it to studying particle trajectories. (The modern form was later developed by Lagrange, his student, in 1755.) Euler generalised Maupertuis' definition of action into the modern action integral, and included a new term for potential energy. He showed in 1744 that a particle subject to a central force (such as planetary motion) takes a path (calculated by Newton) that extremises this action, and vice-versa. Lagrange later showed more generally that the principle of least action is mathematically equivalent to Newton's laws.

But why is this a sensible definition of action? In fact, what is action?

Maupertuis' reasoning was that 'Nature is thrifty in all its actions', positing that action is a sort of 'effort'. He was happy to attribute the principle of least action as some sort of God trying to minimise the effort of motions in the universe. But how does one know to choose this definition of action and not some other? As for refraction, why does one minimise travel time and not distance? Maupertuis argues that one cannot know to begin with, but that the correct functional needs to be identified.

Fermat and Euler took a rather weaker view, and refuse to make any metaphysical interpretations about their variational principles. Fermat stated that his principle is 'a mathematical regularity from which the empirically correct law can be derived' (Sklar 2012): this is an aesthetic statement about the theory, but says nothing about its  
origins.

## Why do we find the principle of least action problematic?

Everyone agrees that the principle of least action is mathematically equivalent to Newton's laws of motion, and both have equivalent status when compared against experiments. However, Newton's laws are specified as differential equations with initial values ('start in this state, and forward-march in time, with no memory about your past and no information about your future'). In contrast, the principle of least action is formulated as a boundary value problem ('get from A to B in time T, accumulating as little action as possible'), governed by the Euler–Lagrange equations. Why are we less comfortable with the latter?

A boring argument is the cultural or educational argument: most of us are taught Newtonian mechanics before Lagrangian mechanics. This is reasonable, as the former requires far less mathematical machinery.

One reason is the question: Given that we are at the initial position A, how can we know that we will be at B after time T? This can be resolved by realising that when we solve the Euler–Lagrange equations, we have not been told what the initial velocity is, and have the freedom to choose it such that the final position will be B. Thus, one can convert between an IVP and a BVP: this is the approach taken with the shooting method for solving BVP numerically.

Another reason perhaps is cultural: most of us are taught Newtonian physics before Lagrangian physics. This is paedagogically reasonable: the Newtonian formulation requires far less mathematical machinery. There is also a technical reason for feeling more comfortable with describing physics through an IVP than a BVP: according to the Picard–Lindelöf theorem, an IVP is guaranteed to have a unique solution, at least for a finite domain; a similar guarantee cannot be made for a BVP.

## Acknowledgements

The above essay has been guided by Lawrence Sklar's book, _Philosophy and the Foundations of Dynamics_.