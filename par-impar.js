const parImpar = process.argv[2];
const numero = Number(process.argv[3]);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10);

const resultado = numero + numeroAleatorioEntreZeroeDez;
if (parImpar === "par") {
  if (resultado % 2 === 0) {
    console.log(
      `Você escolheu par e o computador escolheu impar. O resultado foi ${resultado}. Você ganhou!`
    );
  } else {
    console.log(
      `Você escolheu par e o computador escolheu impar. O resultado foi ${resultado}. Você perdeu!`
    );
  }
} else if (parImpar === "impar") {
  if (resultado % 2 === 0) {
    console.log(
      `Você escolheu impar e o computador escolheu par. O resultado foi ${resultado}. Você perdeu!`
    );
  } else {
    console.log(
      `Você escolheu impar e o computador escolheu par. O resultado foi ${resultado}. Você ganhou!`
    );
  }
}
