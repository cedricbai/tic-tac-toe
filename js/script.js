var the_start = "<div class='screen screen-start' id='start'>" +
				"<header><h1>Tic Tac Toe</h1>" +
                "<a href='#' class='button'>Start game</a></header></div>";
var the_end = "<div class='screen screen-win' id='finish'>" +
              "<header><h1>Tic Tac Toe</h1>" +
              " <p class='message'></p>" +
              "<a href='#'' class='button'>New game</a></header></div>";
var playO_turn = false;
$('body').append(the_start);
$('body').append(the_end);
var the_boxes = document.getElementsByClassName("box");
var winner = "";
window.onload = function() {
	$('#board').hide();
	$('#finish').hide();
	$('#start').show();
};

$(".button").on('click', function(){
	$('#start').hide();
	$('#finish').hide();
	$('#board').show();
	$('#player1').addClass('active');
	if($('#player2').hasClass('active'))
		$('#player2').removeClass('active')
	for(let i=0; i < the_boxes.length; i++)
	{
		if($(the_boxes[i]).hasClass('box-filled-1'))
		{
			$(the_boxes[i]).removeClass('box-filled-1');
			$(the_boxes[i]).css("background-image", "none");
		}
		if($(the_boxes[i]).hasClass('box-filled-2'))
		{
			$(the_boxes[i]).removeClass('box-filled-2');
			$(the_boxes[i]).css("background-image", "none");
		}
	}
	playO_turn = true;
});

$(".box").hover(function(){
	    if(!($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2'))){
		    if(playO_turn)
				$(this).css("background-image", "url(img/o.svg)");
			else
				$(this).css("background-image", "url(img/x.svg)");
			}
	    }, function(){
	    if(!($(this).hasClass('box-filled-1') || $(this).hasClass('box-filled-2')))
	    {
	    	$(this).css("background-image", "none");
		}
});

$(".box").click(function(){
	if(playO_turn)
	{
	    $('#player1').removeClass('active');
	    $('#player2').addClass('active');
		$(this).addClass('box-filled-1');
		$(this).css("background-image", "url(img/o.svg)");
		playO_turn = false;
	}
	else
	{
		$('#player2').removeClass('active');
	    $('#player1').addClass('active');
		$(this).addClass('box-filled-2');
		$(this).css("background-image", "url(img/x.svg)");
		playO_turn = true;
	}
	win_state();
});

var win_state = function() {
	var winning = [];
	$('.box').each(function(){
		if($(this).hasClass('box-filled-1'))
			winning.push("player1");
		else if($(this).hasClass('box-filled-2'))
			winning.push("player2");
		else
			winning.push("empty");
	});
	if(winning[0] != "empty" && winning[0] === winning[1] && winning[1] === winning[2])
	{
		show_winner(winning[0]);
	} else if (winning[3] != "empty" && winning[3] === winning[4] && winning[4] === winning[5])
	{
		show_winner(winning[3]);
	} else if (winning[6] != "empty" && winning[6] === winning[7] && winning[7] === winning[8])
	{
		show_winner(winning[6]);
	} else if (winning[0] != "empty" && winning[0] === winning[3] && winning[3] === winning[6])
	{
		show_winner(winning[0]);
	} else if (winning[1] != "empty" && winning[1] === winning[4] && winning[4] === winning[7])
	{
		show_winner(winning[1]);
	} else if (winning[2] != "empty" && winning[2] === winning[5] && winning[5] === winning[8])
	{
		show_winner(winning[2]);
	} else if (winning[0] != "empty" && winning[0] === winning[4] && winning[4] === winning[8])
	{
		show_winner(winning[0]);
	} else if (winning[2] != "empty" && winning[2] === winning[4] && winning[4] === winning[6])
	{
		show_winner(winning[2]);
	} else if (winning.includes("empty") === false)
	{
		var the_winner = "tie";
		show_winner(the_winner);
	}
};

var show_winner = function(the_winner) {
	if(the_winner === "player1")
	{
		$('#finish').addClass('screen-win-one');
		$('#finish').removeClass('screen-win-two');
		$('#finish').removeClass('screen-win-tie');
		$('.message').text("Winner");
		$('#board').hide();
		$('#finish').show();
		$('#start').hide();
	} else if(the_winner === "player2")
	{
		$('#finish').addClass('screen-win-two');
		$('#finish').removeClass('screen-win-one');
		$('#finish').removeClass('screen-win-tie');
		$('.message').text("Winner");
		$('#board').hide();
		$('#finish').show();
		$('#start').hide();
	} else
	{
		$('#finish').removeClass('screen-win-one');
		$('#finish').removeClass('screen-win-two');
		$('#finish').addClass('screen-win-tie');
		$('.message').text("It's a Tie!");
		$('#board').hide();
		$('#finish').show();
		$('#start').hide();
	}
}