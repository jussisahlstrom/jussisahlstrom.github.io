document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const logsL = document.querySelectorAll('.log-l')
    const logsR = document.querySelectorAll('.log-r')
    const carsL = document.querySelectorAll('.car-l')
    const carsR = document.querySelectorAll('.car-r')
    const timeLeft = document.querySelector('#time-left')
    const result = document.querySelector('#result')
    const startBtn = document.querySelector('#button')
    const width = 9
    let currentIndex = 76
    let currentTime = 20
    let timerId

squares[currentIndex].classList.add('frog')


//move the frog
function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')
    switch(e.keyCode) {
      case 37:
        if(currentIndex % width !== 0) currentIndex -= 1
        break
      case 38:
        if(currentIndex - width >= 0) currentIndex -= width
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        break
      case 40:
        if (currentIndex + width < width * width) currentIndex += width
        break
    }
    squares[currentIndex].classList.add('frog')
    lose()
    win()
  }

  function carsMove() {
    carsL.forEach(carL => moveCarL(carL))
    carsR.forEach(carR => moveCarR(carR))
  }



function moveCarL(carL) {
    switch (true) {
      case carL.classList.contains('car1'):
      carL.classList.remove('car1')
      carL.classList.add('car2')
      break
      case carL.classList.contains('car2'):
      carL.classList.remove('car2')
      carL.classList.add('car3')
      break
      case carL.classList.contains('car3'):
      carL.classList.remove('car3')
      carL.classList.add('car1')
      break
    }
  }


  function moveCarR(carR) {
    switch (true) {
      case carR.classList.contains('car1'):
      carR.classList.remove('car1')
      carR.classList.add('car3')
      break
      case carR.classList.contains('car2'):
      carR.classList.remove('car2')
      carR.classList.add('car1')
      break
      case carR.classList.contains('car3'):
      carR.classList.remove('car3')
      carR.classList.add('car2')
      break
    }
  }

function logsMove () {
logsL.forEach(logL => moveLogL(logL))
logsR.forEach(logR => moveLogR(logR))
}

//logs left
function moveLogL(logL) {
    switch (true) {
      case logL.classList.contains('log1'):
      logL.classList.remove('log1')
      logL.classList.add('log2')
      break
      case logL.classList.contains('log2'):
      logL.classList.remove('log2')
      logL.classList.add('log3')
      break
      case logL.classList.contains('log3'):
      logL.classList.remove('log3')
      logL.classList.add('log4')
      break
      case logL.classList.contains('log4'):
      logL.classList.remove('log4')
      logL.classList.add('log5')
      break
      case logL.classList.contains('log5'):
      logL.classList.remove('log5')
      logL.classList.add('log1')
      break
    }
  }

  //logs right
  function moveLogR(logR) {
    switch (true) {
      case logR.classList.contains('log1'):
      logR.classList.remove('log1')
      logR.classList.add('log5')
      break
      case logR.classList.contains('log2'):
      logR.classList.remove('log2')
      logR.classList.add('log1')
      break
      case logR.classList.contains('log3'):
      logR.classList.remove('log3')
      logR.classList.add('log2')
      break
      case logR.classList.contains('log4'):
      logR.classList.remove('log4')
      logR.classList.add('log3')
      break
      case logR.classList.contains('log5'):
      logR.classList.remove('log5')
      logR.classList.add('log4')
      break
    }
  }


//W
function win() {
if (squares[4].classList.contains('frog')) {
result.innerHTML = 'YOU WON, CONGRATS !!!'
squares[currentIndex].classList.remove('frog')
clearInterval(timerId)
document.removeEventListener('keyup', moveFrog)
}
}


//L
function lose() {
    if ((currentTime === 0 ) || (squares[currentIndex].classList.contains('car1')) 
    || (squares[currentIndex].classList.contains('log5'))
    || (squares[currentIndex].classList.contains('log4'))
    ) {
      result.innerHTML = 'You died. RIP. #MOTI'
      squares[currentIndex].classList.remove('frog')
      clearInterval(timerId)
      document.removeEventListener('keyup', moveFrog)
    }
  }


 //the frog moving w/ the log 

 function moveWithLogL() {
    if (currentIndex >= 27 && currentIndex < 35) {
      squares[currentIndex].classList.remove('frog')
      currentIndex += 1
      squares[currentIndex].classList.add('frog')
    }
  }

  function moveWithLogR() {
    if (currentIndex > 18 && currentIndex <= 26) {
      squares[currentIndex].classList.remove('frog')
      currentIndex -= 1
      squares[currentIndex].classList.add('frog')
    }
  }

//move pieces
function movePieces() {
    currentTime--
    timeLeft.textContent = currentTime
    carsMove()
    logsMove()
    moveWithLogL()
    moveWithLogR()
    lose()
  }

//start game
startBtn.addEventListener('click', () => {
    if(timerId) {
      clearInterval(timerId)
    } else {
      timerId = setInterval(movePieces, 1000)
      document.addEventListener('keyup', moveFrog)
    }
})


})