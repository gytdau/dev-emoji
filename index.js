$(function() {
    $.each(emojis, function(key, value) {
        newEmojis = "";
        $.each(value, function(_, emojiToAdd) {
            newEmojis += "<div class='emoji-row col-sm-6'><span class='em " + emojiToAdd.css + "'></span></div>"
        });
        $('#' + key).append(newEmojis);
    }) ;
});