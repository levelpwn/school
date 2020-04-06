

//<![CDATA[

<!--


function Client(){
//if not a DOM browser, hopeless
	this.min = false; if (document.getElementById){this.min = true;};

	this.ua = navigator.userAgent;
	this.name = navigator.appName;
	this.ver = navigator.appVersion;  

//Get data about the browser
	this.mac = (this.ver.indexOf('Mac') != -1);
	this.win = (this.ver.indexOf('Windows') != -1);

//Look for Gecko
	this.gecko = (this.ua.indexOf('Gecko') > 1);
	if (this.gecko){
		this.geckoVer = parseInt(this.ua.substring(this.ua.indexOf('Gecko')+6, this.ua.length));
		if (this.geckoVer < 20020000){this.min = false;}
	}
	
//Look for Firebird
	this.firebird = (this.ua.indexOf('Firebird') > 1);
	
//Look for Safari
	this.safari = (this.ua.indexOf('Safari') > 1);
	if (this.safari){
		this.gecko = false;
	}
	
//Look for IE
	this.ie = (this.ua.indexOf('MSIE') > 0);
	if (this.ie){
		this.ieVer = parseFloat(this.ua.substring(this.ua.indexOf('MSIE')+5, this.ua.length));
		if (this.ieVer < 5.5){this.min = false;}
	}
	
//Look for Opera
	this.opera = (this.ua.indexOf('Opera') > 0);
	if (this.opera){
		this.operaVer = parseFloat(this.ua.substring(this.ua.indexOf('Opera')+6, this.ua.length));
		if (this.operaVer < 7.04){this.min = false;}
	}
	if (this.min == false){
		alert('Your browser may not be able to handle this page.');
	}
	
//Special case for the horrible ie5mac
	this.ie5mac = (this.ie&&this.mac&&(this.ieVer<6));
}

var C = new Client();

//for (prop in C){
//	alert(prop + ': ' + C[prop]);
//}



//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

//[strNavBarJS]
function NavBtnOver(Btn){
	if (Btn.className != 'NavButtonDown'){Btn.className = 'NavButtonUp';}
}

function NavBtnOut(Btn){
	Btn.className = 'NavButton';
}

function NavBtnDown(Btn){
	Btn.className = 'NavButtonDown';
}
//[/strNavBarJS]

function FuncBtnOver(Btn){
	if (Btn.className != 'FuncButtonDown'){Btn.className = 'FuncButtonUp';}
}

function FuncBtnOut(Btn){
	Btn.className = 'FuncButton';
}

function FuncBtnDown(Btn){
	Btn.className = 'FuncButtonDown';
}

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
//	RefreshImages();
//
}

function ShowElements(Show, TagName){
//Special for IE bug -- hide all the form elements that will show through the popup
	if (C.ie){
		var Els = document.getElementsByTagName(TagName);
		for (var i=0; i<Els.length; i++){
			if (Show == true){
				Els[i].style.display = 'inline';
			}
			else{
				Els[i].style.display = 'none';
			}
		}
	} 
}

function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
	if (Finished == true){
		Finish();
	}
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].clientWidth;
	this.H = document.getElementsByTagName('body')[0].clientHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (document.documentElement && document.documentElement.scrollTop){
		return document.documentElement.scrollTop;
	}
	else{
		if (document.body){
 			return document.body.scrollTop;
		}
		else{
			return window.pageYOffset;
		}
	}
}

function GetViewportHeight(){
	if (window.innerHeight){
		return window.innerHeight;
	}
	else{
		return document.getElementsByTagName('body')[0].clientHeight;
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	if (C.ie) {
		thisKey = window.event.keyCode;
	}
	else {
		thisKey = e.keyCode;
	}

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
	}

	if (Suppress == true){
		if (C.ie){
			window.event.returnValue = false;	
			window.event.cancelBubble = true;
		}
		else{
			e.preventDefault();
		}
	}
}

if (C.ie){
	document.attachEvent('onkeydown',SuppressBackspace);
	window.attachEvent('onkeydown',SuppressBackspace);
}
else{
	if (window.addEventListener){
		window.addEventListener('keypress',SuppressBackspace,false);
	}
}

function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

	RefreshImages();

}



Imgs = new Array();

function PreloadImages(){
	var a = PreloadImages.arguments;
	for (var i=0; i<a.length; i++){
		Imgs[i] = new Image();
		Imgs[i].src = a[i];
	}
}

function RefreshImages(){
	for (var i=0; i<document.images.length; i++){
		if (document.images[i].name.substring(0,6) != 'NavBar'){
			document.images[i].src = document.images[i].src;
		}
	}
}


function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}

//EXTENSION TO ARRAY OBJECT
function Array_IndexOf(Input){
	var Result = -1;
	for (var i=0; i<this.length; i++){
		if (this[i] == Input){
			Result = i;
		}
	}
	return Result;
}
Array.prototype.indexOf = Array_IndexOf;

//IE HAS RENDERING BUG WITH BOTTOM NAVBAR
function RemoveBottomNavBarForIE(){
	if ((C.ie)&&(document.getElementById('Reading') != null)){
		if (document.getElementById('BottomNavBar') != null){
			document.getElementById('TheBody').removeChild(document.getElementById('BottomNavBar'));
		}
	}
}




