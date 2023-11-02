function transformInput(input, byValues) {
    
    let addNumber, addString;
    if(!addNumber) addNumber = byValues.addNumber ?? 1;
    if(!addString) addString = byValues.addString ?? ' AE';
    
    if (typeof input === 'number') {
      return input + addNumber;
    } else if (typeof input === 'string') {
      return `${input} ${addString}`;
    } else if (Array.isArray(input)) {
        // Recursive
      return input.map(transformInput);
    } else if (typeof input === 'object') {
      const transformedInput = {};
      for (const key in input) {
        transformedInput[key] = transformInput(input[key], byValues); // Recursive
      }
      return transformedInput;
    } else {
      return input;
    }
  }
  
  const initialObject = {
    a: 123,
    b: 'abc',
    c: [1, 2, 3],
    d: {
      e: [4, 5, 6]
    }
  };

  const byValues = {
    addNumber: 1,
    addString: 'AE'
  }
  
  const resultingObject = transformInput(initialObject, byValues);
  
  console.log(resultingObject);