const canvas = document.querySelector("#canvas");
const cxt= canvas.getContext("2d");

canvas.width=innerWidth;
canvas.height=innerHeight;
 
class Player {
    constructor(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        cxt.beginPath()
        cxt.arc (this.x,this.y,this.radius,0,Math.PI * 2, false);
        cxt.fillStyle =this.color 
        cxt.fill()
        
    }
};

class Proyectile{
    constructor(x,y,radius,color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity=velocity
    }

    draw() {
        cxt.beginPath()
        cxt.arc (
            this.x,this.y,this.radius,
            0,Math.PI * 2, false);
        cxt.fillStyle =this.color 
        cxt.fill()
        
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 

    }

}

class Enemy{
    constructor(x,y,radius,color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity=velocity
    }

    draw() {
        cxt.beginPath()
        cxt.arc (
            this.x,this.y,this.radius,
            0,Math.PI * 2, false);
        cxt.fillStyle =this.color 
        cxt.fill()
        
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 

    }

}
class Particule{
    constructor(x,y,radius,color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity=velocity;
        this.alpha= 1
    }

    draw() {
        cxt.save()
        cxt.globalAlpha = this.alpha
        cxt.beginPath()
        cxt.arc (
            this.x,this.y,this.radius,
            0,Math.PI * 2, false);
        cxt.fillStyle =this.color 
        cxt.fill()
        cxt.restore()
        
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 
        this.alpha -= 0.01
    }

}

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player (x, y,10 ,"white")
const proyectiles = [ ]
const enemies =[]
const particules =[]


function spawnEnemies(){
    setInterval(( ) => {
        const radius = Math.random()*(50-10)+10

    let x
    let y

        if (Math.random () < 0.5){
         x = Math.random( ) < 0.5 ? 0 - radius : canvas.width + radius
         y = Math.random() * canvas.height
        }
        else {
            x = Math.random() * canvas.width
            y = Math.random( ) < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = `hsl(${Math.random() * 360}, 60%,60%)`
        console.log(color)

        const angle = Math.atan2(
              canvas.height / 2 - y,
              canvas.width / 2 - x
        )
        const velocity = {
            x: Math.cos(angle) * 0.5,
            y: Math.sin(angle) * 0.5
        }
        enemies.push(new Enemy(x,y,radius, color,velocity))

        console.log(enemies)
    },1000)
        
}


let animationId
function animate() {
    animationId = requestAnimationFrame(animate)
    cxt.fillStyle= "rgba(0,0,0,0.1)"
    cxt.fillRect(0,0,canvas.width,canvas.height)
    player.draw()
    particules.forEach((particule, index) => {
        if (particule. alpha <= 0) {
            particules.splice(index,1)
        } else{
        particule.update()
        }
    })
    proyectiles.forEach((proyectile,index) => {
    proyectile.update()

        //remove from edges of screen
    if (
        proyectile.x + proyectile.radius < 0 ||
        proyectile.x - proyectile.radius > canvas.width ||
        proyectile.y + proyectile.radius  < 0 ||
        proyectile.y - proyectile.radius > canvas.height
        ) {
        setTimeout(() => {
            proyectiles.splice(index, 1)
         },0)
    } 
    })

    enemies.forEach((enemy, index) => {
     enemy.update()
     const dist =Math.hypot(player.x - enemy.x, player.y - enemy.y)
     //endgame
     if (dist - enemy.radius - player.radius < 1){
        cancelAnimationFrame(animationId)
     }
     proyectiles.forEach((proyectile) => {
         const dist =Math.hypot(proyectile.x - enemy.x, proyectile.y - enemy.y)
        // when proyectile touch enemy
         if
          (dist - enemy.radius - proyectile.radius < 1) 
          {
              
            for(let i =0 ; i< enemy.radius *2;i++) {
                particules.push 
                (new Particule (proyectile.x,proyectile.y
                    ,Math.random() * 2, enemy.color, 
                    {x:(Math.random() - 0.5) * (Math.random() * 6),
                     y :(Math.random() - 0.5) * (Math.random() * 6)
                    }))
              }

              if(enemy.radius - 10 > 10)
              {
                 
                  

                enemy.radius -= 10  
                setTimeout(() => 
                    {proyectiles.splice(proyectileIndex, 1)
              },0)
            }
            else{
             setTimeout(() => {
                enemies.splice(index,1)
                proyectiles.splice(proyectileIndex, 1)
             },0)
            }

         }
     })
    })

    }

 addEventListener("click",(event) => {
     console.log(proyectiles)
     const angle = Math.atan2(
         event.clientY - canvas.height / 2,
         event.clientX - canvas.width / 2
     )
     const velocity = {
         x: Math.cos(angle) * 5,
         y: Math.sin(angle) *5
     }
     
     proyectiles.push(
         new Proyectile(
             canvas.width / 2,
             canvas.height / 2,
             5,
             "white",velocity) 
         )
 })

   animate()
   spawnEnemies()