//HOTPOTNET-RELATED CODE

var HPNStartTime = (new Date()).getTime();
var SubmissionTimeout = 30000;
var Detail = ''; //Global that is used to submit tracking data

function Finish(){
//If there's a form, fill it out and submit it
	if (document.store != null){
		Frm = document.store;
		Frm.starttime.value = HPNStartTime;
		Frm.endtime.value = (new Date()).getTime();
		Frm.mark.value = Score;
		Frm.detail.value = Detail;
		Frm.submit();
	}
}



//JQUIZ CORE JAVASCRIPT CODE

var CurrQNum = 0;
var CorrectIndicator = '<img src="images/icons/aplause.gif" alt="aplause.gif" title="aplause" width="18" height="18" style="margin: auto;"></img>';
var IncorrectIndicator = '<img src="images/icons/no.gif" alt="no.gif" title="no" width="22" height="18" style="margin: auto;"></img>';
var YourScoreIs = '&#x03A4;&#x03BF; &#x03C0;&#x03BF;&#x03C3;&#x03BF;&#x03C3;&#x03C4;&#x03CC; &#x03B5;&#x03C0;&#x03B9;&#x03C4;&#x03C5;&#x03C7;&#x03AF;&#x03B1;&#x03C2; &#x03C3;&#x03B1;&#x03C2; &#x03B5;&#x03AF;&#x03BD;&#x03B1;&#x03B9; ';
var ContinuousScoring = true;
var CorrectFirstTime = 'Anuo?oaeo ?io a?aio?eceai ouooU ia oci ?n?oc oinU: ';
var ShowCorrectFirstTime = true;
var ShuffleQs = false;
var ShuffleAs = true;
var DefaultRight = '&#x03A3;&#x03C9;&#x03C3;&#x03C4;&#x03AC;!';
var DefaultWrong = '&#x0394;&#x03B5;&#x03BD; &#x03C0;&#x03B5;&#x03B9;&#x03C1;&#x03AC;&#x03B6;&#x03B5;&#x03B9;. &#x03A0;&#x03C1;&#x03BF;&#x03C3;&#x03C0;&#x03B1;&#x03B8;&#x03AE;&#x03C3;&#x03C4;&#x03B5; &#x03C0;&#x03AC;&#x03BB;&#x03B9;!';
var QsToShow = 8;
var Score = 0;
var Finished = false;
var Qs = null;
var QArray = new Array();
var ShowingAllQuestions = false;
var ShowAllQuestionsCaption = '&#x03A0;&#x03C1;&#x03BF;&#x03B2;&#x03BF;&#x03BB;&#x03AE; &#x03CC;&#x03BB;&#x03C9;&#x03BD; &#x03C4;&#x03C9;&#x03BD; &#x03B5;&#x03C1;&#x03C9;&#x03C4;&#x03AE;&#x03C3;&#x03B5;&#x03C9;&#x03BD;';
var ShowOneByOneCaption = '&#x03A0;&#x03C1;&#x03BF;&#x03B2;&#x03BF;&#x03BB;&#x03AE; &#x03BC;&#x03B9;&#x03B1;&#x03C2; &#x03B5;&#x03C1;&#x03CE;&#x03C4;&#x03B7;&#x03C3;&#x03B7;&#x03C2; &#x03BA;&#x03AC;&#x03B8;&#x03B5; &#x03C6;&#x03BF;&#x03C1;&#x03AC;';
var State = new Array();
var Feedback = '';
var TimeOver = false;
var strInstructions = '';

//The following variable can be used to add a message explaining that
//the question is finished, so no further marking will take place.
var strQuestionFinished = '';

function CompleteEmptyFeedback(){
	var QNum, ANum;
	for (QNum=0; QNum<I.length; QNum++){
//Only do this if not multi-select
		if (I[QNum][2] != '3'){
  		for (ANum = 0; ANum<I[QNum][3].length; ANum++){
  			if (I[QNum][3][ANum][1].length < 1){
  				if (I[QNum][3][ANum][2] > 0){
  					I[QNum][3][ANum][1] = DefaultRight;
  				}
  				else{
  					I[QNum][3][ANum][1] = DefaultWrong;
  				}
  			}
  		}
		}
	}
}

function SetUpQuestions(){
	var AList = new Array(); 
	var QList = new Array();
	var i, j;
	Qs = document.getElementById('Questions');
	while (Qs.getElementsByTagName('li').length > 0){
		QList.push(Qs.removeChild(Qs.getElementsByTagName('li')[0]));
	}
	var DumpItem = 0;
	if (QsToShow > QList.length){
		QsToShow = QList.length;
	}
	while (QsToShow < QList.length){
		DumpItem = Math.floor(QList.length*Math.random());
		for (j=DumpItem; j<(QList.length-1); j++){
			QList[j] = QList[j+1];
		}
		QList.length = QList.length-1;
	}
	if (ShuffleQs == true){
		QList = Shuffle(QList);
	}
	if (ShuffleAs == true){
		var As;
		for (var i=0; i<QList.length; i++){
			As = QList[i].getElementsByTagName('ol')[0];
			if (As != null){
  			AList.length = 0;
				while (As.getElementsByTagName('li').length > 0){
					AList.push(As.removeChild(As.getElementsByTagName('li')[0]));
				}
				AList = Shuffle(AList);
				for (j=0; j<AList.length; j++){
					As.appendChild(AList[j]);
				}
			}
		}
	}
	
	for (i=0; i<QList.length; i++){
		Qs.appendChild(QList[i]);
		QArray[QArray.length] = QList[i];
	}

//Show the first item
	QArray[0].style.display = '';
	
//Now hide all except the first item
	for (i=1; i<QArray.length; i++){
		QArray[i].style.display = 'none';
	}		
	SetQNumReadout();
	
	SetFocusToTextbox();
}

