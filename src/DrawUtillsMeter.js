import Vector2 from "../src/basics/Vector2";
import { ADD } from "../src/basics/Vector2";
import { SUB } from "../src/basics/Vector2";
import { SCALE } from "../src/basics/Vector2";
import Sim from "./main";


class DrawUtillsMeter{

    static c = null;

    static drawPoint(position, radius, color){
        Sim.c.beginPath();
        Sim.c.arc(((position.x/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0],((position.y/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1],(radius/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom,0,Math.PI*2, true);
        Sim.c.fillStyle = color;
        Sim.c.fill();
        Sim.c.closePath();
    }

    static strokePoint(position, radius, color){
        Sim.c.beginPath();
        Sim.c.arc((position.x/DrawUtillsMeter.pixelSize)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0],(position.y/DrawUtillsMeter.pixelSize)*Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1],radius/DrawUtillsMeter.pixelSize,0,Math.PI*2, true);
        Sim.c.strokeStyle = color;
        Sim.c.stroke();
        Sim.c.closePath();
    }

    static drawLine(startposition, endposition, color){
        Sim.c.beginPath();
        Sim.c.moveTo(((startposition.x/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0], ((startposition.y/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1]);
        Sim.c.lineTo(((endposition.x/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0], ((endposition.y/DrawUtillsMeter.pixelSize)*DrawUtillsMeter.zoom)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1]);
        Sim.c.strokeStyle = color;
        Sim.c.stroke();
        Sim.c.closePath();
    }

    static drawText(position, size, color, text){
        Sim.c.font = size+'px Arial';
        Sim.c.fillStyle = color
        Sim.c.fillText(text, ((position.x/DrawUtillsMeter.pixelSize))+Sim.centX , ((position.y/DrawUtillsMeter.pixelSize))+Sim.centY);
    }

    static drawPositionArrow(startposition, arrowheadPosition, color){

        let direction = SUB(arrowheadPosition, startposition);
        direction.Normalize();
        let arrowheadCenter = SUB(arrowheadPosition, SCALE(direction,20));

        let directionArrowhead = direction.getNormal();

        let leftArrowheadPosition = ADD(arrowheadCenter, SCALE(directionArrowhead, 10));
        let rightArrowheadPosition = SUB(arrowheadCenter, SCALE(directionArrowhead, 10));

        this.drawLine(startposition, arrowheadCenter, color);
        //this.drawLine(leftArrowheadPosition, arrowheadPosition, color);
        //this.drawLine(rightArrowheadPosition, arrowheadPosition, color);

        Sim.c.beginPath();
        Sim.c.moveTo(leftArrowheadPosition.x/DrawUtillsMeter.pixelSize, leftArrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.lineTo(arrowheadPosition.x/DrawUtillsMeter.pixelSize, arrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.lineTo(rightArrowheadPosition.x/DrawUtillsMeter.pixelSize, rightArrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.lineTo(leftArrowheadPosition.x/DrawUtillsMeter.pixelSize, leftArrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.strokeStyle = color;
        Sim.c.stroke();
        Sim.c.closePath();

    }

    static drawSizeArrow(startposition, arrowheadPosition, size, color){

        let direction = SUB(arrowheadPosition, startposition);
        direction.Normalize();

        arrowheadPosition = ADD( startposition, SCALE(direction, size));


        let arrowheadCenter = SUB(arrowheadPosition, SCALE(direction,size/10));

        let directionArrowhead = direction.getNormal();

        let leftArrowheadPosition = ADD(arrowheadCenter, SCALE(directionArrowhead, size/20));
        let rightArrowheadPosition = SUB(arrowheadCenter, SCALE(directionArrowhead, size/20));

        this.drawLine(startposition, arrowheadCenter, color);
        //this.drawLine(leftArrowheadPosition, arrowheadPosition, color);
        //this.drawLine(rightArrowheadPosition, arrowheadPosition, color);

        Sim.c.beginPath();
        Sim.c.moveTo(leftArrowheadPosition.x/DrawUtillsMeter.pixelSize, leftArrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.lineTo(arrowheadPosition.x/DrawUtillsMeter.pixelSize, arrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.lineTo(rightArrowheadPosition.x/DrawUtillsMeter.pixelSize, rightArrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.lineTo(leftArrowheadPosition.x/DrawUtillsMeter.pixelSize, leftArrowheadPosition.y/DrawUtillsMeter.pixelSize);
        Sim.c.fillStyle = color;
        Sim.c.fill();
        Sim.c.closePath();

    }

    static drawAxes(color){
        //DrawUtillsMeter.drawLine(new Vector2(-DrawUtillsMeter.halfScreenX,0),new Vector2(DrawUtillsMeter.halfScreenX,0),'rgba(255, 255, 255, 1)');
        //DrawUtillsMeter.drawLine(new Vector2(0,-DrawUtillsMeter.halfScreenY),new Vector2(0,DrawUtillsMeter.halfScreenY),'rgba(255, 255, 255, 1)');

        Sim.c.beginPath();
        Sim.c.moveTo((0/DrawUtillsMeter.pixelSize)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0], (-DrawUtillsMeter.halfScreenY/DrawUtillsMeter.pixelSize)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1]);
        Sim.c.lineTo((0/DrawUtillsMeter.pixelSize)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0], (DrawUtillsMeter.halfScreenY/DrawUtillsMeter.pixelSize)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1]);
        Sim.c.strokeStyle = color;
        Sim.c.stroke();
        Sim.c.closePath();

        Sim.c.beginPath();
        Sim.c.moveTo((-DrawUtillsMeter.halfScreenX/DrawUtillsMeter.pixelSize)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0], (0/DrawUtillsMeter.pixelSize)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1]);
        Sim.c.lineTo((DrawUtillsMeter.halfScreenX/DrawUtillsMeter.pixelSize)+Sim.centX + DrawUtillsMeter.totalWheelDragDelta[0], (0/DrawUtillsMeter.pixelSize)+Sim.centY + DrawUtillsMeter.totalWheelDragDelta[1]);
        Sim.c.strokeStyle = color;
        Sim.c.stroke();
        Sim.c.closePath();
        

        for(let i = 0 ; i <= 2 ; i += .01){

            DrawUtillsMeter.drawLine(new Vector2(i,0),new Vector2(i,0.002),color);

        }

        for(let i = 0 ; i >= -2 ; i -= .01){

            DrawUtillsMeter.drawLine(new Vector2(i,0),new Vector2(i,0.002),color);

        }

        for(let i = 0 ; i <= 2 ; i += .01){

            DrawUtillsMeter.drawLine(new Vector2(0,i),new Vector2(-0.002,i),color);

        }

        for(let i = 0 ; i >= -2 ; i -= .01){

            DrawUtillsMeter.drawLine(new Vector2(0,i),new Vector2(-0.002,i),color);

        }

    }
    
}

export default DrawUtillsMeter;