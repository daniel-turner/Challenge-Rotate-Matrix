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

};

//                                         |-- Must be Direction.CW
//                                         v        or Direction.CCW
MatrixRotator.prototype.rotate = function(direction, radius) {

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

  var center = Math.floor(this.matrix.length / 2);

  var validStartIndex = center - radius;
  var validEndIndex = center + radius - Math.ceil(center%2);
  var invalidStartIndex = validStartIndex + 1;
  var invalidEndIndex = validEndIndex - 1;

  switch(direction) {

    case Direction.CW:

      return rotateClockwise(this.matrix, radius);
      break;

    case Direction.CCW:

       return rotateCounterClockwise(this.matrix, radius);
      break;

    default:

      throw new Error("MatrixRotator could not perform rotation");
  };

  function isInOuterBox(indexI, indexJ) {

    if( indexI >= validStartIndex &&
        indexI <= validEndIndex &&
        indexJ >= validStartIndex &&
        indexJ <= validEndIndex) {

      return true;

    } else {

      return false;
    }
  };

  function isInInnerBox(indexI, indexJ) {

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

  function rotateClockwise(inMatrix, radius) {

    var tempColumns = populateColumns(inMatrix);
    var tempMatrix = [];

    for(var i = 0; i < tempColumns.length; i++) {

      tempMatrix.push(tempColumns[i].reverse());
    }

    if(radius === 0) {

      return tempMatrix;
    }

    for(var i = 0; i < tempMatrix.length; i++) {

      for(var j = 0; j < tempMatrix.length; j++) {

        if(!isInOuterBox(i,j) || isInInnerBox(i,j)) {

          tempMatrix[i][j] = inMatrix[i][j];
        }
      }
    }

    return tempMatrix;
  };

  function rotateCounterClockwise(inMatrix, radius) {

    var tempColumns = populateColumns(inMatrix);
    var tempMatrix = [];

    for(var i = 0; i < tempColumns.length; i++) {

      tempMatrix.push(tempColumns[tempColumns.length - 1 - i]);
    }

    if(radius === 0) {

      return tempMatrix;
    }

    for(var i = 0; i < tempMatrix.length; i++) {

      for(var j = 0; j < tempMatrix.length; j++) {

        if(!isInOuterBox(i,j) || isInInnerBox(i,j)) {

          tempMatrix[i][j] = inMatrix[i][j];
        }
      }
    }

    return tempMatrix;
  };

  function populateColumns(matrix) {

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
};