function SetFocusToTextbox(){
//if there's a textbox, set the focus in it
	if (QArray[CurrQNum].getElementsByTagName('input')[0] != null){
		QArray[CurrQNum].getElementsByTagName('input')[0].focus();
//and show a keypad if there is one
		if (document.getElementById('CharacterKeypad') != null){
			document.getElementById('CharacterKeypad').style.display = 'block';
		}
	}
	else{
  	if (QArray[CurrQNum].getElementsByTagName('textarea')[0] != null){
  		QArray[CurrQNum].getElementsByTagName('textarea')[0].focus();	
//and show a keypad if there is one
			if (document.getElementById('CharacterKeypad') != null){
				document.getElementById('CharacterKeypad').style.display = 'block';
			}
		}
//This added for 6.0.4.11: hide accented character buttons if no textbox
		else{
			if (document.getElementById('CharacterKeypad') != null){
				document.getElementById('CharacterKeypad').style.display = 'none';
			}
		}
	}
}

function ChangeQ(ChangeBy){
//The following line prevents moving to another question until the current
//question is answered correctly. Uncomment it to enable this behaviour. 
//	if (State[CurrQNum][0] == -1){return;}
	if (((CurrQNum + ChangeBy) < 0)||((CurrQNum + ChangeBy) >= QArray.length)){return;}
	QArray[CurrQNum].style.display = 'none';
	CurrQNum += ChangeBy;
	QArray[CurrQNum].style.display = '';
//Undocumented function added 10/12/2004
	ShowSpecialReadingForQuestion();
	SetQNumReadout();
	SetFocusToTextbox();
}

var HiddenReadingShown = false;
function ShowSpecialReadingForQuestion(){
//Undocumented function for showing specific reading text elements which change with each question
//Added on 10/12/2004
	if (document.getElementById('ReadingDiv') != null){
		if (HiddenReadingShown == true){
			document.getElementById('ReadingDiv').innerHTML = '';
		}
		if (QArray[CurrQNum] != null){
			var Children = QArray[CurrQNum].childNodes;
			for (var i=0; i<Children.length; i++){
			if (Children[i].className=="HiddenReading"){
					document.getElementById('ReadingDiv').innerHTML = Children[i].innerHTML;
					HiddenReadingShown = true;
//Hide the ShowAllQuestions button to avoid confusion
					if (document.getElementById('ShowMethodButton') != null){
						document.getElementById('ShowMethodButton').style.display = 'none';
					}
				}
			}	
		}
	}
}

function SetQNumReadout(){
	document.getElementById('QNumReadout').innerHTML = (CurrQNum+1) + ' / ' + QArray.length;
	if ((CurrQNum+1) >= QArray.length){
		if (document.getElementById('NextQButton') != null){
			document.getElementById('NextQButton').style.visibility = 'hidden';
		}
	}
	else{
		if (document.getElementById('NextQButton') != null){
			document.getElementById('NextQButton').style.visibility = 'visible';
		}
	}
	if (CurrQNum <= 0){
		if (document.getElementById('PrevQButton') != null){
			document.getElementById('PrevQButton').style.visibility = 'hidden';
		}
	}
	else{
		if (document.getElementById('PrevQButton') != null){
			document.getElementById('PrevQButton').style.visibility = 'visible';
		}
	}
}

