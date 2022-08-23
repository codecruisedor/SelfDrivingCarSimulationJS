class Visualizer{
    static drawNetwork(ctx,network){
        const margin = 50;
        const left = margin;
        const top = margin+200;
        const width = ctx.canvas.width - margin*2;
        const height = ctx.canvas.height - margin*10;
        


        const leveHeight = height/network.levels.length;

        Visualizer.setTtitle(ctx,top,left);

        for(let i=network.levels.length-1;i>=0;i--){
            const levelTop = top + lerp(height-leveHeight,
                0,
                network.levels.length==1?0.5:
                i/(network.levels.length-1)
                );

                ctx.setLineDash([7,3]);
                Visualizer.drawLevel(ctx,network.levels[i],
                    left,levelTop,
                    width,leveHeight,
                    i==network.levels.length-1?['🠉','🠈','🠊','🠋'] : [],i==0? true:false
                );
        }
        
    }

    static setTtitle(ctx,top,left){
        ctx.fillStyle = "white";
        const text = "Neural-network of the\nsmartest car\n(A visual presentation)";
        ctx.font = "17px hack ";
        const lineheight = 15;
        const lines = text.split('\n');
        for(let i=0;i<lines.length;i++){
            ctx.fillText(lines[i], left - 10, top-100+(i*lineheight));
        }
        
    }

    
    static drawLevel(ctx,level,left,top,width,height,lables,firstlevel){
        const right = left+width;
        const bottom = top+height;

        const {inputs,outputs,weights,baises} = level;

        const nodeRadius = 18;
        for(let i=0;i<inputs.length;i++){
            for(let j=0;j<outputs.length;j++){
                ctx.beginPath();
                ctx.moveTo(
                    Visualizer.#getNodex(inputs,i,left,right),bottom
                );
                ctx.lineTo(
                    Visualizer.#getNodex(outputs,j,left,right),top
                );

                ctx.lineWidth = 2;
               
                ctx.strokeStyle = getRGBA(weights[i][j]);
                ctx.setLineDash([3,3]);
                ctx.stroke();
            }
        }
        for(let i=0;i<inputs.length;i++){
                const x= Visualizer.#getNodex(inputs,i,left,right);
                ctx.beginPath();
                ctx.arc(x, bottom,nodeRadius,0,Math.PI*2);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, bottom,nodeRadius*0.7,0,Math.PI*2);
                ctx.fillStyle = getRGBA(inputs[i]);
                ctx.fill();
                if (firstlevel){
                    ctx.beginPath();
                    ctx.arc(x, bottom,nodeRadius*0.9,0,Math.PI*2);
                    ctx.strokeStyle = "orange";
                    ctx.setLineDash([1,3]);
                    ctx.stroke();
                }
 
        }

        for(let i=0;i<outputs.length;i++){
                const x= Visualizer.#getNodex(outputs,i,left,right);
                ctx.beginPath();
                ctx.arc(x, top,nodeRadius,0,Math.PI*2);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, top,nodeRadius*0.7,0,Math.PI*2);
                ctx.fillStyle = getRGBA(outputs[i]);
                ctx.fill();

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.arc(x, top,nodeRadius,0,Math.PI*2);
                ctx.strokeStyle = getRGBA(baises[i]);
                ctx.setLineDash([3,3]);
                ctx.stroke();
                ctx.setLineDash([]);

                if (lables[i]){
                    ctx.beginPath();
                    ctx.textAlign = "center";
                    ctx.textBaseine = "middle";
                    ctx.fillStyle = "red";
                    ctx.strokeStyle = "white";
                    ctx.font = (nodeRadius*1.5)+"px Arial"; 
                    ctx.fillText(lables[i],x,top+nodeRadius*0.45);
                    ctx.lineWidth = 0.5;
                    ctx.strokeText(lables[i], x,top+nodeRadius*0.45);
                }
        }

    }

    static #getNodex(nodes,index,left,right){
        return lerp(
            left,
            right,
            nodes.length==1
            ?0.5
            :index/(nodes.length-1)
        );
    }
}
