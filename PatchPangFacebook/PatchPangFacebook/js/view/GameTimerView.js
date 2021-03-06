﻿/**
 * 게임 타이머 뷰
 * 
 * @class
 * @returns
 */
var GameTimerView = function(model, collieLayer){
	this.model = model;
	this.layer = collieLayer;
	this.initialize();
	this.initModelEvent();
	this._check30 = false;
	this._check15 = false;
};

GameTimerView.prototype.initialize = function () {
    this.timerBackground = new collie.DisplayObject({
        x: 10,
        y: 100,
        backgroundImage: "timer_back"
    }).addTo(this.layer);

    this.timer = new collie.DisplayObject({
        backgroundImage: "timer",
        originX: "left"
    }).addTo(this.timerBackground);

    this.clock = new collie.DisplayObject({
        x: 0,
        y: 0,
        backgroundImage: "clock"
    }).addTo(this.timerBackground);

    this.clockTimer = collie.Timer.queue({
        useAutoStart: false,
        loop: 0
    }).transition(this.clock, 80, {
        to: -15,
        set: "angle"
    }).transition(this.clock, 80, {
	    to: 15,
	    set: "angle"
	});
};

GameTimerView.prototype.reset = function () {
    this._check30 = false;
    this._check15 = false;
    //this.timer.set("scaleX", 1);
    this.clockTimer.stop();
    this.clockTimer.reset();
};

GameTimerView.prototype.initModelEvent = function(){
	this.model.observe({
	    "CHANGE_TIME": function (oData) {
	        this.timer.set("scaleX", oData.percent * 0.93 + 0.07);

	        if (!this._check30 && oData.remainTime <= 30) {
	            // 30초
	            this._check30 = true;
	            Sound.start("left30");
	        }

	        if (!this._check15 && oData.remainTime <= 15) {
	            // 15초
	            this._check15 = true;
	            Sound.start("hurryup");
	            Sound.startFastBG();
	            this.clockTimer.start();
	        }
	    }.bind(this),

	    "END_TIME": function () {
	        this.reset();
	    }.bind(this),

	    "RESET_TIME": function () {
	        this.reset();
	    }.bind(this)
	});
};