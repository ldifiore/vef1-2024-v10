import Vector2 from "../src/basics/Vector2";
import { ADD } from "../src/basics/Vector2";
import { SUB } from "../src/basics/Vector2";
import { SCALE } from "../src/basics/Vector2";
import DrawUtillsMeter from "../src/basics/DrawUtillsMeter";
import App from "./App";


class Particle{
    static MAX_X_POSITION = Particle.windowWidthMeter - .06;
    static MAX_Y_POSITION = Particle.windowHeightMeter - .06;
    static MAX_VELOCITY = 100;
    static MAX_ACCELERATION = 1;
    static MAX_FORCE = 1;
    static MAX_MASS = 1;
    static MAX_CHARGE = 1;
    static MAX_SIZE = 1; //meters
    static MAX_COLOR = Math.pow(2,24)-1;

    constructor(type,position,velocity,mass,charge,size,color){
        this.type = type;

        this.position = (position) ? position : new Vector2((Math.random() * Particle.MAX_X_POSITION)+.03 , (Math.random() * Particle.MAX_Y_POSITION)+.03);
        this.startPosition = new Vector2(this.position.x,this.position.y);
        this.meshForce = new Vector2(0,0);
        this.velocity = (velocity) ? velocity : new Vector2((Math.random() -.5) * 2 * Particle.MAX_VELOCITY ,(Math.random() -.5) * 2 * Particle.MAX_VELOCITY );
        this.acceleration = new Vector2(0,0);
        this.force = new Vector2(0,0);
        this.force_calcs = new Vector2(0,0);

        if (this.type == 'custom'){

            this.mass = (mass) ? mass : Math.random() * Particle.MAX_MASS;
            this.charge = (charge) ? charge : Math.random() * Particle.MAX_CHARGE;
            this.size = (size) ? size : Math.random() * Particle.MAX_SIZE;
            //this.drawSize = (drawSize) ? drawSize : Math.random() * Particle.MAX_SIZE;
            this.color = (color) ? color : Math.random();

        }else{
            this.mass = (mass) ? mass : Math.random() * Particle.MAX_MASS;
            this.charge = (charge) ? charge : Math.random() * Particle.MAX_CHARGE;
            this.size = (size) ? size : Math.random() * Particle.MAX_SIZE;
            //this.drawSize = (drawSize) ? drawSize : Math.random() * Particle.MAX_SIZE;
            this.color = (color) ? color : Math.random();
        }


    }

    PrepForCalcs(){
        this.force_calcs = new Vector2(0,0);

        let meshForceScale= 1e-24;

        let meshRadius = SUB(this.position,this.startPosition);

        let meshRadiusLength = meshRadius.length();

        meshRadius.Normalize();

        meshForceScale *= meshRadiusLength;

        let meshForceTemp = SCALE(meshRadius,meshForceScale);

        let x = meshForceTemp.x;
        let y = meshForceTemp.y;

        this.meshForce.x = x;
        this.meshForce.y = y;
    }

    static RunCalc(particle1, particle2){
        
        //let forceScale=(8987551786.1815248755*(particle1.charge)*(particle2.charge));
        let forceScale=(2.3070775507811090e-28*(particle1.charge)*(particle2.charge));

        let radius = SUB(particle1.position,particle2.position);
        let radiusLength = radius.sqLength();
        radius.Normalize();
        forceScale /= radiusLength;
        let scaled = SCALE(radius,forceScale);

        
        particle1.force_calcs.x += scaled.x;
        particle1.force_calcs.y += scaled.y;
        particle2.force_calcs.x -= scaled.x;
        particle2.force_calcs.y -= scaled.y;
    }

    RunMeshCalc(){
        
        let meshForceScale= 1e-30;

        let meshRadius = SUB(this.position,this.startPosition);

        console.log(meshRadius);

        let meshRadiusLength = meshRadius.length();
        meshRadius.Normalize();
        //meshForceScale *= meshRadiusLength;
        let meshScaled = SCALE(meshRadius,meshForceScale);

        
        this.force_calcs.x -= meshScaled.x;
        this.force_calcs.y -= meshScaled.y;
    }

/*
    static RunColorCalc(particle1, particle2){
        
        //let forceScale=(8987551786.1815248755*(particle1.charge)*(particle2.charge));
        //let forceScale=(2.3070775507811090e-28*(particle1.charge)*(particle2.charge));
        let forceScale=-0.000000001;

        let radius = SUB(particle1.position,particle2.position);
        let radiusLength = radius.sqLength();
        radius.Normalize();
        forceScale *= radiusLength;
        let scaled = SCALE(radius,forceScale);

        
        particle1.force_calcs.x += scaled.x;
        particle1.force_calcs.y += scaled.y;
        particle2.force_calcs.x -= scaled.x;
        particle2.force_calcs.y -= scaled.y;
    }
*/
    ApplyCalcs(){

        let x = this.meshForce.x;
        let y = this.meshForce.y;

        console.log(x +' , '+ y)

        this.force.x = this.force_calcs.x  ;
        this.force.y = this.force_calcs.y ; 

        console.log('force x: '+ (this.force.x ) +'  force y: '+(this.force.y ));
        console.log('force x: '+ (this.force.x + x) +'  force y: '+(this.force.y + y));
    }

    Update(deltatime){
        this.acceleration.x = this.force.x / this.mass;
        this.acceleration.y = this.force.y / this.mass;
        this.velocity.x += deltatime * this.acceleration.x;
        this.velocity.y += deltatime * this.acceleration.y;
        this.position.x += deltatime * this.velocity.x;
        this.position.y += deltatime * this.velocity.y;
    }

    Draw(){
        DrawUtillsMeter.drawPoint(this.position,this.size,this.color);
        //drawFunc.Particle(this.position.x,this.position.y, this.size, this.color.toString(16));
        //console.log(this.position.x)
    }
}

export default Particle;