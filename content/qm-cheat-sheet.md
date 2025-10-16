Title: Quantum mechanics revision guide
Date: 2025-10-13
Category: Physics
Tags: physics, quantum-mechanics, teaching
Slug: qm-cheat-sheet


This page, which will be updated occasionally, summarises important results and useful formulae for the Part IB *Quantum Mechanics* course. 

---

## Vector spaces, inner products and duality

Let $V$ be an inner product space over $\mathbb{C}$. 

We use *ket* notation for vectors: $|\psi\rangle \in V$

The **inner product** between two vectors is notated as $\langle\phi|\psi\rangle$. This satisfies conjugate symmetry:
$$
\overline{\langle\phi|\psi\rangle} = \langle\psi|\phi\rangle
$$

Elements of the **dual space** $V^*$ use *bra* notation $\langle\phi|$ and this acts on $|\psi\rangle \in V$ by 
$$\langle\phi|: V \rightarrow \mathbb{C} : |\psi\rangle \mapsto \langle\phi|\psi\rangle$$

 Note $\langle \mathrm{bra}|\mathrm{ket}\rangle$  form a bra(c)ket.

It can be shown that $V$ and $V^*$ are isomorphic and that the isomorphism is "natural", *i.e.* does not depend on a choice of basis. Conjugate symmetry means that the *bra* corresponding to $\alpha|\psi\rangle$ is $\overline\alpha\langle\psi|$.  

## Linear operators and adjoints

**Linear operators** $L: V \rightarrow V$  acts on *kets* as $|\psi\rangle \mapsto L |\psi\rangle$. 

The **adjoint operator** $L^\dagger: V^* \rightarrow V^*$ acts on *bras* by $\langle\phi| \mapsto \langle\phi| L^\dagger$. 


By conjugate symmetry, $\overline{\langle\phi|L|\psi\rangle} = \langle\psi|L^\dagger|\phi\rangle$ . 

An operator is **self-adjoint** if 
$$
\langle\psi|L^\dagger|\phi\rangle = \langle\psi|L|\phi\rangle
$$
It is technically illegal to write $L = L^\dagger$ since $L$ is an endomorphism on $V$ but $L^\dagger$ is on $V^*$, but the inner product notation allows us to gloss over this (the two spaces are isomorphic).


**Properties of self-adjoint operators:**

* eigenvalues are real
* orthogonality of eigenvectors with different eigenvalues: if $L|m\rangle = \lambda_m|m\rangle$ and $L|n\rangle = \lambda_n|n\rangle$, and $\lambda_m \neq \lambda_n$, then $\langle m|n\rangle = 0$
* eigenvectors are complete

This means:
* we can use the eigenvectors as a basis
* we can pick the basis to be orthonormal, even if there is a repeated eigenvalue (Gram–Schmidt)

**Properties of orthonormal bases:**

Given an orthonormal basis $|n\rangle$ the dual basis on $V^*$ is $\langle n|$.

$$\langle m | n \rangle = \delta_{mn}$$

Projection (generalisation of Fourier coefficient formula):
$$
|\psi\rangle = \sum_n c_n|n\rangle \implies c_n = \langle n|\psi\rangle 
$$
Sometimes easier to work with non-normalised basis, in which case:
$$
c_n = \frac{\langle n |\psi\rangle}{\langle n | n \rangle}
$$

Conjugate symmetry:
$$
\langle\psi|= \sum_n \overline{c_n} \langle n|
$$

Inner products:
$$
\begin{align}
|\phi\rangle &= \sum_n b_n|n\rangle \\
|\psi\rangle &= \sum_n c_n|n\rangle \\
\implies \langle\phi|\psi\rangle &= \sum_n \overline{b_n} c_n
\end{align}
$$



## Principles of quantum mechanics


**States** are elements of an inner product space $V$ over $\mathbb{C}$.  
* finite dimensional: spin states
* infinite dimensional: wavefunctions, function spaces

A **normalised state** has $\langle\psi|\psi\rangle=1$ . Magnitudes and any overall phase $e^{i\varphi}$ always cancel out when calculating physical quantities. So states $|\psi\rangle$ and $c|\psi\rangle$ are equivalent for $c\in\mathbb{C}$.

**Observable quantities** correspond to self-adjoint linear operators:
* position $\mathbf{x}$ $\rightarrow$ position operator $\hat{\mathbf{x}}$
* momentum $\mathbf{p}$ $\rightarrow$ momentum operator $\hat{\mathbf{p}}$
* energy $E$ $\rightarrow$ Hamiltonian $\hat{H}$

