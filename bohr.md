# Background on the Bohr model

J. M. F. Tsang
Michaelmas 2023

---

This document is intended to give a little contexj behind the "Bohr
model" that is introduced in the first Quantum Mechanics sheet.

---


## Background

Like all atomic models, the Bohr model attempts to answer the question
"Why do atoms exhibit the properties that they do?", proposing a
mechanical or mathematical description that can produces calculable
predictions that are to be compared against experiment.  Presented in
1913 by Niels Bohr and Ernest Rutherford, this model sought to reconcile
a few recent observations in atomic physics:

* Atoms were known to be able to absorb and emit light, but the spectrum
    of the emitted light consisted of discrete wavelengths. The values
    of these wavelengths are described experimentally by the Rydberg
    formula (1888). For hydrogen, this formula states:

    $$ 1/\lambda = R_H ( 1/n_1^2 - 1 / n_2^2 ) $$

    where $n_1$ and $n_2$ are integers and $R_H$ is a constant.

    Rydberg had no knowledge of electrons (discovered by J. J. Thomson
    in 1897) and gave no physical basis for this experimental law.

* Max Planck (1900), from his work on black-body radiation, had
    postulated that electromatgnetic radiation was conveyed in discrete
    quanta of energy, called photons; the energy of a photon was related
    to its frequency and wavelength by

    $$ E = h f = h c / \lambda $$

    where Planck's constant $ h = 2\pi\hbar $ is an experimental
    constant.

    Planck had little justification for the idea that light was
    quantized, but it proved to produce accurate predictions for the
    spectrum of black-body radiation. Albert Einstein's 1905 work (for
    which he won the 1921 Nobel Prize) gave experimental confirmation of
    the quantization of light into photons.

§§* The Geiger–Marsden gold leaf experiments (1908 onwards)
    established that atoms consist of a heavy central nucleus of
    positive charge, surrounded by a diffusion of negatively charged
    electrons, orbiting the central charge. Rutherford gave a
    mathematical description (1911), although Joseph Larmor (1897) had
    previously proposed such a 'solar system' model.

Further back, physicists had established the laws of electromagnetism
and electromagnetic radiation (Maxwell 1862), and chemists had known, at
least experimentally, of the regular orbital structure elegantly
illustrated in the periodic table (Mendeleev 1869).


## A new model

A major shortcoming of the 'solar system' model proposed by Larmor and
Rutherford was that it was incompatible with the laws of electromagnetic
radiation, which predicted that an accelerating charge would emit
radiation, causing the electrons to lose energy and to spiral in towards
the nucleus.

Bohr's model supposes that, for unspecified reason, the electron does
not lose energy from radiation.  Instead, energy is allowed to change
only through instantaneous absorption and emission events that move the
electron from one energy level to another.

Moreover, the energy is not allowed to take any arbitrary value.
Observing that the Planck constant has dimensions of angular momentum,
Bohr's model requires that the angular momentum of the electron must
have angular momentum equal to an integer multiple of the reduced Planck
constant:

$$ m v r = n \hbar = n h / 2\pi . $$

This condition had recently been proposed by Nicholson (1912). Combined
with Coulomb's law for electric attraction, the energy of the $n$th
level is predicted to be (exercise):

$$ E_n = -R_E / n^2 $$

where $R_E$ is a constant. This inverse square law is entirely
consistent with the atomic emission spectra described by the Rydberg
formula, which stated that the inverse-wavelengths of emitted photons
were differences between inverse squares.


## Further developments

The Bohr model successfully explains the Rydberg formula and unifies it
with the Rutherford model of a nucleus; and predicts that emissions come
in discrete packets of energy, although without making reference to
photons. The problem, however, is how to motivate the new assumptions
about the quantization of angular momentum, and to reconcile the
electron acceleration with the laws of electrodynamics.

De Broglie (1924) proposed that the wave-duality duality of light might
apply also to matter, proposing the formula

$$ \lambda = h / p $$

for the wavelength $\lambda$ for a particle with momentum $p$.
Experimental confirmation for the wavelike nature of electrons came from
the diffraction and double-slit experiments conducted throughout the
1920s.

Under this framework, de Broglie reinterpreted the quantization
condition in the Bohr model as requiring that an electron's waves be
standing waves. The electron has momentum $ mv $ and executes orbits of
circumference $2 \pi r$, so the condition $mvr = n\hbar$ asserts that
the wavelength evenly divides the circumference of the orbit.

