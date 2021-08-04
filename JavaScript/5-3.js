var timer;
var start;
var isStarted = false;　//タイマーの起動フラグtrue=タイマーオン、false=タイマーオフ

//DOMで操作する要素を代入
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var resetButton = document.getElementById('reset');
var watch = document.querySelector('.stopwatch p');　//CSSの書き方でどいつのことか指定できる
//querySelector…引数に指定した用語がCSSにある場合かどうか検索するDOMメゾット

//イベント監視
startButton.addEventListener('click', watchStart, false);
stopButton.addEventListener('click', watchStop, false);
resetButton.addEventListener('click', watchReset, false);

//開始ボタンのイベントハンドラー
function watchStart() {
	if (!isStarted) {  //既にタイマーが起動しているかチェック
		start = new Date();	//日付、時刻に関するデータをもったオブジェクトの生成
		timer = setInterval(updateWatch, 1000 / 60); //setInterval(定期的に実行したい関数,実行する[ミリ秒]);
		//16ミリ秒ごとにupdateWatchの関数が実行される
		isStarted = true;
	}
}

//停止ボタンのイベントハンドラー
function watchStop() {
	if (isStarted) {
		clearInterval(timer);
		isStarted = false;
	}
}

//リセットボタンのイベントハンドラー
function watchReset() {
	watchStop(); //これがないと一瞬00:00:000表示になるだけ
	watch.innerHTML = "00:00:00:000";
}

//計測中の時刻計算用関数
function updateWatch() {
	//経過時間を計算
	var now = new Date();　//
	var diff = now.getTime() - start.getTime(); //今の時間　ー　開始ボタンが押されたときの時間　=　経過時間
	//getTime()は1970年1月1日0時0分0秒から経過した「ミリ秒」を出す

	//時、分、秒、ミリ秒をそれぞれ計算 Math.floor = 小数点を切り捨てる
	var hour = Math.floor(diff / 3600000);　//1時間は3600000ミリ秒(60*60*1000)なので、商が時間
	var minute = Math.floor(diff / 60000 % 60); //1分は6000ミリ秒(60*1000)なので、商を60で割った余りが分
	var second = Math.floor(diff / 1000 % 60);　//1秒は1000ミリ秒なので、商を60で割った余りが秒
	var milliSecond = Math.floor(diff % 1000);　//1秒は1000ミリ秒なので、その余りがミリ秒

	//表示用に桁数を合わせる
	if (hour < 10) {
		hour = '0' + hour;
	}

	if (minute < 10) {
		minute = '0' + minute;
	}

	if (minute < 10) {
		second = '0' + second;
	}

	if (milliSecond < 100) {
		if (milliSecond < 10) {
			milliSecond = '00' + milliSecond;
		}
		else {
			milliSecond = '0' + milliSecond;
		}
	}

	//タイマー要素に書き出し
	watch.innerHTML = hour + ':' + minute + ':' + second + ':' + milliSecond;
}