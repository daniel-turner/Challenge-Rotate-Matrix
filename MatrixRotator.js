/*  MatrixRotator(matrix)
 *
 *  @param matrix                        a multidimensional array containing the matrix
 *
 *  @public property matrix              the matrix
 *
 *  @public method rotate(direction)     direction is either
 *                                       Direction.CW or Direction.CWW
 *        @returns the rotated matrix
 */
exports.MatrixRotator = MatrixRotator;
var Direction = require("./Direction").Direction;

function MatrixRotator(matrix){

  this.matrix = matrix;

  this.validateInputs =  function(direction, radius) {

    if(direction !== Direction.CW && direction !== Direction.CCW) {

      throw new Error("MatrixRotator did not receive a valid direction.");
    }

    if(radius === undefined) {

      radius = 0;

    } else if(!(radius > 0 && radius <= Math.floor(this.matrix.length / 2))) {

      throw new RangeError("MatrixRotator received an invalid radius");
    }

    if(typeof radius !== "number") {

      throw new TypeError("MatrixRotator did not receive a number as radius");
    }

    return radius;
  };

  this.populateColumns =  function(matrix) {

    var tempColumns = [];

    matrix.forEach(function(row) {

      tempColumns.push([]);
    });

    for(var i = 0; i < matrix.length; i++) {

      for(var j = 0; j < matrix[i].length; j++) {

        tempColumns[i].push(matrix[j][i]);
      }
    }

    return tempColumns;
  };

  this.isInOuterBox = function(indexI, indexJ, validStartIndex, validEndIndex) {

    if( indexI >= validStartIndex &&
        indexI <= validEndIndex &&
        indexJ >= validStartIndex &&
        indexJ <= validEndIndex) {

      return true;

    } else {

      return false;
    }
  };

  this.isInInnerBox = function(indexI, indexJ, invalidStartIndex, invalidEndIndex) {

    if(invalidStartIndex > invalidEndIndex) {

      return false;
    }

    if( indexI >= invalidStartIndex &&
        indexI <= invalidEndIndex &&
        indexJ >= invalidStartIndex &&
        indexJ <= invalidEndIndex) {

      return true;

    } else {

      return false;
    }
  };
};

//                                         |-- Must be Direction.CW
//                                         v        or Direction.CCW
MatrixRotator.prototype.rotate = function(direction, radius) {

  radius = this.validateInputs(direction,radius);

  var center = Math.floor(this.matrix.length / 2);

  var validStartIndex = center - radius;
  var validEndIndex = center + radius - Math.ceil(center%2);
  var invalidStartIndex = validStartIndex + 1;
  var invalidEndIndex = validEndIndex - 1;
  var tempColumns = this.populateColumns(this.matrix);
  var isInInnerBox = this.isInInnerBox;
  var isInOuterBox = this.isInOuterBox;

  switch(direction) {

    case Direction.CW:

      return rotateClockwise(this.matrix, radius, tempColumns);
      break;

    case Direction.CCW:

       return rotateCounterClockwise(this.matrix, radius, tempColumns);
      break;

    default:

      throw new Error("MatrixRotator could not perform rotation");
  };

  function rotateClockwise(inMatrix, radius, tempColumns) {

    var tempMatrix = [];

    for(var i = 0; i < tempColumns.length; i++) {

      tempMatrix.push(tempColumns[i].reverse());
    }

    if(radius === 0) {

      console.log(tempMatrix);

      return tempMatrix;
    }

    for(var i = 0; i < tempMatrix.length; i++) {

      for(var j = 0; j < tempMatrix.length; j++) {

        if(!isInOuterBox(i, j, validStartIndex, validEndIndex) || isInInnerBox(i, j, invalidStartIndex, invalidEndIndex)) {

          tempMatrix[i][j] = inMatrix[i][j];
        }
      }
    }

    console.log(tempMatrix);
    return tempMatrix;
  };

  function rotateCounterClockwise(inMatrix, radius, tempColumns) {

    var tempMatrix = [];

    for(var i = 0; i < tempColumns.length; i++) {

      tempMatrix.push(tempColumns[tempColumns.length - 1 - i]);
    }

    if(radius === 0) {

      console.log(tempMatrix);
      return tempMatrix;
    }

    for(var i = 0; i < tempMatrix.length; i++) {

      for(var j = 0; j < tempMatrix.length; j++) {

        if(!isInOuterBox(i, j, validStartIndex, validEndIndex) || isInInnerBox(i, j, invalidStartIndex, invalidEndIndex)) {

          tempMatrix[i][j] = inMatrix[i][j];
        }
      }
    }

    console.log(tempMatrix);
    return tempMatrix;
  };
};

