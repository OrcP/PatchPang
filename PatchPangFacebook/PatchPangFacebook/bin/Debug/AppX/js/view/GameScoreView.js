/**
 * 게임 점수 뷰
 * 
 * 
 * @returns
 */
var GameScoreView = function(model, collieLayer){
	
	this.model = model;
	this.layer = collieLayer;
	
	this.initialize();
	this.initModelEvent();
	//this.initViewItemEvent();
};

GameScoreView.prototype.initialize = function(){
	// 화면에 표시할 객체를 만든다
	this.dpScore = new collie.Text({
		x : 50,
		y : "bottom",
		width : 250, // 너비와 높이를 반드시 지정해야 합니다.
	    height : 100,
	    fontSize : 35,
	    fontColor : "#234"
	}).addTo(this.layer); // layer에 붙인다
	//this.dpScore.text("패치팡 시작!");
};

GameScoreView.prototype.initModelEvent = function(){
	this.model.observe({
		"CHANGE_SCORE" : function(e){
			this.dpScore.text(e.score);
			this.dpScore.detachAll("click");
		}.bind(this)
	});
};

GameScoreView.prototype.initViewItemEvent = function(){
	this.dpScore.attach({
		"click" : function(e){
			this.model.notify("GAME_START");
		}.bind(this)
	});
};