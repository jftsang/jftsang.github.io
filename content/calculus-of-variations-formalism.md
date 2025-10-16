Title: But what does $\delta F = 0$ mean?
Date: 2025-10-16
Category: Physics
Tags: math, physics, teaching, calculus-of-variations
Slug: calculus-of-variations-formalism

The following discussion is meant to give some more formalism to students of the *Variational Principles* course and perhaps tie it to material that they might have come across in analysis or linear algebra courses.

*This page is a work in progress and may not be accurate; formulae may have mistakes or be improperly formatted. Use with care.*

---

A functional is a function of a function:
$$
F[y] = \int_a^b f(x, y, y')\, \mathrm{d}x
$$
We are concerned with scalar-valued functionals where $f$ and $F$ take real values. 

The idea is that $y$ lives in some function space $U$, e.g. differentiable functions on $(a, b)$. This $U$ is a vector space over $\mathbb{R}$ meaning that it is legal to write down expressions like $y = \lambda y_1 + \mu y_2$ where $\lambda, \mu \in \mathbb{R}$ are scalars. The expression $f(x, y, y')$ is arbitrary, and in general nonlinear. 

Then the functional $F: U \rightarrow \mathbb{R}$ is a function from a function space $U$ to $\mathbb{R}$. Our goal is to understand what it means to differentiate such functions in $U$.

## Differentiation in finite-dimensional vector spaces

We shall begin by considering a finite-dimensional vector space $V = \mathbb{R}^n$ and a scalar-valued function $\phi: \mathbb{R}^n \rightarrow \mathbb{R}$, and trying to understand what it means to differentiate $\phi$. 

When we consider the derivative of $\phi$ at a point $x$ we are really looking at what happens when the argument is changed by a small amount: the difference betwen $\phi(x + \epsilon n)$ and $\phi(x)$ in the limit $\epsilon\rightarrow0$. Here, $n$ is some vector that specifies the direction in which we are differentating. 

If $\phi$ is differentiable at $x$ in the direction of $n$, then we would expect that as $\epsilon\rightarrow0$,
$$
\phi(x + \epsilon n) = \phi(x) + g_n \epsilon + o(\epsilon)
$$
or equivalently (expanding the definition of the $o(\epsilon)$ notation)
$$
\lim_{\epsilon \rightarrow 0} \frac{\phi(x + \epsilon n) - \phi(x)}{\epsilon} =  g_n
$$
for some quantity $g_n$ that depends on $n$. That is, the variation in $\phi$ should be *linearly* proportional to $\epsilon$ at leading order. This is reminiscent of the definition of differentiability in one dimension: we are in fact looking at the function $\varphi(\epsilon) = \phi(x + \epsilon n)$ which is a function over the scalar variable $\epsilon$. 

For $\phi: \mathbb{R}^n \rightarrow \mathbb{R}$ it turns out we need a stronger condition: we actually need $g_n$ to be a linear function of the direction vector $n$ as well. Thus (by some linear algebra) there needs to be a vector $g$ such that $g_n = g \cdot n$ , and $g$ doesn't depend on $n$ (but may depend on $x$).

(Note that it is not enough for the partial derivatives along the coordinate axes to merely exist for $\phi$ to be differentiable.)

Absorbing $\epsilon$ into the magnitude of $n$, the definition of $\phi: \mathbb{R}^n \rightarrow \mathbb{R}$ being differentiable is that there needs to exist a vector $g$ such that for *any* direction $n$ we have
$$
\phi(x + n) = \phi(x) + g \cdot n + o\left(||n||\right)
$$
If such a $g$ exists, then we give it the notation $\nabla\phi$ and call it the *gradient* of $\phi$ at $x$. Its components are given by the partial derivatives $\nabla \phi_i = \partial \phi / \partial x_i$ along the coordinate axes. 

To look at stationary points of $\phi$, we look for places where the vector $\nabla\phi = 0$: that is, the change in $\phi$ along *any* direction $n$ needs to be sublinear, $o\left(||n||\right)$. 

## Function spaces

Back to our functional $F[y] = \int_a^b f(x, y, y')\, \mathrm{d}x$. Now the finite dimensional $V$ is replaced by an infinite dimensional function space $U$. But this is still a vector space, so notions such as "linear map" and "dot product" still apply, in disguised form.

### Inner products

The key idea is that we can define an inner product on $U$, between two functions $r, s \in U$:
$$
r \cdot s = \int_a^b r(x) \, s(x) \, \mathrm{d}x
$$
It can be shown that this satisfies the requirements to be an inner product over a vector space. Importantly, it is linear in each of $r$ and $s$. 

### Aside: Linear functionals

The converse is trickier. In the finite-dimensional case, we used the fact that any linear function of a vector $n$ must take the form $g \cdot n$ for some vector $g$. This is *not* the case in the space $U$: a scalar-valued linear functional $L[s]$ does not necessarily need to be $r \cdot s$ for some $r \in U$. Simple counterexample, function evaluation $L[s] = s(c)$ at some $c \in (a, b)$. 

In the finite dimensional case a vector space $V$ is isomorphic to $V^*$ and so we can identify $g$ as a member of $V$ corresponding to the map $n \mapsto g\cdot n$. The problem is that this is not the case in the function space $U$. See [Wikipedia](https://en.wikipedia.org/wiki/Dual_space#Continuous_dual_space) for further details.

It turns out that such difficulties can be overcome by introducing the concept of a [distribution](https://en.wikipedia.org/wiki/Distribution_(mathematical_analysis)) – including the ever-popular Dirac delta function, which is not actually a function but a distribution. In the example above, we could take $r(x) = \delta(x-c$) to get our functional for evaluating at $c$. 

### Norms and limits

The inner product also defines a norm on $U$, by
$$
||r|| = \left( \int_a^b r(x)^2 \,\mathrm{d}x \right)^{1/2}
$$
The point of the norm is that it now makes sense to talk about the "size" of $r$, and in particular, what it means to take a limit $r \rightarrow 0$ in the function space $U$. This also lets us write down a term like $o\left( ||r|| \right)$ to denote a quantity that is sublinear in $||r||$. 

## The variation $\delta F$

Now, we want to see what the "derivative" of $F[y]$ is at the "point" $y$, where a "point" $y \in U$ is a function. We call such a By analogy with the finite-dimensional case, we first consider the variation of $F$ along a certain "direction" $\eta$ – this direction is also a member of $U$. So we consider the behaviour of
$$
\Delta_y [\eta] = F[y + \eta] - F[y]
$$
in the limit $||\eta|| \rightarrow 0$ and we hope that this is, to leading order, linear in $\eta$.  

By standard derivations (expand and IBP) we get
$$
\begin{align}
\Delta_y [\eta] &= \int_a^b \left( 
  \frac{\partial f}{\partial y} - \frac{\mathrm{d}}{\mathrm{d}x} \left( 
      \frac{\partial f}{\partial y'} 
    \right)
\right) \, \eta \, \mathrm{d}x &+ o\left(||\eta||\right)  \\
  &= \int_a^b EL(x, y, y') \, \eta(x) \,\mathrm{d}x 
  &+ o\left(||\eta||\right) \\
  &= EL \cdot \eta &+ o\left(||\eta||\right)
\end{align}
$$
We observe that this is an inner product: the expression $EL(x, y, y')$ does not depend on $\eta$; and when we evaluate it at the "point" $y = y(x)$, this itself becomes a function of just $x$, written $EL(x)$. Thus $\Delta_y [\eta]$ is an inner product of $EL$ with $\eta$.

We write
$$
F[y + \eta] = F[y] + \delta F [\eta] + o\left(||\eta||\right)
$$
where $\delta F$ is that first-order approximation, and call it the *variation*. Note that it does depend on the "direction" of $\eta$. It also depends on $y$ but we usually don't write this explicitly.


### Stationary points

Again a stationary point of $F$ is defined to be a "point" $y$ where the change in $F$ is sublinear to the change in the argument.

If we require that $\Delta \eta = o\left(||\eta||\right)$ for all "directions" $\eta$ in the limit $||\eta||\rightarrow0$, this is equivalent (subject to caveats!) to requiring that $EL = 0$, which recovers us the Euler–Lagrange equation:
$$
\frac{\partial f}{\partial y} - \frac{\mathrm{d}}{\mathrm{d}x} \left( 
      \frac{\partial f}{\partial y'} \right) = 0
$$


## The second variation

### In finite dimensions
Going back to the finite-dimensional case, for our function $\phi$ over a finite dimensional domain to be twice differentiable, we need the correction to $\phi$ to be second-order in $\epsilon$, *i.e.*
$$
\phi(x + \epsilon n) = \phi(x) + (g \cdot n)\,\epsilon + S_n \epsilon^2 + o(\epsilon^2)
$$
for some quantity $S_n$ that, again, in general, depends on the direction $n$. It can be shown that $S_n$ actually needs to be a quadratic form, *i.e.*
$$
\phi(x + \epsilon n) = \phi(x) + (g \cdot n)\,\epsilon + ( n \cdot H \cdot n ) \, \epsilon^2 + o(\epsilon^2)
$$
for some symmetric matrix $H$ which we call the *Hessian*. Its values are given by the second partial derivatives along the coordinate axes, $H_{ij} = \partial^2f / (\partial x_i \partial x_j)$.

One sometimes writes $H = \nabla\nabla \phi$, especially in continuum mechanics. However it is incorrect to write $H = \nabla^2 \phi$ as this notation denotes the Laplacian, which is a scalar value; in fact $\nabla^2 \phi = \mathrm{trace}\, H$.


### For functionals

As for the second variation $\delta^2 F$, this means expanding to a second order approximation. That is, we suppose that
$$
F[y + \eta] = F[y] + \delta F [\eta] + \delta^2 F[\eta] + o\left(||\eta||^2 \right)
$$
for some functional $\delta^2 F[\eta]$ (again this implicitly depends on the $y$ where we are evaluating); and we insist that $\delta^2 F[\eta]$ is proportional to $||\eta||^2$. This is simply a generalisation of Taylor's theorem.

Expanding $F[y+\eta]$ to second order in $\eta$, we find that the second order correction gives us
$$
\delta^2 F[\eta] = \int_a^b (P \eta^2 + Q \eta'^2) \, \mathrm{d}x 
$$
for some functions $P$ and $Q$. We estimate the size of this functional by:
$$
||\delta^2 F[\eta]|| \leq (a-b)\left[||P|| \times||\eta||^2 + ||Q|| \times ||\eta'||^2 \right]
$$
This almost gives us what we want, but there is the problem that differentiation is an "unbounded" operation: the size of $||\eta'||$ can be large even in the limit $||\eta|| \rightarrow 0$. (Consider a very wriggly function.) So it is not necessarily the case that $||\eta'||^2$ is proportional to $||\eta||^2$. 

We ignore such pathologies, but the way to avoid this issue is to backtrack and work not in the limit of $||\eta||\rightarrow0$, but instead to let $\eta$ be a fixed "direction" and consider $F[y + \epsilon \eta]$ and take the limit $\epsilon\rightarrow0$; in that way one finds that
$$
F[y + \epsilon\eta] = F[y] + \delta F [\eta] \epsilon + \delta^2 F[\eta] \epsilon^2 + o\left(\epsilon^2 \right)
$$


## Local minimum

The second variation can now be used to show that $F$ takes a local minimum at a point $y$, if $\delta F = 0$. 

It is not easy and depends on the magnitude and sign of $P$ and $Q$ over the interval $(a, b)$, but if it can be shown that $\delta ^2 F[\eta] \geq 0$ for all $\eta$ then it follows that
$$
F[y + \epsilon\eta] = F[y] + \delta^2 F[\eta] \epsilon^2 + o(\epsilon^2) \geq F[y]
$$
for sufficiently small values of $\epsilon$. So $F[y]$ is a local minimum. Note that this does not tell us anything about the global behaviour. 