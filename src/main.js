import Vector2 from "../src/basics/Vector2";
import { ADD } from "../src/basics/Vector2";
import { SUB } from "../src/basics/Vector2";
import { SCALE } from "../src/basics/Vector2";
import DrawUtillsMeter from "../src/basics/DrawUtillsMeter";
import Particle from "../src/particle";


class Sim {

    static init(){
        Sim.canvas = document.getElementById('canvas');
        console.log(document);
        Sim.c = Sim.canvas.getContext('2d');

        Sim.canvas.width = Sim.canvas.innerWidth - 20;
        Sim.canvas.height = Sim.canvas.innerHeight - 20;

        Sim.windowWidthMeter = .34 ;
        Sim.windowHeightMeter = .164 ;

        Sim.pixelWidth = Sim.windowWidthMeter/Sim.canvas.width;
        Sim.pixelHeight = Sim.windowHeightMeter/Sim.canvas.height;

        Sim.pixelSize = 0.00020101509747341603;

        Sim.centX = Sim.canvas.width/2;
        Sim.centY = Sim.canvas.height/2;

        Sim.halfScreenX = Sim.windowWidthMeter/2;
        Sim.halfScreenY = Sim.windowHeightMeter/2;

        /* console.log('centX: '+centX+'     centY: '+centY)

        console.log('canvas.width: '+canvas.width+'px canvas.height: '+canvas.height+'px');

        console.log('single pixel width: ' +pixelWidth+'   single pixel height:'+pixelHeight);

        console.log('pixel size: '+pixelSize);
         */

        Sim.zoom = 1;
        Sim.mouseButtons = [0,0,0,0,0];
        Sim.mousePosition = [0,0];
        Sim.wheelPos = 0;
        Sim.deltaWheel = 0; 
        Sim.wheelDragStartPosition = [0,0];
        Sim.wheelDragDelta = [0,0];
        Sim.lastWheelDragDelta = [0,0];
        Sim.totalWheelDragDelta = [0,0];
        Sim.buttonNames = ["left", "wheel", "right", "back", "forward"];

      }

