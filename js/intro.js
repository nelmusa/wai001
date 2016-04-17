var myScroll;
var myScroll1;
var myScroll2;
var myScroll3;

function loaded() {

    myScroll = new iScroll('wrapper');
    
    myScroll1 = new iScroll('wrapper1', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
            document.querySelector('#indicator1 > li.active').className = '';
            document.querySelector('#indicator1 > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        }
    });
    
    myScroll2 = new iScroll('wrapper2', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
            document.querySelector('#indicator2 > li.active').className = '';
            document.querySelector('#indicator2 > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        }
    });
    
    myScroll3 = new iScroll('wrapper3', {
        snap: true,
        momentum: false,
        hScrollbar: false,
        onScrollEnd: function () {
            document.querySelector('#indicator3 > li.active').className = '';
            document.querySelector('#indicator3 > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
        }
    });

}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
