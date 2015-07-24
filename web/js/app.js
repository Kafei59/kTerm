/* 
* @Author: gicque_p
* @Date:   2015-07-24 02:06:03
* @Last Modified by:   gicque_p
* @Last Modified time: 2015-07-24 16:32:39
*/

var rx = /INPUT|SELECT|TEXTAREA/i;

$(document).bind("keydown keypress", function(e) {
    if (e.which == 8) {
        if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
            e.preventDefault();

            var line = $("#main").find("#last-line");
            var span = line.find(".content");
            var length = span.text().length;

            span.text(function(i,v) {
                return v.slice(0, -1);
            });
        }
    }
});

function addDiv(text) {
    jQuery('<div/>', {
        class: 'computed-line',
        html: "<p>> " + text + '</p>'
    }).appendTo("#main");
}

$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    var line = $("#main").find("#last-line");
    var span = line.find(".content");

    if (keycode == 13) {
        if (span.text() == 'help') {
            addDiv("Useful commands:<ul><li>ls</li><li>vim</li><li>pwd</li><li>clear</li></ul>");
        } else if (span.text() == 'ls') {
            addDiv("List of files:<ul><li>index.html</li></ul>");
        } else if (span.text() == 'pwd') {
            addDiv("Current position: " + window.location.pathname);
        } else if (span.text() ==  'clear') {
            location.reload();
            return ;
        } else if (span.text().substr(0, 4) == 'vim ') {
            var file = span.text().substr(4, span.text().length);

            if (file == 'index.html') {
                // var pathArray = window.location.pathname.split( '/' );
                // var newUrl = window.location.host + '/' + pathArray[1] + '/' + pathArray[2] + '/' + pathArray[3] + '/' + file;
                window.location.replace(file);
                return ;
            } else {
                addDiv("Unknow file '" + file + "', please use 'ls' to list all files");
            }
        } else if (span.text() == 'vim') {
            addDiv("You must enter a filename, please use 'ls' to list all files");
        } else if (span.text().length != 0) {
            addDiv("Unknow command '" + span.text() + "', please use 'help' to find all available commands");
        }

        line.clone().appendTo("#main");
        line.removeAttr("id");

        var now = new Date();
        var hours = now.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }

        var minutes = now.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        var secondes = now.getSeconds();
        if (secondes < 10) {
            secondes = '0' + secondes;
        }

        var newline = $("#main").find("#last-line");
        newline.find(".content").empty();
        newline.find(".term").text(hours + ':' + minutes + ':' + secondes + '@kTerm $ ');

        $('html, body').animate({
            scrollTop: newline.offset().top
        }, 1);
    } else {
        var c = String.fromCharCode(keycode);

        span.text(function(i,v) {
            return v + c;
        });
    }
});
