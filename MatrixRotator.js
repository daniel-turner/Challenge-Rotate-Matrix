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
MatrixRotator.prototype.rotate = function(direction) {

  if(direction !== Direction.CW && direction !== Direction.CCW) {

    throw new Error("MatrixRotator did not receive a valid direction.");
  }

  switch(direction) {

    case Direction.CW:

      rotateClockwise(this.matrix);
      break;

    case Direction.CCW:

      rotateCounterClockwise(this.matrix);
      break;

    default:

      throw new Error("MatrixRotator could not perform rotation");
  };

  function rotateClockwise(inMatrix) {

    var tempColumns = populateColumns(inMatrix);

    for(var i = 0; i < tempColumns.length; i++) {

      inMatrix[i] = tempColumns[i].reverse();
    }

    return inMatrix;
  };

  function rotateCounterClockwise(inMatrix) {

    var tempColumns = populateColumns(inMatrix);

    //for(var i = tempColumns.length-1; i < 0; i--) {

      for(var i = 0; i < tempColumns.length; i++) {

        inMatrix[i] = tempColumns[tempColumns.length - 1 - i];
      }
    //}

    console.log(inMatrix);

    return inMatrix;
  };

  function populateColumns(matrix) {

    var tempColumns = [];

    matrix.forEach(function(row) {

      tempColumns.push([]);
    });

    for(var i = 0; i < matrix.length; i++) {

      for(var j = 0; j < matrix[i].length; j++) {

        //tempColumns[tempColumns.length - 1 - i].push(matrix[i][j]);
        tempColumns[i].push(matrix[j][i]);
      }
    }

    return tempColumns;
  };
};
