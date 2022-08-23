const carCanvas = document.getElementById("carCanvas");
const networkCanvas = document.getElementById("networkCanvas");

const car_ctx = carCanvas.getContext("2d");
const network_ctx = networkCanvas.getContext("2d");

car_ctx.canvas.width = 200;
network_ctx.canvas.width = 300;
const road = new Road(car_ctx.canvas.width/2,car_ctx.canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),10000000,30,60,"AI");   
const N=400;

const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if (i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
   
}
const traffic = [new Car(road.getLaneCenter(1),9999700,30,60,"DUMMY",2,getRandomColor()), 
                new Car(road.getLaneCenter(0), 9999350,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(2), 9999350,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(1), 9999190,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(2), 9999190,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(0), 9999010,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(1), 9998910,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(0), 9997900,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(2), 9997750,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(1), 9997750,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(0), 9997630,30,60,"DUMMY",2,getRandomColor()),
                new Car(road.getLaneCenter(2), 9997660,30,60,"DUMMY",2,getRandomColor())];



animate();

function save(){
    localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
}
function discard(){
    localStorage.removeItem("bestBrain");
}



function generateCars(number){
    const cars = [];
    for(let i=1;i<=number;i++){
        cars.push(new Car(road.getLaneCenter(1), 9999910,30,60,"AI"));
    }
    return cars;
}

function animate(time){

    for(let i=0;i<traffic.length;++i){
        traffic[i].update(road.borders,[]);
    }
   
    
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }

    bestCar = cars.find(
        c=>c.y==Math.min(...cars.map(c=>c.y)
        ));
 

    car_ctx.canvas.height= window.innerHeight;
    network_ctx.canvas.height= window.innerHeight;

    car_ctx.save();
    car_ctx.translate(0,-bestCar.y+car_ctx.canvas.height*0.7);
    car_ctx.clearRect( 0, 0, carCanvas.width,carCanvas.height);

    road.draw(car_ctx);
    for(let i=0;i<traffic.length;++i){
        traffic[i].draw(car_ctx,"red");
    }

    car_ctx.globalAlpha = 0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(car_ctx,"blue");
    }
    car_ctx.globalAlpha = 1;
    bestCar.draw(car_ctx,"blue",true);
    car_ctx.restore();

    network_ctx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(network_ctx,bestCar.brain);
    requestAnimationFrame(animate);
}