I=new Array();
I[0]=new Array();I[0][0]=100;
I[0][1]='';
I[0][2]='0';
I[0][3]=new Array();
I[0][3][0]=new Array('\u0391\u03C0\u03CC\u03C6\u03B1\u03C3\u03B7 \u03C4\u03BF\u03C5 \u03AF\u03B4\u03B9\u03BF\u03C5 \u03C4\u03BF\u03C5 \u0391\u03B2\u03C1\u03B1\u03AC\u03BC','',0,0,1);
I[0][3][1]=new Array('\u0391\u03C0\u03CC\u03C6\u03B1\u03C3\u03B7 \u03C4\u03BF\u03C5 \u0399\u03C3\u03C1\u03B1\u03B7\u03BB\u03B9\u03C4\u03B9\u03BA\u03BF\u03CD \u03BB\u03B1\u03BF\u03CD','',0,0,1);
I[0][3][2]=new Array('\u0395\u03BD\u03C4\u03BF\u03BB\u03AE \u03C4\u03BF\u03C5 \u0398\u03B5\u03BF\u03CD','\u039F \u0398\u03B5\u03CC\u03C2 \u03B4\u03B9\u03AD\u03C4\u03B1\u03BE\u03B5 \u03C4\u03BF\u03BD \u0391\u03B2\u03C1\u03B1\u03AC\u03BC \u03BD\u03B1 \u03C6\u03CD\u03B3\u03B5\u03B9 \u03B1\u03C0\u03CC \u03C4\u03B7 \u03B3\u03B7 \u03C4\u03BF\u03C5 \u03BA\u03B1\u03B9 \u03BD\u03B1 \u03C0\u03BF\u03C1\u03B5\u03C5\u03B8\u03B5\u03AF \u03C0\u03C1\u03BF\u03C2 \u03C4\u03B7\u03BD \u03BA\u03B1\u03C4\u03B5\u03CD\u03B8\u03C5\u03BD\u03C3\u03B7 \u03C0\u03BF\u03C5 \u03B8\u03B1 \u03C4\u03BF\u03C5 \u03C5\u03C0\u03B5\u03B4\u03B5\u03AF\u03BA\u03BD\u03C5\u03B5 \u03BF \u038A\u03B4\u03B9\u03BF\u03C2. \u039F \u0391\u03B2\u03C1\u03B1\u03AC\u03BC \u03B1\u03BD\u03C4\u03B1\u03C0\u03BF\u03BA\u03C1\u03AF\u03B8\u03B7\u03BA\u03B5 \u03BC\u03B5 \u03C0\u03AF\u03C3\u03C4\u03B7 \u03BA\u03B1\u03B9 \u03AD\u03C4\u03C3\u03B9 \u03BA\u03BB\u03B7\u03C1\u03BF\u03BD\u03CC\u03BC\u03B7\u03C3\u03B5 \u03C4\u03B7 \u00AB\u03B3\u03B7 \u03C4\u03B7\u03C2 \u03B5\u03C0\u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1\u03C2\u00BB.',1,100,1);
I[1]=new Array();I[1][0]=100;
I[1][1]='';
I[1][2]='0';
I[1][3]=new Array();
I[1][3][0]=new Array('\u03A4\u03B7 \u03C3\u03C5\u03BC\u03C0\u03B1\u03C1\u03AC\u03C3\u03C4\u03B1\u03C3\u03B7 \u03C4\u03BF\u03C5 \u0398\u03B5\u03BF\u03CD \u03C0\u03C1\u03BF\u03C2 \u03C4\u03BF\u03BD \u0391\u03B2\u03C1\u03B1\u03AC\u03BC','',0,0,1);
I[1][3][1]=new Array('\u03A4\u03B7\u03BD \u0391\u03B3\u03AF\u03B1 \u03A4\u03C1\u03B9\u03AC\u03B4\u03B1','\u039F\u03B9 \u03C4\u03C1\u03B5\u03B9\u03C2 \u03AC\u03B3\u03B3\u03B5\u03BB\u03BF\u03B9 \u03B8\u03B5\u03C9\u03C1\u03AE\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C0\u03CC \u03C4\u03BF\u03C5\u03C2 \u03A0\u03B1\u03C4\u03AD\u03C1\u03B5\u03C2 \u03C4\u03B7\u03C2 \u0395\u03BA\u03BA\u03BB\u03B7\u03C3\u03AF\u03B1\u03C2 \u03C9\u03C2 \u03C4\u03CD\u03C0\u03BF\u03C2 \u03C4\u03B7\u03C2 \u0391\u03B3\u03AF\u03B1\u03C2 \u03A4\u03C1\u03B9\u03AC\u03B4\u03B1\u03C2.',1,100,1);
I[1][3][2]=new Array('\u03A4\u03B9\u03C2 \u03BF\u03C5\u03C1\u03AC\u03BD\u03B9\u03B5\u03C2 \u03B4\u03C5\u03BD\u03AC\u03BC\u03B5\u03B9\u03C2','',0,0,1);
I[2]=new Array();I[2][0]=100;
I[2][1]='';
I[2][2]='0';
I[2][3]=new Array();
I[2][3][0]=new Array('\u0391\u03B3\u03AC\u03C0\u03B7','',0,0,1);
I[2][3][1]=new Array('\u03A0\u03AF\u03C3\u03C4\u03B7','\u0397 \u03C0\u03AF\u03C3\u03C4\u03B7 \u03C4\u03BF\u03C5 \u0391\u03B2\u03C1\u03B1\u03AC\u03BC \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03AF \u03C4\u03BF \u03C0\u03C1\u03CC\u03C4\u03C5\u03C0\u03BF \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03C0\u03AF\u03C3\u03C4\u03B7 \u03CC\u03BB\u03C9\u03BD \u03C4\u03C9\u03BD \u03A7\u03C1\u03B9\u03C3\u03C4\u03B9\u03B1\u03BD\u03CE\u03BD. \u039C\u03AD\u03C3\u03B1 \u03B1\u03C0\u03CC \u03C4\u03B9\u03C2 \u03B1\u03BD\u03C4\u03B9\u03BE\u03BF\u03CC\u03C4\u03B7\u03C4\u03B5\u03C2 \u03C4\u03B7\u03C2 \u03B6\u03C9\u03AE\u03C2 \u03C4\u03BF \u03C0\u03B1\u03BD\u03C4\u03BF\u03B4\u03CD\u03BD\u03B1\u03BC\u03BF \u03C7\u03AD\u03C1\u03B9 \u03C4\u03BF\u03C5 \u0398\u03B5\u03BF\u03CD \u03BA\u03B1\u03B8\u03BF\u03B4\u03B7\u03B3\u03B5\u03AF \u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03C3\u03C9\u03C0\u03B9\u03BA\u03AE \u03BA\u03B1\u03B9 \u03C3\u03C5\u03BB\u03BB\u03BF\u03B3\u03B9\u03BA\u03AE \u03B9\u03C3\u03C4\u03BF\u03C1\u03AF\u03B1 \u03BC\u03B1\u03C2 \u03C0\u03C1\u03BF\u03C2 \u03C4\u03B7 \u03C3\u03C9\u03C4\u03B7\u03C1\u03AF\u03B1.',1,100,1);
I[2][3][2]=new Array('\u0394\u03B9\u03BA\u03B1\u03B9\u03BF\u03C3\u03CD\u03BD\u03B7','',0,0,1);
I[3]=new Array();I[3][0]=100;
I[3][1]='';
I[3][2]='0';
I[3][3]=new Array();
I[3][3][0]=new Array('\u039F \u0399\u03C9\u03C3\u03AE\u03C6 \u03B5\u03C5\u03BB\u03BF\u03B3\u03B5\u03AF \u03C4\u03BF\u03BD \u039C\u03B1\u03BD\u03B1\u03C3\u03C3\u03AE','',0,0,1);
I[3][3][1]=new Array('\u039F \u0391\u03B2\u03C1\u03B1\u03AC\u03BC \u03B5\u03C5\u03BB\u03BF\u03B3\u03B5\u03AF \u03C4\u03BF\u03BD \u0399\u03C3\u03B1\u03AC\u03BA','',0,0,1);
I[3][3][2]=new Array('\u039F \u0399\u03C3\u03B1\u03AC\u03BA \u03B5\u03C5\u03BB\u03BF\u03B3\u03B5\u03AF \u03C4\u03BF\u03BD \u039B\u03C9\u03C4','',0,0,1);
I[3][3][3]=new Array('\u039F \u0399\u03C3\u03B1\u03AC\u03BA \u03B5\u03C5\u03BB\u03BF\u03B3\u03B5\u03AF \u03C4\u03BF\u03BD \u0399\u03B1\u03BA\u03CE\u03B2','\u039F \u03B4\u03B5\u03C5\u03C4\u03B5\u03C1\u03CC\u03C4\u03BF\u03BA\u03BF\u03C2 \u0399\u03B1\u03BA\u03CE\u03B2 \u03B1\u03C0\u03AD\u03C3\u03C0\u03B1\u03C3\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C5\u03BB\u03BF\u03B3\u03AF\u03B1 \u03C4\u03BF\u03C5 \u0399\u03C3\u03B1\u03AC\u03BA \u03C0\u03C1\u03BF\u03C3\u03C0\u03BF\u03B9\u03BF\u03CD\u03BC\u03B5\u03BD\u03BF\u03C2 \u03CC\u03C4\u03B9 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BF \u03C0\u03C1\u03C9\u03C4\u03CC\u03C4\u03BF\u03BA\u03BF\u03C2 \u03B1\u03B4\u03B5\u03BB\u03C6\u03CC\u03C2 \u03C4\u03BF\u03C5 \u0397\u03C3\u03B1\u03CD.',1,100,1);
I[4]=new Array();I[4][0]=100;
I[4][1]='';
I[4][2]='0';
I[4][3]=new Array();
I[4][3][0]=new Array('\u03A3\u03C9\u03C3\u03C4\u03CC','',0,0,1);
I[4][3][1]=new Array('\u039B\u03AC\u03B8\u03BF\u03C2','\u039D\u03B1\u03B9, \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BB\u03AC\u03B8\u03BF\u03C2! \u03A0\u03C1\u03CC\u03BA\u03B5\u03B9\u03C4\u03B1\u03B9 \u03B3\u03B9\u03B1 \u03C0\u03B1\u03C1\u03AC\u03C3\u03C4\u03B1\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03BA\u03BB\u03AF\u03BC\u03B1\u03BA\u03B1\u03C2 \u03C4\u03BF\u03C5 \u0399\u03B1\u03BA\u03CE\u03B2, \u03B7 \u03BF\u03C0\u03BF\u03AF\u03B1 \u03C3\u03C5\u03BD\u03B4\u03AD\u03B5\u03B9 \u03C4\u03BF\u03BD \u03BF\u03C5\u03C1\u03B1\u03BD\u03CC \u03BC\u03B5 \u03C4\u03B7 \u03B3\u03B7.',1,100,1);
I[5]=new Array();I[5][0]=100;
I[5][1]='';
I[5][2]='0';
I[5][3]=new Array();
I[5][3][0]=new Array('\u039F \u0391\u03B2\u03C1\u03B1\u03AC\u03BC \u03BA\u03B1\u03B9 \u03BF\u03B9 \u03B4\u03BF\u03CD\u03BB\u03BF\u03B9 \u03C4\u03BF\u03C5','',0,0,1);
I[5][3][1]=new Array('\u039F \u0399\u03B1\u03BA\u03CE\u03B2 \u03BA\u03B1\u03B9 \u03BF\u03B9 \u03B3\u03B9\u03BF\u03B9 \u03C4\u03BF\u03C5','\u039F\u03B9 \u03B3\u03B9\u03BF\u03B9 \u03C4\u03BF\u03C5 \u0399\u03B1\u03BA\u03CE\u03B2 \u03B1\u03BD\u03B1\u03B3\u03B3\u03AD\u03BB\u03BB\u03BF\u03C5\u03BD \u03C3\u03C4\u03BF\u03BD \u03C0\u03B1\u03C4\u03AD\u03C1\u03B1 \u03C4\u03BF\u03C5\u03C2 \u03CC\u03C4\u03B9 \u03C4\u03BF\u03BD \u03B1\u03B4\u03B5\u03BB\u03C6\u03CC \u03C4\u03BF\u03C5\u03C2 \u0399\u03C9\u03C3\u03AE\u03C6 \u03C4\u03BF\u03BD \u03AD\u03C6\u03B1\u03B3\u03B5 \u03BA\u03AC\u03C0\u03BF\u03B9\u03BF \u03AC\u03B3\u03C1\u03B9\u03BF \u03B8\u03B7\u03C1\u03AF\u03BF.',1,100,1);
I[5][3][2]=new Array('\u039F \u0399\u03C9\u03C3\u03AE\u03C6 \u03BA\u03B1\u03B9 \u03BF\u03B9 \u03B1\u03B4\u03B5\u03BB\u03C6\u03BF\u03AF \u03C4\u03BF\u03C5','',0,0,1);
I[6]=new Array();I[6][0]=100;
I[6][1]='';
I[6][2]='0';
I[6][3]=new Array();
I[6][3][0]=new Array('\u0391\u03B9\u03B3\u03C5\u03C0\u03C4\u03B9\u03B1\u03BA\u03AE','\u03A0\u03C1\u03CC\u03BA\u03B5\u03B9\u03C4\u03B1\u03B9 \u03B3\u03B9\u03B1 \u03BF\u03BD\u03B5\u03B9\u03C1\u03BF\u03BA\u03C1\u03AF\u03C4\u03B7 \u03C0\u03B5\u03C1\u03AF\u03C0\u03BF\u03C5 \u03B1\u03C0\u03CC \u03C4\u03B7\u03BD \u03B5\u03C0\u03BF\u03C7\u03AE \u03C4\u03BF\u03C5 \u0399\u03C9\u03C3\u03AE\u03C6. \u039F \u03AF\u03B4\u03B9\u03BF\u03C2 \u03BF \u0399\u03C9\u03C3\u03AE\u03C6 \u03C0\u03B1\u03C1\u03BF\u03C5\u03C3\u03B9\u03AC\u03B6\u03B5\u03C4\u03B1\u03B9 \u03C3\u03C4\u03B7 \u0393\u03AD\u03BD\u03B5\u03C3\u03B7 \u03C9\u03C2 \u03B4\u03B5\u03B9\u03BD\u03CC\u03C2 \u03BF\u03BD\u03B5\u03B9\u03C1\u03BF\u03BA\u03C1\u03AF\u03C4\u03B7\u03C2.',1,100,1);
I[6][3][1]=new Array('\u039B\u03B1\u03C4\u03B9\u03BD\u03B9\u03BA\u03AE','',0,0,1);
I[6][3][2]=new Array('\u0395\u03B2\u03C1\u03B1\u03CA\u03BA\u03AE','',0,0,1);
I[6][3][3]=new Array('\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE','',0,0,1);
I[6][3][4]=new Array('\u0392\u03B1\u03B2\u03C5\u03BB\u03C9\u03BD\u03B9\u03B1\u03BA\u03AE','',0,0,1);
I[7]=new Array();I[7][0]=100;
I[7][1]='';
I[7][2]='0';
I[7][3]=new Array();
I[7][3][0]=new Array('\u0388\u03BD\u03B1\u03BD \u03A0\u03AD\u03C1\u03C3\u03B7 \u03C5\u03C0\u03B7\u03C1\u03AD\u03C4\u03B7','',0,0,1);
I[7][3][1]=new Array('\u0388\u03BD\u03B1 \u03A6\u03B9\u03BB\u03B9\u03C3\u03C4\u03B1\u03AF\u03BF \u03C3\u03C4\u03C1\u03B1\u03C4\u03B7\u03B3\u03CC','',0,0,1);
I[7][3][2]=new Array('\u0388\u03BD\u03B1 \u0391\u03B9\u03B3\u03CD\u03C0\u03C4\u03B9\u03BF \u03B1\u03BE\u03B9\u03C9\u03BC\u03B1\u03C4\u03BF\u03CD\u03C7\u03BF','\u039A\u03AC\u03C0\u03C9\u03C2 \u03AD\u03C4\u03C3\u03B9 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03C6\u03B1\u03BD\u03C4\u03B1\u03C3\u03C4\u03BF\u03CD\u03BC\u03B5 \u03CC\u03C4\u03B9 \u03AE\u03C4\u03B1\u03BD \u03BD\u03C4\u03C5\u03BC\u03AD\u03BD\u03BF\u03C2 \u03BF \u0399\u03C9\u03C3\u03AE\u03C6, \u03CC\u03C4\u03B1\u03BD \u03C4\u03BF\u03BD \u03C3\u03C5\u03BD\u03AC\u03BD\u03C4\u03B7\u03C3\u03B1\u03BD \u03BF\u03B9 \u03B1\u03B4\u03B5\u03BB\u03C6\u03BF\u03AF \u03C4\u03BF\u03C5 \u03C3\u03C4\u03B7\u03BD \u0391\u03AF\u03B3\u03C5\u03C0\u03C4\u03BF.',1,100,1);


