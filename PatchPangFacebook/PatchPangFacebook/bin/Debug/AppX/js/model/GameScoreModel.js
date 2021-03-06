﻿/**
 * 게임 점수 모델
 * 
 * @returns
 */
var GameScoreModel = function() {

	var totalScore = 0;

	this.plus = function(nPoint) {
		totalScore += nPoint;

		this.notify("CHANGE_SCORE", {
			score : totalScore
		});
	};

	this.reset = function() {
		totalScore = 0;
		this.notify("CHANGE_SCORE", {
			score : totalScore
		});
	};

	this.getScore = function() {
		return totalScore;
	};
};

GameScoreModel.prototype = new Observable();
GameScoreModel.prototype.calculatePoint = function(result, combo) {

	var points = 0;
	var bonus = 0;

	_.each(result, function(o) {

		// 기본빵 점수는 갯수
		var n = o.indexes.length;
		points += 300 + [ n - 3 ] * 100;
		if( n-3 ){
			points += 100 + [n-4] * 200;
		}
		
		console.log("기본빵 점수: ", points, ' 터진갯수: ', n, '콤보: ', combo);		

		if (combo) {

			// 5 개 이하는 0.1씩 플러스

			// 5개 이상 ~ 10개 미만 1.1씩 플러스

			// 10 이상 ~ 20개 미만 3.1씩 플러스

			
			
//			if (combo < 5) {
//				bonus = Math.round(points * combo / 10);
//			} else if (5 <= combo && combo < 10) {
//				bonus = Math.round(points * (1 + combo / 10));
//			} else {
//				bonus = Math.round(points * (2 + combo / 10));
//			}
			
			if(combo > 1){
				bonus = points * [combo+1] * 1;
			}

			points += bonus;
		}

	});

	this.plus(points);
};

GameScoreModel.prototype.end = function() {
	this.notify("GAME_END");
};
