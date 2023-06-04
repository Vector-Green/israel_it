import { SaveRandomDataDto } from 'src/random-data/dto/save.random-data.dto';

export default function generateRandomData(): SaveRandomDataDto {
  const generatedObj = <{ [key: string]: string }>{};

  for (let i = 0; i < 5; i++) {
    const generatedStr = String(autoIncrement());
    generatedObj[generatedStr] = generatedStr;
  }
  return { save: generatedObj };
}

function autoIncrementClosure(initial: number) {
  return function () {
    return initial++;
  };
}
const autoIncrement = autoIncrementClosure(0);
