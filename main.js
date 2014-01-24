var ticTacRef;
var IDs;
angular.module("TicTac", ["firebase"])
 .controller("boardCtrl", function($scope, $firebase){
 	
 	ticTacRef = new Firebase("https://cejuliustictac.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
		
	 		$scope.fbRoot.$add( { boxes:["","","","","","","","",""],
 	 			xTurn:true} );
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}

	});

 	$scope.takeTurn = function (i) {
		if ($scope.obj.boxes[i] == "") {
			$scope.obj.boxes[i] = $scope.obj.xTurn;
			if ($scope.obj.boxes[i] == $scope.obj.players[0].image) {
				$scope.obj.xTurn = $scope.obj.players[1].image
				
			} else {
				$scope.obj.xTurn = $scope.obj.players[0].image
			};
			$scope.obj.turnCounter++;
			$scope.obj.$save();
		} else {
			alert('TAKEN!')
		};
		if ($scope.obj.turnCounter >= 5) {
		 	$scope.obj.checkWin();
		};

 	});

	
	$scope.checkWin = function () {
		$scope.obj.winAry = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
			for (var i = 0; i < 8; i++) {
				if ($scope.obj.boxes[$scope.winAry[i][0]] == $scope.obj.boxes[$scope.winAry[i][1]] && $scope.obj.boxes[$scope.winAry[i][0]] == $scope.obj.boxes[$scope.winAry[i][2]] && $scope.obj.boxes[$scope.obj.winAry[i][0]] !== "") {
						if ($scope.xTurn == $scope.players[0].image){
							$scope.winner = "O WIN!";
							console.log($scope.turnCounter + " " + $scope.win)

						}
						else if ($scope.obj.xTurn == $scope.players[1].image){
							$scope.winner = "X WIN!";
							console.log($scope.turnCounter + " " + $scope.win)
						};
						$scope.obj.win = true;
			};
			if($scope.obj.turnCounter == 10 && $scope.obj.win==false) {
				alert('DRAW');
			}
		}
	};
};



