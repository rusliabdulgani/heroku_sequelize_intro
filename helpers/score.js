
let scoreLetter = nilai => {
  for (let i = 0 ; i < nilai.length ; i++){
    if(nilai[i].score > 85){
      nilai[i].letter = 'A'
    }else if( nilai[i].score > 70){
      nilai[i].letter = 'B'
    }else if( nilai[i].score > 55){
      nilai[i].letter = 'C'
    }else if( nilai[i].score < 55 && nilai[i].score > 0){
      nilai[i].letter = 'E'
    }
  }
  return nilai
}

module.exports = scoreLetter;
