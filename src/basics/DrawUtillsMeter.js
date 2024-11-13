class DrawUtillsMeter{
    static drawPoint(position, radius, color){
        c.beginPath();
        c.arc(((position.x/pixelSize)*zoom)+centX + totalWheelDragDelta.x,((position.y/pixelSize)*zoom)+centY + totalWheelDragDelta.y,(radius/pixelSize)*zoom,0,Math.PI*2, true);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }

    static strokePoint(position, radius, color){
        c.beginPath();
        c.arc((position.x/pixelSize)+centX + totalWheelDragDelta.x,(position.y/pixelSize)*centY + totalWheelDragDelta.y,radius/pixelSize,0,Math.PI*2, true);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
    }

    static drawLine(startposition, endposition, color){
        c.beginPath();
        c.moveTo(((startposition.x/pixelSize)*zoom)+centX + totalWheelDragDelta.x, ((startposition.y/pixelSize)*zoom)+centY + totalWheelDragDelta.y);
        c.lineTo(((endposition.x/pixelSize)*zoom)+centX + totalWheelDragDelta.x, ((endposition.y/pixelSize)*zoom)+centY + totalWheelDragDelta.y);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
    }

    static drawText(position, size, color, text){
        c.font = size+'px Arial';
        c.fillStyle = color
        c.fillText(text, ((position.x/pixelSize))+centX , ((position.y/pixelSize))+centY);
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

        c.beginPath();
        c.moveTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.lineTo(arrowheadPosition.x/pixelSize, arrowheadPosition.y/pixelSize);
        c.lineTo(rightArrowheadPosition.x/pixelSize, rightArrowheadPosition.y/pixelSize);
        c.lineTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();

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

        c.beginPath();
        c.moveTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.lineTo(arrowheadPosition.x/pixelSize, arrowheadPosition.y/pixelSize);
        c.lineTo(rightArrowheadPosition.x/pixelSize, rightArrowheadPosition.y/pixelSize);
        c.lineTo(leftArrowheadPosition.x/pixelSize, leftArrowheadPosition.y/pixelSize);
        c.fillStyle = color;
        c.fill();
        c.closePath();

    }

    static drawAxes(color){
        //DrawUtillsMeter.drawLine(new Vector2(-halfScreenX,0),new Vector2(halfScreenX,0),'rgba(255, 255, 255, 1)');
        //DrawUtillsMeter.drawLine(new Vector2(0,-halfScreenY),new Vector2(0,halfScreenY),'rgba(255, 255, 255, 1)');

        c.beginPath();
        c.moveTo((0/pixelSize)+centX + totalWheelDragDelta.x, (-halfScreenY/pixelSize)+centY + totalWheelDragDelta.y);
        c.lineTo((0/pixelSize)+centX + totalWheelDragDelta.x, (halfScreenY/pixelSize)+centY + totalWheelDragDelta.y);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();

        //console.log(totalWheelDragDelta.x + ", " + totalWheelDragDelta.y)

        c.beginPath();
        c.moveTo((-halfScreenX/pixelSize)+centX + totalWheelDragDelta.x, (0/pixelSize)+centY + totalWheelDragDelta.y);
        c.lineTo((halfScreenX/pixelSize)+centX + totalWheelDragDelta.x, (0/pixelSize)+centY + totalWheelDragDelta.y);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
        

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

        //console.log("axes draw")

    }

    static drawBorderWithTicks(color){

        c.beginPath;
        c.moveTo(0 + padding , 0 + padding);
        c.lineTo( canvas.width - padding , 0 + padding);
        c.lineTo( canvas.width - padding , canvas.height - padding);
        c.lineTo( 0 + padding , canvas.height - padding);
        c.lineTo(0 + padding , 0 + padding);
        c.strokeStyle = color;
        c.lineWidth = 4;
        c.stroke();
        c.closePath();
    }
    
}