//                    Must be Direction.CW               |-- Must be a valid Number
//                        or Direction.CCW ---v          v   between 1 and [radius]
MatrixRotator.prototype.rotateStep = function(direction, radius) {

  radius = this.validateInputs(direction,radius);

  var center = Math.floor(this.matrix.length / 2);

  var validStartIndex = center - radius;
  var validEndIndex = center + radius - Math.ceil(center%2);
  var invalidStartIndex = validStartIndex + 1;
  var invalidEndIndex = validEndIndex - 1;
  // var tempColumns = this.populateColumns(this.matrix);
  var isInInnerBox = this.isInInnerBox;
  var isInOuterBox = this.isInOuterBox;

  // console.log(tempColumns);
  var tempMatrix = [];

  for(var i = 0; i < this.matrix[0].length; i++) {

    tempMatrix.push([]);

    for(var j = 0; j < this.matrix[0].length; j++) {

      tempMatrix[i].push(NaN);
    }
  }

  switch(direction) {

    case Direction.CW:

      return rotateClockwise(this.matrix, radius, tempMatrix);
      break;

    case Direction.CCW:

       return rotateCounterClockwise(this.matrix, radius, tempMatrix);
      break;

    default:

      throw new Error("MatrixRotator could not perform rotation");
  };

  function rotateClockwise(inMatrix, radius, tempMatrix) {

    // var tempMatrix = [];

    // for(var i = 0; i < tempColumns.length; i++) {

    //   tempMatrix.push(tempColumns[i].reverse());
    // }

    if(radius === 0) {

      // console.log(tempMatrix);

      return tempMatrix;
    }

    for(var i = 0; i < tempMatrix.length; i++) {

      for(var j = 0; j < tempMatrix.length; j++) {

        if((i + j) < tempMatrix.length && i < j) { //top rules

          if(i === j) { //skip center

            tempMatrix[i][j] = this.matrix[i][j];

          } else {

            //try up
            if((i - 1) > -1 && tempMatrix[i-1][j] !== NaN) {

              tempMatrix[i-1][j] = this.matrix[i][j];

            //try right
            } else { //if( (j + 1) > tempMatrix.length - 1 && tempMatrix[i][j+1] !== NaN) {

              tempMatrix[i][j+1] = this.matrix[i][j];
            }
          }

        } else { //bottom rules

          if(i === j) { //skip center

            tempMatrix[i][j] = this.matrix[i][j];
          } else {

            //try left
            if((j - 1) > -1 && tempMatrix[i][j-1] !== NaN) {

              tempMatrix[i][j-1] = this.matrix[i][j];

            } else { //try down

              tempMatrix[i+1][j] = this.matrix[i][j];
            }
          }
        };

        console.log(tempMatrix);

        // if(!isInOuterBox(i, j, validStartIndex, validEndIndex) || isInInnerBox(i, j, invalidStartIndex, invalidEndIndex)) {

        //   tempMatrix[i][j] = inMatrix[i][j];
        // }
      }
    }

    // console.log(tempMatrix);
    return tempMatrix;
  };

  function rotateCounterClockwise(inMatrix, radius, tempMatrix) {

    // var tempMatrix = [];

    // for(var i = 0; i < tempColumns.length; i++) {

    //   tempMatrix.push(tempColumns[tempColumns.length - 1 - i]);
    // }

    if(radius === 0) {

      // console.log(tempMatrix);
      return tempMatrix;
    }

    for(var i = 0; i < tempMatrix.length; i++) {

      for(var j = 0; j < tempMatrix.length; j++) {

        if(!isInOuterBox(i, j, validStartIndex, validEndIndex) || isInInnerBox(i, j, invalidStartIndex, invalidEndIndex)) {

          tempMatrix[i][j] = inMatrix[i][j];
        }
      }
    }

    // console.log(tempMatrix);
    return tempMatrix;
  };
};