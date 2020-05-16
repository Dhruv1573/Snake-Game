function init()
{
	var canvas=document.getElementById('myCanvas');
	canvas.width=canvas.height=1000;
	w=canvas.width;
	h=canvas.height;
	pen=canvas.getContext('2d');
	cellsize=66;
	food_img = new Image();
	food_img.src = "Assets/apple.png";
	score=5;
	trophy = new Image();
	trophy.src = "Assets/trophy.png";
	food=getRandomFood();
	gameOver=false;
	snake={
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",
		createSnake:function()
		{
			for(var i=this.init_len;i>0;i--)
				this.cells.push({x:i,y:0});

		},
		drawSnake:function()
		{
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cellsize,this.cells[i].y*cellsize,cellsize-2,cellsize-2);
			}
		},
		updateSnake:function()
		{
			//console.log("updating snake");
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;
			if(headX==food.x && headY==food.y)
			{
				food=getRandomFood();
				score++;
			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;
			if(this.direction=="right")
			{
				nextX=headX+1;
				nextY=headY;
			}
			else if(this.direction=="left")
			{
				nextX=headX-1;
				nextY=headY;
			}
			else if(this.direction=="up")
			{
				nextX=headX;
				nextY=headY-1;
			}
			else if(this.direction=="down")
			{
				nextX=headX;
				nextY=headY+1;
			}

			this.cells.unshift({x:nextX,y:nextY});
			var lastX=Math.round(w/cellsize);
			var lastY=Math.round(h/cellsize);
			if(this.cells[0].y<0 || this.cells[0].x<0||this.cells[0].x>lastX || this.cells[0].y>lastY)
			{
				gameOver=true;
			}

		}
	};
	snake.createSnake();
	//Add a event Listener on Document Object
	function keypressed(e)
	{
		if(e.key=="ArrowRight")
		{
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft")
		{
			snake.direction="left";
		}
		else if(e.key=="ArrowDown")
		{
			snake.direction="down";
		}
		else if(e.key=="ArrowUp")
		{
			snake.direction="up";
		}
		//console.log(snake.direction);
	}
	document.addEventListener('keydown',keypressed);
}
function draw()
{
	pen.clearRect(0,0,w,h);
	snake.drawSnake();
	pen.drawImage(food_img,food.x*cellsize,food.y*cellsize,cellsize,cellsize);
	pen.drawImage(trophy,18,20,cellsize,cellsize);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);

}
function update()
{
	snake.updateSnake();

}
function getRandomFood()
{
	var foodX=Math.round(Math.random()*(w-cellsize)/cellsize);
	var foodY=Math.round(Math.random()*(h-cellsize)/cellsize);
	var food={
		x:foodX,
		y:foodY,
		color:"red",

	};
	return food
}
function gameLoop()
{
	if(gameOver==true)
	{
		clearInterval(f);
		alert("Game Over");
	}
	draw();
	update();
}
init();
var f=setInterval(gameLoop,100);