function StartUp(){
	RemoveBottomNavBarForIE();

//If there's only one question, no need for question navigation controls
	if (QsToShow < 2){
		document.getElementById('QNav').style.display = 'none';
	}
	
//Stash the instructions so they can be redisplayed
	strInstructions = document.getElementById('InstructionsDiv').innerHTML;
	

	

	PreloadImages('images/icons/aplause.gif','images/icons/no.gif','images/icons/uarrw.gif','images/icons/larrw.gif','images/icons/rarrw.gif','images/ask42.jpg','images/ask40.jpg','images/ask41.jpg','images/ask109.jpg','images/ask110.jpg','images/ask111.jpg','images/ask112.jpg','images/ask43.jpg');

	
	CompleteEmptyFeedback();

	SetUpQuestions();
	ClearTextBoxes();
	CreateStatusArray();
	

	
//Check search string for q parameter
	if (document.location.search.length > 0){
		if (ShuffleQs == false){
			var JumpTo = parseInt(document.location.search.substring(1,document.location.search.length))-1;
			if (JumpTo <= QsToShow){
				ChangeQ(JumpTo);
			}
		}
	}
//Undocumented function added 10/12/2004
	ShowSpecialReadingForQuestion();
}

function ShowHideQuestions(){
	FuncBtnOut(document.getElementById('ShowMethodButton'));
	document.getElementById('ShowMethodButton').style.display = 'none';
	if (ShowingAllQuestions == false){
		for (var i=0; i<QArray.length; i++){
				QArray[i].style.display = '';
			}
		document.getElementById('Questions').style.listStyleType = 'decimal';
		document.getElementById('OneByOneReadout').style.display = 'none';
		document.getElementById('ShowMethodButton').innerHTML = ShowOneByOneCaption;
		ShowingAllQuestions = true;
	}
	else{
		for (var i=0; i<QArray.length; i++){
				if (i != CurrQNum){
					QArray[i].style.display = 'none';
				}
			}
		document.getElementById('Questions').style.listStyleType = 'none';
		document.getElementById('OneByOneReadout').style.display = '';
		document.getElementById('ShowMethodButton').innerHTML = ShowAllQuestionsCaption;
		ShowingAllQuestions = false;	
	}
	document.getElementById('ShowMethodButton').style.display = 'inline';
}

