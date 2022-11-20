const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 1165
const boardHeight = 600
let timerId
let xDirection = 6
let yDirection = 6
let score

const userStart = [532.5, 15]
let currentPosition = userStart

const ballStart = [573, 35]
let ballCurrentPosition = ballStart

// Create block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth + yAxis + blockHeight];
  }
}

// All the blocks
const blocks = [
  new Block(15, 567),
  new Block(130, 567),
  new Block(245, 567),
  new Block(360, 567),
  new Block(475, 567),
  new Block(590, 567),
  new Block(705, 567),
  new Block(820, 567),
  new Block(935, 567),
  new Block(1050, 567),
  new Block(15, 540),
  new Block(130, 540),
  new Block(245, 540),
  new Block(360, 540),
  new Block(475, 540),
  new Block(590, 540),
  new Block(705, 540),
  new Block(820, 540),
  new Block(935, 540),
  new Block(1050, 540),
  new Block(15, 513),
  new Block(130, 513),
  new Block(245, 513),
  new Block(360, 513),
  new Block(475, 513),
  new Block(590, 513),
  new Block(705, 513),
  new Block(820, 513),
  new Block(935, 513),
  new Block(1050, 513),
  new Block(15, 486),
  new Block(130, 486),
  new Block(245, 486),
  new Block(360, 486),
  new Block(475, 486),
  new Block(590, 486),
  new Block(705, 486),
  new Block(820, 486),
  new Block(935, 486),
  new Block(1050, 486),
  new Block(15, 459),
  new Block(130, 459),
  new Block(245, 459),
  new Block(360, 459),
  new Block(475, 459),
  new Block(590, 459),
  new Block(705, 459),
  new Block(820, 459),
  new Block(935, 459),
  new Block(1050, 459),
  new Block(15, 432),
  new Block(130, 432),
  new Block(245, 432),
  new Block(360, 432),
  new Block(475, 432),
  new Block(590, 432),
  new Block(705, 432),
  new Block(820, 432),
  new Block(935, 432),
  new Block(1050, 432),
  new Block(15, 405),
  new Block(130, 405),
  new Block(245, 405),
  new Block(360, 405),
  new Block(475, 405),
  new Block(590, 405),
  new Block(705, 405),
  new Block(820, 405),
  new Block(935, 405),
  new Block(1050, 405),
  new Block(15, 378),
  new Block(130, 378),
  new Block(245, 378),
  new Block(360, 378),
  new Block(475, 378),
  new Block(590, 378),
  new Block(705, 378),
  new Block(820, 378),
  new Block(935, 378),
  new Block(1050, 378),
  new Block(15, 351),
  new Block(130, 351),
  new Block(245, 351),
  new Block(360, 351),
  new Block(475, 351),
  new Block(590, 351),
  new Block(705, 351),
  new Block(820, 351),
  new Block(935, 351),
  new Block(1050, 351),
  new Block(15, 324),
  new Block(130, 324),
  new Block(245, 324),
  new Block(360, 324),
  new Block(475, 324),
  new Block(590, 324),
  new Block(705, 324),
  new Block(820, 324),
  new Block(935, 324),
  new Block(1050, 324)
]

// Draw the block
function addBlocks() {
  for(let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
  }
}
addBlocks()

// Add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//Draw user
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//Draw ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//Move user
function moveUser(e) {
  switch(e.key) {
    case 'ArrowLeft':
      if(currentPosition[0] > 0) {
        currentPosition[0] -= 20
        drawUser()
      }
      break;
    case 'ArrowRight':
      if(currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 20
        drawUser()
      }
      break;
  }
}

document.addEventListener('keydown', moveUser)

//Add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//Move ball
function moveBall(e) {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkForCollision()
}

timerId = setInterval(moveBall, 30)

//Check for collision
function checkForCollision() {
  //Check for block collisions
  for(let i = 0; i < blocks.length; i++) {
    if(
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()
      score++
      //scoreDisplay.innerHTML = score
    }
  }

  //Check for wall collision
  if(
    ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0) {
    changeDirection()
  }

  //Check for user collisions
  if(
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
  ) {
    changeDirection()
  }

  //Check for game over
  if(ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    document.removeEventListener('keydown', moveUser())
  }
}

function changeDirection() {
  if(xDirection === 6 && yDirection === 6) {
    yDirection = -6
    return
  }
  if(xDirection === 6 && yDirection === -6) {
    xDirection = -6
    return
  }
  if(xDirection === -6 && yDirection === -6) {
    yDirection = 6
    return
  }
  if(xDirection === -6 && yDirection === 6) {
    xDirection = 6
    return
  }
}