    static currentTime = 0;
    static deltaTime = 0;
    static Fps = 0;
    static lastTime = 0 ;
    static particles = [];
    static kineticEnergy = 0;   
    static potentialEnergy = 0;


//  TEST ENVIRONMENT    
    static timsecale = 500000;

//  SYSTEM INTIAL CONDITIONS
    static InitSimulation(){

//  PARTICLE SETUP
        //  Sim.particles.push(position (Picometre 10e-12) ,velocity (m/s) ,acceleration (m/s^2) ,force (N) ,mass,charge (fundamental charge 1.602176634e-19 C),size (M),color){
/*
        for (let y = -5 ; y < 5 ; y++){
            for (let x = -5 ; x < 5 ; x++){
                Sim.particles.push(new Particle('custom',new Vector2((x * .1) + .05 ,(y * .1) + .05),new Vector2(0,0),9.1093837e-31,-1,.006,`rgba(120, 174, 225, 1)`));

            }
        }
*/

        //Sim.particles.push(new Particle(new Vector2(0,0),new Vector2(0,0),new Vector2(0,0),new Vector2(0,0),1.67262192e-27,1,.003,`rgba(255, 88, 73, 1)`))
        //Sim.particles.push(new Particle('custom',new Vector2(.01,.01),new Vector2(0,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));
        //Sim.particles.push(new Particle('custom',new Vector2(-.1,.01),new Vector2(100,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));
        //Sim.particles.push(new Particle(new Vector2(.17,.08),new Vector2(0,0),new Vector2(0,0),new Vector2(0,0),1.67262192e-27,1.602176634e-19,.003,`rgba(255, 88, 73, 1)`))
        //Sim.particles.push(new Particle(new Vector2(.14,.08),new Vector2(0,92),new Vector2(0,0),new Vector2(0,0),9.1093837e-31,-1.602176634e-19,.0003,`rgba(120, 174, 225, 1)`));    
        //Sim.particles.push(new Particle('custom',new Vector2(-0.001,0),new Vector2(0,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));
        Sim.particles.push(new Particle('custom',new Vector2(0.001,0),new Vector2(-1000,0),1,-1,.003,`rgba(120, 174, 225, 1)`));
        Sim.particles.push(new Particle('custom',new Vector2(-0.001,0),new Vector2(1000,0),1,-1,.003,`rgba(120, 174, 225, 1)`));




//  CIRCLE OF ORBITING PARTICLES (FOR SPRING FORCE)
/*
        for (let i  = 0 ; i < 250 ; i++ ){

            let theta = Math.random()*Math.PI*2;
            let radiusRand = Math.sqrt(Math.random());
        //DISTRUBUTION FUNCTION
            radiusRand = radiusRand;  

            let x = Math.cos(theta)*radiusRand;
            let y = Math.sin(theta)*radiusRand;
        //RADIUS
            x *= .01;
            y *= .01;
        //NEW PARTICLE
        Sim.particles.push(new Particle('custom',new Vector2(x,y),new Vector2(0,0),9.1093837e-31,-1,.0006,`rgba(120, 174, 225, 1)`));
        }
*/
/*
        //  CIRCLE OF ORBITING PARTICLES (FOR SPRING FORCE)
        for (let i  = 0 ; i < 250 ; i++ ){

            let theta = Math.random()*Math.PI*2;
            let radiusRand = Math.sqrt(Math.random());
        //DISTRUBUTION FUNCTION
            radiusRand = radiusRand;  

            let x = Math.cos(theta)*radiusRand;
            let y = Math.sin(theta)*radiusRand;
        //RADIUS
            x *= .01;
            y *= .01;
        //NEW PARTICLE
        Sim.particles.push(new Particle('custom',new Vector2(x + .07,y),new Vector2(-y*100000000000,x*100000000000-10000000000),9.1093837e-31,-1,.0003,`rgba(255, 174, 120, 1)`));
        }
*/


        Sim.c.fillStyle = 'rgba(0, 0, 0, 1)';
        Sim.c.fillRect(0,0,Sim.canvas.width,Sim.canvas.height);
    }




//  UPDATE SIMULATION
    static Update(){

        Sim.currentTime = performance.now() / 1000;
        Sim.deltaTime = Sim.currentTime - Sim.lastTime;
        Sim.Fps = 1/Sim.deltaTime;
        Sim.deltaTime /= Sim.timsecale;
        Sim.lastTime = Sim.currentTime;

        let num_particles = Sim.particles.length;

        for(let p = 0; p < num_particles; p++){
            Sim.particles[p].PrepForCalcs();
        }

        
        Sim.potentialEnergy = 0;
        for(let p1 = 0; p1 < num_particles; p1++){

            let particle1 = Sim.particles[p1];

            for(let p2 = p1+1; p2 < num_particles; p2++){
                let particle2 = Sim.particles[p2];
                Particle.RunCalc(particle1, particle2);               //calculations
                            //Sim.potentialEnergy += Particle.addPotentialEnergy(particle1, particle2);
            }
        }

        for(let p = 0; p < num_particles; p++){
            Sim.particles[p].ApplyCalcs();
        }

        Sim.kineticEnergy = 0;
        for(let p = 0; p < num_particles; p++){
            
            Sim.particles[p].Update(Sim.deltaTime);
                        //Sim.kineticEnergy += Sim.particles[p].addKineticEnergy();
        }

        Sim.Draw();

    }
    

//  DRAW SIMULATION FRAME
    static Draw(){
        Sim.c.fillStyle = 'rgba(0, 0, 0, 1)';
        Sim.c.fillRect(0,0,Sim.canvas.width,Sim.canvas.height);

        DrawUtillsMeter.drawAxes('rgba(100, 100, 100, 1)');
        //sDrawUtillsMeter.drawLine(new Vector2(.1,.1),new Vector2(.1,-.1),'red')

        let num_particles = Sim.particles.length;
        for(let p = 0; p < num_particles; p++){
            let particle = Sim.particles[p];
            particle.Draw();
            
        }


        DrawUtillsMeter.drawText(new Vector2(-.16,-.07),20,'white','wheelDragStartPosition: [' + Sim.wheelDragStartPosition[0] + ', ' + Sim.wheelDragStartPosition[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.06),20,'white','wheelDragDelta: [' + Sim.wheelDragDelta[0] + ', ' + Sim.wheelDragDelta[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.05),20,'white','lastWheelDragDelta: [' + Sim.lastWheelDragDelta[0] + ', ' + Sim.lastWheelDragDelta[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.04),20,'white','totalWheelDragDelta: [' + Sim.totalWheelDragDelta[0] + ', ' + Sim.totalWheelDragDelta[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.03),20,'white','mouseButtons: [' + Sim.mouseButtons[0] + ', ' + Sim.mouseButtons[1] + ', ' + Sim.mouseButtons[2] + ', ' + Sim.mouseButtons[3] + ', ' + Sim.mouseButtons[4] +']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.02),20,'white','FPS: ' + Sim.Fps.toFixed(2));

    }
}

export default Sim;


