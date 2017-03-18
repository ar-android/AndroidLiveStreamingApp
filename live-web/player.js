var data = [];
var jw_width = 640, jw_height = 360;

// Outputs some logs about jwplayer
function print(t, obj) {
    for (var a in obj) {
        if (typeof obj[a] === "object")
            print(t + '.' + a, obj[a]);
        else
            data[t + '.' + a] = obj[a];
    }
}

$(document).ready(function() {

    jwplayer('player').setup({
        wmode: 'transparent',
        width: jw_width,
        height: jw_height,
        stretching: 'exactfit'
    });

    $('#btn_start').click(function() {
        startPlayer($('#stream_url').val());
    });

    $('#btn_stop').click(function() {
        jwplayer('player').stop();
    });



    startPlayer($('#stream_url').val());
});

// Starts the flash player
function startPlayer(stream) {

    jwplayer('player').setup({
        height: jw_height,
        width: jw_width,
        stretching: 'exactfit',
        sources: [{
                file: stream
            }],
        rtmp: {
            bufferlength: 3
        }
    });

    jwplayer("player").onMeta(function(event) {
        var info = "";
        for (var key in data) {
            info += key + " = " + data[key] + "<BR>";
        }
        print("event", event);
    });

    jwplayer('player').play();
}