const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")


// ეკრანის Y სიგრძე
var screenY = window.innerHeight
// ეკრანის X სიგანე
var screenX = window.innerWidth

canvas.height = screenY 
canvas.width = screenX 

var mouseDown = false

var shapePosition = {
    x: undefined,
    y: undefined,
}

var hue = 300.888
var hue2 = 4

var particlesArray = []


window.addEventListener('resize', function(){
// ეკრანის Y სიგრძე
screenY = window.innerHeight
// ეკრანის X სიგანე
screenX = window.innerWidth

    canvas.height = screenY 
    canvas.width = screenX 
})

function drawShape(x, y, r, inset, spikeN, color, strokeColor){
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.save()
    ctx.translate(x, y)
    
    ctx.moveTo(0, 0 - r)

    for(var n = 0; n < spikeN; n++){
        ctx.lineTo(0, 0 - r)
        ctx.rotate(Math.PI / spikeN)
        ctx.lineTo(0, 0 - r * inset)
        ctx.rotate(Math.PI / spikeN)
    }
    ctx.restore()
    ctx.closePath()
    
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 2
    ctx.stroke()
        //ctx.fill()
    

}




canvas.addEventListener('mousedown', function(){
    mouseDown = true
})

canvas.addEventListener("mouseup", function(){
    mouseDown = false
  })


  class particles{
      constructor(){
          this.x = shapePosition.x
          this.y = shapePosition.y
          this.r =  Math.floor(Math.random() * 10)
          this.inset = 0.5
          this.spikeN = Math.floor(Math.random() * 7 + 3)
          this.strokeColor = 'hsl('+hue+', 100%, 50%)'
          this.speedX = Math.random() * 2 - 1
          this.speedY = Math.random() * 2 - 1
      }
      update(){
        this.x += this.speedX 
        this.y += this.speedY 
        if(this.r >= 0.1){
            this.r -= 0.1
        }
        if(this.r <= 0.2){
            this.r = 0
        }
        

      }

      draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.strokeStyle= 'hsl('+hue+', 100%, 50%)'
        ctx.stroke()
        ctx.closePath()
        ctx.fillStyle = 'hsl('+hue+', 100%, 50%)'
        ctx.fill()

      }
      
  }

  function pushParticles(){
      for(let i = 0; i < 5; i++){
          particlesArray.push(new particles())
      }
  }

  function drawParticles(){
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.fillRect(0, 0, screenX, screenY)
      

      for(let i = 0; i < particlesArray.length; i++){
        if( particlesArray[i].x != undefined){
        particlesArray[i].update()
        particlesArray[i].draw()
        if(particlesArray[i].r == 0){
            particlesArray.splice(i, 1)
            i--
        }
       for(let j = i; j < particlesArray.length; j++){
            var xx = particlesArray[i].x - particlesArray[j].x
            var yy = particlesArray[i].y - particlesArray[j].y
            var distance = Math.sqrt(xx*xx + yy*yy)
            if(distance < 100){
                ctx.beginPath()
                ctx.lineWidth = 0.2
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
                
            }

        }
      }
      }
      
      
  }

  pushParticles()

  window.setInterval(function(){
    drawParticles()
    hue = hue + 0.2
  }, 0.001)

  canvas.addEventListener('mousemove', function(e){
      shapePosition.x = e.x
      shapePosition.y = e.y
    pushParticles()
  })