function CreateStatusArray(){
	var QNum, ANum;
//For each item in the item array
	for (QNum=0; QNum<I.length; QNum++){
//Check if the question still exists (hasn't been nuked by showing a random selection)
		if (document.getElementById('Q_' + QNum) != null){
			State[QNum] = new Array();
			State[QNum][0] = -1; //Score for this q; -1 shows question not done yet
			State[QNum][1] = new Array(); //answers
			for (ANum = 0; ANum<I[QNum][3].length; ANum++){
				State[QNum][1][ANum] = 0; //answer not chosen yet; when chosen, will store its position in the series of choices
			}
			State[QNum][2] = 0; //tries at this q so far
			State[QNum][3] = 0; //incrementing percent-correct values of selected answers
			State[QNum][4] = 0; //penalties incurred for hints
			State[QNum][5] = ''; //Sequence of answers chosen by number
		}
		else{
			State[QNum] = null;
		}
	}
}



function CheckMCAnswer(QNum, ANum, Btn){
//if question doesn't exist, bail
	if (State[QNum].length < 1){return;}
	
//Get the feedback
	Feedback = I[QNum][3][ANum][1];
	
//Now show feedback and bail if question already complete
	if (State[QNum][0] > -1){
//Add an extra message explaining that the question
// is finished if defined by the user
		if (strQuestionFinished.length > 0){Feedback += '<br />' + strQuestionFinished;}
//Show the feedback
		ShowMessage(Feedback);
		return;
	}
	
//Hide the button while processing
	Btn.style.display = 'none';

//Increment the number of tries
	State[QNum][2]++;
	
//Add the percent-correct value of this answer
	State[QNum][3] += I[QNum][3][ANum][3];
	
//Store the try number in the answer part of the State array, for tracking purposes
	State[QNum][1][ANum] = State[QNum][2];
	State[QNum][5] += String.fromCharCode(65+ANum) + ',';
	
//Should this answer be accepted as correct?
	if (I[QNum][3][ANum][2] < 1){
//It's wrong

//Mark the answer
		Btn.innerHTML = IncorrectIndicator;
		
//Remove any previous score unless exercise is finished (6.0.3.8+)
		if (Finished == false){
			WriteToInstructions(strInstructions);
		}	
		
//Check whether this leaves just one MC answer unselected, in which case the Q is terminated
		var RemainingAnswer = FinalAnswer(QNum);
		if (RemainingAnswer > -1){
//Behave as if the last answer had been selected, but give no credit for it
//Increment the number of tries
			State[QNum][2]++;		
		
//Calculate the score for this question
			CalculateMCQuestionScore(QNum);

//Get the overall score and add it to the feedback
			CalculateOverallScore();
			if ((ContinuousScoring == true)||(Finished == true)){
				Feedback += '<br />' + YourScoreIs + ' ' + Score + '%.';
				WriteToInstructions(YourScoreIs + ' ' + Score + '%.');
			}
		}
	}
	else{
//It's right
//Mark the answer
		Btn.innerHTML = CorrectIndicator;
				
//Calculate the score for this question
		CalculateMCQuestionScore(QNum);

//Get the overall score and add it to the feedback
		if (ContinuousScoring == true){
			CalculateOverallScore();
			if ((ContinuousScoring == true)||(Finished == true)){
				Feedback += '<br />' + YourScoreIs + ' ' + Score + '%.';
				WriteToInstructions(YourScoreIs + ' ' + Score + '%.');
			}
		}
	}
	
//Show the button again
	Btn.style.display = 'inline';
	
//Finally, show the feedback	
	ShowMessage(Feedback);
	
//Check whether all questions are now done
	CheckFinished();
}

