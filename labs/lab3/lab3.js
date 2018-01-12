export class lab3 {


  testDefaultParameters(firstParameter, secondParameter = 100) {
    return {first: firstParameter, second: secondParameter};
  }


  testTemplateLiterals(firstName, middleName, lastName){
    return (`${firstName},${middleName},${lastName}`);
  }

  testMultilineStrings() {
    var multilineString = `Life becomes easier
                            when you learn to 
                            accept the apology
                            you never got`;

    return multilineString;
  }

  testSortWithArrowFunction(Array) {
    return Array.sort((a, b) => b - a);
  }
}
