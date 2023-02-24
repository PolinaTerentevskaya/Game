(function(){
	
	//  механика игры
	var Memory = {

		// карточка
		init: function(cards){
			//  доступ к классам
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// игровое поле
			this.cardsArray = $.merge(cards, cards);
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// раскладываем 
			this.setup();
		},

		// перемешиваются
		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		// раскладываем карты
		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		// если нажать
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		// при нажатии на карточку
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
						} else {
							_.guess = null;
							_.paused = true;
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				// если перевернуты все карточки
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		// показываем победное сообщение
		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		// открываем окно
		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		// закрываем окно
		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// перезапуск игры
		reset: function(){
			this.hideModal();
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// раскладываем 
			this.setup();
			// открываем игровое поле
			this.$game.show("slow");
		},

		// Тасование Фишера–Йетса
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		// как добавляются карточки на страницу
		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Question_mark.svg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	// карточки
	var cards = [
		{	
			name: "naruto",
			img: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Naruto_logo.svg",
			id: 1,
		},
		{
			name: "haykyuu",
			img: "https://upload.wikimedia.org/wikipedia/commons/4/43/Haikyuu%21%21_Logo.png",
			id: 2
		},
		{
			name: "attackontitan",
			img: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Shingeki%21_Kyojin_ch%C5%ABgakk%C5%8D_logo.png",
			id: 3
		},
		{
			name: "yourname",
			img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Hunter_%C3%97_Hunter_logo.png",
			id: 4
		}, 
		{
			name: "deathnote",
			img: "https://upload.wikimedia.org/wikipedia/commons/1/13/Death_Note_Logo_Kor.png",
			id: 5
		},
		{
			name: "magicbattle",
			img: "https://upload.wikimedia.org/wikipedia/commons/4/40/Logo_de_Jujutsu_Kaisen_0_La_pel%C3%ADcula.png",
			id: 6
		},
		{
			name: "noragami",
			img: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Noragami_logo.svg",
			id: 7
		},
		{
			name: "demoncleaverblade",
			img: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Kimetsu_no_Yaiba_logo.svg",
			id: 8
		},
		{
			name: "toradora",
			img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Toradora-Logo-Vector.svg",
			id: 9
		},
		{
			name: "promisedneverland",
			img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/The-promised-neverland-logo.svg",
			id: 10
		},
		{
			name: "bananfish",
			img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Banana_Fish_logo.svg",
			id: 11
		},
		{
			name: "tokiogoul",
			img: "https://upload.wikimedia.org/wikipedia/commons/0/09/Tokyo_Ghoul_logo_replica_monochrome.jpg",
			id: 12
		},
	];
    
	// запуск
	Memory.init(cards);


})();