%% * angular momentum $L_z$, $\mathbf{L}^2$ $\rightarrow$ $\hat{L_z}$, $\hat{\mathbf{L}}^2$ respectively
%%

These can be vector quantities but for 1D systems we can conflate $\mathbf{x}$ and $x$. Often drop the hats to simplify notation. 

**Eigenbasis:** For $L$ self-adjoint we have a complete set of eigenvectors $|n\rangle$ with corresponding eigenvalues $\lambda_n \in\mathbb{R}$ not necessarily distinct. Write
$$
|\psi\rangle = \sum_n c_n |n\rangle, \qquad c_n = \langle n|\psi\rangle.
$$
Normalisation implies
$$
\langle\psi|\psi\rangle = \sum_n |c_n|^2 = 1.
$$

Using the eigenbasis is nice because we can apply $L$ simply by multiplying each eigenstate by the corresponding eigenvalue:
$$
L|\psi\rangle = \sum_n c_n \lambda_n |n\rangle
$$

**Observations are probabilistic.**

* The possible results of an observation of $L$ are drawn from the eigenvalues $\lambda_n$ of $L$. 
* The probability of measuring $\lambda_n$ is given by **Born's rule**: $p(n) = |c_n|^2$. 
* If $\lambda_n$ is a repeated eigenvalue then each of these contributes a chance to measure that value.

Often easier to calculate with the non-normalised version of Born's rule:
$$
p(n) = \frac{|\langle n|\psi\rangle|^2}{\langle n|n\rangle \langle\psi|\psi\rangle}
$$

Note that the probabilistic interpretation leads to serious philosophical problems! So this can't be the full story, although its predictions agree with experiment. [Looking Glass Universe has an excellent video on this.](https://youtu.be/hIvuxx14zCk?si=tWbl6DESqfj-T8aQ) 

**Observations collapse the state.** 

The state changes instantaneously during an observation. If the result of the measurement is $\lambda_n$, then the state collapses onto its projection onto the corresponding eigenspace (up to normalization).

In particular, if $\lambda_n$ is non-degenerate (i.e. eigenspace has dimension 1) then the state after the measurement is $|n\rangle$.

This means that the state $|\psi\rangle$ isn't fully observable – because observations destroy information. (Again, there are serious problems with this interpretation.) 

Neither is any overall phase in $e^{i\varphi}|\psi\rangle$, since those phases cancel when you take quantities such as $\langle\psi|\psi\rangle$.  


## Time-evolution

Assume that time evolution is governed by a linear operator:
$$
|\psi(t)\rangle = U(t)|\psi(0)\rangle
$$
$U(0) = I$ must be the identity operator.

**Conservation of information** implies that orthogonal states need to remain orthogonal. This implies that $U(t)$ must be unitary, $U U^\dagger = U^\dagger U = I$.

Taking the limit $t \rightarrow 0$ we can write
$$
U(t) = I - \frac{i}{\hbar}t \hat{H} + O(t^2)
$$
for some self-adjoint operator $\hat{H}$ called the *Hamiltonian*.

$\hbar$ is the **reduced Planck constant**; it has units of angular momentum $\mathrm{kg\, m^2\, s^{-1}} = \mathrm{J \cdot s}$ and provides a conversion factor.  

Some algebra gives the **time-dependent Schrodinger equation**:
$$
i \hbar \frac{\mathrm{d}|\psi\rangle }{\mathrm{d}t}= \hat{H} |\psi\rangle
$$

The Hamiltonian $\hat{H}$ does not come from first principles but is chosen to match experimental results, and often by analogy to classical mechanics. 


## Energy states

Look for **energy eigenstates** by solving the **time-independent Schrodinger equation**:
$$
\hat H |\chi_n\rangle = E_n |\chi_n\rangle
$$

The corresponding time-dependent solution is separable: 
$$|\psi(t)\rangle = A e^{iE_n t/\hbar} |\chi_n\rangle$$
where $A\in\mathbb{C}$ is arbitrary (it cancels when we calculate observables).

Since eigenstates of $\hat H$ form a complete orthogonal basis, the overall solution may be written in the form
$$
|\psi(t)\rangle = \sum_n A_n e^{iE_n t/\hbar} |\chi_n\rangle
$$


## Commutators


**Commutator** of two operators:
$$
[A, B] = AB - BA
$$
**Commuting operators have a shared eigenbasis.** If $[A,B] = 0$ then it is possible to find an orthonormal basis $|n\rangle$ such that each $|n\rangle$ is an eigenvector of both $A$ and $B$. In other words the eigenspaces "line up" with each other.