function CalculateMCQuestionScore(QNum){
	var Tries = State[QNum][2] + State[QNum][4]; //include tries and hint penalties
	var PercentCorrect = State[QNum][3];
	var TotAns = GetTotalMCAnswers(QNum);
	var HintPenalties = State[QNum][4];
	
//Make sure it's not already complete

	if (State[QNum][0] < 0){
//Allow for Hybrids
		if (HintPenalties >= 1){
			State[QNum][0] = 0;
		}
		else{
//This line calculates the score for this question
			if (TotAns == 1){
				State[QNum][0] = 1;
			}
			else{
				State[QNum][0] = ((TotAns-((Tries*100)/State[QNum][3]))/(TotAns-1));
			}
		}
//Fix for Safari bug added for version 6.0.3.42 (negative infinity problem)
		if ((State[QNum][0] < 0)||(State[QNum][0] == Number.NEGATIVE_INFINITY)){
			State[QNum][0] = 0;
		}
	}
}

function GetTotalMCAnswers(QNum){
	var Result = 0;
	for (var ANum=0; ANum<I[QNum][3].length; ANum++){
		if (I[QNum][3][ANum][4] == 1){ //This is an MC answer
			Result++;
		}
	}
	return Result;
}

function FinalAnswer(QNum){
	var UnchosenAnswers = 0;
	var FinalAnswer = -1;
	for (var ANum=0; ANum<I[QNum][3].length; ANum++){
		if (I[QNum][3][ANum][4] == 1){ //This is an MC answer
			if (State[QNum][1][ANum] < 1){ //This answer hasn't been chosen yet
				UnchosenAnswers++;
				FinalAnswer = ANum;
			}
		}
	}
	if (UnchosenAnswers == 1){
		return FinalAnswer;
	}
	else{
		return -1;
	}
}





