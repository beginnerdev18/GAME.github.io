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

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player (x, y,50 ,"pink")





const proyectiles = [ ]







function animate() {
    requestAnimationFrame(animate)
    cxt.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    proyectiles.forEach((proyectile) => {
    proyectile.update()
      
    })
}

 addEventListener("click",(event) => {
     const angle = Math.atan2(
         event.clientY - canvas.height / 2,
         event.clientX - canvas.width / 2
     )
     const velocity = {
         x: Math.cos(angle),
         y: Math.sin(angle)
     }
     
     proyectiles.push(
         new Proyectile(
             canvas.width / 2,
             canvas.height / 2,
             5,
             "red",velocity) 
         )
 })

   animate()