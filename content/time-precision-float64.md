Title: Storing times, and precision of float64
Date: 2025-09-26
Category: Software
Tags: data, math, physics
Slug: time-precision-float64

This is the second article about how working with temporal information in computer systems. [The first article](date-time-and-timezones) was about contained some definitions about astronomical time and timezones. 

This article describes options for storing temporal values in your programs, and their limitations. In particular, it describes two pitfalls that can happen when working with floating-point representations for times.


## Numeric data types

Computers have a number of ways to represent numerical values, each with their uses. Two most important formats for us are `int64` and `float64`. Both use 64 bits (8 bytes) to store values. They are the most commonly used in modern systems for general-purpose computations in which memory is not at a premium, and are widely supported across major programming languages.

Further notes on [Wikipedia](https://en.wikipedia.org/wiki/Data_type#Numeric_types).

### Integers

`int64` uses a binary (base 2) representation to encode an integer value between `-2^32` and `2^32 - 1` inclusive – that is, between `-18446744073709551616` and `18446744073709551615`. Positive numbers (and zero) are stored in the obvious way, and negative numbers are usually encoded using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement). 

### Floating-point values

Fractional values are most commonly stored using a *floating-point representation*. Numbers are represented in the "scientific" form 

	x = s * (1 + m) * 2**e
    
where:
* the *sign bit* `s in {-1, 1}` specifies the sign of the number;
* the *mantissa* `0 <= m < 1` specifies the fractional part of the significand in base 2; and
* the *exponent* `e in range(-1022, 1024)` is an integer that determines the scale of the number.

The mantissa is stored using 52 bits, the exponent with 11, so alongside the sign bit, that makes 64 bits in total. Details on [Wikipedia](https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64). 

The term `1 + m` is called the *significand*, containing the significant figures of the number: this is a number in the interval `1 <= 1 + m < 2`. "Floating point" refers to the fact that the decimal (binary?) point may be moved to different locations by modifying the exponent. 

This representation confers certain performance advantages: for example, to multiply two floats one simply multiples the two mantissae and adds the two exponents. Details about floating-point arithmetic on [Wikipedia](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Floating-point_operations). 

*(The numbers that are represented in the form above are the so-called "normal numbers". There are also a number of special values such as subnormal numbers, zeros, `inf` and `nan`, which I won't talk here; although `nan` plays an important role in representing missing or unknown values.)*


## Precision limitations on floats

Details can be found on Wikipedia, but for us, the most important observations are the following:
* The exponent term `2**e` allows both very large and very small numbers to be represented. 
* The mantissa is stored using 52 bits, which means that the maximum precision of a floating-point number is 53 significant figures (in base 2) – the extra significant figure coming from the `1 + ` term.
* 53 bits of significance corresponds to about 16 digits; so the maximum precision in decimals is about 16 digits. (Actually between 15 and 17 digits depending on the exact values of `m` and `e`.)
* This relative precision is independent of `e`. However, the absolute precision does depend on `e` – the larger the number, the worse the absolute precision.


## Traps with Unix time

%%The danger of using `float64` for Unix time%%

The fact that the number of significant figures is limited to about 16 digits 

%%Most systems offer two clocks. One is persistent, continuing to count
when the system is powered down: this allows the computer to give an
absolute time since some epoch. This is usually the Unix Epoch, or just
*Epoch* (capitalized), defined as 00:00:00 midnight at 1 January 1970
UTC.%%

