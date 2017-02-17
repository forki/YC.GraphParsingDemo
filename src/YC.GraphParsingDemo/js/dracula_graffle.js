Raphael.fn.connection=function(obj1,obj2,style){
	var selfRef=this;
	var edge={
		draw:function(){
			var bb1=obj1.getBBox();
			var bb2=obj2.getBBox();
			var off1=0;
			var off2=0;
			var p=[
				{x:bb1.x+ bb1.width/2,y:bb1.y- off1},
				{x:bb1.x+ bb1.width/2,y:bb1.y+ bb1.height+ off1},
				{x:bb1.x- off1,y:bb1.y+ bb1.height/2},
				{x:bb1.x+ bb1.width+ off1,y:bb1.y+ bb1.height/2},
				{x:bb2.x+ bb2.width/2,y:bb2.y- off2},
				{x:bb2.x+ bb2.width/2,y:bb2.y+ bb2.height+ off2},
				{x:bb2.x- off2,y:bb2.y+ bb2.height/2},
				{x:bb2.x+ bb2.width+ off2,y:bb2.y+ bb2.height/2}
			];
			var d={},dis=[];
			for(var i=0;i<4;i++){
				for(var j=4;j<8;j++){
					var dx=Math.abs(p[i].x- p[j].x),dy=Math.abs(p[i].y- p[j].y);
					if((i==j- 4)||(((i!=3&&j!=6)||p[i].x<p[j].x)&&((i!=2&&j!=7)||p[i].x>p[j].x)&&((i!=0&&j!=5)||p[i].y>p[j].y)&&((i!=1&&j!=4)||p[i].y<p[j].y))){
						dis.push(dx+ dy);
						d[dis[dis.length- 1].toFixed(3)]=[i,j];
					}
				}
			}
			var res=dis.length==0?[0,4]:d[Math.min.apply(Math,dis).toFixed(3)];
			var x1=p[res[0]].x,
			    y1=p[res[0]].y,
			    x4=p[res[1]].x,
			    y4=p[res[1]].y,
			    dx=Math.max(Math.abs(x1- x4)/ 2, 10),
			    dy=Math.max(Math.abs(y1- y4)/ 2, 10),
			    x2=[x1,x1,x1- dx,x1+ dx][res[0]].toFixed(3),
			    y2=[y1- dy,y1+ dy,y1,y1][res[0]].toFixed(3),
			    x3=[0,0,0,0,x4,x4,x4- dx,x4+ dx][res[1]].toFixed(3),
			    y3=[0,0,0,0,y1+ dy,y1- dy,y4,y4][res[1]].toFixed(3);
			var path=["M",x1.toFixed(3),y1.toFixed(3),"C",x2,y2,x3,y3,x4.toFixed(3),y4.toFixed(3)].join(",");
			if(style&&style.directed){
				var mag=Math.sqrt((y4- y3)*(y4- y3)+(x4- x3)*(x4- x3));
				var norm=function(x,l){return(-x*(l||5)/mag);};
				var arr=[
				    {x:(norm(x4-x3)+norm(y4-y3)+x4).toFixed(3),
				     y:(norm(y4-y3)+norm(x4-x3)+y4).toFixed(3)},
				    {x:(norm(x4-x3)-norm(y4-y3)+x4).toFixed(3),
				     y:(norm(y4-y3)-norm(x4-x3)+y4).toFixed(3)}];
				path=path+",M"+arr[0].x+","+arr[0].y+",L"+x4+","+y4+",L"+arr[1].x+","+arr[1].y;}
edge.fg&&edge.fg.attr({path:path})||(edge.fg=selfRef.path(path).attr({stroke:style&&style.stroke||"#000",fill:"none"}).toBack());edge.bg&&edge.bg.attr({path:path})||style&&style.fill&&(edge.bg=style.fill.split&&selfRef.path(path).attr({stroke:style.fill.split("|")[0],fill:"none","stroke-width":style.fill.split("|")[1]||3}).toBack());style&&style.label&&(edge.label&&edge.label.attr({x:(x1+x4)/2, y:(y1+y4)/2}) 
||(edge.label=selfRef.text((x1+x4)/2, (y1+y4)/2, style.label).attr({fill: "#000", "font-size":"14px"})));
}}
	edge.draw();
	return edge;
};