function CalculateOverallScore(){
	var TotalWeighting = 0;
	var TotalScore = 0;
	
	for (var QNum=0; QNum<State.length; QNum++){
		if (State[QNum] != null){
			if (State[QNum][0] > -1){
				TotalWeighting += I[QNum][0];
				TotalScore += (I[QNum][0] * State[QNum][0]);
			}
		}
	}
	if (TotalWeighting > 0){
		Score = Math.floor((TotalScore/TotalWeighting)*100);
	}
	else{
//if TotalWeighting is 0, no questions so far have any value, so 
//no penalty should be shown.
		Score = 100; 
	}
}

function CheckFinished(){
	var FB = '';
	var AllDone = true;
	for (var QNum=0; QNum<State.length; QNum++){
		if (State[QNum] != null){
			if (State[QNum][0] < 0){
				AllDone = false;
			}
		}
	}
	if (AllDone == true){
	
//Report final score and submit if necessary
		CalculateOverallScore();
		FB = YourScoreIs + ' ' + Score + '%.';
		if (ShowCorrectFirstTime == true){
			var CFT = 0;
			for (QNum=0; QNum<State.length; QNum++){
				if (State[QNum] != null){
					if (State[QNum][0] >= 1){
						CFT++;
					}
				}
			}
			FB += '<br />' + CorrectFirstTime + ' ' + CFT + '/' + QsToShow;
		}
		WriteToInstructions(FB);
		
		Finished == true;

		TimeOver = true;
		Locked = true;
		


		Finished = true;
		Detail = '<?xml version="1.0"?><hpnetresult><fields>';
		for (QNum=0; QNum<State.length; QNum++){
			if (State[QNum] != null){
				if (State[QNum][5].length > 0){
					Detail += '<field><fieldname>Question #' + (QNum+1) + '</fieldname><fieldtype>question-tracking</fieldtype><fieldlabel>Q ' + (QNum+1) + '</fieldlabel><fieldlabelid>QuestionTrackingField</fieldlabelid><fielddata>' + State[QNum][5] + '</fielddata></field>';
				}
			}
		}
		Detail += '</fields></hpnetresult>';
		setTimeout('Finish()', SubmissionTimeout);
	}
}










//-->

//]]>


