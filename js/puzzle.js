var imgSize;//画布尺寸
var img = new Image();//待拼图的图片
var tiles;//几行几列
var tileLen;//每一个方块的尺寸
var tileArr;//存储所有图片的数组，存储的是对象，对象有两个属性x，y，表示该方块在原图片坐标
var ctx;//绘图画笔
var emptyObj;//游戏的空白图片
//页面加载完毕，初始化绘图环境
function start() {
	var map = document.getElementById('puzzle')
	ctx = map.getContext('2d');
	imgSize = 600
	img.src = 'images/puzzle/puzzleone'


}
//给小图片注册事件,点击切换右边参考图片
function changeCankao(ele) {

	document.getElementById('cankao').src = ele.src;
}
//初始化游戏，切割图片
function initGame(num) {
	img.src = document.getElementById('cankao').src;//待拼图图片的初始化
	tiles = num;
	tileLen = imgSize / tiles;//每一个方块的尺寸
	tileArr = new Array()
	for (var i = 0; i < num; i++) {
		tileArr[i] = new Array();//初始化每一行数组
		for (var j = 0; j < num; j++) {
			var obj = new Object();
			obj.x = tiles - 1 - i;
			obj.y = tiles - 1 - j;
			tileArr[i][j] = obj;

		}
	}
	//做一块空白图片，放在0，0画布坐标
	emptyObj = new Object();
	emptyObj.i = 0;
	emptyObj.j = 0;

	//将二维数组对应的图片绘制出来
	redraw(tileArr)

}

//定义绘图函数
function redraw(arr) {
	//清空当前画布
	ctx.clearRect(0, 0, 600, 600)
	for (var i = 0; i < tiles; i++) {
		for (var j = 0; j < tiles; j++) {
			//当绘制的方块对应的在画布中的坐标等于空白图片在画布中的坐标，不绘制
			if (i == emptyObj.i && j == emptyObj.j) {

			}
			else {
				//求出原图片坐标
				var x = arr[i][j].x;
				var y = arr[i][j].y;
				//绘制每一个方块
				ctx.drawImage(img, x * tileLen, y * tileLen, tileLen, tileLen, i * tileLen, j * tileLen, tileLen, tileLen)

			}

		}

	}

}

//进行拼图
function move(e) {

	//获取点击方块坐标，画布坐标
	var si = Math.floor(e.offsetX / tileLen);
	var sj = Math.floor(e.offsetY / tileLen);
	var sx = tileArr[si][sj].x;
	var sy = tileArr[si][sj].y;
	//点击的坐标如果和空白图片相邻，互换位置
	if (Math.abs(si - emptyObj.i) + Math.abs(sj - emptyObj.j) == 1) {
		tileArr[emptyObj.i][emptyObj.j].x = sx;
		tileArr[emptyObj.i][emptyObj.j].y = sy;
		//点击的方块变成空白
		emptyObj.i = si
		emptyObj.j = sj;
	}
	var success = isSuccess(tileArr)
	//判断游戏是否完成
	if (success) {
		//在画布中重新绘制整个图片
		ctx.drawImage(img, 0, 0, imgSize, imgSize, 0, 0, imgSize, imgSize)
		//提示恭喜过关
		ctx.font = "bold 50px Georgia";
		ctx.fillStyle = 'green'
		ctx.fillText("恭喜过关!", 300, 300);


	}
	else {
		//重新绘图
		redraw(tileArr)

	}

}

//判断游戏是否完成
function isSuccess(arr) {
	var success = true;
	for (var i = 0; i < tiles; i++) {
		for (var j = 0; j < tiles; j++) {
			//如果不是空白图片，比对
			if (i != emptyObj.i || j != emptyObj.j) {

				//判断当前ij和arr[i][j]里面的xy是否重合
				if (i != arr[i][j].x || j != arr[i][j].y) {
					success = false;
					break;
				}
			}
		}
	}

	return success;

}
