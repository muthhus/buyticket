/*Internet explorer 6.0 & 7.0 purpose*/

navHover = function() {
    var lis = document.getElementById("navmenu").getElementsByTagName("LI");
    for (var i=0; i<lis.length; i++) {
	    lis[i].onmouseover=function() {
            this.className+=" iehover";
        }
        lis[i].onmouseout=function() {
            this.className=this.className.replace(new RegExp(" iehover\\b"), "");
        }
    }
}

sfHover = function() {
    var sfhinput = document.getElementsByTagName("INPUT");
    var sfhtextarea = document.getElementsByTagName("textarea");
    var sfhselect = document.getElementsByTagName("select");
    for (var i=0; i<sfhinput.length; ++i) {
        if (sfhinput[i].type=='text' || sfhinput[i].type=='password' || sfhinput[i].type=='file') {
            sfhinput[i].className = 'inputfocus';
            sfhinput[i].onmouseover = function() {
                this.className += " sfhover";
            }
            sfhinput[i].onmouseout = function() {
                this.className = this.className.replace(new RegExp("sfhover\\b"), "");
            }
        }
    }
    for (var i=0; i<sfhtextarea.length; i++) {
        sfhtextarea[i].className = 'inputfocus';
        sfhtextarea[i].onmouseover = function() {
            this.className += " sfhover";
        }
        sfhtextarea[i].onmouseout = function() {
            this.className = this.className.replace(new RegExp("sfhover\\b"), "");
        }
    }
    for (var i=0; i<sfhselect.length; i++) {
        sfhselect[i].className = 'inputfocus';
        sfhselect[i].onmouseover = function() {
            this.className += " sfhover";
        }
        sfhselect[i].onmouseout = function() {
            this.className = this.className.replace(new RegExp("sfhover\\b"), "");
        }
    }
}

if (window.attachEvent) {
    window.attachEvent("onload", navHover);
    window.attachEvent("onload", sfHover);
}