Important commutator identities:

Linearity
$$
[A+B, C] = [A,C] + [B,C]
$$

Anticommutativity
$$
[B, A] = -[A, B]
$$

Products (Leibniz rule)
$$
\begin{align}
[A, BC] &= ABC - BCA \\
        &= ABC - BAC + BAC - BCA \\
        &= [A, B] C - B [A, C]
\end{align}
$$
Powers
$$
[A, B^n] = [A, B] B^{n-1} + B[A, B] B^{n-2} + \dots + B^{n-1}[A, B]
$$
If $[A, B]$ commutes with $B$ (e.g. is a constant):
$$
[A, B^n] = n B^{n-1}  [A, B]
$$
e.g. $[\hat{x}, \hat{p}^2] = 2i\hbar \hat{p}$

Jacobi identity:
$$
[A, [B, C]] + [B, [C, A]] + [C, [A, B]] = 0
$$

Canonical relations:
$$
[\hat{x}, \hat{p}] = i\hbar
$$
Angular momentum components (also spin)
$$
[L_i, L_j] = i\hbar\, \epsilon_{ijk} \,L_k
$$


More background: [[uncertainty-principle-and-spectrograms]], [[uncertainty-principle-obvious-to-musicians]].

measurement of $A$ $\implies$ state collapse to an eigenstate of $A$

If $[A, B] \neq 0$ then the resulting eigenstate is not an eigenstate of $B$



**Uncertainty** $\sigma_A^2 = (\Delta A)^2 = \langle A^2\rangle - \langle A\rangle^2$

**Uncertainty principle (general)** $\sigma_A \sigma_B \geq \frac{1}{2} \left|\langle [A, B]\rangle\right|$

**Position-momentum** $\sigma_x \sigma_p \geq \frac{1}{2}\hbar$


## Particle in a 1D potential, QHO

For a *classical* particle of mass $m$ in a 1D potential, the energy is
$$
E = \frac{p^2}{2m} + V(x, t)
$$
where $p$ is the momentum and $V$ is the potential. (In general $V$ may be a function of $t$, but usually is not in problems that we solve.)


**Quantum harmonic oscillator:**
$$
\hat H = \frac{\hat{p}^2}{2m} + \frac{1}{2}m\omega^2 \hat{x}^2
$$

TISE:
$$
E\psi= \frac{-\hbar^2}{2m} \frac{d^2\psi}{dx^2} + \frac{1}{2}m\omega^2 {x}^2 \psi
$$
Scales: 
$$
\begin{align}
& E \sim \frac{\hbar^2}{m r^2} \sim m\omega^2 r^2 \\
\implies &
E \sim \hbar\omega, \quad r \sim \left(\frac{\hbar}{m\omega}\right)^{1/2}
\end{align}
$$

Nondimensional form:
$$
E\psi = \frac{-1}{2}\frac{d^2\psi}{dx^2} + \frac{1}{2}x^2\psi
$$
Look for solutions of the form 
$$
\begin{align}
\psi(x) &= f(x) \, e^{-x^2/2} \\
\psi'(x) &= \left(f'(x) - x f(x)\right) \,  e^{-x^2/2} \\
\psi''(x) &= \left(f''(x) - 2xf(x) + (x^2 - 1) f(x)\right) \,  e^{-x^2/2}
\end{align}
$$ 
Frobenius solution + convergence $\implies$ 
$$
E = n + \frac{1}{2} \qquad n = 1, 2, 3, \dots
$$
with $f$ a polynomial of degree $n$. 

**Ladder operators**

## Hydrogen atom

**Spherical harmonics**
$$
Y_l^m(\theta, \varphi) = N e^{im\varphi} \, P_l^m(\cos\theta)
$$
$$
l = 0, 1, 2,\dots, \quad m =-l, -l+1, \dots, l
$$
where $N$ is a normalisation and $P_l^m$ is an associated Legendre polynomial (not actually a polynomial!)

**Spherical harmonics are simultaneous eigenfunctions** of $\hat{\mathbf L}^2$ and $\hat{L}_z$ obeying
$$
\hat{\mathbf L}^2 Y_l^m = \hbar^2 \, l (l+1) \, Y_l^m \qquad \hat{L}_x Y_l^m = \hbar\, m \,Y_l^m
$$

These operators also commute with $\hat{H}$ when the potential is spherically symmetric.