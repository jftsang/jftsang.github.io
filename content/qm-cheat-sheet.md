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

The **inner product** between two states is notated as $\langle\phi|\psi\rangle$. This satisfies conjugate symmetry:
$$
\overline{\langle\phi|\psi\rangle} = \langle\psi|\phi\rangle
$$

Elements of the **dual space** $V^*$ use *bra* notation $\langle\phi|$ and act on $|\psi\rangle \in V$ by 
$$\langle\phi|: V \rightarrow \mathbb{C} : |\psi\rangle \mapsto \langle\phi|\psi\rangle$$

 Note $\langle \mathrm{bra}|\mathrm{ket}\rangle$  form a bra(c)ket.

Conjugate symmetry means that the *bra* corresponding to $\alpha|\psi\rangle$ is $\overline\alpha\langle\psi|$. 

## Linear operators and adjoints

**Linear operators** $L: V \rightarrow V$  apply to *kets* as $|\psi\rangle \mapsto L |\psi\rangle$. 

The **adjoint operator** $L^\dagger: V^* \rightarrow V^*$ acts on *bras* by $\langle\phi| \mapsto \langle\phi| L^\dagger$. 


By conjugate symmetry, $\overline{\langle\phi|L|\psi\rangle} = \langle\psi|L^\dagger|\phi\rangle$ . 

An operator is **self-adjoint** if 
$$
\langle\psi|L^\dagger|\phi\rangle = \langle\psi|L|\phi\rangle
$$
It is technically illegal to write $L = L^\dagger$ since $L$ is an endomorphism on $V$ but $L^\dagger$ is on $V^*$, but the inner product notation allows us to gloss over this.


**Properties of self-adjoint operators:**

* eigenvalues are real
* orthogonality of eigenvectors with different eigenvalues: if $L|m\rangle = \lambda_m|m\rangle$ and $L|n\rangle = \lambda_n|n\rangle$, and $\lambda_m \neq \lambda_n$, then $\langle m|n\rangle = 0$
* eigenvectors are complete

This means:
* we can use the eigenvectors as a basis
* we can pick the basis to be orthonormal, even if there is a repeated eigenvalue (Gram–Schmidt)

Orthonormality: $\langle m | n \rangle = \delta_{mn}$


## Principles of quantum mechanics


**States** are elements of an inner product space $V$ over $\mathbb{C}$.  
* finite dimensional: spin states
* infinite dimensional: wavefunctions, function spaces

Magnitudes and overall phase $e^{i\varphi}$ always cancel out when calculating physical quantities, so wlog can assume that states are normalised $\langle\psi|\psi\rangle=1$ .

**Observable quantities** correspond to self-adjoint linear operators:
* position $\mathbf{x}$ $\rightarrow$ position operator $\hat{\mathbf{x}}$
* momentum $\mathbf{p}$ $\rightarrow$ momentum operator $\hat{\mathbf{p}}$
* energy $E$ $\rightarrow$ Hamiltonian $\hat{H}$

%% * angular momentum $L_z$, $\mathbf{L}^2$ $\rightarrow$ $\hat{L_z}$, $\hat{\mathbf{L}}^2$ respectively
%%

These can be vector quantities but for 1D systems we can conflate $\mathbf{x}$ and $x$. Often drop the hats to simplify notation. 

**Eigenbasis:** For $L$ self-adjoint we have a complete set of eigenvectors $|n\rangle$ with corresponding eigenvalues $\lambda_n \in\mathbb{R}$ not necessarily distinct. Completeness means we can pick an orthonormal basis and write
$$
|\psi\rangle = \sum_n c_n |n\rangle, \qquad c_n = \langle n|\psi\rangle.
$$
The corresponding dual is
$$
\langle\psi| = \sum_n \overline{c_n} \langle n|.
$$

Normalisation implies
$$
\langle\psi|\psi\rangle = \sum_n |c_n|^2 = 1.
$$

Using the eigenbasis is nice because we can apply $L$ simply by multiplying:
$$
L|\psi\rangle = \sum_n c_n \lambda_n |n\rangle
$$

**Observations are probabilistic.**

* The possible results of an observation of $L$ are drawn from the eigenvalues $\lambda_n$ of $L$. 
* The probability of measuring $\lambda_n$ is given by Born's rule: $p(n) = |c_n|^2$. 
* If $\lambda_n$ is a repeated eigenvalue then each of these contributes a chance to measure that value.

**Observations collapse the state.** 

The state changes instantaneously after an observation. If the result of the measurement is $\lambda_n$, then the state collapses onto its projection onto the corresponding eigenspace (up to normalization).

In particular, if $\lambda_n$ is non-degenerate (i.e. eigenspace has dimension 1) then the state after the measurement is $|n\rangle$.


## Time-evolution

Assume that time evolution is governed by a linear operator:
$$
|\psi(t)\rangle = U(t) |\psi(0)\rangle
$$
$U(0) = I$ must be the identity operator.

**Conservation of information** implies that orthogonal states need to remain orthogonal, and more generally, inner products need to be conserved. This implies that $U(t)$ must be unitary, $U U^\dagger = U^\dagger U = I$.

Taking the limit $t \rightarrow 0$ we can write
$$
U(t) = I - \frac{i}{\hbar}t \hat{H} + O(t^2)
$$
for some self-adjoint operator $\hat{H}$ called the *Hamiltonian*.

The quantity $\hbar$ is the reduced Planck constant; it has units of angular momentum and provides a conversion factor.  

Some algebra/calculus then gives the **time-dependent Schrodinger equation**:
$$
i \hbar \frac{\mathrm{d}|\psi\rangle }{\mathrm{d}t}= \hat{H} |\psi\rangle
$$

The form of the Hamiltonian $\hat{H}$ does not come from first principles but is chosen to match experimental results and to have analogy (inspiration?) with classical mechanics. 

For non-relativistic particles in a potential, the Hamiltonian may be constructed by direct analogy with classical mechanics.

## Energy states

Look for **eigenstates** of $\hat H$ by solving the **time-independent Schrodinger equation**:
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


## Uncertainty principle and commutators

More background: [[uncertainty-principle-and-spectrograms]], [[uncertainty-principle-obvious-to-musicians]].

The **commutator** of two operators is:
$$
[A, B] = AB - BA
$$
**Commuting operators have a shared eigenbasis.** If $[A,B] = 0$ then it is possible to find an orthonormal basis $|n\rangle$ such that each $|n\rangle$ is an eigenvector of both $A$ and $B$.



## Particle in a 1D potential

For a *classical* particle of mass $m$ in a 1D potential, the energy is
$$
E = \frac{p^2}{2m} + V(x, t)
$$
where $p$ is the momentum and $V$ is the potential. (In general $V$ may be a function of $t$, but usually is not in problems that we solve.)



$$
\hat H = \frac{\hat{p}^2}{2m} + \frac{1}{2}m\omega^2 \hat{x}^2
$$

Schrodinger equation:
$$
E\psi= \frac{-\hbar^2}{2m} \frac{d^2\psi}{dx^2} + \frac{1}{2}m\omega^2 {x}^2 \psi
$$
