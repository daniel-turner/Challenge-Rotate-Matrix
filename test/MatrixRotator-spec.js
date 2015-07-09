var chai = require('chai');
chai.should();
var MatrixRotator = require("../MatrixRotator").MatrixRotator;
var Matrix = require("../Matrix");
var Direction = require("../Direction").Direction;

// describe("The Matrix Rotator", function () {

//   var matrixRotator;
//   beforeEach(function(){
//     matrixRotator = new MatrixRotator(Matrix.getMatrix1());
//   });

//   it("can rotate Clockwise", function () {
//     matrixRotator.rotate(Direction.CW).should.be.deep.equal( [
//                                             [9,0,3,4,8],
//                                             [0,6,3,5,0],
//                                             [3,8,6,2,1],
//                                             [8,8,9,9,9],
//                                             [7,3,0,7,3]
//                                           ]);

//   });

//   it("can rotate CounterClockwise", function () {
//     // matrixRotator.rotate(Direction.CCW);
//     matrixRotator.rotate(Direction.CCW).should.be.deep.equal([
//                                             [3,7,0,3,7],
//                                             [9,9,9,8,8],
//                                             [1,2,6,8,3],
//                                             [0,5,3,6,0],
//                                             [8,4,3,0,9]
//                                           ]);
//   });

// });
// describe("The Advanced Matrix Rotator", function () {

//   var matrixRotator;
//   beforeEach(function(){
//     matrixRotator = new MatrixRotator(Matrix.getMatrix2());
//   });

//   it("can rotate all layers Clockwise", function () {
//     matrixRotator.rotate(Direction.CW).should.be.deep.equal( [
//                                             [31,25,19,13,7,1],
//                                             [32,26,20,14,8,2],
//                                             [33,27,21,15,9,3],
//                                             [34,28,22,16,10,4],
//                                             [35,29,23,17,11,5],
//                                             [36,30,24,18,12,6]
//                                           ]);
//     matrixRotator = null;

//   });

//   it("can rotate layer 1 CounterClockwise", function () {
//     matrixRotator.rotate(Direction.CCW, 1).should.be.deep.equal([
//                                             [1, 2, 3, 4, 5, 6],
//                                             [7, 8, 9, 10,11,12],
//                                             [13,14,16,22,17,18],
//                                             [19,20,15,21,23,24],
//                                             [25,26,27,28,29,30],
//                                             [31,32,33,34,35,36]
//                                           ]);
//   });

//   it("can rotate layer 2 Clockwise", function () {

//     matrixRotator.rotate(Direction.CW, 2).should.be.deep.equal([

//                                             [1 ,2 ,3 ,4 ,5 ,6 ],
//                                             [7 ,26,20,14,8 ,12],
//                                             [13,27,15,16,9 ,18],
//                                             [19,28,21,22,10,24],
//                                             [25,29,23,17,11,30],
//                                             [31,32,33,34,35,36]
//                                           ]);
//   });

//   it("can rotate layer 3 Clockwise", function () {
//     matrixRotator.rotate(Direction.CW, 3).should.be.deep.equal([
//                                             [31,25,19,13,7 ,1 ],
//                                             [32,8 ,9 ,10,11,2 ],
//                                             [33,14,15,16,17,3 ],
//                                             [34,20,21,22,23,4 ],
//                                             [35,26,27,28,29,5 ],
//                                             [36,30,24,18,12,6 ]
//                                           ]);
//   });

//   describe("validates arguments", function () {

//     it("should accept layer ranges 1 - 3", function() {
//       (function () {
//         matrixRotator.rotate(Direction.CW, 0)
//       }).should.throw(RangeError);
//       (function () {
//         matrixRotator.rotate(Direction.CW, 4)
//       }).should.throw(RangeError);
//       (function () {
//         matrixRotator.rotate(Direction.CW, 3)
//       }).should.not.throw(RangeError);
//     });
//   });
// });

describe("The 2Advanced Matrix Rotator", function () {

  var matrixRotator;
  beforeEach(function(){
    matrixRotator = new MatrixRotator(Matrix.getMatrix2());
  });


  it("can rotate layer 3 Clockwise", function () {
    matrixRotator.rotateStep(Direction.CW, 3);
    matrixRotator.matrix.should.be.deep.equal([
                                              [ 7, 1, 2, 3, 4, 5],
                                              [13, 8, 9, 10,11,6],
                                              [19,14,15,16,17,12],
                                              [25,20,21,22,23,18],
                                              [31,26,27,28,29,24],
                                              [32,33,34,35,36,30]
                                            ]);
  });

  // it("can rotate layer 2 CounterClockwise", function () {
  //   matrixRotator.rotateStep(Direction.CCW, 2);
  //   matrixRotator.matrix.should.be.deep.equal([
  //                                             [ 1, 2, 3, 4, 5, 6],
  //                                             [ 7, 9,10,11,17,12],
  //                                             [13, 8,15,16,23,18],
  //                                             [19,14,21,22,29,24],
  //                                             [25,20,26,27,28,30],
  //                                             [31,32,33,34,35,36]
  //                                           ]);
  // });

  // it("can rotate layer 1 Clockwise", function () {

  //   matrixRotator.rotateStep(Direction.CW, 1);
  //   matrixRotator.matrix.should.be.deep.equal([
  //                                             [1, 2, 3, 4, 5, 6],
  //                                             [7, 8, 9, 10,11,12],
  //                                             [13,14,21,15,17,18],
  //                                             [19,20,22,16,23,24],
  //                                             [25,26,27,28,29,30],
  //                                             [31,32,33,34,35,36]
  //                                           ]);
  // });

  // it("can rotate and persist previous state", function () {
  //   matrixRotator.rotateStep(Direction.CW, 3);
  //   matrixRotator.rotateStep(Direction.CCW, 2);
  //   matrixRotator.rotateStep(Direction.CW, 1);
  //   matrixRotator.matrix.should.be.deep.equal([
  //                                             [ 7, 1, 2, 3, 4, 5],
  //                                             [13, 9,10,11,17, 6],
  //                                             [19, 8,21,15,23,12],
  //                                             [25,14,22,16,29,18],
  //                                             [31,20,26,27,28,24],
  //                                             [32,33,34,35,36,30]
  //                                           ]);
  // });

  describe("validates arguments", function () {

    it("should accept layer ranges 1 - 3", function() {
      (function () {
        matrixRotator.rotateStep(Direction.CW, 0)
      }).should.throw(RangeError);
      (function () {
        matrixRotator.rotateStep(Direction.CW, 4)
      }).should.throw(RangeError);
      (function () {
        matrixRotator.rotateStep(Direction.CW, 3)
      }).should.not.throw(RangeError);
    });
    it("should only rotate CW or CCW", function() {
      (function () {
        matrixRotator.rotateStep('left', 1)
      }).should.throw(Error);
      (function () {
        matrixRotator.rotateStep('Direction.CW', 2)
      }).should.throw(Error);
      (function () {
        matrixRotator.rotateStep('potato', 1)
      }).should.throw(Error);
      (function () {
        matrixRotator.rotateStep(1, 1)
      }).should.throw(Error);
      (function () {
        matrixRotator.rotateStep(Direction.CW, 3);
        matrixRotator.rotateStep(Direction.CCW, 2);
      }).should.not.throw(Error);
    });
  });
});
