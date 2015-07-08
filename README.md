Matrix Rotator
===========

Write the **rotate** method of the **MatrixRotator** class that accepts one argument, **direction**.  
**rotate** must set the object's **matrix** property with a new, rotated matrix.

Rotating a matrix clockwise will rotate every element to it's clockwise position.

example matrix rotation:
original
```
a b c
d e f
g h i
```

rotated clockwise (_CW_)
```
g d a
h e b
i f c
```

rotated clockwise (_CW_) once more
```
i h g
f e d
c b a
```

## Advanced Implementation

`MatrixRotator.rotate` will accept an optional second argument.

The default (omitting the second argument) is to maintain the original rotating behavior (rotate all layers).

The second argument will determine which 'layer' will be rotated.

A layer is the set of elements belonging to the same distance from the center.

Example, the values are what 'layer' that position belongs to:

```
3 3 3 3 3 3
3 2 2 2 2 3
3 2 1 1 2 3
3 2 1 1 2 3
3 2 2 2 2 3
3 3 3 3 3 3
```

If the second argument is set, only that layer should be rotated.

If the second argument is a value below `1` or greater than `'radius' + 1` throw a RangeError

## 2Advanced Implementation

Create a new MatrixRotator method named 'rotateStep' that accepts 2 arguments

- `direction` : String (allowed values are `Direction.CW` and `Direction.CCW`)
- `layer` : Number (allowed range is 1 - [radius of matrix])

When rotateStep is invoked, the values in the matrix will be rotated one 'step' at a time.

Example, initial matrix:

```
a b c d e f
g h i j k l
m n o p q r
s t u v w x
y z 1 2 3 4
5 6 7 8 9 0
```

invoking `MatrixRotator.rotateStep( Direction.CW, 3 );`

```
g a b c d e
m h i j k f
s n o p q l
y t u v w r
5 z 1 2 3 x
6 7 8 9 0 4
```

(continuing from last step) invoking `MatrixRotator.rotateStep( Direction.CCW, 2 );`

```
g a b c d e
m i j k q f
s h o p w l
y n u v 3 r
5 t z 1 2 x
6 7 8 9 0 4
```

If the first argument is an invalid value (not one of `Direction.CW` or `Direction.CCW`) throw an `Error` with a descriptive message.

If the second argument is a value below `1` or greater than `'radius' + 1` throw a `RangeError` with a descriptive message.

## Install dependencies

```
npm i
```

## Run tests

Make the tests pass.

```
npm test
```
